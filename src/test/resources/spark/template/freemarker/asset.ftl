<html>
<head>
    <#include "head.ftl">
    <title>Asset Details for {row.id}</title>        
</head>
<body>
<#include "dpdc.ftl">
<#include "navbar.ftl"> 
    <div class="container">              
        <h1>Asset Details for {row.id}</h1>  
        <ul>
            <li>ID: ${row.id}</li> 
            <li>Type: ${row.type}</li> 
            <li>FPL ID: ${row.fplID!}</li>
            <li>Class: ${row.fplClass!}</li>
            <li>Phases: ${row.phases!}</li>  
            <li>Open? ${row.isOpen?c!}</li>           
            <li>Address: ${row.addr!}</li> 
            <#list row.pointList as point> 
            <li>Geo: [${point[0]?c!}, ${point[1]?c!}],</li>                            
            </#list>                    
        </ul>                     
    </div>   
<#include "script.ftl">
</body>
</html>