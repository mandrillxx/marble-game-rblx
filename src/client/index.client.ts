import { CharacterRigR15 } from "@rbxts/promise-character";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { Proton } from "@rbxts/proton";
import Log, { Logger } from "@rbxts/log";
import { ClientState } from "shared/clientState";
import { start } from "shared/start";
import { receiveReplication } from "./receiveReplication";

Proton.awaitStart();

Log.SetLogger(Logger.configure().WriteTo(Log.RobloxOutput()).Create());

const player = Players.LocalPlayer;

const character = (player.Character || player.CharacterAdded.Wait()[0]) as CharacterRigR15;

const state: ClientState = {
	debug: true,
	playerId: undefined,
	entityIdMap: new Map(),
};

start([ReplicatedStorage.Client.systems, ReplicatedStorage.Shared.systems], state)(receiveReplication);

async function bootstrap() {
	while (!state.playerId) {
		task.wait(0.1);
	}
}

bootstrap()
	.done((status) => {
		Log.Info("Client Bootstrap complete with status {@Status}", status);
	})
	.catch(Log.Error);
