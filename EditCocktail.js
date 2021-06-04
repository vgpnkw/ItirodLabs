let rating
function setRating(button) {
  rating = button.value;
  
}




function more() {
  let ingredientListItem =
  `<select class="main__link" name="ingredients-select" onchange="changeImage()">
      <option value="ice_cream">Мороженное</option>
      <option value="big_milk">Сливки</option>
      <option value="ice">Лёд</option>
      <option value="milk">Молоко</option>
      <option value="pena">Пенка</option>
  </select>
  <input id="input"  class="main__link" type="number" name="ingredient-value" value="" placeholder="%" oninput="changeImage();" required>
  <input id="remove" class="main__link" type="button" value="Less..." onclick="removeIngredient()">
  `

  const maxIngredientsCount = 4;
  let items = document.getElementsByClassName('comment');

  if (items.length == maxIngredientsCount - 1) {
    let addButton = document.getElementById('button');
    addButton.style.display = 'none';
  }
  
  let ingredientsList = document.querySelector(".comments");
  let ingredientItem = document.createElement('li');
  ingredientItem.classList.add('comment');
  ingredientItem.innerHTML = ingredientListItem;
  ingredientsList.appendChild(ingredientItem);
  console.log(items.length)
}

function removeIngredient() {
  const maxIngredientsCount = 4;
  let items = document.getElementsByClassName('comment');
  items[items.length-1].remove()
  if (items.length < maxIngredientsCount) {
    let addButton = document.getElementById('button');
    addButton.style.display = 'inline-block';
  }
  changeImage();
}


function changeImage() {
  let ingredientDivs = document.getElementsByClassName('cocktail-ingredient');
  while (ingredientDivs.length != 0) {
    ingredientDivs[0].parentNode.removeChild(ingredientDivs[0]);
  }

  let ingredientsSelects = document.getElementsByName('ingredients-select');
  let ingredientsValues = document.getElementsByName('ingredient-value');

  let ingredientsCount = ingredientsSelects.length;
  let sumOfValues = 0;
  for (let value of ingredientsValues) {
    sumOfValues += +value.value;
  }

  const maxSumOfValues = 100;
  if (sumOfValues > maxSumOfValues) {
    return;
  }


  if (sumOfValues <= 100 && sumOfValues >= 0) {
    let coffeeImageDiv = document.querySelector('.cocktail-photo');
    for (let i = ingredientsCount - 1; i >= 0; i--) {
      let value = ingredientsValues[i].value;
      if (value != "") {
        let ingredientDiv = document.createElement("div");
       if(screen.width <=500 )
      { ingredientDiv.classList.add('cocktail-ingredient2')}
      else{ ingredientDiv.classList.add('cocktail-ingredient');}
      
        ingredientDiv.classList.add(ingredientsSelects[i].options[ingredientsSelects[i].selectedIndex].value);
        ingredientDiv.setAttribute('style', getIngredientStyleString(100 - sumOfValues | 0));
        sumOfValues -= value;
        coffeeImageDiv.appendChild(ingredientDiv);
      }
    }
  }
}

async function submitForm() {
  let name = document.getElementById('name_input').value;
  let description = document.getElementById('discr_input').value;
  let user = JSON.parse(localStorage.getItem("current_user")) || "guest"
  name = name.trim().toLowerCase();

  let isInputValid = await validateInput(name, description);
  if (!isInputValid) {
    return;
  }
  
  // let ingredientsList = [];
  // let cocktailsList = [];

  let ingredientsSelects = document.getElementsByName('ingredients-select');
  let ingredientsValues = document.getElementsByName('ingredient-value');

  let sumOfValues = 0;
  for (let value of ingredientsValues) {
    sumOfValues += +value.value;
  }

  if (sumOfValues < 95 || sumOfValues > 100) {
    console.log(sumOfValues)
    alert('Sum of ingredients should be сlose to 100');
    return;
  }

  for (let i = ingredientsSelects.length - 1; i >= 0; i--) {
    let name = ingredientsSelects[i].options[ingredientsSelects[i].selectedIndex].value;
    let value = +ingredientsValues[i].value;
    let ingredient = new Ingredient(name, value);
    ingredientsList.push(ingredient);
  }
  cocktailsList = JSON.parse(localStorage.getItem("cocktailsList"));
  let id = cocktailsList[cocktailsList.length - 1].id + 1 || 0
  let cocktail = new Cocktail(name.trim().toLowerCase(), user, description, ingredientsList, id);
  cocktail.rating = rating
  cocktailsList.push(cocktail)

  localStorage.setItem("cocktailsList", JSON.stringify(cocktailsList));
  localStorage.setItem("ingredientsList", JSON.stringify(ingredientsList));
  window.location.href = "index.html"
}

async function validateInput(name, description) {
  if (name == "" || description == "") {
    return false;
  }

  if (name.length < 3) {
    alert('Name length should be at least 3 symbols.');
    return false;
  }

  return true;
  
}


