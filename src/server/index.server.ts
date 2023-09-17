import { Players, ReplicatedStorage } from "@rbxts/services";
import { GameProvider } from "./providers/game";
import { setupTags } from "shared/setupTags";
import { IProfile } from "./data";
import { Network } from "shared/network";
import { Proton } from "@rbxts/proton";
import { Client, Renderable } from "shared/components";
import { start } from "shared/start";
import Log, { Logger } from "@rbxts/log";
import ProfileService from "@rbxts/profileservice";
import promiseR15 from "@rbxts/promise-character";
import { New } from "@rbxts/fusion";
import { Profile } from "@rbxts/profileservice/globals";
import { AnyEntity } from "@rbxts/matter";

Proton.awaitStart();

Log.SetLogger(Logger.configure().WriteTo(Log.RobloxOutput()).Create());

declare const script: { systems: Folder };
export interface ServerState {
	debug: boolean;
	verbose: boolean;
	clients: Map<number, AnyEntity>;
	profiles: Map<Player, Profile<IProfile, unknown>>;
}

const state: ServerState = {
	debug: true,
	verbose: true,
	clients: new Map(),
	profiles: new Map(),
};

const world = start([script.systems, ReplicatedStorage.Shared.systems], state)(setupTags);
const gameProvider = Proton.get(GameProvider);

const ProfileTemplate: IProfile = {
	logInTimes: 0,
};

const GameProfileStore = ProfileService.GetProfileStore("PlayerData", ProfileTemplate);

async function bootstrap() {
	function playerRemoving(player: Player) {
		state.clients.delete(player.UserId);
		const profile = state.profiles.get(player);
		if (profile) {
			state.profiles.delete(player);
			profile.Release();
		}
		gameProvider.saveAndCleanup(player, state, world);
	}

	function playerAdded(player: Player) {
		function handleData() {
			const profile = GameProfileStore.LoadProfileAsync("Player_" + player.UserId);
			if (!profile) {
				return player.Kick("Failed to load profile");
			}
			profile.AddUserId(player.UserId);
			profile.Reconcile();
			profile.ListenToRelease(() => {
				state.profiles.delete(player);
				player.Kick("Session was terminated");
			});
			if (player.IsDescendantOf(Players)) {
				return state.profiles.set(player, profile);
			}
			return profile.Release();
		}

		function characterAdded(character: Model) {
			promiseR15(character)
				.andThen(async (model) => {
					const playerEntity = world.spawn(
						Client({
							player,
							document: {
								coinMultiplier: 1.0,
							},
						}),
						Renderable({ model }),
					);
					state.clients.set(player.UserId, playerEntity);
					gameProvider.setup(playerEntity, world, state, model);
					character.SetAttribute("entityId", playerEntity);
				})
				.catch(() => {
					player.Kick("Failed to load character data");
				});
		}

		task.spawn(() => {
			const leaderstats = New("Folder")({
				Name: "leaderstats",
				Parent: player,
			});
			New("NumberValue")({
				Value: 0,
				Name: "Money",
				Parent: leaderstats,
			});
		});

		handleData();

		if (player.Character) characterAdded(player.Character);
		player.CharacterAdded.Connect(characterAdded);
	}

	Players.PlayerAdded.Connect(playerAdded);
	Players.PlayerRemoving.Connect(playerRemoving);
	for (const player of Players.GetPlayers()) {
		playerAdded(player);
	}
}

bootstrap().done((status) => {
	Log.Info("Bootstrap complete with status {@Status}", status);
});
