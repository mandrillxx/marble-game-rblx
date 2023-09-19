import { AspectRatio as IAspectRatio, BaseProps, Frame } from ".";
import Roact from "@rbxts/roact";

type IContainer = Roact.PropsWithChildren<BaseProps<Frame>>;

export function Container({ children }: IContainer) {
	return (
		<Frame Name="Container" BackgroundTransparency={1} Size={UDim2.fromScale(0.479, 0.491)}>
			<IAspectRatio AspectRatio={1.734} />
			{children}
		</Frame>
	);
}
