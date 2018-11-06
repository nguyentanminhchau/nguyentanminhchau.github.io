$(document).ready(function(){
    $("button[name=btn-input").click(function(){
        var productName= $('input[name=addproduct]').val();
        $("ol").append("<li>"+productName+"<button>X</button></li>");
        $("li button").addClass('btn-remove');
        $("input[name=addproduct").val(" ");
    });
     $("ol").on("click",".btn-remove",function(){
        $(this).parent('li').remove();
     });
});