var estaciones; 

d3.json("../data/estaciones_rank.json", function(error, json) {
  if (error) return console.warn(error);
  estaciones = json;  			

  var x = d3.scale.linear()
  .domain([0, d3.max(d3.values(estaciones))])
  .range([0, 500]);    

  d3.select(".estaciones-rank")
  .selectAll("div")
  .data(d3.values(estaciones))
  .enter().append("div").attr("class", "container");

  d3.selectAll("div.container") 
  .data(d3.keys(estaciones))
  .append("span")
  .attr("class", "label")            
  .text(function(d) { return d; }); 

  d3.selectAll("div.container")          
  .data(d3.values(estaciones))
  .append("div")
  .attr("class", "bar")
  .style("width", function(d) { return x(d) + "px"; });            

  d3.selectAll("div.container") 
  .data(d3.values(estaciones))
  .append("span")
  .attr("class", "number")            
  .text(function(d) { return d; });   
});