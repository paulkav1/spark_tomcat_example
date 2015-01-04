<html>
    <head>
        <#include "head.ftl">
        <title>Feeders by Substation</title>    
    </head>
    <body>
    <div class="container">     
    <div id="table">       
        <h1>Select a Feeder</h1>  
        <table>             
         <tr>
            <th>Feeders by Substation</th>                   
        </tr> 
        <h2>${msg}</h2>
        </table>
    </div>
    <div id="tree">
 <canvas width=640 height=480 id="mycanvas">
  HTML5 canvas is not available: please get a more modern browser!
 </canvas>  
 </div>    
</div> 
<#include "script.ftl">
<script>
<#include "tree.js">
</script>  
</body>
</html>