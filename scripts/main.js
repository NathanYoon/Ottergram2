var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';

var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var BUTTONS = '[data-image-button="button"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;


function setDetails(imageUrl, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-url');
}

function titleFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-title');
  }

function setDetailsFromThumb(thumb) {
    setDetails(imageFromThumb(thumb), titleFromThumb(thumb));
}

function addThumbClickHandler(thumb) { 
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('clicked');
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() { 
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';

    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() { 
    'use strict';
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) { 
            hideDetails();
        }
    });
}

function useButtons() {
    'use strict';
    var titles = document.querySelector(DETAIL_TITLE_SELECTOR);
    var buttons = document.querySelectorAll(BUTTONS);
    var buttonsArray = [].slice.call(buttons);
    var thumbnailsArray = getThumbnailsArray();
    var previous = buttonsArray[0];
    var next = buttonsArray[1];
    var currentImage;
    var currentTitle;

    previous.addEventListener('click', function(event) {
        event.preventDefault();

        for (var i = 0; i < thumbnailsArray.length; i++) {
            if (thumbnailsArray[i].getAttribute("data-image-title") === titles.textContent) {
                if (i === 0) {
                    currentImage = imageFromThumb(thumbnailsArray[thumbnailsArray.length - 1]);
                    currentTitle = titleFromThumb(thumbnailsArray[thumbnailsArray.length - 1]);
                    setDetails(currentImage, currentTitle);
                    break;
                } else if (i !== 0) {
                    currentImage = imageFromThumb(thumbnailsArray[i - 1]);
                    currentTitle = titleFromThumb(thumbnailsArray[i - 1]);
                    setDetails(currentImage, currentTitle);
                }
            }
        }

    });

    next.addEventListener('click', function(event) {
        event.preventDefault();

        for (var i = 0; i < thumbnailsArray.length; i++) {
            if (thumbnailsArray[i].getAttribute("data-image-title") === titles.textContent) {
                if (i === thumbnailsArray.length - 1) {
                    currentImage = imageFromThumb(thumbnailsArray[0]);
                    currentTitle = titleFromThumb(thumbnailsArray[0]);
                    setDetails(currentImage, currentTitle);
                } else {
                    currentImage = imageFromThumb(thumbnailsArray[i + 1]);
                    currentTitle = titleFromThumb(thumbnailsArray[i + 1]);
                    setDetails(currentImage, currentTitle);
                    break;
                }
            }
        }
    });

}

function initializeEvents() {
    'use strict';

    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    useButtons();
}

initializeEvents();