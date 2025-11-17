FROM eclipse-temurin:21-alpine

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x mvnw

RUN ./mvnw -B package -DskipTests

COPY src src

CMD ["./mvnw", "spring-boot:run"]