

var link = "https://ghibliapi.herokuapp.com/species?classification=Mammal"




var dataP = d3.json(link);

dataP.then(function(data)
{
  console.log(data);

  d3.select("body")
  .selectAll("h1")
  .data(data)
  .enter()
  .append("h1")
  .text(function(d){return d.name+"  "+d.classification})
})
