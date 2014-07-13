<?php

$user = 'pili';
$pass = '5Gonz4lol';

// Connect to database
$link = mysql_connect('localhost:/tmp/mysql.sock', $user,  $pass);
if (!$link) {
    die('Could not connect: ' . mysql_error());
}

if (!mysql_select_db('bicisBA', $link)) {
    echo 'Could not select database';
    exit;
}

// Formulate query - ESTACIONES DE ORIGEN
$query = sprintf(
	"SELECT COUNT(trip_id), origen_nombre 
	 FROM recorridos_2013
	 GROUP BY origen_nombre
	 ORDER BY COUNT(trip_id) DESC"
	 );

// Perform query
$result = mysql_query($query);

// Check result
if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $query . "\n";
    die($message);
}

$estaciones_origen = array();
// Use result
while ($row = mysql_fetch_assoc($result)) {    
    $estaciones_origen[$row['origen_nombre']] = $row['COUNT(trip_id)'];   
}

mysql_free_result($result);

// Formulate query
$query = sprintf(
	"SELECT COUNT(trip_id), destino_nombre 
	 FROM recorridos_2013
	 GROUP BY destino_nombre
	 ORDER BY COUNT(trip_id) DESC"
	 );

// Perform query
$result = mysql_query($query);

// Check result
if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $query . "\n";
    die($message);
}

$estaciones_destino = array();
// Use result
while ($row = mysql_fetch_assoc($result)) {    
    $estaciones_destino[$row['destino_nombre']] = $row['COUNT(trip_id)'];   
}

mysql_free_result($result);

$estaciones_total = array();
foreach ($estaciones_destino as $estacion => $destino_count) {
    $estaciones_total[$estacion] = $estaciones_origen[$estacion] + $destino_count;
  }

header("Content-Type: application/json");
echo json_encode($estaciones_total);

mysql_close($link);

?>