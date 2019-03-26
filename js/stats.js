




var graphDist = function(dist)
{

  var screen = {
    height:500,
    width:600
  };

  var margins = {
    top:10,
    left:30,
    bottom:50,
    right:10
  }

  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top-margins.bottom;

  //statistics  -- https://github.com/d3/d3/blob/master/API.md#statistics

  var mean = d3.mean(dist);
  var median = d3.median(dist);
  var variance = d3.deviation(dist);
  var nintyQ = d3.quantile(dist.sort(),.90);

  console.log(mean,median,variance,nintyQ,dist);


  //Xaxis
  var xScale = d3.scaleLinear()
            //.domain(d3.extent(dist))
            //.domain([0,d3.max(dist)])
            .domain([0,100])
            //.nice()
            .range([0,width]);

  //frequency
  var binMaker = d3.histogram() //will be renamed to bin in next release!!!
              .domain(xScale.domain())
              .thresholds(xScale.ticks(50));
   var bins=binMaker(dist);

  //now the yAxis

  var percentage =function(d)
  {
    return d.length/dist.length
  }

  var yScale = d3.scaleLinear()
              .domain([0,d3.max(bins,function(d){return percentage(d);})])
              .range([height,0])
              .nice();


  //draw Stuff
  var svg = d3.select("svg").attr("width",screen.width).attr("height",screen.height);

  //create plot
  var plot = svg.append("g").attr("id","plot")
  .attr("transform","translate("+margins.left+","+margins.top+")");

  plot.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x",function(d) {return xScale(d.x0);})
    .attr("width",function(d) {return xScale(d.x1-.1) - xScale(d.x0);})
    .attr("y",function(d) {return yScale(percentage(d));})
    .attr("height",function(d) {return height - yScale(percentage(d));})
    .attr("fill",function(d) {
          if(d.x0<nintyQ)
           {return "green"}
          else {return "red"}
        })

//now the axises
var xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(30);

svg.append("g")
   .attr("id","xAxis")
   .classed("axis",true)
   .call(xAxis)
   .attr("transform","translate("+margins.left+","+(margins.top+height)+")")


var yAxis = d3.axisLeft()
.scale(yScale);

svg.append("g")
   .attr("id","yAxis")
   .classed("axis",true)
   .call(yAxis)
   .attr("transform","translate("+margins.left+","+(margins.top)+")")



}



//https://github.com/d3/d3/blob/master/API.md#random-numbers-d3-random
var distribution = d3.randomNormal(50,12);

var dataset = d3.range(1000).map(function(x) {return distribution();});

console.log(dataset);

graphDist(dataset);
