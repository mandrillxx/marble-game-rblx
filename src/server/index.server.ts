import { Players, ReplicatedStorage } from "@rbxts/services";
import { GameProvider } from "./providers/game";
import { setupTags } from "shared/setupTags";
import { IProfile } from "./data";
import { Network } from "shared/network";
import { Proton } from "@rbxts/proton";
import { Client } from "shared/components";
import { start } from "shared/start";
import Log, { Logger } from "@rbxts/log";
import ProfileService from "@rbxts/profileservice";
import promiseR15 from "@rbxts/promise-character";

Proton.awaitStart();

Log.SetLogger(Logger.configure().WriteTo(Log.RobloxOutput()).Create());

declare const script: { systems: Folder };
export interface ServerState {
	debug: boolean;
	verbose: boolean;
}

const state: ServerState = {
	debug: true,
	verbose: true,
};

const world = start([script.systems, ReplicatedStorage.Shared.systems], state)(setupTags);
const gameProvider = Proton.get(GameProvider);

const ProfileTemplate: IProfile = {
	logInTimes: 0,
};

const GameProfileStore = ProfileService.GetProfileStore("PlayerData", ProfileTemplate);

async function bootstrap() {
	function playerRemoving(player: Player) {}
	function playerAdded(player: Player) {
		function handleData() {
			Log.Info("Handling data for player {@Player}", player);
			const profile = GameProfileStore.LoadProfileAsync("Player_" + player.UserId);
			if (!profile) {
				return player.Kick("Failed to load profile");
			}
			profile.AddUserId(player.UserId);
			profile.Reconcile();
			profile.ListenToRelease(() => {
				player.Kick("Profile released");
			});
			if (player.IsDescendantOf(Players)) {
				return;
			}
			return profile.Release();
		}

		function characterAdded(character: Model) {
			Log.Info("Character added for player {@Player}", player);
			promiseR15(character)
				.andThen(async (model) => {
					const playerEntity = world.spawn(
						Client({
							player,
							document: {
								coinMultiplier: 1.0,
							},
						}),
					);
					gameProvider.setup(playerEntity, world, state, model);
					character.SetAttribute("entityId", playerEntity);
				})
				.catch(() => {
					player.Kick("Failed to load character");
				});
		}

		handleData();

		if (player.Character) characterAdded(player.Character);
		player.CharacterAdded.Connect(characterAdded);
	}

	Players.PlayerAdded.Connect(playerAdded);
	Players.PlayerRemoving.Connect(playerRemoving);
	for (const player of Players.GetPlayers()) {
		playerAdded(player);
	}

	Network.redeemCode.server.connect((player) => {
		Log.Info("Redeem code from player {@Player}", player);
	});
}

bootstrap()
	.done((status) => Log.Info("Server Bootstrap complete with status {@Status}", status))
	.catch(Log.Error);
