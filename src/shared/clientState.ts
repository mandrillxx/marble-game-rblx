import { AnyEntity } from "@rbxts/matter";

export interface ClientState {
	debug: boolean;
	playerId: AnyEntity | undefined;
	entityIdMap: Map<string, AnyEntity>;
}
