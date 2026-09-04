# Stage 1: Build file JAR bằng Maven
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
# Tải dependencies trước để tận dụng Docker cache layer
COPY settings.xml .
RUN mvn dependency:go-offline -B -s settings.xml
COPY src ./src
RUN mvn clean package -DskipTests -s settings.xml

# Stage 2: Chạy ứng dụng với JRE nhẹ
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]