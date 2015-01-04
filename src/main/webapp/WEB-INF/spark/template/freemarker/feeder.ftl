<html>
    <head>
        <#include "head.ftl">
        <title>Feeder Display for ${feeder}</title>    
    </head>
    <body>
    <#include "dpdc.ftl">
    <#include "navbar.ftl"> 
 
    <div class="container">            
        <h1>Feeder Display for ${feeder}</h1>  
        <table>             
         <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Box</th>                   
        </tr> 
        <#list rows as row>                        
        <tr>
            <td><a href="/asset/${row.id}">${row.id}</a></td>
            <td>${row.type} : ${row.fplID}</td>                   
        </tr>
        </#list>
        </table>
    </div>
    <#include "script.ftl">
    </body>
</html>