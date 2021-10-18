import "./styles/style.scss";
import Icon from "./assets/momnkid.png";
import printMe from "./print";
import _ from "lodash";

export default function Home() {
	const element = document.createElement("h1");
	element.innerHTML = _.join(["Hello", "webpack"], " ");
	return element;
}

function AddImage() {
	// Add the image to our existing div.
	const myIcon = new Image();
	myIcon.src = Icon;
	return myIcon;
}

function AddBttn() {
	const bttn = document.createElement("button");
	bttn.innerHTML = "Click me";
	bttn.onclick = printMe;
	return bttn;
}

document.body.appendChild(Home());
document.body.appendChild(AddImage());
document.body.appendChild(AddBttn());
