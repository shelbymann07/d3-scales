$(document).ready(function() {
    console.log("Hello world.")
});

var margin = { 
        top: 20, 
        right: 20, 
        bottom: 30, 
        left: 50
    };

var width = $(".chart").width() - margin.left - margin.right;
var height = $(".chart").height() - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select(".chart").append("svg")
    .attr("class", "parent-svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("class", "chart-g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.tsv("data/sat.tsv", function(error, data){
    
    var minMaxScores = d3.extent(data, function(d) {
       return +d.Score;
    });

     var minMaxParticipation = d3.extent(data, function(d) {
       return +d.Tested;
    });
      
    x.domain(minMaxParticipation).nice();
    //minMaxParticipation is an ARRAY of two values which are the highest and lowest "Tested" in our data.
    
    y.domain(minMaxScores).nice();
    //minMaxScores is an ARRAY of two values which are the highest and lowest "Scores" in our data.
    
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Sepal Width (cm)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sepal Length (cm)")
});

   




