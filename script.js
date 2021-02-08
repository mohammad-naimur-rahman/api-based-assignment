const showFood = () => {
    const searchInput = document.getElementById('searchInput').value;
    const foodItems = document.getElementById('food-items');
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(res => res.json())
        .then(data => {
            data.meals.forEach(foodItem => {
                const foodBox = document.createElement('div');
                foodBox.className = 'food-box';
                const thumb = foodItem.strMealThumb;
                const foodName = foodItem.strMeal;
                foodBox.innerHTML = `
                    <div class = "details" onclick="showDetails('${foodName}')">
                        <div class="food-icon">
                            <img src="${thumb}" alt="">
                        </div>
                        <h5 class="food-name">${foodName}</h5>
                    </div>
                `;
                foodItems.appendChild(foodBox);
            });
        })
        .catch(err => alert('Please give a valid name'));
}

const showDetails = name => {
    const detailsContainer = document.getElementById('details');
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data => {
            const item = data.meals[0];
            detailsContainer.innerHTML = `
            <div class = "detail-modal">
                <p class = "detail-back" onclick="hideDetails()">&larr; Back to main page </p>
                <div class="detail-img-container">
                    <img class="detail-img" src="${item.strMealThumb}" alt="">
                </div>
                <div class="detail-des">
                    <h2 class="detail-heading">${item.strMeal}</h2>
                    <h5 class="detail-heading-2">Ingredients</h5>
                    <ul class="detail-ul">
                        ${generateIngredients(item)}
                    </ul>
                </div>
            </div>
            `
        })
}

const btn = document.getElementById('basic-addon2');
btn.addEventListener('click', showFood);

const hideDetails = () => {
    document.querySelector('.detail-modal').style.display = 'none';
}

const generateIngredients = item => {
    let ingredientList = ``;
    for (const ingredient in item) {
        if (ingredient.includes('strIngredient') && item[ingredient] != '' && item[ingredient] != null) {
            const li = `<li>${item[ingredient]}</li>`;
            ingredientList += li;
        }
    }
    return ingredientList;
}