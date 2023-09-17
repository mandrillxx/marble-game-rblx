import { Players, Workspace } from "@rbxts/services";
import { Client, Renderable } from "shared/components";
import { CharacterRigR6 } from "@rbxts/promise-character";
import { ClientState } from "shared/clientState";
import { getOrError } from "shared/util";
import { World } from "@rbxts/matter";

const player = Players.LocalPlayer;

function ball(world: World, state: ClientState) {
	for (const [id, client] of world.queryChanged(Client)) {
		if (!client.old && client.new && client.new.player.UserId === player.UserId) {
			state.playerId = id;
			const renderable = getOrError(world, id, Renderable, "Cannot find renderable for client entity");
			const character = renderable.model as CharacterRigR6 & {
				Ball: Part & { BodyAngularVelocity: BodyAngularVelocity };
			};
			while (!character.Ball) {
				task.wait(0.1);
			}
			Workspace.CurrentCamera.CameraSubject = character.Ball;
			const velocity = character.Ball.BodyAngularVelocity;
			task.spawn(() => {
				while (player.IsDescendantOf(Players)) {
					task.wait();
					velocity.AngularVelocity = new Vector3(
						character.Humanoid.MoveDirection.Z * 48,
						0,
						character.Humanoid.MoveDirection.X * -48,
					);
					velocity.MaxTorque = new Vector3(25000, 25000, 25000);
					if (character.Humanoid.MoveDirection === Vector3.zero) {
						velocity.MaxTorque = new Vector3(0, 0, 0);
					}
				}
			});
		}
	}
}

export = ball;
