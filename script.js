const bookingApp = {};
bookingApp.zomatoURL = 'https://developers.zomato.com/api/v2.1/search';

bookingApp.cities ={
    toronto: 89,
    vancouver: 256,
    calgary: 300,
    montreal: 294,
    ottawa: 295
}
bookingApp.cuisinesAvailable ={
    indian: 148,
    pizza: 82,
    chinese: 25,
    sushi: 177,
    middleEastern: 137,
    desserts: 100,
    bubbleTea: 247,
    other: 381 
    // canadian cuisine id for other
}
bookingApp.categories ={
    dineIn: 2,
    delivery: 1,
    takeout: 5
}
// const selections = [];
// console.log(selections);

bookingApp.getRecommendation = function (selectedCityId,selectedCuisineId, selectedCategoryId){
    $.ajax({
        url: bookingApp.zomatoURL,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: '51229140792268d47f96f56aabbde055',
            entity_id: selectedCityId,
            entity_type: 'city',
            cuisines: selectedCuisineId,
            category: selectedCategoryId
        }
    }).then(function (recommendationResponse) {
        console.log(recommendationResponse);
    })
};


// Need a method to call the getRecommendation which will take city id as an argument

    // create a method to hold an event listenere which will listen for everytime the user selects a new city from the selections

$('.cities').on('click', "label", function(){
    const selectedCity = $(this).attr("for");
    const cityId = bookingApp.cities[selectedCity]; 
    console.log(cityId);
    // selections.push(cityId); 
    // gives the city_id  
    // To use: this calls the function for he selected city ID: bookingApp.getRecommendation(cityId);
})

$('.cuisine').on('click', "label", function () {
    const selectedCuisine = $(this).attr("for");
    const cuisineId = bookingApp.cuisinesAvailable[selectedCuisine];
    console.log(cuisineId);
    // selections.push(cuisineId);
    // gives the city_id  
    // To use: this calls the function for he selected city ID: bookingApp.getRecommendation(cityId);
})

$('.preferences').on('click', "label", function () {
    const selectedCategory = $(this).attr("for");
    const categoryId = bookingApp.categories[selectedCategory];
    console.log(categoryId);
    // selections.push(cuisineId);
    // gives the city_id  
    // To use: this calls the function for he selected city ID: bookingApp.getRecommendation(cityId);
})








// MVP: Ask the users to select the city, Cuisine type, Dine-in/takeout/delivery and based on the selection we provide the recommendations and details for the restaurant including the rating, location etc.

// create a namespace
// declare varibales for the selection parameters listed above
// call the API
    // callback function for API to show the results using the variables stored earlier
// create an array to store the results of the API call
// display the results in grid, link the images with details/information 


// STRETCH:

// While displaying the results, give the user an option to reserve a table using the calendar function for a particular date,time, no. of guests  
// Check the weather for the day when we display the calendar (cloudy/rainy/sunny/snowy day)
// Create an alert email/sends an alert notification, ex: 2 Days before the reservation 
  $(document).ready(function() {


      $('button').on('click', function (e) {
          e.preventDefault();
          console.log("clicked");
          $('input').removeAttr('checked');
      });
  });