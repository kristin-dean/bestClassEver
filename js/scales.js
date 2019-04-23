var scale = d3.scaleBand()
    .domain(["rock","dog","cow"])
    .range([0,100]);
console.log("scale",scale("rock"),scale("dog"),
             scale("cow"));
console.log("width",scale.bandwidth());
scale.padding(.25);
console.log("width with padding",scale.bandwidth());
