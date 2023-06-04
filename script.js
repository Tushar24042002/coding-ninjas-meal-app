// it makes a favourites meal array if its not exist in local storage
if (localStorage.getItem("favouritesList") == null) {
    localStorage.setItem("favouritesList", JSON.stringify([]));
}

// it fetches meals from api and return it
async function fetchMealsFromApi(url, value) {
    const response = await fetch(`${url + value}`);
    const meals = await response.json();
    return meals;
}



function homePage(){
    html = `
    <div class="page-wrap d-flex flex-row align-items-center mt-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center">
                    <span class="display-2 d-block">Hello user</span>
                    <div class="mb-4 lead ">
                       <h4> Welcome to our Mini Meal World</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    document.getElementById("main").innerHTML = html;
}
homePage();




// it show's all meals card in main acording to search input value
function showMealList() {
    let inputValue = document.getElementById("my-search").value;
    document.getElementById("search-word").innerText = inputValue;
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let html = "";
    let meals = fetchMealsFromApi(url, inputValue);
    meals.then((data) => {
        if (data.meals) {
            data.meals.forEach((element) => {
                let isFav = false;
                for (let index = 0; index < arr.length; index++) {
                    if (arr[index] == element.idMeal) {
                        isFav = true;
                    }
                }
                if (isFav) {
                    html += `
                    <div class="col-lg-3 col-md-4 col-12">
                    <div id="foodli${element.idMeal}" class="foodbox card mb-3">
                    <div class="food-img"> 
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    </div>
               
                <div class="card-body px-0 pb-2">
                    <h5 class="card-title">${element.strMeal}</h5>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                    <div class="category"><i class="fa-regular fa-fork-knife"></i> ${element.strCategory}</div>
                    <div class="category"><i class="fa-sharp fa-solid fa-location-dot"></i> ${element.strArea}</div>

                    </div>
                    <div class="d-flex justify-content-between mt-3">
                        <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                        <button id="main${element.idMeal}" class="btn btn-outline-light fav-btn" onclick="addRemoveToFavList(${element.idMeal})"><i class="fa-solid fa-heart"></i></button>
                    </div>
                </div>
            </div>

                    </div>
                `;
                } else {
                    html += `
                    <div class="col-lg-3 col-md-4 col-12">
                    <div id="foodli${element.idMeal}" class="foodbox card mb-3" >
                    <div class="food-img"> 
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    </div>
               
                <div class="card-body px-0 pb-2">
                    <h5 class="card-title">${element.strMeal}</h5>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                    <div class="category"><i class="fa-regular fa-fork-knife"></i> ${element.strCategory}</div>
                    <div class="category"><i class="fa-sharp fa-solid fa-location-dot"></i> ${element.strArea}</div>

                    </div>
                    <div class="d-flex justify-content-between mt-3">
                        <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                        <button id="main${element.idMeal}" class="btn btn-outline-light fav-btn" onclick="addRemoveToFavList(${element.idMeal})"><i class="fa-solid fa-heart"></i></button>
                    </div>
                </div>
            </div>

                    </div>
              
                `;
                }
            });
        } else {
            html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                The meal you are looking for was not found.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        document.getElementById("main").innerHTML = html;
    });
}

//it  shows full meal details in main
async function showMealDetails(id) {
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html = "";
    await fetchMealsFromApi(url, id).then((data) => {
        let Totalingredients ="";
// ingredients
Totalingredients += data.meals[0].strIngredient1+ ` (${data.meals[0].strMeasure1})`+", " +data.meals[0].strIngredient2 + ` (${data.meals[0].strMeasure2})`+", "+data.meals[0].strIngredient3 + ` (${data.meals[0].strMeasure3})`+", "+data.meals[0].strIngredient4 + ` (${data.meals[0].strMeasure4})`+", "+data.meals[0].strIngredient5 + ` (${data.meals[0].strMeasure5})`+", "+data.meals[0].strIngredient6 + ` (${data.meals[0].strMeasure6})`+", "+data.meals[0].strIngredient7 + ` (${data.meals[0].strMeasure7})`+", "+data.meals[0].strIngredient8 + ` (${data.meals[0].strMeasure8})`+", "+data.meals[0].strIngredient9 + ` (${data.meals[0].strMeasure9})`+", "+data.meals[0].strIngredient10+` (${data.meals[0].strMeasure10})`+", "+data.meals[0].strIngredient11+` (${data.meals[0].strMeasure11})`+", " +data.meals[0].strIngredient12+` (${data.meals[0].strMeasure12})`+", "+data.meals[0].strIngredient13+` (${data.meals[0].strMeasure13})`+", "+data.meals[0].strIngredient14+` (${data.meals[0].strMeasure14})`+", "+data.meals[0].strIngredient15+` (${data.meals[0].strMeasure15})`+", "+data.meals[0].strIngredient16+` (${data.meals[0].strMeasure16})`+", "+data.meals[0].strIngredient17+` (${data.meals[0].strMeasure17})`+", "+data.meals[0].strIngredient18+` (${data.meals[0].strMeasure18})`+", "+data.meals[0].strIngredient19+` (${data.meals[0].strMeasure19})`+", "+data.meals[0].strIngredient20+` (${data.meals[0].strMeasure20})`;

var ingredientArr = Totalingredients.split(",");

var finalListIngredients = "";
for(let i =0; i< ingredientArr.length;i++){
if(!ingredientArr[i].includes("null") && ingredientArr[i].length > 6){
    finalListIngredients += ingredientArr[i];
}
if(i+1 < ingredientArr.length){
    if(!ingredientArr[i+1].includes("null") && ingredientArr[i+1].length > 6){
        finalListIngredients +=", ";
    }
}

}
// var ingredients = finalListIngredients.replace(/ /g, ', ');
// console.log();

        html += `
          <div id="meal-details" class="mb-5">
            <div id="meal-header" class="d-flex justify-content-around flex-wrap">
              <div id="meal-thumbail">
                <img class="mb-2" src="${data.meals[0].strMealThumb}" alt="" srcset="">
              </div>
              <div id="details">
                <h3>${data.meals[0].strMeal}</h3>
                <h6>Category : ${data.meals[0].strCategory}</h6>
                <h6>Area : ${data.meals[0].strArea}</h6>
              </div>
            </div>
            <div id="meal-ingredients" class="mt-3">
            <p><span>Ingredients : </span>${finalListIngredients}</p>
          </div>
          <hr/>
            <div id="meal-instruction" class="mt-3">
              <h5>Instruction :</h5>
              <p>${data.meals[0].strInstructions}</p>
            </div>
            <div class="text-center">
              <a href="${data.meals[0].strYoutube}" target="_blank" class="btn btn-outline-light mt-3">Watch Video</a>
            </div>
          </div>
        `;
    });
    document.getElementById("main").innerHTML = html;
}

// it shows all favourites meals in favourites body
async function showFavMealList() {
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html = "";
    if (arr.length == 0) {
        html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container" id="emptyfav">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                No meal added in your favourites list.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    } else {
        for (let index = 0; index < arr.length; index++) {
            await fetchMealsFromApi(url, arr[index]).then((data) => {
                html += `
                <div id="favLi${data.meals[0].idMeal}" class="foodbox card mb-3" style="width: 20rem;">
                <div class="food-img">
                    <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
                    </div>
                    <div class="card-body px-0">
                        <h5 class="card-title">${data.meals[0].strMeal}</h5>
                        <div class="d-flex align-items-center justify-content-between mt-2">
                    <div class="category"><i class="fa-regular fa-fork-knife"></i> ${data.meals[0].strCategory}</div>
                    <div class="category"><i class="fa-sharp fa-solid fa-location-dot"></i> ${data.meals[0].strArea}</div>

                    </div>
                        <div class="d-flex justify-content-between mt-3">
                            <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${data.meals[0].idMeal})">More Details</button>
                            <button id="main${data.meals[0].idMeal}" class="btn btn-outline-light fav-btn active" onclick="addRemoveToFavList(${data.meals[0].idMeal})" ><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
            });
        }
    }
    document.getElementById("favourites-body").innerHTML = html;
}
document.getElementById("addAlert").style.display = "none";
document.getElementById("removeAlert").style.display = "none";
//it adds and remove meals to favourites list
function addRemoveToFavList(id) {
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let contain = false;
    for (let index = 0; index < arr.length; index++) {
        if (id == arr[index]) {
            contain = true;
        }
    }
    if (contain) {
        let number = arr.indexOf(id);
        arr.splice(number, 1);
        document.getElementById("removeAlert").style.display = "block";
        setTimeout(offFavRemove, 2000);
        function offFavRemove(){
            document.getElementById("removeAlert").style.display = "none";
        }
        // alert("your meal removed from your favourites list");
    } else {
        arr.push(id);
        document.getElementById("addAlert").style.display = "block";
        setTimeout(offFav, 2000);
        function offFav(){
            document.getElementById("addAlert").style.display = "none";
        }
        // alert("your meal add your favourites list");
    }
    localStorage.setItem("favouritesList", JSON.stringify(arr));
    showMealList();
    showFavMealList();
}
