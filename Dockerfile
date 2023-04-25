FROM openjdk:11.0.10-jre-slim-buster
ENV JWT_SECRET_KEY="JWT_SECRET_KEY" \
    OPENAI_KEY="OPENAI_KEY"\
    G_CLIENT_ID="G_CLIENT_ID"\
    G_CLIENT_SECRET="G_CLIENT_SECRET"\
    G_MAIL="G_MAIL"\
    G_PASSWORD="G_PASSWORD"
COPY . app/
WORKDIR /app
RUN ls -al
CMD ["java","-jar","app.jar"]
