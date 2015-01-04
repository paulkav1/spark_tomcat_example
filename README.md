This is an example of using the Spark framework with an external server instead of the embedded jetty engine.

To build, you will need to have gradle installed. Run "Gradle war" from the root to build a WAR file and drop into a Tomcat (or other web container) webapps directory.

Or you can grab the built "war" file from /build and drop it anyway.

Tomcat will deploy it. Then point a browser at localhost:8080/Hello-1.0/hello

Running /free does not work as it does not find the "select.ftl" file for some reason.
