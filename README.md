This is an example of using the Spark framework with an external server instead of the embedded jetty engine.

You will need to have gradle installed.

Run "Gradle war" from the root to build a WAR file and drop into a Tomcat (or other web container) webapps directory.

Then run localhost:8080/Hello-1.0/hello

Running /free does not work as it does not find the "select.ftl" file for some reason.
