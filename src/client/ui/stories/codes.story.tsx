import { ReactStory } from "client/flipbook";
import { Codes } from "../modals";
import * as ReactRoblox from "@rbxts/react-roblox";
import Roact from "@rbxts/roact";

Roact.setGlobalConfig({
	elementTracing: true,
	internalTypeChecks: true,
	propValidation: true,
	typeChecks: true,
});

const CodesStory: ReactStory = {
	name: "Codes.story",
	react: Roact,
	reactRoblox: ReactRoblox,
	story: <Codes Visible={true} />,
	summary: "Codes Story",
};

export = CodesStory;
