const bookingApp = {};
bookingApp.zomatoSearch = 'https://developers.zomato.com/api/v2.1/search';
bookingApp.zomatoCuisines = 'https://developers.zomato.com/api/v2.1/cuisines?city_id=295';
bookingApp.cuisineArray;
bookingApp.cities = {
    'Vancouver': 37,
    'Toronto': 89,
    'Montreal': 294,
    'Calgary': 300,
    'Ottawa': 295
}

bookingApp.getCuisineID = function(city) {
    $.ajax({
        url: bookingApp.zomatoCuisines,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: '51229140792268d47f96f56aabbde055',
            city_id: city
        }
    }).then( (zomato) => {
        bookingApp.cuisineArray = zomato;
        console.log(bookingApp.cuisineArray)
    }).fail( (err) => console.log(err) );
}


bookingApp.getZomato = function(city) {
    $.ajax({
        url: bookingApp.zomatoSearch,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: '51229140792268d47f96f56aabbde055',
            city_id: city,
            // cuisines: 25,
            // count: 15
        }
    }).then( (zomato) => {
        console.log(zomato);
    }).fail( (err) => console.log(err) );
}

$(document).ready(() => {
    bookingApp.getCuisineID(89)
});

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

const cuisines = {
    "cuisines": [
      {
        "cuisine": {
          "cuisine_id": 1035,
          "cuisine_name": "Afghan"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 6,
          "cuisine_name": "Afghani"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 152,
          "cuisine_name": "African"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 1,
          "cuisine_name": "American"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 4,
          "cuisine_name": "Arabian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 151,
          "cuisine_name": "Argentine"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 175,
          "cuisine_name": "Armenian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 3,
          "cuisine_name": "Asian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 401,
          "cuisine_name": "Asian Fusion"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 131,
          "cuisine_name": "Australian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 201,
          "cuisine_name": "Austrian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 193,
          "cuisine_name": "BBQ"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 955,
          "cuisine_name": "Bagels"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 5,
          "cuisine_name": "Bakery"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 145,
          "cuisine_name": "Bangladeshi"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 227,
          "cuisine_name": "Bar Food"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 132,
          "cuisine_name": "Belgian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 270,
          "cuisine_name": "Beverages"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 195,
          "cuisine_name": "Brasserie"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 159,
          "cuisine_name": "Brazilian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 182,
          "cuisine_name": "Breakfast"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 133,
          "cuisine_name": "British"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 247,
          "cuisine_name": "Bubble Tea"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 168,
          "cuisine_name": "Burger"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 22,
          "cuisine_name": "Burmese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 30,
          "cuisine_name": "Cafe"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 491,
          "cuisine_name": "Cajun"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 956,
          "cuisine_name": "California"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 111,
          "cuisine_name": "Cambodian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 381,
          "cuisine_name": "Canadian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 121,
          "cuisine_name": "Cantonese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 158,
          "cuisine_name": "Caribbean"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 202,
          "cuisine_name": "Central Asian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 25,
          "cuisine_name": "Chinese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 161,
          "cuisine_name": "Coffee and Tea"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 287,
          "cuisine_name": "Colombian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 35,
          "cuisine_name": "Continental"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 881,
          "cuisine_name": "Crepes"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 153,
          "cuisine_name": "Cuban"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 192,
          "cuisine_name": "Deli"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 100,
          "cuisine_name": "Desserts"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 411,
          "cuisine_name": "Dim Sum"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 541,
          "cuisine_name": "Diner"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 959,
          "cuisine_name": "Donuts"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 268,
          "cuisine_name": "Drinks Only"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 651,
          "cuisine_name": "Eastern European"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 146,
          "cuisine_name": "Egyptian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 149,
          "cuisine_name": "Ethiopian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 38,
          "cuisine_name": "European"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 40,
          "cuisine_name": "Fast Food"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 112,
          "cuisine_name": "Filipino"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 271,
          "cuisine_name": "Finger Food"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 421,
          "cuisine_name": "First Nations"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 298,
          "cuisine_name": "Fish and Chips"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 45,
          "cuisine_name": "French"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 501,
          "cuisine_name": "Frozen Yogurt"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 274,
          "cuisine_name": "Fusion"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 205,
          "cuisine_name": "Georgian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 134,
          "cuisine_name": "German"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 156,
          "cuisine_name": "Greek"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 181,
          "cuisine_name": "Grill"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 431,
          "cuisine_name": "Guyanese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 441,
          "cuisine_name": "Hakka Chinese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 521,
          "cuisine_name": "Hawaiian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 143,
          "cuisine_name": "Healthy Food"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 791,
          "cuisine_name": "Hong Kong Style"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 228,
          "cuisine_name": "Hungarian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 233,
          "cuisine_name": "Ice Cream"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 148,
          "cuisine_name": "Indian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 114,
          "cuisine_name": "Indonesian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 154,
          "cuisine_name": "International"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 140,
          "cuisine_name": "Iranian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 135,
          "cuisine_name": "Irish"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 218,
          "cuisine_name": "Israeli"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 55,
          "cuisine_name": "Italian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 207,
          "cuisine_name": "Jamaican"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 60,
          "cuisine_name": "Japanese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 265,
          "cuisine_name": "Jewish"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 164,
          "cuisine_name": "Juices"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 178,
          "cuisine_name": "Kebab"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 67,
          "cuisine_name": "Korean"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 136,
          "cuisine_name": "Latin American"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 66,
          "cuisine_name": "Lebanese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 69,
          "cuisine_name": "Malaysian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 70,
          "cuisine_name": "Mediterranean"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 73,
          "cuisine_name": "Mexican"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 137,
          "cuisine_name": "Middle Eastern"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 294,
          "cuisine_name": "Modern European"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 591,
          "cuisine_name": "Moldovan"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 74,
          "cuisine_name": "Mongolian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 147,
          "cuisine_name": "Moroccan"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 117,
          "cuisine_name": "Nepalese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 995,
          "cuisine_name": "New Mexican"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 296,
          "cuisine_name": "Nigerian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 50,
          "cuisine_name": "North Indian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 861,
          "cuisine_name": "Northern Chinese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 278,
          "cuisine_name": "Oriental"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 963,
          "cuisine_name": "Pacific Northwest"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 139,
          "cuisine_name": "Pakistani"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 209,
          "cuisine_name": "Pan Asian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 183,
          "cuisine_name": "Patisserie"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 81,
          "cuisine_name": "Persian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 162,
          "cuisine_name": "Peruvian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 82,
          "cuisine_name": "Pizza"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 219,
          "cuisine_name": "Polish"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 87,
          "cuisine_name": "Portuguese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 983,
          "cuisine_name": "Pub Food"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 511,
          "cuisine_name": "Quebecois"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 320,
          "cuisine_name": "Ramen"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 84,
          "cuisine_name": "Russian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 998,
          "cuisine_name": "Salad"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 601,
          "cuisine_name": "Salvadorean"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 304,
          "cuisine_name": "Sandwich"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 210,
          "cuisine_name": "Scottish"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 83,
          "cuisine_name": "Seafood"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 831,
          "cuisine_name": "Shanghai"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 128,
          "cuisine_name": "Sichuan"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 119,
          "cuisine_name": "Singaporean"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 611,
          "cuisine_name": "Somali"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 461,
          "cuisine_name": "Soul Food"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 85,
          "cuisine_name": "South Indian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 471,
          "cuisine_name": "Southern"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 966,
          "cuisine_name": "Southwestern"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 89,
          "cuisine_name": "Spanish"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 86,
          "cuisine_name": "Sri Lankan"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 141,
          "cuisine_name": "Steak"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 177,
          "cuisine_name": "Sushi"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 211,
          "cuisine_name": "Swedish"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 213,
          "cuisine_name": "Swiss"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 212,
          "cuisine_name": "Syrian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 190,
          "cuisine_name": "Taiwanese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 621,
          "cuisine_name": "Tanzanian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 179,
          "cuisine_name": "Tapas"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 163,
          "cuisine_name": "Tea"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 150,
          "cuisine_name": "Tex-Mex"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 95,
          "cuisine_name": "Thai"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 93,
          "cuisine_name": "Tibetan"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 631,
          "cuisine_name": "Trinbagonian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 142,
          "cuisine_name": "Turkish"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 451,
          "cuisine_name": "Ukrainian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 308,
          "cuisine_name": "Vegetarian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 641,
          "cuisine_name": "Venezuelan"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 99,
          "cuisine_name": "Vietnamese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 531,
          "cuisine_name": "West Indian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 851,
          "cuisine_name": "Xinjiang"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 841,
          "cuisine_name": "Yunnan"
        }
      }
    ]
}

