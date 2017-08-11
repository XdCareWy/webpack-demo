import _ from 'lodash';
import printMe from './print.js';
import style from './style.css';
import less from './demo.less';
import image from './7.jpg';
import app from './app.jsx';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  var img = new Image();
  img.width = 100;
  img.src = image;

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check1 this console';
  btn.onclick = printMe;

  element.appendChild(btn);
  element.appendChild(img);


  return element;
}

document.body.appendChild(component());