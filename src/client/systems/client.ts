import { ClientState } from "shared/clientState";
import { Players } from "@rbxts/services";
import { World } from "@rbxts/matter";

const player = Players.LocalPlayer;

function client(world: World, state: ClientState) {}

export = client;
