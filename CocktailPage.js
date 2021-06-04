let cock_rating;
function setRating(button) {
  cock_rating = button.value;
  
}
async function startSettingInfo(id) {

  cocktailsList = JSON.parse(localStorage.getItem("cocktailsList"));
  ingredientsList = JSON.parse(localStorage.getItem("ingredientsList"));


  if (cocktailsList == null) {
    alert("Пустой списко коктейлей" + `${cocktailsList}`)
    return;
  }
  console.log("cocktailsList---",cocktailsList)
  console.log("ingredientsList---",ingredientsList)
  setInfo(cocktailsList[id]);


}

function setInfo(cocktail) {
  let pictureInfoDiv = document.querySelector('.col-1-3');
  pictureInfoDiv.prepend(createCoffeeImageDiv(cocktail, true));
  
  createCoffeeTitle(cocktail)
  createCoffeeDescription(cocktail)
  createCoffeeAuthor(cocktail)
  
  populateIngredients(cocktail);

  populateComments(cocktail);
  createCoffeeRating(cocktail)
}

function populateIngredients(cocktail) {

  let ingredientsList = document.getElementById("reciepe");
  
  for (let ingredient of cocktail.ingredients) {
    let ingredientItem = document.createElement("li");
    ingredientItem.classList.add('ingredient');

    let ingredientValue = document.createElement("span");
    ingredientValue.classList.add('ingedient-value');
    ingredientValue.textContent = `${ingredient.value}% `;

    let ingredientName = document.createElement("span");
    ingredientName.classList.add('ingedient-name');
    ingredientName.textContent = ingredient.name.toUpperCase();

    ingredientItem.appendChild(ingredientValue);
    ingredientItem.appendChild(ingredientName);
    ingredientsList.prepend(ingredientItem);
  }
}

function populateComments(cocktail) {
 
  let commentsList = document.querySelector('.comments');
  commentsList.innerHTML = ``;
  for (let comment of Object.values(cocktail.comments)) {
    let commentItem = document.createElement("li");
    commentItem.classList.add('comment');

    let commentAuthor = document.createElement("h2");
   
    let time = document.createElement("time");
    time.setAttribute('datetime', comment.date);
    time.textContent = comment.date;

    commentAuthor.textContent = comment.author + ":";

    let commentText = document.createElement("p");
    commentText.textContent = comment.text;

  
    commentItem.appendChild(commentAuthor)
    commentItem.appendChild(commentText)

    commentsList.appendChild(commentItem)

  }
  
}

function createCoffeeRating(cocktail) {
  let cocktailRating = document.getElementsByName("rating");
  cocktailRating[5 - cocktail.rating].checked = true;
  return cocktailRating;
}

function createCoffeeTitle(cocktail) {
  let cocktailName = document.getElementById("cocktail_name");
  cocktailName.textContent = cocktail.name.toUpperCase();
  return cocktailName;
}
function createCoffeeDescription(cocktail) {
  let cocktailName = document.getElementById("cocktail_decription");
  cocktailName.textContent = cocktail.description;
  return cocktailName;
}
function createCoffeeAuthor(cocktail) {
  let cocktailName = document.getElementById("added_by");
  cocktailName.textContent ="Added by: " + cocktail.addedBy;
  return cocktailName;
}


async function leaveComment() {

  let user = JSON.parse(localStorage.getItem("current_user")) || "guest"
  let input = document.getElementById('comment-input');
  let text = input.value;

  if (text.trim() == "") {
    return;
  }
  input.value = "";
  let comment = new Comment(user, text);
  let id = JSON.parse(localStorage.getItem("current_id"))
  cocktailsList = JSON.parse(localStorage.getItem("cocktailsList"));
  cocktailsList[id].comments.push(comment)
  localStorage.setItem("cocktailsList", JSON.stringify(cocktailsList));
  console.log(comment.author, comment.text)
  populateComments(cocktailsList[id]);
}

async function removeCocktail() {
  let id = JSON.parse(localStorage.getItem("current_id"))
  cocktailsList = JSON.parse(localStorage.getItem("cocktailsList"));
  cocktailsList.splice(id, 1);
  localStorage.setItem("cocktailsList", JSON.stringify(cocktailsList));
  window.location.href = "index.html"
}


async function saveRating() {
  let id = JSON.parse(localStorage.getItem("current_id"))
  cocktailsList = JSON.parse(localStorage.getItem("cocktailsList"));
  if(cock_rating > 0){
    cocktailsList[id].rating = cock_rating
  } else {
    cocktailsList[id].rating = 1
  }
  
  localStorage.setItem("cocktailsList", JSON.stringify(cocktailsList));
  window.location.href = "index.html"
}

let id = JSON.parse(localStorage.getItem("current_id"))
console.log(id)

function auth(){
  nav = document.getElementById("main_nav")
  let user = JSON.parse(localStorage.getItem("current_user"))

  if(user === "none") {

    let a = document.createElement("a")
    a.textContent = "Login"
    a.href = "LoginPage.html"
    a.className = "nav__link"
    nav.appendChild(a)
    a = document.createElement("a")
    a.textContent = "Register"
    a.href = "RegisterPage.html"
    a.className = "nav__link"
    nav.appendChild(a)

  } else {

      let a = document.createElement("a")
      a.textContent = "Hello " + `${user}`
      a.style.color = "black"
       a.href = "index.html"
       a.className = "nav__link"
      nav.appendChild(a)
      a = document.createElement("a")
      a.textContent = "Logout"
      a.href = "index.html"
      a.className = "nav__link"
      a.onclick = logout
      nav.appendChild(a)

  }
}
function logout(){
  localStorage.setItem("current_user", JSON.stringify("none"));
}
auth()
startSettingInfo(id);
