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
    $('[for="toronto"] h2'),
    $('[for="vancouver"] h2'),
    $('[for="calgary"] h2'),
    $('[for="ottawa"] h2'),
    $('[for="montreal"] h2'),
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
};


bookingApp.cuisineLabel = [
    $('[for="indian"] h2'),
    $('[for="pizza"] h2'),
    $('[for="chinese"] h2'),
    $('[for="sushi"] h2'),
    $('[for="middleEastern"] h2'),
    $('[for="desserts"] h2'),
    $('[for="bubbleTea"] h2'),
    $('[for="other"] h2'),
];

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
};

bookingApp.preferenceLabel = [
    $('[for="dineIn"] h2'),
    $('[for="delivery"] h2'),
    $('[for="takeout"] h2'),

];

bookingApp.preferenceCheckbox=[
    $('#dineIn'),
    $('#delivery'),
    $('#takeout'),
];


bookingApp.citiesSelection = $('.cities');
bookingApp.cuisineSelection = $('.cuisine');
bookingApp.preferencesSelection = $('.preferences');
bookingApp.submitButton = $('.submit');
bookingApp.citiesId;
bookingApp.cuisineId;
bookingApp.preferencesId;
bookingApp.heading = $('h2');
bookingApp.staticDiv = $('.options')
bookingApp.slidingDiv = $('.recommendation')
bookingApp.recommendationDisplay = $('.recommendation ul');
bookingApp.information;



bookingApp.slidingDiv.hide();



bookingApp.resetStyles = function(element){
    element.css({
        'background-color': 'transparent',
        'opacity': 1,
        'border-radius': '0',
        'box-shadow': '0px 0px transparent'
    })
};

bookingApp.highlightStyles = function (element, shadowColor) {
    element.css({
        'background-color': '#E5989B',
        'opacity': 0.7,
        'border-radius': '15px',
        'box-shadow': '5px 5px '+ shadowColor
    })
};

// styling function when the screen splits in half: 
// width1:50vw for bigger screens, 0 for smaller
// width2: 50vw - 30px for bigger screens and 100vw for smaller
bookingApp.splitScreen = function(value1, width1, fontSize, width2){
    bookingApp.staticDiv.css({
        'display': value1,
        'width': width1,
    })
    bookingApp.heading.css({
        'font-size': fontSize
    })
    bookingApp.slidingDiv.animate({
        'width': 'calc(' +width2+ ' - 30px)',
        'opacity': 'show'
    }, 500)
}


// selection:cities, selectionLabel: bookingApp.citySelection , selectionCheckbox: bookingApp.cityCheckbox
bookingApp.select = function(jquery, selection, selectionLabel, selectionCheckbox ){
    jquery.on('click', "label", function () {
        const selected = $(this).attr("for");
        selectionLabel.forEach(function (value, index) {
            // console.log(value[0].parentNode.htmlFor);

            if (value[0].parentNode.htmlFor !== selected) {
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
                if (selection === 'cities') {
                    bookingApp.highlightStyles(selectionLabel[index], '#6D6875')
                }
                else {
                    bookingApp.highlightStyles(selectionLabel[index], '#500808')
                }
            }
        });
        bookingApp.checkSelection(selection, selectionCheckbox);
        // console.log(`${selection} ID is ${bookingApp[`${selection}Id`]}`);
    });
};



// Selection method for cities, cuisine, preference.........
bookingApp.select(bookingApp.citiesSelection, 'cities', bookingApp.cityLabel, bookingApp.cityCheckbox);
bookingApp.select(bookingApp.cuisineSelection, 'cuisine', bookingApp.cuisineLabel, bookingApp.cuisineCheckbox);
bookingApp.select(bookingApp.preferencesSelection, 'preferences', bookingApp.preferenceLabel, bookingApp.preferenceCheckbox);


// check if the selection is selected, if not then give an error to the user........
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
};


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

        // display: if else statement for media query: make it in a function and call it here
        if ($(window).width() > 890){
            bookingApp.splitScreen('grid', '50vw', '1.7rem', '50vw');
            bookingApp.getRecommendation(bookingApp.citiesId, bookingApp.cuisineId, bookingApp.preferencesId, 9);
        }
        else {
            console.log('small screen');
            bookingApp.splitScreen('none', '0', '2rem', '100vw');
            bookingApp.getRecommendation(bookingApp.citiesId, bookingApp.cuisineId, bookingApp.preferencesId, 8);
        }
        
    });
};


// calling function for the API for the restaurance....
bookingApp.getRecommendation = function (selectedCityId, selectedCuisineId, selectedCategoryId, count){
    $.ajax({
        url: bookingApp.zomatoURL,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: '51229140792268d47f96f56aabbde055',
            count: count,
            entity_id: selectedCityId,
            entity_type: 'city',
            cuisines: selectedCuisineId,
            category: selectedCategoryId
        }
    }).then(function (recommendationResponse) {
          bookingApp.processRecommendation(recommendationResponse.restaurants);
    })
};

// Function to get the location, currency, featured image, name, zomato url, userRatings.aggregate_rating.....

bookingApp.processRecommendation = function(recommendations) {
    recommendations.forEach( (value) => {
        const restaurant = value.restaurant;
        const location = [restaurant.location.address, restaurant.location.city, restaurant.location.zipcode];
        const currency = restaurant.currency;
        // console.log(currency);
        let image = restaurant.thumb;
        // console.log(image);
        const name = restaurant.name ;
        const url = restaurant.url ;
        const userRatings = restaurant.user_rating.aggregate_rating;
        
        image = bookingApp.defaultImage(image);
        bookingApp.appendImage(bookingApp.recommendationDisplay, image, name, url, currency, userRatings, location); 
        bookingApp.information = $('.information');
        

    });
    bookingApp.showInfo(); 
}

bookingApp.defaultImage = function(image){
    if (image === ""){
        return `assets/id${bookingApp.cuisineId}.jpg`;
    } else {
        return image;
    }
}

// element1: .recommendation ul , elelemnt 2: div.information....... 
bookingApp.showInfo = function () {
    bookingApp.recommendationDisplay.on('click', 'li', function() {
        $($(this)[0].childNodes[7]).toggleClass('hiddenInfo');
    });
}


// to display the image..........
bookingApp.appendImage = function(display, image, name, url, currency, userRatings, location) {
    display.append(`
        <li>
            <img src="${image}" alt="Featured image for ${name} restaurant from Zomato"/>
            <i class="fas fa-info-circle"></i>
            <a href="${url}">${name}</a>
            <div class="information hiddenInfo">
                <p><i class="fas fa-utensils"></i>Currency: ${currency}</p>
                <p><i class="fas fa-utensils"></i>Ratings: ${userRatings}</p>
            </div>
        </li>
    `)
}
// 
// // <p><i class="fas fa-utensils"></i>Location: ${location}</p>
// init function to call the api function........
bookingApp.init = function() {
    bookingApp.handleButton(bookingApp.submitButton);
    
}


// calling the API function once the document loads.......
$(document).ready(() => {
    bookingApp.init();
});

// create an array for the cuisines , cities, prefer.
//forEach loop so it selects only one value for each and stores it in the selected variable

// Need a method to call the getRecommendation which will take city id as an argument

    

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
