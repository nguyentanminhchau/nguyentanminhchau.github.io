var slide = (function () {

    var imageCurrent = 0;
    var timeAutoSlide = 2000;
    var speedSlide = 500;


var image = $(".image");
var imageMini = $(".imgMini");
var slideWidth = $(".js-slide").width();
var container = $(".js-list-item");
    
    /* Button next */
    function privateNext() {
        imageCurrent++;
        if (imageCurrent > image.lenght - 1) {
            imageCurrent = 0;
            image.animate({ left: "+=" + (slideWidth * image.lenght - slideWidth) }, speedSlide);
        }
        else {
            image.animate({ left: "-=" + (slideWidth) }, speedSlide);
        };
    };
    /* Button previous */
    function privatePrevious() {
        imageCurrent--;
        if (imageCurrent < 0) {
            imageCurrent++;
            image.animate({ left: "-=" +(slideWidth * image.lenght - slideWidth) }, speedSlide);
        }
        else {
            image.animate({ left: "+=" + (slideWidth) }, speedSlide);
        }
    }
    /* Click navi image */
    function privateClickMiniImage(index){
        console.log("index = " + index);
        container.animate({left: "+=" + (slideWidth*(imageCurrent - index))},speedSlide);
        imageCurrent = index;
    };
    function blurImageThumb(){
       imageMini.css("opacity", "1");
       imageMini.eq(imageCurrent).css("opacity", "0.5");

    }
    function resetTimeout() {
		clearTimeout(timeOut);
		timeOut = setTimeout(function() {publicNext();}, timeAutoSlide);
	}
    function publicNext(){
        privateNext();
        blurImageThumb();
        resetTimeout();
    }
    function publicPrevious(){
        privatePrevious();
        blurImageThumb();
        resetTimeout();
    }
    function publicClickMiniImage(index){
        blurImageThumb();
        privateClickMiniImage(index);
        resetTimeout();
    }
    return{
        next : publicNext ,
        previous : publicPrevious,
        clikMiniImage : publicClickMiniImage
    };
})();

$(document).ready(function () {
    slide.next();
    $("#btn-prev").click(function(){
        slide.previous();
    });
    $("#btn-next").click(function () {
        slide.next();
    });
    $(".imgMini").click(function(){
        console.log($(".imgMini").index(this));
		slide.clickMiniImage($(".imgMini").index(this));
    });
});









































