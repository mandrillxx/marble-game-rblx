import Log from "@rbxts/log";
import { BaseComponent, Component } from "@rbxts/proton";
import { Workspace } from "@rbxts/services";

@Component({ tag: "Spinner" })
export class Spinner extends BaseComponent<Part> {
	onStart() {
		while (this.instance) {
			this.instance.CFrame = this.instance.CFrame.mul(CFrame.Angles(0, 0, 0.025));
			task.wait();
		}
	}
	onStop() {}
}
