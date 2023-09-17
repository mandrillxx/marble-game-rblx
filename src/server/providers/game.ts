import { AnyEntity, World } from "@rbxts/matter";
import { ServerState } from "server/index.server";
import { getOrError } from "shared/util";
import { Provider } from "@rbxts/proton";
import { Client } from "shared/components";
import Log from "@rbxts/log";

@Provider()
export class GameProvider {
	private cleanup(world: World, state: ServerState, player: Player) {}

	saveAndCleanup(player: Player, state: ServerState, world: World) {
		this.cleanup(world, state, player);
	}

	setup(playerEntity: AnyEntity, world: World, state: ServerState, character: Model) {
		const client = getOrError(world, playerEntity, Client, "Client component not found for player entity");
		const playerData = this.loadPlayerData(client, state);
		if (!playerData) {
			Log.Fatal("Player data could not be loaded for {@Player}", client.player.Name);
			return;
		}
	}

	private loadPlayerData(client: Client, state: ServerState) {
		return true;
	}
}
