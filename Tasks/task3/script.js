'use strict';
const container = document.querySelector('.container');
const eliminateDefault = document.querySelector('.left');
const btnCreate = document.querySelector('.create');
const overlay = document.querySelector('.overlay');
let form = document.querySelector('.formclass');
//fetch data
let usersData;
const getPostData = function () {
  fetch(' http://localhost:3000/posts')
    .then(response => response.json())
    .then(function (json) {
      //console.log(json);

      return render(json);
    });
};
getPostData();

fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(function(json){
    return toStoreUserData(json);
  });
const toStoreUserData = function(names){
  usersData=names;
  //console.log(usersData)
};
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
      
      openDetails(btnclick[i], data[i]);
    });
  }
};
//display details of title

const openDetails = function (btn, input) {
  let details = `
       <div  id="contactForm" class="formclass">
       <form>
       <span onclick="document.querySelector('.formclass').style.display='none'" 
       class="close">&times;</span>

      <b><i><label>${input.title}</label></i></b> </br></br>
       <label>${input.body}</label> </form></br></br>
       <label class="username"></label>
      </div>`;
  container.insertAdjacentHTML('afterbegin', details);
  form = document.querySelector('.formclass');
  fetch(`http://localhost:3000/users/${input.userId}`)
    .then(function (users) {
      return users.json();
    })
    .then(function (users) {
      const username = document.querySelector(".username");
      username.innerHTML = `<b>Username: </b>${users.username}`;
    })
  
};

//update UI
const updateUI = function () {
  fetch(' http://localhost:3000/posts')
    .then(response => response.json())
    .then(function (json) {
      return render(json);
    });
};
let selectOptions;
//create new resources
btnCreate.addEventListener('click', function (e) {
  e.preventDefault();
  onclick="selectOptions()";
  
//in HtML add restrictions title-100char body-300char maxlength
  let addTitles = `
  <div class="outerborder">

  <form class="formforcreate">
  <span onclick="document.querySelector('.outerborder').style.display='none'" 
  class="close" title="Close Modal">&times;</span>
  <label for="userId">userId</label></br>
  <select id="enter_userId" onClick="selectOptions(usersData);"></select>
    </br>
  <label for="title">Title</label>
  <input type="text" id="title" class="enter_title" placeholder="Enter Title" maxlength="100" required>
    <p style="color:red; font-size:13px">* Title should be less than 100 charcters</p>
    <label for="body">Body</label>
    <input type="text" id="body" class="enter_body" placeholder="Enter Body" maxlength="300" required>
    <p style="color:red; font-size:13px">* Body should be less than 300 charcters</p>

  
  <button class="add-button"> Add </but8ton>
  </form>
    </div>
  `;
  let count=0;
  selectOptions = (usersData) => {
    if(count==0){
      for(let i=0;i<usersData.length;i++){
        //console.log(p[i]);
        let option = usersData[i].username;
        let element = document.createElement("option");
        element.textContent = option;
        element.value= usersData[i].id;
        document.getElementById("enter_userId").appendChild(element);
      }
      count=count+1;
    }
  }
  container.insertAdjacentHTML('afterbegin', addTitles);
  //let createform = document.querySelector('.formforcreate');
  let form_userId = document.getElementById('enter_userId')
  //console.log(form_userId);
  let form_title = document.querySelector('.enter_title');
  let form_body = document.querySelector('.enter_body');
  let btncloseCreate = document.querySelector('.close-create');
  let btnAddcreate = document.querySelector('.add-button');
  btnAddcreate.addEventListener('click', function (e) {
    e.preventDefault();
    //empty fields are not allowed
    const formUserId=form_userId.value;
    const formTitle=form_title.value;
    const formBody=form_body.value;
  
   if(!(formUserId && formTitle && formBody)){
     alert('Fill all the fields');
   }
  
    if (formUserId && formTitle && formBody) {
      console.log("inside loop");
      fetch(' http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: form_title.value,
          body: form_body.value,
          userId: form_userId.value,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(json => console.log(json));
    }
    updateUI();
  });
  //close the create form

});

