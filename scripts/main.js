var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function nextButtonClickHandler(next, thumbnails) {
  'use strcit';
  next.addEventListener('click', function(event) {
    event.preventDefault();
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var splitArrayofdetailmageUrl = detailImage.src.split('img');
    var detailImageUrl = "img" + splitArrayofdetailmageUrl[1];
    var thumb;
    for (var i = 0; i < thumbnails.length; i++) {
      if ((thumbnails[i].getAttribute('data-image-url') == detailImageUrl)) {
        if (i > 3) {
          thumb = thumbnails[0];
          break;
        } else {
          thumb = thumbnails[i + 1];
          break;
        }
      }
    }
    setDetailsFromThumb(thumb);
  });
}

function prevButtonClickHandler(prev, thumbnails) {
  'use strcit';
  prev.addEventListener('click', function(event) {
    event.preventDefault();
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var splitArrayofdetailmageUrl = detailImage.src.split('img');
    var detailImageUrl = "img" + splitArrayofdetailmageUrl[1];
    var thumb;
    for (var i = 0; i < thumbnails.length; i++) {
      if ((thumbnails[i].getAttribute('data-image-url') == detailImageUrl)) {
        if (i < 1) {
          thumb = thumbnails[thumbnails.length - 1];
          break;
        } else {
          thumb = thumbnails[i - 1];
          break;
        }
      }
    }
    setDetailsFromThumb(thumb);
  });
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  var next_button = document.querySelector('[data-image-next="button"]');
  var prev_button = document.querySelector('[data-image-previous="button"]');
  nextButtonClickHandler(next_button, thumbnails);
  prevButtonClickHandler(prev_button, thumbnails);
}
initializeEvents();
