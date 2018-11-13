
$(document).ready(function () {
	var flag = 0;
	var oldPosition;
	var heightWindow = $(window).height();
	var current = heightWindow / 397;
	var heightMenu = $(this).children().height() *current ;

	$(".menu-list p	").hide();
	$(".popup-1,.popup-2").hide();
	/* show and hide menu */
	$(".menu-list li").on("click", ".menu-btn", function () {
		showHideMenu(this);
	/* show popup */
	$(".btn-about").click(function (){
		showPopup(this);
	});
	/* close popup */
	$(".btn-close-popup").click(function (){
		closeBtn(this);
	});

});


	function showHideMenu(element) {
		var position = $(element).parent().index();
		var src = $(element).attr("src");

		if (flag == 0) {
			$(element).attr("src", src.replace(".jpg", "_hover.jpg")); //change images when active
			oldPosition = position;
			$(element).parent().find("p").show(); //show menu
			$(element).parent().find("p").animate({ height: heightMenu }, 1000); // effect animate when click menu
			timeOut();
			flag = 1;

		} else if (flag == 1) {
			if (oldPosition == position) {
				$(element).attr("src", src.replace("_hover.jpg", ".jpg")); //change images when active
				$(element).parent().find("p").animate({ height: "0" }, 1000); // effect close menu
				timeOut(); // time out pointer-events
				setTimeout(function () { $(".menu-list li p").eq(position).hide(); }, 1000); //hide menu
				flag = 0;
			} else {
				$(".menu-list li").eq(oldPosition).children().attr("src", $(".menu-list li").eq(oldPosition).children().attr("src").replace("_hover.jpg", ".jpg"));
				// change image menu old
				$(element).attr("src", src.replace(".jpg", "_hover.jpg"));//change new images menu
				$(element).parent().find("p").show(); //show menu
				$(element).parent().find("p").animate({ height: heightMenu }, 1000);//effect animate
				timeOut();// time out pointer-events
				$(".menu-list li").eq(oldPosition).find("p").hide();//hide old menu
				$(".menu-list li").eq(oldPosition).find("p").animate({ height: "0" }, 1000);//effect close menu
				oldPosition = position;
				flag = 1;
			}
		}
	}
	function timeOut() {
		$(".menu-btn").css({ pointerEvents: 'none' });
		setTimeout(function () {
			$(".menu-btn").css({ pointerEvents: 'auto' })
		}, 1010);
	}
	function showPopup(element) {
		var btnIndex = $(element).parent().parent().index();
		if (btnIndex == 0 || btnIndex == 2 || btnIndex == 4) {
			$(".popup-1").show();
			$(".popup-1").animate({ top: "10%" }, 1100);
			$(".btn-menu").css({ pointerEvents: 'none' });
		} else {
			$(".popup-2").show();
			$(".popup-2").animate({ top: "10%" }, 1100);
			$(".btn-menu").css({ pointerEvents: 'none' });
		}
	}
	function closeBtn() {
		$(".popup-1,.popup-2").hide();
		$(".popup-1,.popup-2").animate({ top: "-160%" }, 100);
		$(".btn-menu").css({ pointerEvents: 'auto' })
	}
});



