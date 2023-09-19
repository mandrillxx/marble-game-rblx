import Roact from "@rbxts/roact";
import { Canvas } from "../library/canvas";
import { Container } from "../library/container";
import { Modal } from "../library/modal";
import { Button, Text, TextInput } from "../library";
import { Black, Blue, DarkOrange, Green, Orange } from "../library/gradients";

export function Codes() {
	return (
		<Canvas AspectRatio={1.779}>
			<Container>
				<Modal Image="rbxassetid://14800615603" Color={Black} RingColor={DarkOrange}>
					<Text
						Text={`Follow <font color="#12dbfe">@sunbear_studio</font> on Twitter for Exclusive Codes and Sneak Peeks!`}
						RichText={true}
						Position={UDim2.fromScale(0.5, 0.352)}
						Size={UDim2.fromScale(0.713, 0.307)}
					/>
					<TextInput
						PlaceholderText="Enter code here..."
						Position={UDim2.fromScale(0.5, 0.62)}
						Size={UDim2.fromScale(0.452, 0.114)}
					/>
					<Button Position={UDim2.fromScale(0.5, 0.789)} ButtonText="Claim!" />
				</Modal>
			</Container>
		</Canvas>
	);
}
