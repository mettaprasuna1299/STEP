'use strict';
const container = document.querySelector('.container');
const eliminateDefault = document.querySelector('.left');
const btnCreate = document.querySelector('.create');
const overlay = document.querySelector('.overlay');
let form = document.querySelector('.formclass');

//fetch data
const values = function () {
  fetch(' http://localhost:3000/posts')
    .then(response => response.json())
    .then(function (json) {
      //console.log(json);

      return render(json);
    });
};
values();
const render = function (data) {
  container.innerHTML = '';
  //display titles- buttons
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
//display details of title

const openDetails = function (btn, input) {
  let details = `
      <div class="formclass">
      <div id="contactForm">
            <form>
            <b>UserID:</b><label>${input.userId}</label> </br>
            <b>ID:</b><label>${input.id}</label> </br>
            <b>Title:</b><label>${input.title}</label> </br>
            <b>Body:</b><label>${input.body}</label> </br></form>
            <button class="close-button">close </button>
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

//create new resources
btnCreate.addEventListener('click', function (e) {
  e.preventDefault();

  let addTitles = `
  <form class="formforcreate">
  <label for="userId">userId</label>
  <input type="number" id="userId" class="enter_userid" placeholder="Enter number between 1-10">
  <label for="title">Title</label>
    <input type="text" id="title" class="enter_title" placeholder="Enter title">
    <label for="body">body</label>
    <input type="text" id="body" class="enter_body" placeholder="Enter Body">
  <button class="close-create">close </button>
  <button class="add-button"> Add </button>
    </form>
  `;

  container.insertAdjacentHTML('afterbegin', addTitles);
  let createform = document.querySelector('.formforcreate');
  let form_userId = document.querySelector('.enter_userid');
  let form_title = document.querySelector('.enter_title');
  let form_body = document.querySelector('.enter_body');
  let btncloseCreate = document.querySelector('.close-create');
  let btnAddcreate = document.querySelector('.add-button');
  btnAddcreate.addEventListener('click', function (e) {
    e.preventDefault();
    const posts = fetch(' http://localhost:3000/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: form_title.value,
        body: form_body.value,
        userId: Number(form_userId.value),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => console.log(json));
  });
  //close the create form
  btncloseCreate.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('hi');
    createform.style.display = 'none';
  });
});

