# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven build artifact (JAR file) into the container
COPY target/petproject-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# environment variable , you provide the valute at run time like docker run -e SPRING_PROFILES_ACTIVE=dev

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]