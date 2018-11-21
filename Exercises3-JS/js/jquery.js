
 var slide = (function () {

    var imageCurrent = 0;
    var timeAutoSlide = 2000;
    var speedSlide = 500;
    var timeOut;	

var image = $(".image");
var imageMini = $(".imgMini");
var slideWidth = $(".js-slide").width();
var container = $("#js-list-item");
    
    /* Button next */
    function privateNext() {
        imageCurrent++;
        if (imageCurrent > image.length -1) {
            imageCurrent = 0;
            container.animate({ left: "+=" + (slideWidth * image.length - slideWidth) }, speedSlide);
        }
        else {
            container.animate({ left: "-=" + slideWidth }, speedSlide);
        };
    };
    /* Button previous */
    function privatePrevious() {
        imageCurrent--;
        if (imageCurrent < 0) {
           imageCurrent = image.length - 1;
            container.animate({ left: "-=" +(slideWidth * image.length - slideWidth) }, speedSlide);
        }
        else {
            container.animate({ left: "+=" + (slideWidth) }, speedSlide);
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
    function nonMultiClick (){
        $(".container").css('pointer-events', 'none');
		setTimeout(function () {
            $(".container").css('pointer-events', 'auto');
		}, 1000);
    }
  
    function publicNext(){
        nonMultiClick();
        privateNext();
        blurImageThumb();
        resetTimeout();
    }
    function publicPrevious(){
        nonMultiClick();
        privatePrevious();
        blurImageThumb();
        resetTimeout();
    }
    function publicClickMiniImage(index){
        nonMultiClick();
        privateClickMiniImage(index);
        blurImageThumb();
        resetTimeout();
    }
    function resetTimeout() {
    clearTimeout(timeOut);
    timeOut = setTimeout(function() {publicNext();}, timeAutoSlide);
    }
    return{
        next : publicNext ,
        previous : publicPrevious,
        clickMiniImage : publicClickMiniImage
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










































