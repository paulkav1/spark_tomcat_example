import static spark.Spark.*;
import spark.servlet.SparkApplication;
import java.util.HashMap;
import java.util.Map;
import spark.ModelAndView;
import spark.template.freemarker.FreeMarkerEngine;

public class Hello implements SparkApplication{

    public void init() {
        get("/hello", (request, response) -> {
        	return "Hello World!";          
    	}); 

        get("/free", (request, response) -> {
    		Map<String, Object> model = new HashMap<String, Object>();  
            model.put("msg", "Here is a message");              
            return new ModelAndView(model, "select.ftl");
            }, new FreeMarkerEngine()); 

    }   
}