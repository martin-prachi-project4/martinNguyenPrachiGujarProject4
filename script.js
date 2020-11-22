const bookingApp = {}
bookingApp.zomatoURL = 'https://developers.zomato.com/api/v2.1/search';

// cities.......
bookingApp.cities = {
    toronto: 89,
    vancouver: 256,
    calgary: 300,
    montreal: 294,
    ottawa: 295
};
bookingApp.cityLabel = [
    $('[for="toronto"] h2'),
    $('[for="vancouver"] h2'),
    $('[for="calgary"] h2'),
    $('[for="ottawa"] h2'),
    $('[for="montreal"] h2'),
];
bookingApp.cityCheckbox = [
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

bookingApp.cuisineCheckbox = [
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
bookingApp.preferences = {
    dineIn: 2,
    delivery: 1,
    takeout: 5
};
bookingApp.preferenceLabel = [
    $('[for="dineIn"] h2'),
    $('[for="delivery"] h2'),
    $('[for="takeout"] h2'),

];
bookingApp.preferenceCheckbox = [
    $('#dineIn'),
    $('#delivery'),
    $('#takeout'),
]

bookingApp.citiesSelection = $('.cities');
bookingApp.cuisineSelection = $('.cuisine');
bookingApp.preferencesSelection = $('.preferences');
bookingApp.submissionSection = $('.submission');
bookingApp.submitButton = $('.submit');
bookingApp.buttonClicked = false;
bookingApp.recommendationSection = $('.recommendation')
bookingApp.staticDiv = $('.options');
bookingApp.heading = $('h2');
bookingApp.information;
bookingApp.citiesId;
bookingApp.cuisineId;
bookingApp.preferencesId;
bookingApp.resourceImage;
bookingApp.recommendationDisplay = $('.recommendation ul');
bookingApp.information;


bookingApp.getUserSelections = function () {
    bookingApp.select(bookingApp.citiesSelection, 'cities', bookingApp.cityLabel, bookingApp.cityCheckbox);
    bookingApp.select(bookingApp.cuisineSelection, 'cuisine', bookingApp.cuisineLabel, bookingApp.cuisineCheckbox);
    bookingApp.select(bookingApp.preferencesSelection, 'preferences', bookingApp.preferenceLabel, bookingApp.preferenceCheckbox);
}

// selection:cities, selectionLabel: bookingApp.citySelection , selectionCheckbox: bookingApp.cityCheckbox
bookingApp.select = function (jquery, selection, selectionLabel, selectionCheckbox) {
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
                    bookingApp.highlightStyles(selectionLabel[index], '#6D6875');
                }
                else {
                    bookingApp.highlightStyles(selectionLabel[index], '#500808');
                }
            }
        });
        bookingApp.checkSelection(selection, selectionCheckbox);
    });
}
bookingApp.resetStyles = function (element) {
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
        'box-shadow': '5px 5px ' + shadowColor
    });
}
// check if the selection is selected, if not then give an error to the user........
bookingApp.checkSelection = function (selection, selectionCheckbox) {
    let nothingSelected = true;
    selectionCheckbox.forEach(function (value) {
        if (value.attr('checked')) {
            nothingSelected = false;
        }
    });
    if (nothingSelected) {
        bookingApp[`${selection}Id`] = null;
    }
}

