import { NetEvent, NetEventType } from "@rbxts/proton";

export namespace Network {
	export const redeemCode = new NetEvent<[], NetEventType.ClientToServer>();
}
