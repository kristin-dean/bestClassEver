


var drawScreen = function(data)
{

  var width = 400;
  var height = 200;
  var barWidth = width/data.grades.length;
  console.log("drawing",data);

  d3.select("svg").selectAll("rect")
    .data(data.grades)
    .transition()
    .duration(1000)
    .attr("x",function(d,i)
    {
      return i * barWidth;
    })
    .attr("y",function(d)
    {
      return height - d.grade*2;
    })
    .attr("width",barWidth)
    .attr("height",function(d)
    {
      return d.grade*2;
    })
    .attr("fill",function(d)
    {
      return d.color;
    })






}

var initScreen = function(data,day)
{
  dayData = data[day];


  var width = 400;
  var height = 200;
  var barWidth = width/data.length;

  var svg = d3.select("svg")
              .attr("width",width)
              .attr("height",height);

console.log("init",svg,dayData.grades);
  svg.selectAll("rect")
  .data(dayData.grades)
  .enter()
  .append("rect");






  drawScreen(dayData);
}

var drawScreenButtons = function(day)
{

  d3.select("#prev")
  .on("click",function()
  {
    if(day>0) { drawScreenButtons(day-1); }
  });

  d3.select("#next")
  .on("click",function()
  {
    if(day<9) { drawScreenButtons(day+1); }
  });

  d3.select("#day").text(day);

  reDrawScreen(day);

}

//make a promise
var dataP = d3.json("data/gradeDataTime.json");
//pass 2 scrolls
dataP.then(function(data)
{

  console.log("data",data);
  initScreen(data,0);
  drawScreenButtons(0);

//  drawChart(data);
},
function(err)
{
  console.log(err);
}
)


var reDrawScreen = function(day)
{
  dataP.then(function(data)
  {
    console.log("data",data);
    drawScreen(data[day]);
  //  drawChart(data);
  },
  function(err)
  {
    console.log(err);
  }
  )

}
