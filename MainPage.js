async function populateCatalog() {
  
    let container = document.getElementById('container');
    cocktailsList = JSON.parse(localStorage.getItem("cocktailsList"));
    if (cocktailsList == null) {
      cocktailsList = new_cocktails()
    }
    // localStorage.clear();

    let catalog = document.createElement("ul");
    catalog.classList.add('cocktails');
    
    
    for (let cocktail of cocktailsList) {
      
      let name = document.createElement("h2");
      name.textContent = cocktail.name;

      let link = document.createElement("a");
      link.classList.add('cocktail');
      // link.setAttribute('href', './CocktailPage.html');
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
  cocktailsList.push(cocktail)

  
  cocktail = new Cocktail("Cuppucino by Vit", "Vit", "Very good nononono good good good good good goodgoodgoodgoodgoodgoodgoodgoodgoodgood good", ingredientsList, 1);
  cocktailsList.push(cocktail)

  localStorage.setItem("cocktailsList", JSON.stringify(cocktailsList));
  // localStorage.setItem("cocktailsList", JSON.stringify(ingredientsList));

  return cocktailsList
}

function goToCocktail(id) {
  console.log(id)
  localStorage.setItem("current_id", JSON.stringify(id));
}




populateCatalog();
auth()