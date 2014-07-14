var estacionesTotal, estacionesOrigen, estacionesDestino; 
var estacionesNombres;
var totalViajes, origenViajes, destinoViajes;

d3.json("../data/estaciones_rank.json", function(error, json) {
  if (error) return console.warn(error);
  // Parse JSON data
  estacionesTotal = json.TOTAL;  			  
  estacionesOrigen = json.ORIGEN;
  estacionesDestino = json.DESTINO;
  estacionesNombres = d3.keys(estacionesTotal);
  totalViajes = d3.values(estacionesTotal);
  //TODO: representar abajo de total viajes los de origen y los de destino
  origenViajes = d3.values(estacionesOrigen);
  destinoViajes = d3.values(estacionesDestino);

  var x = d3.scale.linear()
  .domain([0, d3.max(totalViajes)])
  .range([0, 500]);    

  // Container para cada fila (estacion)
  d3.select(".estaciones-rank")
  .selectAll("div")
  .data(totalViajes)
  .enter().append("div").attr("class", "container");

  // Nombre de las estaciones
  d3.selectAll("div.container") 
  .data(estacionesNombres)
  .append("span")
  .attr("class", "label")            
  .text(function(d) { return d; }); 

  // Barra representando numero de viajes
  d3.selectAll("div.container")          
  .data(totalViajes)
  .append("div")
  .attr("class", "bar")
  .style("width", function(d) { return x(d) + "px"; });            

  // Numero de viajes
  d3.selectAll("div.container") 
  .data(totalViajes)
  .append("span")
  .attr("class", "number")            
  .text(function(d) { return d; });   
});