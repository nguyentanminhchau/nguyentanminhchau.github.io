$(document).ready(function () {
	var menu      = $('.js-dropdown-menu'); // Get tag <ul> list menu
	var dropdownMenu  = menu.children();	// Get all tag <li> in tag <ul> list menu
	var btnPre    = $('.btn-prev');
	var btnNext   = $('.btn-next');
	var listItem  = $('#js-product-list'); // Get tag <ul> list item
	var productSlide  = $('.js-product-slide');  // Get the product-slide show up list product
	var imageWidth = parseInt(listItem.children().css('width')); // Get width of the single image in list item
	var maxLength = dropdownMenu.length;	// Get length of dropdownMenu
	var position  = 0;	// Get position of tag <li>
	var autoPlay  = autoSlide(); // Start auto slide image

	/* Set pointer-events auto for tag <ul> list menu and none for list tag <li> in tag <ul> list menu
	 CSS pointer-events of tag <ul> was auto and tag <li> was none.''
	*/
	setPointerEvents(menu, dropdownMenu);

	// Show first item in  list item
	showMenu(0);

	// Event swipe to left in sp
	productSlide.on('swipeleft', function () {
	    clearInterval(autoPlay); 
	    autoPlay = autoSlide();  
		slideNext();  // Slide to next image
	});

	// Event swipe to right in sp
	productSlide.on('swiperight', function () {
		clearInterval(autoPlay); 
		autoPlay = autoSlide();  
		slidePrevious();  
	});

	// Event when user click on tag <ul> list menu
	menu.click(function () {
		dropdownMenu.show(); 
		setPointerEvents(dropdownMenu, menu); 
	});

	dropdownMenu.click(function (event) {
		position = $(this).index(); //Get this position of tag <li>
		var distance = position * imageWidth; // Get distance from first tag <li> to this tag <li>

		// Set CSS for this tag <li> with left = -distance
		listItem.animate({left: '-' + distance + 'px'});
		showMenu(position);  // Show this item in list item
		setPointerEvents(menu, dropdownMenu);
		clearInterval(autoPlay);
		autoPlay = autoSlide();
		event.stopPropagation(); // Stop all event in class parent of this tag <li>
	});

	btnNext.click(function () {
		multiClick(); // Make user can't click many on button next
		slideNext(); // Slide to next image

		// Reset setInterval()
		clearInterval(autoPlay);
		autoPlay = autoSlide();
	});

	btnPre.click(function () {
		multiClick();
		slidePrevious(); 
		clearInterval(autoPlay);
		autoPlay = autoSlide();
	});

	function setPointerEvents(element1, element2) {
		element1.css('pointer-events', 'auto');
		element2.css('pointer-events', 'none');
	}

	// User can't click on button next and previous.
	function multiClick() {
		btnPre.css('pointer-events', 'none');
		btnNext.css('pointer-events', 'none');
		setTimeout(function () {
			btnPre.css('pointer-events', 'auto');
			btnNext.css('pointer-events', 'auto');
		}, 1000);
	}

	/* Function show this tag <li> that you clicked.
	*/
	function showMenu(position) {
		dropdownMenu.hide(); // Hide all tag <li>
		dropdownMenu.eq(position).show(); // Show this tag <li>
	}

	// Auto slide to next image in 3s
	function autoSlide() {
		var start = setInterval(function () {slideNext();}, 3000); 
		return start; 
	}

	//  slide to next image
	function slideNext() {
		position += 1;
		// If position > (length of all tag <li>) - 1 --> position = 0
		if (position > maxLength - 1) {
			position = 0;
			// Set left of CSS to the first image
			listItem.animate({left: '0'}); 
			showMenu(position); // Show the menu with this position in list menu
			return false;
		}

		// Else set left of CSS with value is subtract the width of image
		listItem.animate({left: '-=' + imageWidth + 'px'});
		showMenu(position);
	}

	// Funtion slide to previous image
	function slidePrevious() {
		position -= 1;
		if (position < 0) {
			position = maxLength - 1;
			// Set left of CSS to the last image
			listItem.animate({left: '-' + (position * imageWidth) + 'px'});
			showMenu(position); 
			return true;
		}
		// Else set left of CSS with value is sum the width of image
		listItem.animate({left: '+=' + imageWidth + 'px'});
		showMenu(position);
	}
})