import Roact, { Element, useContext } from "@rbxts/roact";
import { Codes } from "./codes";
import { ModalContext } from "../context/modal";

export * from "./codes";

export type Modal = "Codes" | "Quests" | "Settings" | "Inventory" | "Shop" | "Crafting" | undefined;
export type IModal = { Visible: boolean };

export const Modals: [{ Component: ({ Visible }: IModal) => Element; Name: string }] = [
	{ Name: "Codes", Component: Codes },
];

export function ModalProvider() {
	const openModal = useContext(ModalContext);

	return (
		<>
			{Modals.map((Modal) => (
				<Modal.Component Visible={openModal === Modal.Name} />
			))}
		</>
	);
}
