$(document).ready(function(){
var container = $('.container');
	var btnPrev   = $('#btn-prev');
	var btnNext   = $('#btn-next');
	var listItems = $('#js-list-item');
	var listThumbs= $('#js-list-thumb');
	var maxLength = listItems.children().length;	// count all tag <li> in tag <ul> list item
	var imageCurrent  = 0;	// The variable to know imageCurrent of tag <li> in tag <ul> list item
	var view	  = parseInt($('.js-slide').css('width')); // Get width of the slide view
	var autoPlay  = autoSlide();	// The variable to run auto slide in list items

	// Set CSS the first li in list Thumbnails with opacity: 0.5 
	listThumbs.children('li:first').css('opacity', '0.5');

	/* Event click on button previous
	   input: none,
	   output: The image slide to previous image,
	    reset setInterval(),
	    user can't click on previous button many time.
	*/
	btnPrev.click(function () {
		multiClick();
		clearInterval(autoPlay);
		previousClick();
		autoPlay = autoSlide();
	});

	/* Event click on button next
	   input: none,
	   output: The image slide to next image,
	   		reset setInterval(),
	   		user can't click on next button many time..
	*/
	btnNext.click(function () {
		multiClick();
		clearInterval(autoPlay);
		nextClick();
		autoPlay = autoSlide();
	});

	/* Event click on tag <li> in tag <ul> thumbnails
	   input: none,
	   output: Change CSS on tag <li> selected, 
	   		in tag <ul> list item slide to image with imageCurrent of tag <li> selected,
	   		reset setInterval(),
	   		user can't click on image of tag <li> in tag <ul> thumbnails many time..
	*/
	$(document).on('click', '#js-list-thumb li', function () {
		multiClick();  
		clearInterval(autoPlay); 	// Stop setInterval()
		imageCurrent = $(this).index();		// Get imageCurrent of current tag <li>
		var distance = imageCurrent * view;	// Get the distance from first <li> to current <li>
		setOpacity(imageCurrent);
		listItems.animate({left: -distance});  // Set animate slide to current <li> with left -= distance
		autoPlay = autoSlide();  // Start setInterVal()
	});

	/* Set timeout when user click many time with CSS pointer-events
		Input: none,
		Output: User can't click any button in class container.
	*/
	function multiClick() {
		container.css('pointer-events', 'none');
		setTimeout(function () {
			container.css('pointer-events', 'auto');
		}, 1000);
	}

	function autoSlide() {
		var autoPlay  = setInterval(function () {nextClick();}, 3000); // Slide to next image in 3s
		return autoPlay;
	}

	function setOpacity(imageCurrent) {
		listThumbs.children().css('opacity', '1');
		listThumbs.children().eq(imageCurrent).css('opacity', '0.5');
	}

	function nextClick() {
		imageCurrent += 1;
		if (imageCurrent > 4) {
			imageCurrent = 0;
			listItems.animate({left: '0px'}); // Turn back to first image
			setOpacity(imageCurrent);
			return false;
		}

		listItems.animate({left: "-=" + view + "px"});  // Slide to next image 
		setOpacity(imageCurrent);
	}

	function previousClick() {
		imageCurrent -= 1;
		if (imageCurrent < 0) {
			imageCurrent = maxLength - 1;
			listItems.animate({left: "-=2600px"}); // Slide to last image
			setOpacity(imageCurrent);
			return true;
		}

		listItems.animate({left: "+=" + view + "px"}); // Slide to previous image
		setOpacity(imageCurrent);
	}

});