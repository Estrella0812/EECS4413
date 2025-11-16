FROM eclipse-temurin:21-alpine AS build

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN chmod +x mvnw

RUN ./mvnw -B dependency:go-offline

COPY src src

RUN ./mvnw -B package -DskipTests

FROM eclipse-temurin:21-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]