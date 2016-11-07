var app = angular.module('batchApp');

/*--------------------------CONTROLLER---------------------------*/

// app.controller("TimelineCtrl", function($scope, allBatchService){
// 	//Timeline x axis range variables
// 	var minDate = new Date(2016,7,20),
// 		maxDate = new Date(2017,11,31);

// 	//Pull batch data from service
// 	allBatchService.getAllBatches(function(response){
// 		if (response.data !== undefined){
// 			var data = response.data;
// 			projectTimeline(minDate, maxDate, data);
// 		}
// 	});
	
	

// });

//Determine number of weeks in a batch
function numWeeks(date1, date2) {
    var week = 1000 * 60 * 60 * 24 * 7;

    var date1ms = new Date(date1).getTime();
    var date2ms = new Date(date2).getTime();

    var diff = Math.abs(date2ms - date1ms);

    return Math.floor(diff / week);
};

function projectTimeline(minDate, maxDate, timelineData){
	
	//Timeline variables
	var padding = {top: 20, right: 10, bottom: 30, left:75},
	width = 1700 - padding.left - padding.right,
	height = 2000 - padding.top - padding.bottom,
	margin = 50,
	barWidth = 30;

	//Define Scales
	var colorScale = d3.scale.category20();
	
	var yScale = d3.time.scale()
		.domain([minDate, maxDate])
		.range([0,height]);
	
	var xScale = d3.scale.ordinal()
		.domain(['August(Java)','Fred(.NET)','Joe(.NET)','Brian(Java)','Taylor(Java)','Patrick(Java)','Yuvi(SDET)','Steven(Java)','Ryan(SDET)','Richard(Java)','Nicholas(Java)','Ankit(Java)','Genesis(Java)','Emily(.NET)'])
		.rangePoints([margin,width-margin]);
	
	//Define axis
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left')
		.tickSize(2);
	
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('top')
		.tickSize(0);
	
	//Create timeline
	var svg = d3.select('#timeline')
		.append('svg')
			.attr('width',width+padding.left+padding.right)
			.attr('height',height+padding.top+padding.bottom)
		.append('g')
			.attr('transform','translate('+padding.left+','+padding.top+')')
			
	svg.append('g')
		.attr('class','x axis')
		.call(xAxis);
	
	svg.append('g')
		.attr('class','y axis')
		.call(yAxis);
	
	svg.append('g')
		.attr('class','rectangles');

	d3.select('.rectangles')
		.selectAll('g')
		.data(timelineData)
		.enter()
		.append('g')
			.attr('class','rect')
		.append('rect')
			.attr('y', function(d) {return yScale(new Date(d.batchStartDate));})
			.attr('x', function(d) {return xScale(d.batchTrainerID.trainerFirstName+"("+d.batchCurriculumID.curriculumName+")")-10;})
			.attr('width', barWidth)
			.attr('height', function(d) {return yScale(new Date(d.batchEndDate)) - yScale(new Date(d.batchStartDate));})
			.style('fill', function(d) {return colorScale(d.batchTrainerID.trainerFirstName);});
	d3.selectAll('.rect')
		.append('text')
			.attr('y', function(d) {return yScale(new Date(d.batchStartDate))-5;})
			.attr('x', function(d) {return xScale(d.batchTrainerID.trainerFirstName+"("+d.batchCurriculumID.curriculumName+")")-2;})
			.text(function(d) {return numWeeks(d.batchStartDate,d.batchEndDate);});
};
