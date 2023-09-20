import { ModalContext, SetModalContext } from "./context/modal";
import { Overlay } from "./overlay";
import { Modal } from "./modals";
import Roact, { useState } from "@rbxts/roact";

export function App() {
	const [openModal, setOpenModal] = useState<Modal>("Settings");

	return (
		<ModalContext.Provider value={openModal}>
			<SetModalContext.Provider value={setOpenModal}>
				<Overlay />
			</SetModalContext.Provider>
		</ModalContext.Provider>
	);
}
