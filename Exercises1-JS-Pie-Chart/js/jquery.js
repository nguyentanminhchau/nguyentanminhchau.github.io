var chart = function(){
    var canvas = document.getElementById('bieuDoTron');
    var ctx = canvas.getContext('2d');
    var xscale = 1;
    var yscale = 0.6;
    var move = 10;
    var xcenter = 400;
    var ycenter = 400;
    var radius = 200;

    function circlePass(i){
        ctx.save();
        ctx.scale(xscale,yscale);
        ctx.beginPath();
        ctx.arc(xcenter,ycenter -i,radius,0,2*Math.PI*data[0]);
        ctx.lineTo(xcenter,ycenter-i);
        ctx.restore();

        if(i==99){
            ctx.fillStyle = color[0]; // top of chart
        } else{
            ctx.fillStyle = color[1];
        }
        ctx.fill();
    }
    function circleFail(i){
        ctx.save();
        ctx.scale(xscale,yscale);
        ctx.beginPath();
        if(data[0] > data[1]){
            ctx.arc((xcenter + move),(ycenter - move -i),radius, (2* Math.PI * data[0])+0.01,0.01);
            ctx.lineTo(xcenter + move,ycenter - i- move);
        }else{
            ctx.arc((xcenter - move),(ycenter -move -i),radius,(2 * Math.PI * data[0])+0.01,0.01);
            ctx.lineTo(xcenter -move, ycenter - i - move);
        }
        ctx.restore();
        if (i==99) {
            ctx.fillStyle = color[2]; // top of chart
        }else {
            ctx.fillStyle = color[3];
        }
        ctx.fill();	
    }
    function draw(){
        if (data[0] >0 && data[0]<1){
            for(var i=0;i <100;i++){
                circlePass(i);
                circleFail(i);
            }
        }else{
            alert('Wrong input');
        }
    }
    function drawtxt(){
        ctx.font = font;
        ctx.fillStyle = titleColor;
        ctx.fillText(title,200,400);
        ctx.fillStyle = textColor;
        ctx.fillText(data[0]*100 + "%" + text[0],50,100);
        ctx.fillText(100 -(data[0]*100) + "%" + text[1],600,50);
    }
    function drawLine(){
        var xstart = 600;
        var ystart = 400*yscale;
        var anpha =2*Math.PI - 2*Math.PI * data[0];
        var xend = xcenter + ((radius)* Math.cos(anpha));
        var yend = ycenter+  ((radius)* Math.sin(anpha));
        var xposition = ((xstart + xend)/2);  //// find position end of the line
        var yposition = ((ystart + yend)/2)*yscale;
        var anpha2 = 2*Math.PI*data[0];
        var xendF = xcenter + ((radius)* Math.cos(anpha2));
        var yendF = ycenter+  ((radius)* Math.sin(anpha2));
        var xpositionF = ((xstart + xendF)/2);   //// find position end of the line
        var ypositionF = ((ystart+ yendF)/2)*yscale;
        if(data[0]==0.5){
            ctx.strokeStyle = color[4];
            ctx.lineWidth = 5;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(50,110);
            ctx.lineTo(170,110);
            ctx.lineTo(xposition,yposition + 25);
            ctx.stroke();
            ctx.restore();

            
			ctx.strokeStyle = colors[5];
			ctx.lineWidth = 5;
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(740,60);
			ctx.lineTo(600,60);
			ctx.lineTo(xpositionF,ypositionF-50);
			ctx.stroke();
            ctx.restore();
            
        }else{
            if(data[0] >0.5){
            ctx.strokeStyle = color[4];
            ctx.lineWidth =5;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(50,110);
            ctx.lineTo(170,110);
            ctx.lineTo(xposition,yposition);
            ctx.stroke();
            ctx.restore();

            
			ctx.strokeStyle = colors[5];
			ctx.lineWidth = 5;
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(740,60);
			ctx.lineTo(600,60);
			ctx.lineTo(xpositionF,ypositionF);
			ctx.stroke();
            ctx.restore();
            } 
            else{
                 
			ctx.strokeStyle = color[4];
			ctx.lineWidth = 5;
			ctx.save();
			ctx.beginPath();
            ctx.moveTo(50,110);
            ctx.lineTo(170,110);
			ctx.lineTo(xpositionF,ypositionF);
			ctx.stroke();
            ctx.restore();

            ctx.strokeStyle = color[5];
            ctx.lineWidth =5;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(740,60);
			ctx.lineTo(600,60);
            ctx.lineTo(xposition,yposition);
            ctx.stroke();
            ctx.restore();

           
            }
        }
        
    }
    return{
        circleFail : circleFail,
        circlePass : circlePass,
        draw       : draw,
        drawtxt    : drawtxt,
        drawLine   : drawLine
    }
}();

chart.draw();
chart.drawtxt();
chart.drawLine();


    