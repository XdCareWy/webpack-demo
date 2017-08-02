import _ from 'lodash';
import './style.css';
import Icon from './4.jpg';
import Data from './data.xml';
import dd from './data.json';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  var myIcon = new Image();
  myIcon.width = 100;
  myIcon.src = Icon;
  element.appendChild(myIcon);

  console.log(Data);
  console.log(dd);

  return element;
}

document.body.appendChild(component());