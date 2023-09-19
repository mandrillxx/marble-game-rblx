import Roact, { RefPropertyOrFunction } from "@rbxts/roact";

export type BaseProps<T extends GuiObject> = Partial<WritableInstanceProperties<T>> & {
	[key: string]: unknown;
	ref?: RefPropertyOrFunction<T>;
};

type IFrame = Roact.PropsWithChildren<BaseProps<Frame>>;

export function Frame({ Name, Position, Size, Visible, BackgroundTransparency, BackgroundColor3, children }: IFrame) {
	return (
		<frame
			key={Name ?? "Canvas"}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Visible={Visible ?? true}
			BackgroundColor3={BackgroundColor3 ?? Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={BackgroundTransparency ?? 1}
			Position={Position ?? UDim2.fromScale(0.5, 0.5)}
			Size={Size}
		>
			{children}
		</frame>
	);
}

type IImageButton = Roact.PropsWithChildren<BaseProps<ImageButton>> & { AspectRatio: number; Clicked?: () => void };

export function ImageButton({
	Name,
	Position,
	Size,
	Image,
	ImageColor3,
	BackgroundTransparency,
	Clicked,
	children,
	AspectRatio: IAspectRatio,
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
			Event={{
				MouseButton1Click: Clicked,
			}}
		>
			<AspectRatio AspectRatio={IAspectRatio} />
			{children}
		</imagebutton>
	);
}

type IImageLabel = Roact.PropsWithChildren<BaseProps<ImageLabel>> & { AspectRatio?: number };

export function ImageLabel({
	Name,
	Position,
	Size,
	Image,
	ImageColor3,
	AspectRatio: IAspectRatio,
	children,
}: IImageLabel) {
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
			{IAspectRatio !== undefined && <AspectRatio AspectRatio={IAspectRatio} />}
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

type IListLayout = Partial<WritableInstanceProperties<UIListLayout>>;

export function ListLayout({ FillDirection, HorizontalAlignment, Padding, SortOrder, VerticalAlignment }: IListLayout) {
	return (
		<uilistlayout
			FillDirection={FillDirection ?? Enum.FillDirection.Vertical}
			HorizontalAlignment={HorizontalAlignment ?? Enum.HorizontalAlignment.Center}
			Padding={Padding ?? new UDim(0, 0)}
			SortOrder={SortOrder ?? Enum.SortOrder.LayoutOrder}
			VerticalAlignment={VerticalAlignment ?? Enum.VerticalAlignment.Center}
		/>
	);
}

type IButton = BaseProps<TextButton> & {
	ButtonText: string;
	Color?: ColorSequence;
	StrokeColor?: Color3;
	IAspectRatio?: number;
	Clicked?: () => void;
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
	Clicked,
}: IButton) {
	return (
		<imagebutton
			key={Name ?? "Button"}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={Position ?? UDim2.fromScale(0.5, 0.5)}
			Size={Size ?? UDim2.fromScale(0.193, 0.37)}
			BackgroundTransparency={BackgroundTransparency ?? 0}
			BorderSizePixel={0}
			Event={{
				MouseButton1Click: Clicked,
			}}
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

type ITextInput = BaseProps<TextBox> & { setText?: (text: string) => void };

export function TextInput({
	Name,
	Position,
	Size,
	Text,
	PlaceholderText,
	TextColor3,
	ClearTextOnFocus,
	setText,
}: ITextInput) {
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
				Change={{
					Text: (rbx) => {
						if (setText) setText(rbx.Text);
					},
				}}
				ClearTextOnFocus={ClearTextOnFocus ?? false}
			/>
		</Frame>
	);
}
