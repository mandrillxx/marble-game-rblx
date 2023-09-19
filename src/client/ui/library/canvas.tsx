import { AspectRatio as IAspectRatio, BaseProps, Frame } from ".";
import Roact from "@rbxts/roact";

type ICanvas = Roact.PropsWithChildren<BaseProps<Frame> & { AspectRatio: number }>;

export function Canvas({ AspectRatio, Visible, children }: ICanvas) {
	return (
		<Frame Visible={Visible} BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)}>
			<IAspectRatio AspectRatio={AspectRatio} />
			{children}
		</Frame>
	);
}
