const bookingApp = {};
bookingApp.zomatoURL = 'https://developers.zomato.com/api/v2.1/search';

// cities.......

bookingApp.cities = {
    toronto: 89,
    vancouver: 256,
    calgary: 300,
    montreal: 294,
    ottawa: 295
}

bookingApp.cityLabel=[
    $('[for="toronto"]'),
    $('[for="vancouver"]'),
    $('[for="calgary"]'),
    $('[for="ottawa"]'),
    $('[for="montreal"]'),
];

bookingApp.cityCheckbox=[
    $('#toronto'),
    $('#vancouver'),
    $('#calgary'),
    $('#ottawa'),
    $('#montreal'),
];

// cuisine...........

bookingApp.cuisine = {
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


bookingApp.cuisineLabel = [
    $('[for="indian"]'),
    $('[for="pizza"]'),
    $('[for="chinese"]'),
    $('[for="sushi"]'),
    $('[for="middleEastern"]'),
    $('[for="desserts"]'),
    $('[for="bubbleTea"]'),
    $('[for="other"]'),
]

bookingApp.cuisineCheckbox=[
    $('#indian'),
    $('#pizza'),
    $('#chinese'),
    $('#sushi'),
    $('#middleEastern'),
    $('#desserts'),
    $('#bubbleTea'),
    $('#other'),
];



// Preferences........
bookingApp.preferences ={
    dineIn: 2,
    delivery: 1,
    takeout: 5
}
bookingApp.preferenceLabel = [
    $('[for="dineIn"]'),
    $('[for="delivery"]'),
    $('[for="takeout"]'),

]

bookingApp.preferenceCheckbox=[
    $('#dineIn'),
    $('#delivery'),
    $('#takeout'),
]
bookingApp.citiesSelection = $('.cities');
bookingApp.cuisineSelection = $('.cuisine');
bookingApp.preferencesSelection = $('.preferences');
bookingApp.submitButton = $('.submit');
bookingApp.citiesId;
bookingApp.cuisineId;
bookingApp.preferencesId;


bookingApp.resetStyles = function(element){
    element.css({
        'background-color': 'transparent',
        'opacity': 1,
        'border-radius': '0',
        'box-shadow': '0px 0px transparent'
    })
}

bookingApp.highlightStyles = function (element, shadowColor) {
    element.css({
        'background-color': '#E5989B',
        'opacity': 0.7,
        'border-radius': '15px',
        'box-shadow': '5px 5px '+ shadowColor
    })
}

// selection:cities, selectionLabel: bookingApp.citySelection , selectionCheckbox: bookingApp.cityCheckbox
bookingApp.select = function(jquery, selection, selectionLabel, selectionCheckbox ){
    jquery.on('click', "label", function () {
        const selected = $(this).attr("for");
        selectionLabel.forEach(function (value, index) {
            if (value[0].htmlFor !== selected) { 
                selectionCheckbox[index].attr('checked', false); 
                bookingApp.resetStyles(selectionLabel[index]);
            }
            else if (selectionCheckbox[index].attr('checked')) {
                selectionCheckbox[index].attr('checked', false);
                bookingApp.resetStyles(selectionLabel[index]);
            }
            else {
                selectionCheckbox[index].attr('checked', true);
                bookingApp[`${selection}Id`] = bookingApp[selection][selected];
                if (selection === 'cities'){
                    bookingApp.highlightStyles(selectionLabel[index], '#6D6875')
                }
                else{
                    bookingApp.highlightStyles(selectionLabel[index], '#500808')
                }
            }
        });
        bookingApp.checkSelection(selection, selectionCheckbox);
        console.log(`${selection} ID is ${bookingApp[`${selection}Id`]}`)
    })
}

bookingApp.checkSelection = function(selection, selectionCheckbox) {
    let nothingSelected = true;
    selectionCheckbox.forEach ( function(value) {
        if (value.attr('checked')) {
            nothingSelected = false;
        }
    });
    if (nothingSelected) { 
        bookingApp[`${selection}Id`] = null;
    }
}

bookingApp.handleButton = function(button) {
    button.on('click', function() {
        if (!bookingApp.citiesId) {
            console.log('Please select a city');
        }
        if (!bookingApp.cuisineId) {
            console.log('Please select a cuisine');
        }
        if (!bookingApp.preferencesId) {
            console.log('Please select a preference');
        }
        bookingApp.getRecommendation(bookingApp.citiesId, bookingApp.cuisineId, bookingApp.preferencesId);
    });
}


bookingApp.getRecommendation = function (selectedCityId, selectedCuisineId, selectedCategoryId){
    $.ajax({
        url: bookingApp.zomatoURL,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: '51229140792268d47f96f56aabbde055',
            count: 9,
            entity_id: selectedCityId,
            entity_type: 'city',
            cuisines: selectedCuisineId,
            category: selectedCategoryId
        }
    }).then(function (recommendationResponse) {
          recommendationResponse.restaurants
    })
};

