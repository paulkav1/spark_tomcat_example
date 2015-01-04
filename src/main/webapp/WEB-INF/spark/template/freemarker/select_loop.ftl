        <#list rows as row>                        
            <tr><td><a href="/sub/${row.sub}">${row.sub}</td></tr>      
            <#list row.feeders as feeder>
            <tr><td>${feeder}</td> 
                <td><a href="/feeder/${feeder}">List </a></td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td><a href="/diagram/${feeder}"> Draw</a></td>              
            </tr>                 
            </#list>
        </#list>