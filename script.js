const bookingApp = {}
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
    $('[for="toronto"] h3'),
    $('[for="vancouver"] h3'),
    $('[for="calgary"] h3'),
    $('[for="ottawa"] h3'),
    $('[for="montreal"] h3'),
]
bookingApp.cityCheckbox=[
    $('#toronto'),
    $('#vancouver'),
    $('#calgary'),
    $('#ottawa'),
    $('#montreal'),
]

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
    $('[for="indian"] h3'),
    $('[for="pizza"] h3'),
    $('[for="chinese"] h3'),
    $('[for="sushi"] h3'),
    $('[for="middleEastern"] h3'),
    $('[for="desserts"] h3'),
    $('[for="bubbleTea"] h3'),
    $('[for="other"] h3'),
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
]

// Preferences........
bookingApp.preferences ={
    dineIn: 2,
    delivery: 1,
    takeout: 5
}
bookingApp.preferenceLabel = [
    $('[for="dineIn"] h3'),
    $('[for="delivery"] h3'),
    $('[for="takeout"] h3'),

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
bookingApp.buttonClicked = false;
bookingApp.recommendationSection = $('.recommendation')
bookingApp.recommendationDisplay = $('.recommendationDisplay');
bookingApp.citiesId;
bookingApp.cuisineId;
bookingApp.preferencesId;

// to display recommendation...
bookingApp.staticDiv = $('.options');
bookingApp.slidingDiv = $('.recommendation');

bookingApp.slidingDiv.hide();


bookingApp.resetStyles = function(element){
    element.css({
        'background-color': 'transparent',
        'opacity': 1,
        'border-radius': '0',
        'box-shadow': '0px 0px transparent'
    });
}

bookingApp.highlightStyles = function (element, shadowColor) {
    element.css({
        'background-color': '#E5989B',
        'opacity': 0.7,
        'border-radius': '15px',
        'box-shadow': '5px 5px '+ shadowColor
    });
}

// selection:cities, selectionLabel: bookingApp.citySelection , selectionCheckbox: bookingApp.cityCheckbox
bookingApp.select = function(jquery, selection, selectionLabel, selectionCheckbox ){
    jquery.on('click', "label", function () {
        const selected = $(this).attr("for");
        selectionLabel.forEach(function (value, index) {
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
    });
}

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
}


bookingApp.getUserSelections = function() {
  bookingApp.select(bookingApp.citiesSelection, 'cities', bookingApp.cityLabel, bookingApp.cityCheckbox);
  bookingApp.select(bookingApp.cuisineSelection, 'cuisine', bookingApp.cuisineLabel, bookingApp.cuisineCheckbox);
  bookingApp.select(bookingApp.preferencesSelection, 'preferences', bookingApp.preferenceLabel, bookingApp.preferenceCheckbox);
}

bookingApp.handleButton = function(button, start) {
  
    button.on('click', function () {
      if (!bookingApp.buttonClicked) {
        if (!bookingApp.citiesId) {
          console.log('Please select a city');
        }
        if (!bookingApp.cuisineId) {
          console.log('Please select a cuisine');
        }
        if (!bookingApp.preferencesId) {
          console.log('Please select a preference');
        }
        if (bookingApp.citiesId && bookingApp.cuisineId && bookingApp.preferencesId) {
          bookingApp.buttonClicked = true;
          bookingApp.getRecommendation(bookingApp.citiesId, bookingApp.cuisineId, bookingApp.preferencesId, start);
          // Toggle on/off loading animation
          bookingApp.animations.handleAnimations();
          bookingApp.handleRecommendationScroll(bookingApp.recommendationSection, start);
          // display: if else statement for media query: make it in a function and call it here
          bookingApp.staticDiv.css({
            'width': '50vw'
          });
          bookingApp.slidingDiv.animate({
            'width': 'calc(50vw - 50px)',
            'opacity': 'show'
          }, 500);
        }
      }
    });
    
}

bookingApp.handleRecommendationScroll = function(recommendationSection, start) {
    recommendationSection.on('scroll', () => {
        if(recommendationSection[0].scrollTop + recommendationSection[0].clientHeight >= recommendationSection[0].scrollHeight) {
            start += 9;
            bookingApp.getRecommendation(bookingApp.citiesId, bookingApp.cuisineId, bookingApp.preferencesId, start);
        }
    });
    if (recommendationSection[0].scrollHeight === recommendationSection[0].clientHeight) {
        start += 9;
        bookingApp.getRecommendation(bookingApp.citiesId, bookingApp.cuisineId, bookingApp.preferencesId, start);
    }
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
    });
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

// to display the image..........
bookingApp.appendImage = function(display, image, name, url) {
    display.append(`
        <li>
            <img src="${image}" alt="Featured image for ${name} restaurant from Zomato"/>
            <a href="${url}">${name}</a>
        </li>
    `)
}


// init function to call the api function
bookingApp.init = function() {
    bookingApp.getUserSelections();
    bookingApp.handleButton(bookingApp.submitButton, 0);
}


// calling the API function once the document loads.......
$(document).ready(() => {
    bookingApp.init();
});


bookingApp.animations = {}
bookingApp.animations.timeout;
bookingApp.animations.handleAnimations = function() {
    if (!bookingApp.animations.isOn) {
      bookingApp.animations.init();
      bookingApp.animations.timeoutTransition(1200);
    } else {
      bookingApp.animations.reset();
    }
    bookingApp.animations.isOn = !bookingApp.animations.isOn;
}
bookingApp.animations.init = function() {
    bookingApp.animations.createCanvas(bookingApp.recommendationDisplay);
    bookingApp.animations.appendElements('tomato');
    bookingApp.recommendationSection.css({
        'overflow': 'hidden'
    });
    console.log(bookingApp.animations.animatedElements[0])
    bookingApp.animations.animatedElements[0].animate({
      'transform': 'rotate(0deg)',
      'opacity': '0'
    },{
      'duration': 1500,
      'step': function (now) {
        bookingApp.animations.animatedElements[0].css({
          'transform': `rotate(${now*300}deg)`
        });
      }
    })
}
bookingApp.animations.reset = function() {
    bookingApp.animations.eraseCanvas(bookingApp.animations.canvas);
}
bookingApp.animations.isOn = false;
bookingApp.animations.canvas;
bookingApp.animations.elements = [];
bookingApp.animations.createCanvas = function(parentElement) {
    parentElement.append(`
        <div class="animationCanvas">
        </div> <!-- closing animationCanvas -->
    `);
    bookingApp.animations.canvas = $('.animationCanvas');
}
bookingApp.animations.eraseCanvas = function(parentElement) {
    parentElement.html('');
}
bookingApp.animations.timeoutTransition = function(timeoutDuration) {
    bookingApp.animations.timeout = setTimeout(() => {
      bookingApp.recommendationSection.css({
        'overflow': 'scroll'
      });
      bookingApp.animations.canvas.animate({
        'width': '0',
        'height': '0',
        'top': '50%',
        'left': '50%'
      }, 700);
    }, timeoutDuration);
}
bookingApp.animations.appendElements = function(...elements) {
    bookingApp.animations.elements = elements.map( (value) => {
        return `<img src="./assets/${value}.png" alt="picture of ${value}" id="${value}">`;
    });
    bookingApp.animations.elements.forEach( (value) => {
        bookingApp.animations.canvas.append(value);
    });
    bookingApp.animations.animatedElements = elements.map( (value) => {
        return $(`img#${value}`);
    });
}
