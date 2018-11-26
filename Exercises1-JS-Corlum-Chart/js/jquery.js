
var chart = (function() {
	var canva = options.canvas;
	canva.width = 600; 
	canva.height = 400;
	var ctx = canva.getContext("2d");
	ctx.fillStyle = "#ff9800";
	ctx.font = "20px Arial";
	var data = options.data;
	var dataDescription = options.dataDescription;
	var descript = options.descript;
	var valMax = options.valueMax;
	var nameColumn = options.nameColumn;
	var colors = options.color;
	var columnRowSize = 50;// size of frame
	var stepSizeY = 1; //The distance between the horizontal lines
	var margin = 10;// Distance to write letters
	var xScale = (canva.width - columnRowSize) / data.length; // Distance raito between vertical lines
	var yScale = (canva.height - columnRowSize - margin) / valMax; //The distance raito between the horizontal lines
	var flag = true;
	//  check value input
	for (var i in data) {
		if (data[i] <= 0) {
			flag = false;
		}
	}

	/**
	 * Function draw Date plot chart
	 */
	 privateChartDataPlot = function() {
	 	// tranlate and scale line because y scale with yScale
		ctx.translate(columnRowSize, canva.height - (yScale * stepSizeY));//Draw start over from position
		ctx.scale(xScale, -yScale);// Invert the image and plot the scale of the y-axis
	 	ctx.beginPath();
	 	ctx.fillStyle = "#00f";	
	 	for (var i = 0; i < data.length; i++) {
	 		ctx.fillRect(i, 0, 0.6, data[i]);
	 	}
	 	checkFirstDraw = false;
	 }

	 /**
	 * Function draw Frame
	 */
	 privateFrame = function() {
	 		ctx.beginPath();
	 		var temp = 1;
	 		ctx.fillStyle = "#000";
	 		for (var scale = 0; scale <= valMax; scale += stepSizeY) {
	 			var distance = (yScale * temp * stepSizeY);
	 			var y = canva.height - distance; // The position y will draw next
	 			ctx.fillText(scale, margin, y);
	 			ctx.moveTo(columnRowSize, y);
	 			ctx.lineTo(canva.width,y);
	 			temp++;
	 		}
	 		for (var i = 0; i < data.length; i++) {
	 			var x =  (i+0.7)* xScale;// The position x will draw next
	 			ctx.fillText(nameColumn[i % nameColumn.length], x, canva.height - columnRowSize + margin);
	 		}
	 		ctx.strokeStyle = "#000";
	 		ctx.stroke();
	 }
	 /**
	  * Function draw description
	  */
	  privateDrawDescription = function() {
	  		var colorIndex = 0;
	  		var tempHTML = ""; // save String HTML to add file html
	  		for(var temp in dataDescription) {
	  			tempHTML += "<p><span style='display:inline-block; width:60px; height: 20px; magin-right:10px; background-color:blue'>&nbsp;</span>LEVEL OF POSITION</p>"; 
	  		}
	  		descript.innerHTML = tempHTML;
	  }

	 /* Public function */
	 publicDrawChart = function() {
	 	if (flag) {
		 	privateFrame();
	 		privateChartDataPlot();
	 		privateDrawDescription();
		} else {
			alert("Input Fail");
		}
	 }

	return {
		draw: publicDrawChart
	}
})();

$(document).ready(function() {
	chart.draw();
})
    