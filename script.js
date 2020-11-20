const bookingApp = {};
bookingApp.zomatoURL = 'https://developers.zomato.com/api/v2.1/search';

// cities.......

bookingApp.cities = {
    toronto: 89,
    vancouver: 256,
    calgary: 300,
    montreal: 294,
    ottawa: 295
};
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
};
bookingApp.cuisineLabel = [
    $('[for="indian"]'),
    $('[for="pizza"]'),
    $('[for="chinese"]'),
    $('[for="sushi"]'),
    $('[for="middleEastern"]'),
    $('[for="desserts"]'),
    $('[for="bubbleTea"]'),
    $('[for="other"]'),
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
    $('[for="dineIn"]'),
    $('[for="delivery"]'),
    $('[for="takeout"]'),

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
bookingApp.recommendationDisplay = $('.recommendationDisplay');
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

bookingApp.getUserSelections = function() {
  bookingApp.select(bookingApp.citiesSelection, 'cities', bookingApp.cityLabel, bookingApp.cityCheckbox);
  bookingApp.select(bookingApp.cuisineSelection, 'cuisine', bookingApp.cuisineLabel, bookingApp.cuisineCheckbox);
  bookingApp.select(bookingApp.preferencesSelection, 'preferences', bookingApp.preferenceLabel, bookingApp.preferenceCheckbox);
}

bookingApp.handleButton = function(button, start) {
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
        console.log(start);
        start += 9;
        bookingApp.getRecommendation(bookingApp.citiesId, bookingApp.cuisineId, bookingApp.preferencesId, start);
    });
}


bookingApp.getRecommendation = function (selectedCityId, selectedCuisineId, selectedCategoryId, start){
    $.ajax({
        url: bookingApp.zomatoURL,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: '51229140792268d47f96f56aabbde055',
            count: 9,
            start: start,
            entity_id: selectedCityId,
            entity_type: 'city',
            cuisines: selectedCuisineId,
            category: selectedCategoryId
        }
    }).then(function (recommendationResponse) {
          bookingApp.processRecommendation(recommendationResponse.restaurants);
    })
};

// location, currency, featured image, name, zomato url, userRatings.aggregate_rating

bookingApp.processRecommendation = function(recommendations) {
    recommendations.forEach( (value) => {
        const restaurant = value.restaurant;
        const location = [restaurant.location.address, restaurant.location.city, restaurant.location.zipcode];
        const currency = restaurant.currency;
        const image = restaurant.thumb;
        const name = restaurant.name ;
        const url = restaurant.url ;
        const userRatings = restaurant.user_rating.aggregate_rating;
        bookingApp.appendImage(bookingApp.recommendationDisplay, image, name, url);
    });
}

bookingApp.appendImage = function(display, image, name, url) {
    display.append(`
        <li>
            <img src="${image}" alt="Featured image for ${name} restaurant from Zomato"/>
            <a href="${url}">${name}</a>
        </li>
    `)
}

bookingApp.init = function() {
    bookingApp.getUserSelections();
    bookingApp.handleButton(bookingApp.submitButton, 0);
}

$(document).ready(() => {
    bookingApp.init();
});



bookingApp.animations = {};
bookingApp.animations.canvas;
bookingApp.animations.elements = [];
bookingApp.animations.createCanvas = function() {
    $('body').append(`
        <div class="animationCanvas">
        </div> <!-- closing animationCanvas -->
    `);
    bookingApp.animations.canvas = $('.animationCanvas');
}
bookingApp.animations.appendElement = function(element) {
    bookingApp.animations.canvas.append(element);
}
bookingApp.animations.elements = function(...elements) {
    bookingApp.animations.elements = elements.map( (value) => {
        return `<img scr="./assets/${value}.png" alt="picture of ${value} id="${value}"/>`;
    });
}
bookingApp.animations.animate = function(element) {
    element.animate({
        'transform': `rotate()`
    })
}