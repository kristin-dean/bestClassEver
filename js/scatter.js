


var gradesP = d3.json("data/gradeData.json");

gradesP.then(function(data)
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
      height:300
  }

  var svg = d3.select("svg")
    .attr("width" ,screen.width)
    .attr("height",screen.height)


  var margins =
  {
    top:40,
    bottom:40,
    left:40,
    right:70
  }
  var width = screen.width - margins.left-margins.right;
  var height = screen.height - margins.top - margins.bottom;

  //based off of number of grades
  var xScale = d3.scaleLinear()
    .domain([0,data[0].grades.length])
    .range([0,width]);
  var yScale = d3.scaleLinear().domain([0,100]).range([height,0]);

  var colors = d3.scaleOrdinal(d3.schemeAccent);
//plot data here
  var plot = svg.append("g")
                .classed("plot",true)
                .attr("transform","translate("+margins.left+","+margins.top+")");

  var students = plot.selectAll('g') //for each student
      .data(data)
      .enter()
      .append("g");

students.selectAll('circle')
  .data(function(d) { return d.grades;})
  .enter()
  .append("circle")
  .attr("r",5)
  .attr("cx",function(d,i) { return xScale(i)})
  .attr("cy",function(d) { return yScale(d)});

students//set the fill on the group, not the circles
  .attr("fill",function(d){ return colors(d.name)});

  data.forEach(function(d)
  {
      console.log(d.name,colors(d.name));
  })

var legend = svg.append("g")
  .classed("legend","true")
  .attr("transform","translate("+(screen.width-margins.right)+","+
                                margins.top+")");

//legend
var legendLines = legend.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform",function(d,i)
    {
      return "translate("+0+","+i*20+")"
    });

    legendLines.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width",10)
        .attr("height",10)
        .attr("fill",function(d) {return colors(d.name)});


    legendLines.append("text")
        .attr("x",20)
        .attr("y",10)
        .text(function(d){return d.name})
        .attr("fill","white");

//axes

var xAxis = d3.axisBottom(xScale);
svg.append("g").classed("xAxis",true)
  .call(xAxis)
  .attr("transform","translate("+margins.left+","+(height+margins.top+10)+")")



var yAxis = d3.axisLeft(yScale);
  svg.append("g").classed("yAxis",true)
    .call(yAxis)
    .attr("transform","translate("+(margins.left-10) +","+margins.top+")");





}
