var app = angular.module('batchApp');

/*--------------------------CONTROLLER---------------------------*/

app.controller("TimelineCtrl", function($scope, allBatchService){
	
	//Options for datepicker
	$scope.options = {
		datepickerMode: "month",
		minMode: "month"
	}
	
	//Timeline axis range variables
	$scope.minDate = new Date(2016,7,0);
	$scope.maxDate = new Date(2017,12,0);
	
	//Pull batch data from service
	$scope.data;
	allBatchService.getAllBatches(
		function(response){
			if (response !== undefined){
				$scope.data = response.data;
				projectTimeline($scope.minDate, $scope.maxDate, $scope.data);
			}
		},
		function(){
			alert('No response from server');
		}
	);
	
	//Project new timeline when min or max date changes
	$scope.$watch( 'minDate', function(){
		if($scope.data !== undefined){
			projectTimeline($scope.minDate, $scope.maxDate, $scope.data);
		}
	});
	
	$scope.$watch('maxDate', function(){
		if($scope.data !== undefined){
			projectTimeline($scope.minDate, $scope.maxDate, $scope.data);
		}
	});
});

//Determine number of weeks in a batch
function numWeeks(date1, date2) {
    var week = 1000 * 60 * 60 * 24 * 7;

    var date1ms = new Date(date1).getTime();
    var date2ms = new Date(date2).getTime();

    var diff = date2ms - date1ms;

    return Math.floor(diff / week);
};

function projectTimeline(minDate, maxDate, timelineData){
	
	var trainers = ['August(Java)','Fred(.NET)','Joe(.NET)','Brian(Java)','Taylor(Java)','Patrick(Java)','Yuvi(SDET)','Steven(Java)','Ryan(SDET)','Richard(Java)','Nicholas(Java)','Ankit(Java)','Genesis(Java)','Emily(.NET)'];
	
	//Timeline variables
	var margin = {top: 30, right: 10, bottom: 30, left:75},
	width = 1700 - margin.left - margin.right,
	height = 2000 - margin.top - margin.bottom,
	xPadding = 50;

	//Define Scales
	var colorScale = d3.scale.category20();
	
	var yScale = d3.time.scale()
		.domain([minDate, maxDate])
		.range([0,height]);
	
	var xScale = d3.scale.ordinal()
		.domain(trainers)
		.rangePoints([xPadding,width-xPadding]);
	
	console.log(xScale.range());
	console.log(xScale.range()[1]-xScale.range()[0])
	console.log(xScale.rangeBand())
	
	//Define axis
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left')
		.tickSize(2);
	
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('top')
		.tickSize(6,0);
	
	//Filter data for that in range of Timeline
	timelineData = timelineData.filter(function(batch){
		return ((new Date(batch.batchStartDate) <= maxDate)&&(new Date(batch.batchEndDate) >= minDate));
	});
	
	var lanePadding = (xScale.range()[1]-xScale.range()[0])/2;
	
	//Create timeline
	d3.select('svg').remove();
	
	var svg = d3.select('#timeline')
		.append('svg')
			.attr('width',width + margin.left + margin.right)
			.attr('height',height + margin.bottom + margin.top)
		.append('g')
			.attr('transform','translate('+margin.left+','+margin.top+')');
			
	svg.append('g')
		.attr('class','x axis')
		.call(xAxis);
	
	svg.append('g')
		.attr('class','y axis')
		.call(yAxis);
	
	svg.append('g')
		.attr('class','swimlanes')
		
		
	d3.select('.swimlanes')
		.selectAll('line')
		.data(trainers)
		.enter()
		.append('line')
			.attr('x1', function(d){return xScale(d)+lanePadding;})
			.attr('y1', 0)
			.attr('x2', function(d){return xScale(d)+lanePadding;})
			.attr('y2', height)
			.attr('stroke','lightgray');
	
	svg.append('g')
		.attr('class','rectangles');

	d3.select('.rectangles')
		.selectAll('g')
		.data(timelineData)
		.enter()
		.append('g')
			.attr('class','rect')
		.append('rect')
			.attr('y', function(d) {
				var y = yScale(new Date(d.batchStartDate));
				if (y < 0){
					y = 0;
				}
				return y;
			})
			.attr('x', function(d) {return xScale(d.batchTrainerID.trainerFirstName+"("+d.batchCurriculumID.curriculumName+")")-15;})
			.attr('width', 30)
			.attr('height', function(d) {
				var start = yScale(new Date(d.batchStartDate));
				var end = yScale(new Date(d.batchEndDate));
				if (start < 0){
					start = 0;
				}
				if(end > height){
					end = 1940;
				}
				return end - start;
			})
			.style('fill', function(d) {return colorScale(d.batchTrainerID.trainerFirstName);});
	d3.selectAll('.rect')
		.append('text')
			.attr('y', function(d) { 
				var y = yScale(new Date(d.batchStartDate));
				if (y < 0){
					y = 0;
				}
				return (y+25);
			})
			.attr('x', function(d) {return xScale(d.batchTrainerID.trainerFirstName+"("+d.batchCurriculumID.curriculumName+")")-7;})
			.text(function(d) {return numWeeks(d.batchStartDate,d.batchEndDate);});
};