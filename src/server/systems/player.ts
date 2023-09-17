import { Client, Renderable } from "shared/components";
import { CharacterRigR6 } from "@rbxts/promise-character";
import { ServerState } from "server/index.server";
import { getOrError } from "shared/util";
import { World } from "@rbxts/matter";
import { New } from "@rbxts/fusion";

function player(world: World, _: ServerState) {
	for (const [id, client] of world.queryChanged(Client)) {
		if (!client.old && client.new) {
			const { player } = client.new;
			const renderable = getOrError(world, id, Renderable, "Cannot find renderable for client entity");
			const character = renderable.model as CharacterRigR6;
			character.Humanoid.ChangeState(Enum.HumanoidStateType.Physics);
			character.Humanoid.PlatformStand = true;
			const ball = New("Part")({
				Name: "Ball",
				Parent: character,
				Size: new Vector3(7, 7, 7),
				Transparency: 0.5,
				Material: Enum.Material.SmoothPlastic,
				Shape: Enum.PartType.Ball,
				Color: Color3.fromRGB(201, 237, 54),
				Position: character.PrimaryPart!.Position.add(new Vector3(0, 2, 0)),
			});
			const velocity = New("BodyAngularVelocity")({
				Parent: ball,
			});
			New("Weld")({
				Part0: character.HumanoidRootPart,
				Part1: ball,
				Parent: ball,
			});
		}
	}
}

export = player;
