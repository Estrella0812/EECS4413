FROM eclipse-temurin:21-alpine

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x mvnw

COPY src src

RUN ./mvnw -B package -DskipTests

CMD ["./mvnw", "spring-boot:run"]