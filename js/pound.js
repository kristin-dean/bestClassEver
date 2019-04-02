var poundP = d3.json("data/pound.json");

poundP.then(function(data)
{
  drawGraph(data);
},
function(err)
{
  console.log(err);
})

var drawGraph = function(data)
{
  var screen =
  {
    width:500,
    height:400
  };

  var svg = d3.select("svg")
              .attr("width",screen.width)
              .attr("height",screen.height)
  var margins =
  {
    top:10,
    bottom:40,
    left:10,
    right:100
  }

var width = screen.width - margins.left -margins.right;
var height = screen.height - margins.top -margins.bottom;

//transform data

var pound = data.puppies.map(function(d,i)
{
  return {
    puppy:data.puppies[i],
    kitten:data.kittens[i],
    day:i,
    pets:data.puppies[i]+data.kittens[i]
  }
});


//scales usually go here
var xScale = d3.scaleLinear()
          .domain([0,pound.length])
          .range([0,width]);
var yScale = d3.scaleLinear()
          .domain([0,d3.max(pound,function(d){return d.pets;})])
          .range([height,0]);

var colors = d3.scaleOrdinal(d3.schemeAccent);


//plot land
var plotLand = svg.append("g")
                  .classed("plot",true)
                  .attr("transform","translate("
                        +margins.left+","+margins.top+")");


//var makechart = function()??
console.log("pound",pound);

var puppies = plotLand.append("g")
  .attr("id","puppy");


  var dots =puppies.append("g")
   .attr("class","dots")
  .classed("hidden",true)
  .selectAll("circle")
  .data(pound)
  .enter()
  .append("circle")
  .attr("cx",function(d,i) {console.log(d,i);return xScale(i)})
  .attr("cy",function(d) { return yScale(d.puppy)})
  .attr("fill",colors("puppy"))
  .attr("r",6);


  var drawLine = d3.line()
              .x(function(d,i){return xScale(i)})
              .y(function(d) {return yScale(d.puppy)})
//              .curve(d3.curveCatmullRom)

  puppies.append("g").
  attr("class","line")
  .append("path")
  .datum(pound)
  .attr("d",drawLine)
  .attr("stroke",colors("puppy"))
  .attr("fill","none")

/*
  var drawArea = d3.area()
              .x(function(d,i){return xScale(i)})
              .y0(function(d) {return yScale(0)})
              .y1(function(d) {return yScale(d.puppy)})
  //            .curve(d3.curveCatmullRom)


  puppies.append("g").
  attr("class","area")
  .append("path")
  .datum(pound)
  .attr("d",drawArea)
  .attr("fill",colors("puppy"))

*/



//the legend....

var legend = svg.append("g")
                .classed("legend",true)
                .attr("transform","translate("+
                  (width+margins.left)+","+margins.top+")" );

var legendLines = legend.selectAll("g")
                .data(["puppy"])
                .enter()
                .append("g")
                .classed("legendLine",true)
                .attr("transform",function(d,i)
                      {return "translate(0,"+ (i*20)+")"; })
                .on("mouseout",function(d)
                  {
                    d3.select("#"+d+" .dots").classed("hidden",true)
                  })
                .on("mouseover",function(d)
                    {
                      d3.select("#"+d+" .dots").classed("hidden",false);
                    })
                .on("click",function(d)
                    {
                      var g = d3.select("#"+d);
                      var toggled = ! g.classed("hidden");
                      g.classed("hidden",toggled);

                      var me = d3.select(this);
                      var deselected = ! me.classed("deselected")
                      me.classed("deselected",deselected);
                    })



legendLines.append("rect")
      .attr("x",0)
      .attr("y",0)
      .attr("width",10)
      .attr("height",10)
      .attr("fill",function(d){return colors(d);})

legendLines.append("text")
    .attr("x",20)
    .attr("y",10)
    .text(function(d) {return d})


var xAxis = d3.axisBottom(xScale);

svg.append("g").classed("xAxis",true)
    .call(xAxis)
    .attr("transform","translate("+
    margins.left+","+(margins.top+height+10)+")")









}
