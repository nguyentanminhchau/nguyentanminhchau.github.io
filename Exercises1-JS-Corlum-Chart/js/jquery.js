var chart = function(){
    var canvas = document.getElementById('bieuDoCot');
    var ctx = canvas.getContext('2d');

    function drawtitle(){
        ctx.font = fonttitle;
        ctx.fillText(title,100,ycenter - (maxcolum*50)-100);
        ctx.fillStyle = titleColor;
        ctx.fillStyle =  titleColor;
		ctx.fillText(yourproject,250,ycenter +90);	
		ctx.save();
		ctx.translate(0, 500);
   		ctx.rotate(- Math.PI/2);
    	ctx.fillText(titleleft,25,25 );
		ctx.restore();		

    }
    function drawchar(){
		ctx.font = font;
		for ( var i =0 ; i < maxcolum+1 ; i++){
			//draw level
			ctx.fillText(level[i],xcenter - 30,ycenter - (50 * i) +8);
			
			//draw column name
			ctx.fillText(colum[i],xnamecolum + (100*i)  ,ynamecolum);
			
			//draw h line
			if(i == 0){
				ctx.save();
				ctx.beginPath();
				ctx.moveTo(xcenter, ycenter - (50 * i));
				ctx.lineTo (xcenter + (100 * (maxcolum+1)) , ycenter - (50 * i));
				ctx.stroke();
				ctx.restore();
			}else{
				ctx.save();
				ctx.beginPath();
				ctx.strokeStyle = titleColor;
				ctx.moveTo(xcenter, ycenter - (50 * i));
				ctx.lineTo (xcenter + (100 * (maxcolum+1)), ycenter - (50 * i));
				ctx.stroke();
				ctx.restore();	
			}
		}
	}
	function drawcolum(){
		for ( var i =0 ; i < maxcolum+1 ; i++){
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = columcolor;
			ctx.fillStyle = columcolor
			ctx.moveTo(xcolum +(100*i) - 25, ycenter);
			ctx.lineTo (xcolum +(100*i) -25, ycenter - (50 * columvalue[i]));
			ctx.lineTo (xcolum +(100*i) +25, ycenter - (50 * columvalue[i]));
			ctx.lineTo (xcolum +(100*i) +25, ycenter );
			ctx.stroke();
			ctx.fill();
        }
        }
        
        function drawnote(){
            ctx.fillStyle =  titleColor;		
            
            ctx.fillStyle = colornote;
            ctx.fillText(note[0],xcenter + (100 * (maxcolum+1)) + 50,ycenter - (50 * maxcolum)+50);
            ctx.fillText(note[1],xcenter + (100 * (maxcolum+1)) + 50,ycenter - (50 * maxcolum)+75);
            ctx.fillText(note[2],xcenter + (100 * (maxcolum+1)) + 50,ycenter - (50 * maxcolum)+100);		
            ctx.save();
            ctx.beginPath();

            ctx.fillStyle = columcolor;
            ctx.moveTo(xcenter + (100 * (maxcolum+1)) + 50, ycenter - (50 * maxcolum));
            ctx.lineTo(xcenter + (100 * (maxcolum+1)) + 100,ycenter - (50 * maxcolum));
            ctx.lineTo(xcenter + (100 * (maxcolum+1)) + 100,ycenter - (50 * maxcolum)+15);
            ctx.lineTo(xcenter + (100 * (maxcolum+1)) + 50,ycenter - (50 * maxcolum)+15);
            ctx.stroke();
            ctx.fill();
            ctx.restore();
            ctx.rotate(-Math.PI /2);
            ctx.fillText(titleleft,0,ycenter -100);
        
        }
            return {
                drawtitle:drawtitle,
                drawchar:drawchar,
                drawcolum:drawcolum,
                drawnote:drawnote,
                
            }
            
            
    }()
    
    chart.drawtitle();
    chart.drawchar();
    chart.drawcolum();
    chart.drawnote();
    
    