// location, currency, featured image, name, zomato url, userRatings.aggregate_rating

bookingApp.processRecommendation = function(recommendations) {
    recommendations.forEach( (value, index) => {
        const location = value.
    });
}

bookingApp.init = function() {
    bookingApp.handleButton(bookingApp.submitButton);
}

$(document).ready(() => {
    bookingApp.init();
});

// create an array for the cuisines , cities, prefer.
//forEach loop so it selects only one value for each and stores it in the selected variable

// Need a method to call the getRecommendation which will take city id as an argument
// $('button').on('click',function(){
    // console.log('clicked!');
    // create a method to hold an event listenere which will listen for everytime the user selects a new city from the selections
    // let cityId;

bookingApp.select(bookingApp.citiesSelection, 'cities', bookingApp.cityLabel, bookingApp.cityCheckbox);
   
bookingApp.select(bookingApp.cuisineSelection, 'cuisine', bookingApp.cuisineLabel, bookingApp.cuisineCheckbox);
bookingApp.select(bookingApp.preferencesSelection, 'preferences', bookingApp.preferenceLabel, bookingApp.preferenceCheckbox )

    // $('.cities').on('click', "label", function () {
        
        
    //     const selectedCity = $(this).attr("for");
    //     bookingApp.citySelection.forEach(function(value, index){
    //         console.log(index);
    //         console.log(bookingApp.cityCheckbox[0]);
    //         if(value[0].htmlFor !== selectedCity)
    //         {bookingApp.cityCheckbox[index].attr('checked',false)}
    //         else if(bookingApp.cityCheckbox[index].attr('checked')){
    //             bookingApp.cityCheckbox[index].attr('checked', false)
    //         }
    //         else{
    //                 bookingApp.cityCheckbox[index].attr('checked', true)
    //             }
    //         });
    //         cityId = bookingApp.cities[selectedCity];
    //         console.log(cityId); 
    // })
            
            // create a method to hold an event listenere which will listen for everytime the user selects a new city from the selections
        // let cuisineId;
        // $('.cuisine').on('click', "label", function () {
        //     // console.log(bookingApp.cuisineCheckbox);
        //     const selectedCuisine = $(this).attr("for");
        //     bookingApp.cuisineSelection.forEach(function(value,index){
        //         if(value[0].htmlFor !== selectedCuisine){
        //             bookingApp.cuisineCheckbox[index].attr('checked',false)
                   
        //             bookingApp.resetStyles(bookingApp.cuisineSelection[index])
        //         }
        //         else if (bookingApp.cuisineCheckbox[index].attr('checked')){
        //             bookingApp.cuisineCheckbox[index].attr('checked', false)
        //             bookingApp.resetStyles(bookingApp.cuisineSelection[index])

        //         }
        //         else{
        //             bookingApp.cuisineCheckbox[index].attr('checked', true)
        //             bookingApp.highlightStyles(bookingApp.cuisineSelection[index], '#E5989B', '#500808')
                   
        //         }
        //     });

        //     cuisineId = bookingApp.cuisinesAvailable[selectedCuisine];
        //     console.log(cuisineId);
        
        // })

    // create a method to hold an event listenere which will listen for everytime the user selects a new city from the selections
    // let categoryId;
    // $('.preferences').on('click', "label", function () {
    //     const selectedCategory = $(this).attr("for");
    //     categoryId = bookingApp.categories[selectedCategory];
    //     console.log(categoryId);
    //     // selections.push(cuisineId);
    //     // gives the city_id  
    //     // To use: this calls the function for he selected city ID: bookingApp.getRecommendation(cityId);
    // });

    // console.log(bookingApp.getRecommendation(cityId, cuisineId, categoryId));
    
// });
    








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

    //   $('.options').on('click','.submit', function (e) {
    //       e.preventDefault();
    //       console.log("clicked");
    //       const checkBox = $(this).find('.srOnly');
    //       checkBox.removeAttr('checked');
    //   });
  });