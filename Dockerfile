# использовать базовый контейнер ubuntu precise
FROM registry.ape.yandex.net/ubuntu:precise

RUN apt-get update && apt-get install -y nodejs-0.12

# добавить в контейнер текущую директорию с приложением по пути /app
# так, что main executable будет по пути /app/coke-example.js
ADD . /app 
