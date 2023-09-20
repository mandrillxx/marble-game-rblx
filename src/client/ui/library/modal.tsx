import { AspectRatio, BaseProps, Corner, Frame, Gradient, ImageButton, ImageLabel, Stroke, Text } from ".";
import Roact, { createRef, useBinding, useContext, useState } from "@rbxts/roact";
import { ModalContext, SetModalContext } from "../context/modal";
import { useSpring } from "@rbxts/rbx-react-spring";

type IModal = Roact.PropsWithChildren<
	BaseProps<ImageLabel> & { Name: string; RingColor: ColorSequence; Color: ColorSequence }
>;

export function Modal({ Name, Position, Image, Color, RingColor, children }: IModal) {
	const openModal = useContext(ModalContext);
	const visible = openModal === Name;

	const { position } = useSpring(
		{
			config: {
				mass: 1,
				friction: 20,
				tension: 150,
			},
			position: visible ? UDim2.fromScale(0.5, 0.5) : UDim2.fromScale(0.5, 2.5),
		},
		[visible],
	);

	return (
		<ImageLabel key={Name ?? "Modal"} Position={position} Size={UDim2.fromScale(0.984, 0.945)} Image={Image}>
			<AspectRatio AspectRatio={1.804} />
			<Gradient Color={Color} />
			<Ring AspectRatio={1.824} Color={RingColor} />
			<Header Title={openModal ?? "Title"} Color={RingColor} />
			<Close />
			{children}
		</ImageLabel>
	);
}

type IRing = BaseProps<ImageLabel> & { Color: ColorSequence; AspectRatio?: number; Image?: string };

export function Ring({ Position, Size, Color, AspectRatio: IAspectRatio, Image }: IRing) {
	return (
		<ImageLabel
			Name="Ring"
			Position={Position}
			Size={Size ?? UDim2.fromScale(0.987, 0.976)}
			Image={Image ?? "rbxassetid://14800624185"}
		>
			<Gradient Color={Color} />
			{IAspectRatio !== undefined && <AspectRatio AspectRatio={IAspectRatio} />}
		</ImageLabel>
	);
}

type IHeader = { Title: string; Color: ColorSequence };

function Header({ Title, Color }: IHeader) {
	return (
		<Frame Name="Header" Position={UDim2.fromScale(0.268, 0.045)} Size={UDim2.fromScale(0.552, 0.15)}>
			<AspectRatio AspectRatio={6.653} />
			<ImageLabel
				Name="Main"
				Size={UDim2.fromScale(1, 1)}
				Position={UDim2.fromScale(0.5, 0.5)}
				Image={"rbxassetid://14800937055"}
				ImageColor3={Color3.fromRGB(24, 24, 24)}
			>
				<Ring AspectRatio={7.839} Color={Color} Image="rbxassetid://14800942412" />
				<Text Position={UDim2.fromScale(0.5, 0.447)} Size={UDim2.fromScale(0.298, 0.556)} Text={Title} />
			</ImageLabel>
		</Frame>
	);
}

function Close() {
	const [hovering, setHovering] = useState(false);
	const setOpenModal = useContext(SetModalContext);

	const { size } = useSpring(
		{
			config: {
				mass: 0.5,
			},
			size: hovering ? UDim2.fromScale(0.068 * 1.5, 0.122 * 1.5) : UDim2.fromScale(0.068, 0.122),
		},
		[hovering],
	);

	return (
		<ImageButton
			Name="Close"
			AspectRatio={1}
			Position={UDim2.fromScale(1, 0)}
			Size={size}
			BackgroundTransparency={0}
			Clicked={() => setOpenModal(undefined)}
			MouseEnter={() => setHovering(true)}
			MouseLeave={() => setHovering(false)}
		>
			<Gradient
				Color={
					new ColorSequence([
						new ColorSequenceKeypoint(0, Color3.fromRGB(199, 35, 34)),
						new ColorSequenceKeypoint(1, Color3.fromRGB(225, 53, 52)),
					])
				}
			/>
			<Stroke Thickness={4} />
			<Corner CornerRadius={new UDim(1, 0)} />
			<Text Size={UDim2.fromScale(0.649, 0.672)} Text="X" />
		</ImageButton>
	);
}
