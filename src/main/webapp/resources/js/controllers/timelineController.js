var assignforce = angular.module( "batchApp" );

var app = angular.module('batchApp');

/*--------------------------CONTROLLER---------------------------*/

app.controller("TimelineCtrl", function($scope, $window, allBatchService){

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
				projectTimeline($window.innerWidth, $scope.minDate, $scope.maxDate, $scope.data, $scope.$parent);
			}
		},
		function(){
			alert('No response from server');
		}
	);
	
	//Project new timeline when min or max date changes
	$scope.$watch( 'minDate', function(){
		if($scope.data !== undefined){
			projectTimeline($window.innerWidth, $scope.minDate, $scope.maxDate, $scope.data, $scope.$parent);
		}
	});
	

	$scope.$watch('maxDate', function(){
		if($scope.data !== undefined){
			projectTimeline($window.innerWidth, $scope.minDate, $scope.maxDate, $scope.data, $scope.$parent);
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

function projectTimeline(windowWidth, minDate, maxDate, timelineData, parentScope){
	
	var trainers = ['August(Java)','Fred(.NET)','Joe(.NET)','Brian(Java)','Taylor(Java)','Patrick(Java)','Yuvi(SDET)','Steven(Java)','Ryan(SDET)','Richard(Java)','Nicholas(Java)','Ankit(Java)','Genesis(Java)','Emily(.NET)'];
	
	//Timeline variables
	var margin = {top: 30, right: 10, bottom: 30, left:75},
	width = windowWidth - margin.left - margin.right,
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
	
	//Define axis
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left')
		.tickSize(2);
	
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('top')
		.tickSize(6,0);
	
	//Filter & sort data for that in range of Timeline
	timelineData = timelineData.filter(function(batch){
		return ((new Date(batch.batchStartDate) <= maxDate)&&(new Date(batch.batchEndDate) >= minDate));
	});
	
	timelineData.sort(function(a,b){
		if(new Date(a.batchStartDate) < new Date(b.batchStartDate)){
			return -1;
		}
		else if(new Date(a.batchStartDate) > new Date(b.batchStartDate)){
			return 1;
		}
		else{
			return 0;
		}
	});
	//console.log(timelineData);
	//timelineData.forEach(function(d) {console.log(xScale(d.batchTrainerID.trainerFirstName+"("+d.batchCurriculumID.curriculumName+")")-15);console.log(d.batchTrainerID.trainerFirstName);});
	//Create lines for between batches
	var betweenBatches = [];
	for(var x = 0; x < timelineData.length; x++){
		for(var y = x; y < timelineData.length; y++){
			if(x !== y && timelineData[x].batchTrainerID.trainerFirstName === timelineData[y].batchTrainerID.trainerFirstName){
				var between = {x: xScale(timelineData[x].batchTrainerID.trainerFirstName+"("+timelineData[x].batchCurriculumID.curriculumName+")"),
								y1: yScale(new Date(timelineData[x].batchEndDate)),
								y2: yScale(new Date(timelineData[y].batchStartDate)),
								length:numWeeks(timelineData[x].batchEndDate,timelineData[y].batchStartDate)};
				betweenBatches.push(between);
			}
		}
	} 
	
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
	
	//Add swimlanes to timeline
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
	
	//Add line for current date on timeline
	
	svg.append('g')
		.attr('class','currentdate')
		
	d3.select('.currentdate')
		.append('line')
			.attr('x1', 0)
			.attr('x2', width)
			.attr('y1', yScale(new Date()))
			.attr('y2',yScale(new Date()))
			.attr('stroke','#f26a25');
	
	//Add batches to timeline
	
	var defs = svg.append("defs");

	var filter = defs.append("filter")
		.attr("id", "highlight")

	filter.append("feGaussianBlur")
		.attr("in", "SourceAlpha")
		.attr("stdDeviation", 5)
		.attr("result", "blur");
	filter.append("feComponentTransfer")
		.attr("in", "blur")
		.attr("result","betterBlur")
		.append("feFuncA")
		.attr("type","linear")
		.attr("slope","1.5")
	filter.append("feFlood")
		.attr("in", "betterBlur")
		.attr("flood-color", "#f26a25")
		.attr("result", "color");
	filter.append("feComposite")
		.attr("in", "color")
		.attr("in2", "betterBlur")
		.attr("operator", "in")
		.attr("result", "colorBlur");
	
	var feMerge = filter.append("feMerge");
	
	feMerge.append("feMergeNode")
		.attr("in", "colorBlur")
	feMerge.append("feMergeNode")
		.attr("in", "SourceGraphic");
	  
	//Normal stuff
	
	svg.append('g')
		.attr('class','rectangles');

	d3.select('.rectangles')
		.selectAll('g')
		.data(timelineData)
		.enter()
		.append('g')
			.attr('class','rect')
		.append('rect')
			.attr('id',function(d){return 'id'+d.batchID;})
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
			.on('click', function(d){parentScope.highlightBatch(d);parentScope.$apply();})
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
	
	//Add between batch length to timeline
	svg.append('g')
		.attr('class','betweenbatches');

	d3.select('.betweenbatches')
		.selectAll('g')
		.data(betweenBatches)
		.enter()
		.append('g')
			.attr('class','between')
		.append('line')
			.attr('x1', function(d){return d.x;})
			.attr('y1', function(d){return d.y1;})
			.attr('x2', function(d){return d.x;})
			.attr('y2', function(d){return d.y2;})
			.style('stroke', 'black');
	d3.selectAll('.between')
		.append('text')
			.attr('y', function(d) {return ((d.y1+d.y2)/2)+5;})
			.attr('x', function(d) {return d.x+5;})
			.text(function(d) {return d.length;});
};