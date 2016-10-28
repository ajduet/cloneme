var app = angular.module('batchApp');

/*--------------------------CONTROLLER---------------------------*/

app.controller("TimelineCtrl", function($scope, allBatchService){
	
	//Timeline size variables
	var width = 1900,
		height = 50,
		padding = 25,
		barHeight = 30;

	//Timeline x axis range variables
	var minDate = new Date(2016,9,20),
		maxDate = new Date(2017,11,31);

	//Pull batch data from service
	allBatchService.getAllBatches(function(response){
		if (response.data !== undefined){
			var data = response.data;
			data.forEach(function(element){
				element.start = new Date(element.batchStartDate);
				element.end = new Date(element.batchEndDate);
			});
			console.log(data);
			height = height + (data.length * 50); //Dynamically size the height of chart based on number of data
			projectTimeline(width, height, padding, barHeight, minDate, maxDate, data);
		}
	});
	
	

});

function projectTimeline(width, height, padding, barHeight, minDate, maxDate, data){
	var colorScale = d3.scale.ordinal()
		.domain(['August','Fred','Joe','Brian','Taylor','Patrick','Yuvi','Steven','Ryan','Richard','Nicholas','Ankit','Genesis','Emily'])
		.range(['#ff0000','#ff8000','#a0a0a0','#000000','#ff007f','#0000ff','#00ff00','#ffff00','#000080','#7b68ee','#00fa9a','c71585','#ff6347','#d2b48c']);

	//Create x Axis
	var xScale = d3.time.scale()
					.domain([minDate,maxDate])
					.range([padding,width+padding]);

	var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient("bottom")
						.outerTickSize(2);

	//Initialize timeline
	var timeline = d3.layout.timeline()
		.size([width,height])
		.maxBandHeight(50)
		.extent([minDate,maxDate]);

	//Append chart to timeline div
	d3.select('#timeline')
		.append('svg')
			.attr('width',width)
			.attr('height',height)
		.append('g')
			.attr('class','axis')
			.attr('transform','translate(0,'+(height-padding)+')')
			.call(xAxis)
	d3.select('svg')
		.append('g')
		.attr('class','rectangles');

	//Add bars to chart
	var timelineBands = timeline(data);
	
	console.log(timelineBands);

	d3.select('.rectangles')
		.selectAll('g')
		.data(timelineBands)
		.enter()
		.append('g')
			.attr('class','rect')
		.append('rect')
			.attr('x', function(d) {return d.start+padding;})
			.attr('y', function(d) {return d.y+padding;})
			.attr('height', barHeight)
			.attr('width', function(d) {return d.end - d.start;})
			.style('fill', function(d) {return colorScale(d.batchTrainerID.trainerFirstName);});
	d3.selectAll('.rect')
		.append('text')
			.attr('x', function(d) {return d.start+30;})
			.attr('y', function(d) {return d.y+45;})
			.text(function(d) {return 'Batch: '+d.batchCurriculumID.curriculumName+', Trainer: '+d.batchTrainerID.trainerFirstName+" "+d.batchTrainerID.trainerLastName;});
};
