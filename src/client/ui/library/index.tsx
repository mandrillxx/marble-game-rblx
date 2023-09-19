import Roact from "@rbxts/roact";

export type BaseProps<T extends GuiObject> = Partial<WritableInstanceProperties<T>> & {
	[key: string]: unknown;
};

type IFrame = Roact.PropsWithChildren<BaseProps<Frame>>;

export function Frame({ Name, Position, Size, BackgroundTransparency, BackgroundColor3, children }: IFrame) {
	return (
		<frame
			key={Name ?? "Canvas"}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={BackgroundColor3 ?? Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={BackgroundTransparency ?? 1}
			Position={Position ?? UDim2.fromScale(0.5, 0.5)}
			Size={Size}
		>
			{children}
		</frame>
	);
}

type IImageButton = Roact.PropsWithChildren<BaseProps<ImageButton>>;

export function ImageButton({
	Name,
	Position,
	Size,
	Image,
	ImageColor3,
	BackgroundTransparency,
	children,
}: IImageButton) {
	return (
		<imagebutton
			key={Name ?? "Main"}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={Position ?? UDim2.fromScale(0.5, 0.5)}
			Size={Size}
			Image={Image}
			ImageColor3={ImageColor3}
			BackgroundTransparency={BackgroundTransparency ?? 1}
			BorderSizePixel={0}
		>
			{children}
		</imagebutton>
	);
}

type IImageLabel = Roact.PropsWithChildren<BaseProps<ImageLabel>>;

export function ImageLabel({ Name, Position, Size, Image, ImageColor3, children }: IImageLabel) {
	return (
		<imagelabel
			key={Name ?? "Main"}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={Position ?? UDim2.fromScale(0.5, 0.5)}
			Size={Size}
			Image={Image}
			ImageColor3={ImageColor3}
			BackgroundTransparency={1}
			BorderSizePixel={0}
		>
			{children}
		</imagelabel>
	);
}

type IAspectRatio = Roact.PropsWithChildren<Partial<WritableInstanceProperties<UIAspectRatioConstraint>>>;

export function AspectRatio({ AspectRatio }: IAspectRatio) {
	return <uiaspectratioconstraint AspectRatio={AspectRatio ?? 1} />;
}

type IGradient = Partial<WritableInstanceProperties<UIGradient>>;

export function Gradient({ Color, Rotation, Transparency }: IGradient) {
	return <uigradient Color={Color} Rotation={Rotation ?? -90} Transparency={Transparency ?? new NumberSequence(0)} />;
}

type IText = BaseProps<TextLabel> & { Thickness?: number };

export function Text({ Name, Text, Position, Size, RichText, TextColor3, Thickness }: IText) {
	return (
		<textlabel
			key={Name ?? "Text"}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={Position ?? UDim2.fromScale(0.5, 0.5)}
			Size={Size}
			RichText={RichText}
			Font={Enum.Font.FredokaOne}
			Text={Text}
			TextColor3={TextColor3 ?? Color3.fromRGB(255, 255, 255)}
			TextScaled={true}
			TextSize={14}
			TextXAlignment={Enum.TextXAlignment.Center}
			TextYAlignment={Enum.TextYAlignment.Center}
		>
			<Stroke Thickness={Thickness} />
		</textlabel>
	);
}

type IStroke = Partial<WritableInstanceProperties<UIStroke>>;

export function Stroke({ Thickness }: IStroke) {
	return <uistroke Thickness={Thickness ?? 3} Color={Color3.fromRGB(0, 0, 0)} />;
}

type ICorner = Partial<WritableInstanceProperties<UICorner>>;

export function Corner({ CornerRadius }: ICorner) {
	return <uicorner CornerRadius={CornerRadius ?? new UDim(0, 4)} />;
}

type IButton = BaseProps<TextButton> & {
	ButtonText: string;
	Color?: ColorSequence;
	StrokeColor?: Color3;
	IAspectRatio?: number;
};

export function Button({
	Name,
	Position,
	Size,
	ButtonText,
	TextColor3,
	BackgroundTransparency,
	Color,
	StrokeColor,
	IAspectRatio,
}: IButton) {
	return (
		<imagebutton
			key={Name ?? "Button"}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={Position ?? UDim2.fromScale(0.5, 0.5)}
			Size={Size ?? UDim2.fromScale(0.193, 0.37)}
			BackgroundTransparency={BackgroundTransparency ?? 0}
			BorderSizePixel={0}
		>
			<AspectRatio AspectRatio={IAspectRatio ?? 3.778} />
			<Gradient
				Color={
					Color ??
					new ColorSequence([
						new ColorSequenceKeypoint(0, Color3.fromRGB(0, 181, 20)),
						new ColorSequenceKeypoint(1, Color3.fromRGB(0, 206, 27)),
					])
				}
			/>
			<Stroke Color={StrokeColor ?? Color3.fromRGB(1, 144, 16)} />
			<Corner CornerRadius={new UDim(0.296, 0)} />
			<Text Size={UDim2.fromScale(0.463, 0.754)} Text={ButtonText} TextColor3={TextColor3} Thickness={2} />
		</imagebutton>
	);
}

type ITextInput = BaseProps<TextBox>;

export function TextInput({ Name, Position, Size, Text, PlaceholderText, TextColor3, ClearTextOnFocus }: ITextInput) {
	return (
		<Frame Name={Name ?? "TextInput"} Position={Position} Size={Size} BackgroundTransparency={0}>
			<Corner CornerRadius={new UDim(0.2, 0)} />
			<Stroke Color={Color3.fromRGB(202, 202, 202)} />
			<textbox
				AnchorPoint={new Vector2(0.5, 0.5)}
				Size={UDim2.fromScale(0.533, 0.556)}
				Position={UDim2.fromScale(0.5, 0.5)}
				PlaceholderText={PlaceholderText}
				BackgroundTransparency={1}
				Font={Enum.Font.FredokaOne}
				TextColor3={TextColor3 ?? Color3.fromRGB(43, 43, 43)}
				TextScaled={true}
				TextWrapped={true}
				Text={Text ?? ""}
				ClearTextOnFocus={ClearTextOnFocus ?? false}
			/>
		</Frame>
	);
}
