import _ from 'lodash';
import printMe from './print.js';
import './style.css';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check this console';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

var element = component();
document.body.appendChild(element);

if(module.hot) {
	module.hot.accept('./print.js', function() {
		console.log('Accepting the updated printMe module!');
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
	})
}