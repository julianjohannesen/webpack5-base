import "./style.css";

export default function Home() {
	const element = document.createElement("div");

	element.innerHTML = "Hello webpack";

	return element;
}

document.body.appendChild(Home());