import { createContext } from "@rbxts/roact";
import { Modal } from "../modals";

export const ModalContext = createContext<Modal>(undefined);
export const SetModalContext = createContext<(modal: Modal) => void>(undefined as unknown as (modal: Modal) => void);
