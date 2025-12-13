FROM eclipse-temurin:21-alpine

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x mvnw
RUN mkdir -p /app/images && chmod -R 777 /app/images
COPY src src

RUN ./mvnw -B package -DskipTests

CMD ["./mvnw", "spring-boot:run"]