
var dataP = d3.json("data/practice.json");

dataP.then(function(data)
{
  //just returns first object
  //{name: "bob", weight: 84, height: 167, age: 47}
  var weight = d3.max(data.subjects);
  console.log("no accessor",weight);

  //Sad, only returns the weight
  var weight = d3.max(data.subjects,function(d)
                      {return d.weight;});
  console.log("accessor", weight);

  //Built in accessor only does the equivelent of mapping the data first
  var mapped = data.subjects.map(function(d)
                      {return d.weight;});
  var weight = d3.max(mapped);
  console.log("mapped", weight);

  //so how to get maximum?

  //easiest way-ineffient
  //sort then grab
  //warning alters your data!!
  var sorted = data.subjects.sort(function(a,b) { return (a.weight - b.weight)});
  console.log("sort method",sorted[sorted.length-1]);

  //more efficient - use reduce
  //more complicated though
  var person = data.subjects.reduce(function(total,current)
  {
    if(total.weight > current.weight) { return total; }
    else                              { return current; }
  },data.subjects[0]);//initial value of max

  console.log("reduce method",person);








},
function(err)
{
  console.log("Error",err);
}
)
