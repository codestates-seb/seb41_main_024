FROM openjdk:11.0.10-jre-slim-buster
ENV JWT_SECRET_KEY="JWT_SECRET_KEY" \
    G_CLIENT_ID="G_CLIENT_ID"\
    G_CLIENT_SECRET="G_CLIENT_SECRET"\
    G_MAIL="G_MAIL"\
    G_PASSWORD="G_PASSWORD"
COPY build/libs/ngether-0.0.1-SNAPSHOT.jar /app/app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]
