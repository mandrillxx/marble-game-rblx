import Roact from "@rbxts/roact";
import { ReactStory } from "client/flipbook";
import { App } from "../app";
import * as ReactRoblox from "@rbxts/react-roblox";

Roact.setGlobalConfig({
	elementTracing: true,
	internalTypeChecks: true,
	propValidation: true,
	typeChecks: true,
});

const OverlayStory: ReactStory = {
	name: "Overlay.story",
	react: Roact,
	reactRoblox: ReactRoblox,
	story: <App />,
	summary: "Overlay Story",
};

export = OverlayStory;
