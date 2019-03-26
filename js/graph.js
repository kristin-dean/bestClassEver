
var height = 400;
var width = 600

var drawGraph = function(data)
{
  var barWidth = width/data.length;

  var svg = d3.select("svg")
    .attr("width",width)
    .attr("height",height);



  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y",function(d){ return 200 - d.amount*10})
    .attr("x",function(d,i){return i*barWidth})
    .attr("width",barWidth)
    .attr("height",function(d){return d.amount*10})
    .attr("fill","#00FF00");

}

var dataP = d3.csv("data/favColor.csv");

dataP.then(function(data)
{
  console.log(data);

  drawGraph(data);
},
function(err)
{
  console.log(err);
});
