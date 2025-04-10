# Requirements
- Docker
- JDK 17 + maven
- Nodejs
## For develop
### Run database with docker
```
cd <project folder>
docker compose up -d
```
### Run discovery-server
```
cd <project folder/discovery-server>
mvn install -DskipTests=true
java -jar -Xmx2048m -Xms256m /target/discovery-server-0.0.1-SNAPSHOT.jar
```
### Run chat-api
```
cd <project folder/chat-api>
mvn install -DskipTests=true
java -jar -Xmx2048m -Xms256m /target/chat-api-0.0.1-SNAPSHOT.jar
```
### Run chat-server
```
cd <project folder/chat-server>
mvn install -DskipTests=true
java -jar -Xmx2048m -Xms256m /target/chat-server-0.0.1-SNAPSHOT.jar
```
### Run ui
```
cd <project folder/ui>
npm install
npm start
```
then visit http://localhost:5173