// Prevent default from form submission then handle click event from button.....
bookingApp.handleButton = function (form, button, start) {
    form.on('submit', (e) => {
        e.preventDefault();
    });
    button.on('click', function () {
        if (!bookingApp.buttonClicked) {
            bookingApp.displayErrorMessage(bookingApp.parseErrors(bookingApp.checkErrors()));
            
            if (bookingApp.citiesId && bookingApp.cuisineId && bookingApp.preferencesId) {
                bookingApp.buttonClicked = true;
                bookingApp.getRecommendation(bookingApp.citiesId, bookingApp.cuisineId, bookingApp.preferencesId, start);
                bookingApp.showInfo();
                // Toggle on/off loading animation
                bookingApp.animations.handleAnimations();
                bookingApp.handleRecommendationScroll(bookingApp.recommendationSection, start);
                // display: if else statement for media query: make it in a function and call it here
                if ($(window).width() > 890) {
                    bookingApp.splitScreen('grid', '50vw', '1.7rem', '50vw');
                }
                else {
                    bookingApp.splitScreen('none', '0', '2rem',  '100vw');
                }
            }
        } else {
            bookingApp.displayErrorMessage(bookingApp.parseErrors(bookingApp.checkErrors()));
            if (bookingApp.citiesId && bookingApp.cuisineId && bookingApp.preferencesId) {
                bookingApp.clearRecommendation();
                bookingApp.getRecommendation(bookingApp.citiesId, bookingApp.cuisineId, bookingApp.preferencesId, start);
                bookingApp.showInfo();
                // Toggle on/off loading animation
                bookingApp.animations.handleAnimations();
                bookingApp.handleRecommendationScroll(bookingApp.recommendationSection, start);
            }
        }
    })
}

// Hiding the recommendation Section before seletion.....
bookingApp.recommendationSection.hide();

// Function for the split screen to overlap for smaller screens and next to each other for the larger screen sizes.....
bookingApp.splitScreen = function (value1, width1, fontSize, width2) {
    bookingApp.staticDiv.css({
        'display': value1,
        'width': width1,
    })
    bookingApp.heading.css({
        'font-size': fontSize
    })
    bookingApp.recommendationSection.animate({
        'width': 'calc(' + width2 + ' - 30px)',
        'opacity': 'show'
    }, 1000)
}
bookingApp.displayRecommendations = function(start) {
    bookingApp.getRecommendation(bookingApp.citiesId, bookingApp.cuisineId, bookingApp.preferencesId, start);
    // Toggle on/off loading animation
    bookingApp.animations.handleAnimations();
    bookingApp.handleRecommendationScroll(bookingApp.recommendationSection, start);
}
bookingApp.clearRecommendation = function() {
    bookingApp.recommendationDisplay.html('');
}
bookingApp.slideInRecommendation = function(staticDiv, slidingDiv) {
    staticDiv.css({
        'width': 'calc((100vw - 150px) / 2)'
    });
    slidingDiv.animate({
        'width': 'calc((100vw - 150px) / 2)',
        'opacity': 'show'
    }, 500);
}
// Process errors and display them in a grammatically correct sentence
bookingApp.displayErrorMessage = function(message) {
    if (message) {
        bookingApp.submissionSection.append(`
        <div class="popUpError"> 
            <h2>** ${message}</h2>
        </div>
    `);
    } 
}

// Process errors and display them in a grammatically correct sentence......
bookingApp.parseErrors = function (errors) {
    let message;
    if (errors.length === 1) {
        message = `Please select a ${errors[0]}.`;
    } else if (errors.length === 2) {
        message = `Please select a ${errors[0]} and a ${errors[1]}.`;
    } else if (errors.lenghth > 2) {
        message = `Please select `;
        errors.forEach((error, index) => {
            if (index === errors.length - 1) {
                message += ' and a ' + error + '.';
            } else {
                message += ' a ' + error + ',';
            }
        });
    }
    return message;
}
// Check for errors in the form of unselected options........
bookingApp.checkErrors = function () {
    let errors = [];
    if (!bookingApp.citiesId) {
        errors.push('city');
    }
    if (!bookingApp.cuisineId) {
        errors.push('cuisine');
    }
    if (!bookingApp.preferencesId) {
        errors.push('dining option');
    }
    return errors;
}
bookingApp.parseErrors = function(errors) {
    let message = '';
    if (errors.length === 1 && errors !== []) {
        message = `Please select a ${errors[0]}.`;
    } else if (errors.length === 2) {
        message = `Please select a ${errors[0]} and a ${errors[1]}.`;
    } else if (errors.length > 2) {
        message = `Please select `;
        errors.forEach((error, index) => {
            if (index === errors.length - 1) {
                message += ' and a ' + error + '.';
            } else {
                message += ' a ' + error + ',';
            }
        });
    }
    return message;
}
// automatically append to the recommendation display when the scroll hits the bottom or when the display is longer than the origin 9 recommendations
bookingApp.handleRecommendationScroll = function(recommendationSection, start) {
    recommendationSection.on('scroll', () => {
        if(recommendationSection[0].scrollTop + recommendationSection[0].clientHeight >= recommendationSection[0].scrollHeight - 10) {
            start += 9;
            setTimeout(bookingApp.getRecommendation(bookingApp.citiesId, bookingApp.cuisineId, bookingApp.preferencesId, start), 100);
        }
    });
    if (recommendationSection[0].scrollTop === 0 && 
        recommendationSection[0].scrollHeight === recommendationSection[0].clientHeight) {
        start += 9;
        bookingApp.getRecommendation(bookingApp.citiesId, bookingApp.cuisineId, bookingApp.preferencesId, start);
    }
}

