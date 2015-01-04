<!doctype html> 
<html> 
<head>  
<#include "head.ftl">
 <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />     
<title>Substation Diagram ${sub}</title>             
</head>
<body> 
<#include "dpdc.ftl">
<#include "navbar.ftl"> 
  <div id="chyron"></div>  
 <h1>Network Diagram for Substation ${sub}</h1>
  <div id="map" style="width: 1600px; height: 900px"></div> 
<#include "script.ftl"> 
<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script> 
<script type="text/javascript">
<#include "leaflet_canvas_layer.js"> 
<#include "subdiagram.js"> 
</script>
</body> 
</html> 