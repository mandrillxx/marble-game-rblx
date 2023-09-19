import { Corner, Gradient, ImageButton, ImageLabel, ListLayout, Text } from "./library";
import { Black, Blue, DarkOrange, Orange, Purple, Red, Silver } from "./library/gradients";
import { SetModalContext } from "./context/modal";
import { Modal as IModal } from "./modals";
import { useContext } from "@rbxts/roact";
import { Container } from "./library/container";
import { Ring } from "./library/modal";
import Roact from "@rbxts/roact";

type IHUDButton = { Modal: IModal; Color: ColorSequence; Image: string };

function HUDButton({ Modal, Color, Image }: IHUDButton) {
	const setOpenModal = useContext(SetModalContext);

	return (
		<ImageButton
			Name={Modal}
			Size={UDim2.fromScale(0.249, 0.802)}
			AspectRatio={1}
			Clicked={() => setOpenModal(Modal)}
		>
			<Container
				Name="Main"
				Position={UDim2.fromScale(0.5, 0.5)}
				Size={UDim2.fromScale(1, 1)}
				BackgroundTransparency={0}
			>
				<Corner CornerRadius={new UDim(1, 0)} />
				<Gradient Color={Black} />
				<Ring
					Color={Color}
					Size={UDim2.fromScale(0.882, 0.882)}
					AspectRatio={1}
					Image="rbxassetid://14799933945"
				/>
				<ImageLabel Size={UDim2.fromScale(0.676, 0.676)} Image={Image} />
				<Text Text={Modal} Position={UDim2.fromScale(0.5, 0.895)} Size={UDim2.fromScale(0.992, 0.256)} />
			</Container>
		</ImageButton>
	);
}

function LeftContainer() {
	return (
		<Container
			Name="LeftContainer"
			AspectRatio={0.692}
			Position={UDim2.fromScale(0.1, 0.5)}
			Size={UDim2.fromScale(0.178, 0.458)}
		>
			<Container
				Name="Main"
				AspectRatio={1.819}
				Position={UDim2.fromScale(0.5, 0.81)}
				Size={UDim2.fromScale(1, 0.381)}
			>
				<ListLayout
					HorizontalAlignment={Enum.HorizontalAlignment.Left}
					VerticalAlignment={Enum.VerticalAlignment.Top}
				/>
				<Container Name="Top" AspectRatio={3.6} Size={UDim2.fromScale(1, 0.505)}>
					<ListLayout Padding={new UDim(0.05, 0)} FillDirection={Enum.FillDirection.Horizontal} />
					<HUDButton Modal="Crafting" Image="rbxassetid://14801566329" Color={Orange} />
					<HUDButton Modal="Codes" Image="rbxassetid://14801568938" Color={Blue} />
					<HUDButton Modal="Settings" Image="rbxassetid://14801559699" Color={Silver} />
				</Container>
				<Container Name="Bottom" AspectRatio={3.6} Size={UDim2.fromScale(1, 0.505)}>
					<ListLayout Padding={new UDim(0.05, 0)} FillDirection={Enum.FillDirection.Horizontal} />
					<HUDButton Modal="Shop" Image="rbxassetid://14801541220" Color={Red} />
					<HUDButton Modal="Inventory" Image="rbxassetid://14801547648" Color={Purple} />
					<HUDButton Modal="Quests" Image="rbxassetid://14801560104" Color={DarkOrange} />
				</Container>
			</Container>
		</Container>
	);
}

export function HUD() {
	return (
		<Container AspectRatio={1.781} Size={UDim2.fromScale(1, 1)}>
			<LeftContainer />
		</Container>
	);
}
