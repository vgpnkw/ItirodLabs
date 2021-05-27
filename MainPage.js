async function populateCatalog() {
  // let search_value = JSON.parse(localStorage.getItem("search_value"))
  // console.log("search_value ----",search_value)
  let container = document.getElementById('container');
  cocktailsList = JSON.parse(localStorage.getItem("cocktailsList"));
  if (cocktailsList == null) {
    cocktailsList = new_cocktails()
  }
  localStorage.setItem("cocktailsList", JSON.stringify(cocktailsList));
  // localStorage.clear();



  fill_search_data()
  let search_cocktailsList = []
  search_cocktailsList = JSON.parse(localStorage.getItem("search_cocktailsList"))
  let search_value = JSON.parse(localStorage.getItem("search_value"))
  let fill_search = document.getElementById("search")
  if(search_value !== ""){
      fill_search.placeholder = ":" + search_value
  }else {
      fill_search.placeholder = "Search page"
  }




  let catalog = document.createElement("ul");
  catalog.classList.add('cocktails');


  for (let cocktail of search_cocktailsList) {
    
    let name = document.createElement("h2");
    name.textContent = cocktail.name;

    let link = document.createElement("a");
    link.classList.add('cocktail');
    // link.setAttribute('href', './CocktailPage.html');

    let ratingDiv = document.createElement("div")
    ratingDiv.classList.add('rating-result');
   
    
    for(let i = 0; i<5; i++)
    {
      let span = document.createElement("span");
      if(i < cocktail.rating) span.classList.add('active');
      ratingDiv.appendChild(span);
    }
    
    
    link.appendChild(ratingDiv)
    link.appendChild(name)
    link.prepend(createCoffeeImageDiv(cocktail));
    link.setAttribute("cocktail_id", cocktail.id)
    link.href="CocktailPage.html"
    link.onclick = function(){goToCocktail(link.getAttribute("cocktail_id").valueOf())}


    
    

    let li = document.createElement("li");
    li.classList.add('cocktail-wrapper');
    li.appendChild(link)

    catalog.appendChild(li);
  }
  container.appendChild(catalog);
  console.log(cocktailsList)


}



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

function new_cocktails() {
  let users = []
  localStorage.setItem("search_value", JSON.stringify(""));
  let user = new User(0, "gapa", "gapa", "gapa");

  users.push(user)
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("current_user", JSON.stringify("none"));

  let ingredientsList = [];
  let cocktailsList = [];

  let ingredient = new Ingredient("milk", 33);
  ingredientsList.push(ingredient);
  ingredient = new Ingredient("ice_cream", 33);
  ingredientsList.push(ingredient);
  ingredient = new Ingredient("pena", 33);
  ingredientsList.push(ingredient);
  localStorage.setItem("ingredientsList", JSON.stringify(ingredientsList));


  let cocktail = new Cocktail("Cuppucino", "Gapankow", "Very good good good good good good goodgoodgoodgoodgoodgoodgoodgoodgoodgood good", ingredientsList, 0);
  cocktail.rating = 3
  cocktailsList.push(cocktail)

  
  cocktail = new Cocktail("Cuppucino by Vit", "Vit", "Very good nononono good good good good good goodgoodgoodgoodgoodgoodgoodgoodgoodgood good", ingredientsList, 1);
  cocktail.rating = 1
  cocktailsList.push(cocktail)

  // localStorage.setItem("cocktailsList", JSON.stringify(cocktailsList));
  // localStorage.setItem("cocktailsList", JSON.stringify(ingredientsList));

  return cocktailsList
}

function goToCocktail(id) {
  console.log(id)
  localStorage.setItem("current_id", JSON.stringify(id));
}


function searching(a){
  let text = document.getElementById("search").value.toLowerCase()
  if(a === 1){
      localStorage.setItem("search_value", JSON.stringify(""));

  }else {
      localStorage.setItem("search_value", JSON.stringify(text));

  }
  console.log(text)
  fill_search_data()
}

function fill_search_data(){
  let text = JSON.parse(localStorage.getItem("search_value"))
  let cocktailsList = JSON.parse(localStorage.getItem("cocktailsList"))
  let search_cocktailsList = []
  for(let cocktail of cocktailsList){
      let name = cocktail.name.toLowerCase()
      if (name.includes(text)){
        search_cocktailsList.push(cocktail)
          console.log(cocktail)
      }
  }
  localStorage.setItem("search_cocktailsList", JSON.stringify(search_cocktailsList));
  console.log("text",text)
}


populateCatalog();
auth()