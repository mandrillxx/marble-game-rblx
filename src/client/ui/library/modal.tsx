import { AspectRatio, BaseProps, Corner, Frame, Gradient, ImageButton, ImageLabel, Stroke, Text } from ".";
import Roact from "@rbxts/roact";

type IModal = Roact.PropsWithChildren<BaseProps<ImageLabel> & { RingColor: ColorSequence; Color: ColorSequence }>;

export function Modal({ Name, Position, Image, Color, RingColor, children }: IModal) {
	return (
		<ImageLabel
			Name={Name ?? "Modal"}
			Size={UDim2.fromScale(0.984, 0.945)}
			Position={Position ?? UDim2.fromScale(0.5, 0.5)}
			Image={Image}
		>
			<AspectRatio AspectRatio={1.804} />
			<Gradient Color={Color} />
			<Ring IAspectRatio={1.824} Color={RingColor} />
			<Header Color={RingColor} />
			<Close />
			{children}
		</ImageLabel>
	);
}

function Ring({ Color, IAspectRatio, Image }: { Color: ColorSequence; IAspectRatio: number; Image?: string }) {
	return (
		<ImageLabel Name="Ring" Size={UDim2.fromScale(0.987, 0.976)} Image={Image ?? "rbxassetid://14800624185"}>
			<Gradient Color={Color} />
			<AspectRatio AspectRatio={IAspectRatio} />
		</ImageLabel>
	);
}

type IHeader = { Color: ColorSequence };

function Header({ Color }: IHeader) {
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
				<Ring IAspectRatio={7.839} Color={Color} Image="rbxassetid://14800942412" />
				<Text Position={UDim2.fromScale(0.5, 0.447)} Size={UDim2.fromScale(0.298, 0.556)} Text="Codes" />
			</ImageLabel>
		</Frame>
	);
}

function Close() {
	return (
		<ImageButton
			Name="Close"
			Position={UDim2.fromScale(1, 0)}
			Size={UDim2.fromScale(0.068, 0.122)}
			BackgroundTransparency={0}
		>
			<AspectRatio AspectRatio={1} />
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
