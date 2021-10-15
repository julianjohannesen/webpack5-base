import _ from "lodash";

export default function printMe() {
    const message = _.join(["I get called", "from print.js"], " ");
	console.log(message);
}
