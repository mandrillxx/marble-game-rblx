import { NetEvent, NetEventType } from "@rbxts/proton";
import { ClientState } from "./clientState";

export namespace Network {
	export const redeemCode = new NetEvent<[], NetEventType.ClientToServer>();
}
