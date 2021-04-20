'use strict';
const buttons = document.querySelectorAll('.btn');
document.querySelector('.equal').addEventListener('click', function () {
  let x = Number(document.querySelector('.n1').value);
  let y = Number(document.querySelector('.n2').value);
  document.querySelector('.result').textContent = x + y;
});
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    let x = Number(document.querySelector('.n1').value);
    let y = Number(document.querySelector('.n2').value);
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
