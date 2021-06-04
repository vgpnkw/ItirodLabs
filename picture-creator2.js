function getIngredientStyleString(value) {
    return `clip-path: polygon(0 ${value}%, 100% ${value}%, 100% 100%, 0% 100%);
    -webkit-clip-path: polygon(0 ${value}%, 100% ${value}%, 100% 100%, 0% 100%);`;
  }
  
  function createCoffeeImageDiv(cocktail , yes) {
    let coffeeImageDiv = document.createElement("div");
    coffeeImageDiv.classList.add('cocktail-photo');
  
    let coffeeImage = document.createElement("img");
    coffeeImage.setAttribute('src', "glass.png");
    coffeeImage.setAttribute('alt', "");

    coffeeImageDiv.appendChild(coffeeImage);

    let sumOfValues = 0;
    for (let ingredient of cocktail.ingredients) {
      sumOfValues += ingredient.value;
    }
  
    for (let ingredient of cocktail.ingredients) {
      let ingredientDiv = document.createElement("div");
      if(screen.width <=500 && yes)
      { ingredientDiv.classList.add('cocktail-ingredient2')}
      else{ ingredientDiv.classList.add('cocktail-ingredient');}
     
      ingredientDiv.classList.add(ingredient.name);
      ingredientDiv.setAttribute('style', getIngredientStyleString(100 - sumOfValues | 0));
      sumOfValues -= ingredient.value;
      coffeeImageDiv.appendChild(ingredientDiv);
    }
  
    return coffeeImageDiv;
  }
  