import { ModalProvider } from "./modals";
import { HUD } from "./hud";
import Roact from "@rbxts/roact";

export function Overlay() {
	return (
		<>
			<ModalProvider />
			<HUD />
		</>
	);
}
