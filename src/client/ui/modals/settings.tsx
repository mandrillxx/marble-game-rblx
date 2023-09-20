import { AspectRatio, Button, Corner, Gradient, ListLayout, Padding, ScrollingFrame, Text } from "../library";
import { Black, DarkOrange, Green, Red, Silver } from "../library/gradients";
import { Modal, Ring } from "../library/modal";
import { Container } from "../library/container";
import { Canvas } from "../library/canvas";
import { IModal } from ".";
import Roact, { useState } from "@rbxts/roact";

type SettingToggleType = "boolean" | "slider" | "button";

type SettingValue = boolean | number;
type SettingCallback = (value: SettingValue) => void;

type IToggle = {
	value: SettingValue;
	callback: SettingCallback;
};

type ISettingsToggle<T extends SettingToggleType> = {
	toggleType: T;
	buttonText?: string;
} & IToggle;

function SettingToggle<T extends SettingToggleType>({ buttonText, toggleType, value, callback }: ISettingsToggle<T>) {
	const [settingValue, setSettingValue] = useState(value);

	return (
		<>
			{toggleType === "boolean" && (
				<Button
					Position={UDim2.fromScale(0.769, 0.5)}
					ButtonText={settingValue === true ? "On" : "Off"}
					Color={settingValue ? Green : Red}
					Clicked={() => setSettingValue(!settingValue)}
				/>
			)}
			{toggleType === "button" && (
				<Button
					Position={UDim2.fromScale(0.769, 0.5)}
					ButtonText={buttonText ?? "Submit"}
					Color={DarkOrange}
					Clicked={() => callback(0)}
				/>
			)}
			{toggleType === "slider" && <Button ButtonText="3" />}
		</>
	);
}

type ISetting<T extends SettingToggleType> = {
	Title: string;
	toggleType: T;
	buttonText?: string;
} & IToggle;

function Setting<T extends SettingToggleType>({ Title, toggleType, value, buttonText, callback }: ISetting<T>) {
	return (
		<frame key={Title} Size={UDim2.fromScale(1, 0.304)}>
			<AspectRatio AspectRatio={7.23} />
			<Corner CornerRadius={new UDim(0.1, 0)} />
			<Gradient Color={Black} />
			<Ring Color={Silver} Image="rbxassetid://14801012296" Size={UDim2.fromScale(1, 1)} />
			<Text Text={Title} Position={UDim2.fromScale(0.196, 0.494)} Size={UDim2.fromScale(0.292, 0.435)} />
			<SettingToggle buttonText={buttonText} toggleType={toggleType} callback={callback} value={value} />
		</frame>
	);
}

export function Settings({ Visible }: IModal) {
	return (
		<Canvas AspectRatio={1.779} Visible={Visible}>
			<Container Size={UDim2.fromScale(0.479, 0.491)} AspectRatio={1.734}>
				<Modal Name="Settings" Image="rbxassetid://14800615603" Color={Black} RingColor={Silver}>
					<ScrollingFrame
						AspectRatio={2.195}
						Position={UDim2.fromScale(0.5, 0.534)}
						Size={UDim2.fromScale(0.847, 0.697)}
					>
						<Padding left={0.03} right={0.05} top={0.01} />
						<ListLayout
							HorizontalAlignment={Enum.HorizontalAlignment.Left}
							Padding={new UDim(0.015, 0)}
							VerticalAlignment={Enum.VerticalAlignment.Top}
						/>
						<Setting
							Title="Auto Rebirth"
							toggleType="boolean"
							value={true}
							callback={() => print("Auto Rebirth")}
						/>
						<Setting
							Title="Reset"
							toggleType="button"
							value={0}
							buttonText="Reset"
							callback={() => print("Auto Rebirth")}
						/>
					</ScrollingFrame>
				</Modal>
			</Container>
		</Canvas>
	);
}