bookingApp.getRecommendation = function (selectedCityId, selectedCuisineId, selectedCategoryId, start) {
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

// Function to get the location, currency, featured image, name, zomato url, userRatings.aggregate_rating.....

bookingApp.processRecommendation = function(recommendations) {
    recommendations.forEach( (value) => {
        const restaurant = value.restaurant;
        const currency = restaurant.currency;
        const name = restaurant.name;
        const url = restaurant.url;
        const userRatings = restaurant.user_rating.aggregate_rating;
        let image = restaurant.thumb;
        image = bookingApp.defaultImage(image);
        bookingApp.appendImage(bookingApp.recommendationDisplay, image, name, url, currency, userRatings);
    });  
}

// Function to check if the zomato API is returning an empty image, if yes then changing the image to default image.....

bookingApp.defaultImage = function (image) {
    if (image === "") {
        return `assets/id${bookingApp.cuisineId}.jpg`;
    } else {
        return image;
    }
}

// to display the image..........
bookingApp.appendImage = function (display, image, name, url,currency,userRatings) {
    display.append(`
    <li>
        <img src="${image}" alt="Featured image for ${name} restaurant from Zomato"/>
        <i class="fas fa-info-circle"></i>
        <a href="${url}">${name}</a>
        <div class="information hiddenInfo">
            <p><i class="fas fa-utensils"></i> Currency: ${currency}</p>
            <p><i class="fas fa-utensils"></i> Ratings: ${userRatings}</p>
        </div>
    </li>
    `)
}

bookingApp.showInfo = function () {
    bookingApp.recommendationDisplay.on('click', 'li', function () {
        $($(this)[0].childNodes[7]).toggleClass('hiddenInfo flexInfo');
    });
}

// init function to call the api function..........
bookingApp.init = function () {
    bookingApp.getUserSelections();
    bookingApp.handleButton(bookingApp.staticDiv, bookingApp.submitButton, 0);
}





bookingApp.animations = {}
bookingApp.animations.timeout;
bookingApp.animations.canvas;
bookingApp.animations.elements = [];
bookingApp.animations.handleAnimations = function () {
    bookingApp.animations.init();
    bookingApp.animations.timeoutTransition(1200);
}
bookingApp.animations.init = function () {
    bookingApp.animations.createCanvas(bookingApp.recommendationDisplay);
    bookingApp.animations.appendElements('tomato');
    bookingApp.recommendationSection.css({
        'overflow': 'hidden'
    });
    bookingApp.animations.animatedElements[0].animate({
        'transform': 'rotate(0deg)',
        'opacity': '0'
    }, {
        'duration': 1500,
        'step': function (now) {
            bookingApp.animations.animatedElements[0].css({
                'transform': `rotate(${now * 300}deg)`
            });
        }
    })
}
bookingApp.animations.reset = function () {
    bookingApp.animations.eraseCanvas(bookingApp.animations.canvas);
}
bookingApp.animations.createCanvas = function (parentElement) {
    parentElement.append(`
    <div class="animationCanvas">
    </div> <!-- closing animationCanvas -->
    `);
    bookingApp.animations.canvas = $('.animationCanvas');
}
bookingApp.animations.eraseCanvas = function (parentElement) {
    parentElement.html('');
}
bookingApp.animations.timeoutTransition = function (timeoutDuration) {
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
bookingApp.animations.appendElements = function (...elements) {
    bookingApp.animations.elements = elements.map((value) => {
        return `<img src="./assets/${value}.png" alt="picture of ${value}" id="${value}">`;
    });
    bookingApp.animations.elements.forEach((value) => {
        bookingApp.animations.canvas.append(value);
    });
    bookingApp.animations.animatedElements = elements.map((value) => {
        return $(`img#${value}`);
    });
}



// CALENDAR MODULE
bookingApp.calendar = {};
bookingApp.calendar.calendar = $('.calendar');
bookingApp.calendar.calendarNav = $('.calendarNav');
bookingApp.calendar.previousButton = $('.fa-chevron-left');
bookingApp.calendar.nextButton = $('.fa-chevron-right');
bookingApp.calendar.calendarDisplay = $('.calendarDisplay ul');
bookingApp.calendar.timeSelection = $('.timeSelection');
bookingApp.calendar.hourInput = $('#hourInput');
bookingApp.calendar.minuteInput = $('#minuteInput');
bookingApp.calendar.meridiem = $('.meridiem');
bookingApp.calendar.submitButton = $('.submitButton');
bookingApp.calendar.calendarIcon = $('.calendarIcon');
bookingApp.calendar.today = new Date();
bookingApp.calendar.chosenDate = [bookingApp.calendar.today.getFullYear(), bookingApp.calendar.today.getMonth(), null, null, null];
bookingApp.calendar.userChosenDate;
bookingApp.calendar.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Function to display calendar icon
bookingApp.calendar.calendarIconDisplay = function (calendar, today) {
    // put current date details on calendar icon to make it dynamic
    // $(calendar[0].children[0]).text(bookingApp.calendar.months[today.getMonth()]);
    // $(calendar[0].children[1]).text(today.getDate());
    // $(calendar[0].children[2]).text(today.getMonth() + 1);
    // Function to handle clicks on the calendar icon; once clicked the calendar will be shown and user can select future dates from it; if clicked again, will close the display
    $('.calendarIcon').on('click', () => {
        bookingApp.calendar.calendar.toggleClass('hidden');
        bookingApp.calendar.chosenDate = [bookingApp.calendar.today.getFullYear(), bookingApp.calendar.today.getMonth()];
        bookingApp.calendar.calendarNavControl(bookingApp.calendar.calendarNav, ' ');
        bookingApp.calendar.show(bookingApp.calendar.calendarDisplay);
        bookingApp.calendar.timeSelection.addClass('hidden');
        bookingApp.calendar.submitButton.addClass('hidden');
    });
}
// Function to navigate calendar
bookingApp.calendar.changeMonth = function () {
    bookingApp.calendar.previousButton.on('click', () => {
        bookingApp.calendar.backward();
        bookingApp.calendar.calendarNavControl(bookingApp.calendar.calendarNav, ' ');
        bookingApp.calendar.show(bookingApp.calendar.calendarDisplay);
    });
    bookingApp.calendar.nextButton.on('click', () => {
        bookingApp.calendar.forward();
        bookingApp.calendar.calendarNavControl(bookingApp.calendar.calendarNav, ' ');
        bookingApp.calendar.show(bookingApp.calendar.calendarDisplay);
    });
}
// Function to display month and year on calendar nav bar
bookingApp.calendar.calendarNavControl = function (calendarNav, insert) {
    $(calendarNav[0].children[1]).text(`${bookingApp.calendar.months[bookingApp.calendar.chosenDate[1]]}${insert}${bookingApp.calendar.chosenDate[0]}`);
}
// Helper function to increase month
bookingApp.calendar.forward = function () {
    bookingApp.calendar.chosenDate[1]++;
    if (bookingApp.calendar.chosenDate[1] > 11) {
        bookingApp.calendar.chosenDate[1] = 0;
        bookingApp.calendar.chosenDate[0]++;
    }
}
// Helper function to decrease month
bookingApp.calendar.backward = function () {
    bookingApp.calendar.chosenDate[1]--;
    if (bookingApp.calendar.chosenDate[1] < 0) {
        bookingApp.calendar.chosenDate[1] = 11;
        bookingApp.calendar.chosenDate[0]--;
    }
}
bookingApp.calendar.toString = function (numericalValue) {
    if (numericalValue < 10) {
        return '0' + numericalValue;
    } else {
        return '' + numericalValue;
    }
}
// Function to fill all days in a month; the month and year are specified in the calendar nav bar
bookingApp.calendar.show = function (calendarDisplay) {
    // clear calendar display for the new month
    calendarDisplay.html('');
    $(bookingApp.calendar.calendarDisplay.parent()).css('color', 'whitesmoke');
    // gather information about the new month
    let year = bookingApp.calendar.chosenDate[0];
    let month = bookingApp.calendar.chosenDate[1];
    let day = 1;
    let firstDayInMonth = new Date(year, month, 1);
    let weekday = firstDayInMonth.getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let maxNum = 35; /* default is a 5-week month display */
    if (weekday + daysInMonth > 35) {
        maxNum = 42; /* 6-week month display */
    } else if (weekday + daysInMonth === 28) {
        maxNum = 28; /* 4-week month display */
    }

    // for-loop to fill out the new month with the days in their correct places
    for (let i = 0; i < maxNum; i++) {
        if (i < weekday || i >= weekday + daysInMonth) {
            bookingApp.calendar.fillDays(calendarDisplay, '');
        } else {
            stringDate = bookingApp.calendar.toString(day);
            bookingApp.calendar.fillDays(calendarDisplay, stringDate);
            day++;
        }
        if (day === (bookingApp.calendar.today.getDate() + 1) &&
            month === bookingApp.calendar.today.getMonth() &&
            year === bookingApp.calendar.today.getFullYear()) {
            $(calendarDisplay[0].children[i].children).css({
                'color': 'crimson'
            });
            $(calendarDisplay[0].children[i]).css({
                'background-color': '#E5989B'
            });
        } else {
            $(calendarDisplay[0].children[i]).css('background-color', '#6D6875');
        }
    }
}
// Helper function to put the day numbers as strings on the calendar display
bookingApp.calendar.fillDays = function (calendarDisplay, stringDate) {
    calendarDisplay.append(`
        <li>
            <span>${stringDate.charAt(0)}</span>
            <span>${stringDate.charAt(1)}</span>
        </li>
    `);
}
// Function to search for a particular date; return the number of the 'li' child that holds the value of that date in the given year and month
bookingApp.calendar.searchDate = function (year, month, day) {
    let weekdayOfFirstDay = new Date(year, month, 1).getDay();
    return weekdayOfFirstDay + parseInt(day) - 1;
}
// Function to handle user selection from calendar and start event countdown from current moment to selected future date and time
bookingApp.calendar.getUserChosenDate = function () {
    bookingApp.calendar.calendarDisplay.on('click', 'li', function () {
        // Get user's chosen date and record it as new Date object
        bookingApp.calendar.chosenDate[2] = bookingApp.calendar.parseUserChoice($(this));
        // Insert chosen day into calendar nav
        bookingApp.calendar.calendarNavControl(bookingApp.calendar.calendarNav, ' ' + bookingApp.calendar.chosenDate[2] + ' ');
        // Hide contents of calendar display
        bookingApp.calendar.previousButton.addClass('hidden');
        bookingApp.calendar.nextButton.addClass('hidden');
        bookingApp.calendar.calendarDisplay.html('');
        $(bookingApp.calendar.calendarDisplay.parent()).css('color', '#3a3a3a');
        // Show contents of time selection and submit button
        bookingApp.calendar.timeSelection.toggleClass('hidden');
        bookingApp.calendar.submitButton.toggleClass('hidden');

    });
}
// Function to check user's chosen time
bookingApp.calendar.checkUserChosenTime = function () {
    if (bookingApp.calendar.hourInput.val() > 12) {
        bookingApp.calendar.hourInput.val(12);
    }
    if (bookingApp.calendar.minuteInput.val() > 59) {
        bookingApp.calendar.minuteInput.val(59);
    }
}
// Function to get user's chosen time
bookingApp.calendar.getUserChosenTime = function () {
    bookingApp.calendar.submitButton.on('click', () => {
        $(bookingApp.calendar.calendarDisplay.parent()).css('color', 'whitesmoke');
        bookingApp.calendar.checkUserChosenTime();
        let meridiem = bookingApp.calendar.meridiem.text();
        let hour = parseInt(bookingApp.calendar.hourInput.val());
        if (meridiem === 'PM' && hour !== 12) { hour += 12 }
        if (!hour || (hour === 12 && meridiem === 'AM')) { hour = 0; }
        let minute = parseInt(bookingApp.calendar.minuteInput.val());
        if (!minute) { minute = 0; }
        bookingApp.calendar.chosenDate[3] = hour;
        bookingApp.calendar.chosenDate[4] = minute;
        bookingApp.calendar.userChosenDate = new Date(bookingApp.calendar.chosenDate[0], bookingApp.calendar.chosenDate[1], bookingApp.calendar.chosenDate[2], bookingApp.calendar.chosenDate[3], bookingApp.calendar.chosenDate[4], 0);
        // user timer.start() method to start the countdown timer if the countdown display is off. otherwise, clear the old setTimeout and start a new timer without toggling the countdown display
        bookingApp.calendar.today = new Date();
        if (bookingApp.timer.Off) {
            bookingApp.timer.start(bookingApp.timer.convertUnits((bookingApp.calendar.userChosenDate - bookingApp.calendar.today.getTime()) / 1000));
        } else {
            bookingApp.timer.timeValues = bookingApp.timer.convertUnits((bookingApp.calendar.userChosenDate - bookingApp.calendar.today.getTime()) / 1000);
            clearTimeout(bookingApp.timer.myTimer);
            bookingApp.timer.startTimer(bookingApp.timer.timeValues);
        }
        bookingApp.calendar.resetDisplay();
    });
}
// Function to reset calendar display after picking a future time
bookingApp.calendar.resetDisplay = function () {
    bookingApp.calendar.hourInput.val('');
    bookingApp.calendar.minuteInput.val('');
    bookingApp.calendar.calendar.addClass('hidden');
    bookingApp.calendar.timeSelection.addClass('hidden');
    bookingApp.calendar.submitButton.addClass('hidden');
    bookingApp.calendar.previousButton.removeClass('hidden');
    bookingApp.calendar.nextButton.removeClass('hidden');
}
// Function to toggle AM/PM
bookingApp.calendar.toggleMeridiem = function () {
    bookingApp.calendar.meridiem.on('click', () => {
        let text = bookingApp.calendar.meridiem.text();
        if (text === 'AM') {
            text = 'PM';
        } else {
            text = 'AM';
        }
        bookingApp.calendar.meridiem.text(`${text}`);
    });
}
// Function to get user's chosen date
bookingApp.calendar.parseUserChoice = function (choice) {
    let chosenDay = $(choice.find('span')[0]).text();
    chosenDay += $(choice.find('span')[1]).text();
    return chosenDay;
}
// Function to initialize calendar module
bookingApp.calendar.init = function () {
    bookingApp.calendar.calendarIconDisplay(bookingApp.calendar.calendarIcon, bookingApp.calendar.today);
    bookingApp.calendar.calendarNavControl(bookingApp.calendar.calendarNav, ' ');
    bookingApp.calendar.show(bookingApp.calendar.calendarDisplay);
    bookingApp.calendar.changeMonth();
    bookingApp.calendar.getUserChosenDate();
    bookingApp.calendar.getUserChosenTime();
    bookingApp.calendar.toggleMeridiem();
}

// calling the API function once the document loads.......
$(document).ready(() => {
    bookingApp.init();
    bookingApp.calendar.init();
});
