import { Button, Text, TextInput } from "../library";
import { Black, DarkOrange } from "../library/gradients";
import { Container } from "../library/container";
import { Canvas } from "../library/canvas";
import { IModal } from ".";
import { Modal } from "../library/modal";
import Roact, { useState } from "@rbxts/roact";

export function Codes({ Visible }: IModal) {
	const [code, setCode] = useState("");

	return (
		<Canvas AspectRatio={1.779} Visible={Visible}>
			<Container Size={UDim2.fromScale(0.479, 0.491)} AspectRatio={1.734}>
				<Modal Name="Codes" Image="rbxassetid://14800615603" Color={Black} RingColor={DarkOrange}>
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
						setText={setCode}
					/>
					<Button
						Position={UDim2.fromScale(0.5, 0.789)}
						ButtonText="Claim!"
						Clicked={() => print(`Code: ${code}`)}
					/>
				</Modal>
			</Container>
		</Canvas>
	);
}
