FROM openjdk:11.0.10-jre-slim-buster
ARG JAR_FILE=build/libs/*.jar
ENV JWT_SECRET_KEY="JWT_SECRET_KEY" \
    G_CLIENT_ID="G_CLIENT_ID"\
    G_CLIENT_SECRET="G_CLIENT_SECRET"\
    G_MAIL="G_MAIL"\
    G_PASSWORD="G_PASSWORD"
COPY ${JAR_FILE} /app/
ENTRYPOINT ["java","-jar","/app.jar"]
