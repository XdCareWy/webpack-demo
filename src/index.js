import _ from "lodash";

function component() {
	var element = document.createElement('div');
	element.innerHTML = _.join(['Hello', 'webpack'], '');
	var br = document.createElement('br');
	var button = document.createElement('button');
	button.innerHTML = "Click me and look at the console!";
	element.appendChild(br);
	element.appendChild(button);

	button.onclick = e => import(/* webpackChunkName: "print" */ './print.js').then(module => {
		var print = module.default;

		print();
	});
	return element;
}

document.body.appendChild(component());


