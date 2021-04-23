'use strict';
const buttons = document.querySelectorAll('.btn');
let x, y;
function numbers() {
  x = Number(document.querySelector('.n1').value);
  y = Number(document.querySelector('.n2').value);
}
document.querySelector('.equal').addEventListener('click', function () {
  numbers();
  console.log(x, y);
  document.querySelector('.result').textContent = x + y;
});
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    numbers();
    if (buttons[i].value === '*') {
      document.querySelector('.change').textContent = '*';
      document.querySelector('.equal').addEventListener('click', function () {
        document.querySelector('.result').textContent = x * y;
      });
    } else if (buttons[i].value === '-') {
      document.querySelector('.change').textContent = '-';
      document.querySelector('.equal').addEventListener('click', function () {
        document.querySelector('.result').textContent = x - y;
      });
    } else if (buttons[i].value === '/') {
      document.querySelector('.change').textContent = '/';
      document.querySelector('.equal').addEventListener('click', function () {
        document.querySelector('.result').textContent = x / y;
      });
    } else {
      buttons[i].value === '+';
      document.querySelector('.change').textContent = '+';
      document.querySelector('.equal').addEventListener('click', function () {
        document.querySelector('.result').textContent = x + y;
      });
    }
  });
}
