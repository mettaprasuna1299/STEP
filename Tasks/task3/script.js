'use strict';
const container = document.querySelector('.container');
const eliminateDefault = document.querySelector('.left');
const btnCreate = document.querySelector('.create');
const overlay = document.querySelector('.overlay');
let form = document.querySelector('.formclass');

const values = function () {
  fetch('db.json')
    .then(response => response.json())
    .then(function (json) {
      // console.log(json.posts);
      return render(json.posts);
    });
};
values();
const render = function (data) {
  let id = new Set();
  for (const i in data) {
    id.add(data[i].userId);
  }
  console.log(id);
  container.innerHTML = '';
  for (const [i, posts] of data.entries()) {
    let html = `<div class="left">
<button class="title">${posts.title}</button>
</div>`;
    container.insertAdjacentHTML('beforeend', html);
  }
  let btnclick = document.querySelectorAll('.title');
  for (let i = 0; i < btnclick.length; i++) {
    btnclick[i].addEventListener('click', function (e) {
      e.preventDefault();
      // console.log(btnclick[i]);
      // console.log('haaaaaa');

      openDetails(btnclick[i], data[i]);
      form.style.display = 'block';
    });
  }
};

const openDetails = function (btn, input) {
  let details = `
      <div class="formclass">
      <div id="contactForm">
            <form>
            <b>UserID:</b><label>${input.userId}</label> </br>
            <b>ID:</b><label>${input.id}</label> </br>
            <b>Title:</b><label>${input.title}</label> </br>
            <b>Body:</b><label>${input.body}</label> </br></form>
            <div class="close">
            <button class="close-button">close </button>
             </div>
      </div>
      </div>`;
  container.insertAdjacentHTML('afterbegin', details);
  form = document.querySelector('.formclass');
  let closebtn = document.querySelectorAll('.close-button');
  // console.log(form);
  for (let i = 0; i < closebtn.length; i++) {
    closebtn[i].addEventListener('click', function (e) {
      e.preventDefault();
      form.style.display = 'none';
    });
  }
};

btnCreate.addEventListener('click', function (e) {
  e.preventDefault();
  let addTitles = `<div class="adding">
  <form class="form">
  <label for="title">Title</label>
    <input type="text" id="title" name="enter_title" placeholder="Enter title">

    <label for="body">body</label>
    <input type="text" id="body" name="enterbody" placeholder="Enter Body">
  </form>
  <div class="closecreate">
  <button class="close-button">close </button>
   </div>
    </div>
  `;
  container.insertAdjacentHTML('afterbegin', addTitles);

  let btncloseCreate = document.querySelector('.closecreate');
  let createform = document.querySelector('.adding');
  btncloseCreate.addEventListener('click', function (e) {
    e.preventDefault();
    createform.style.display = 'none';
  });
});
