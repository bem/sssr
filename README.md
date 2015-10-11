Сайт с нуля на полном стеке БЭМ-технологий.

Оригинал статьи опубликован в <a href="//habrahabr.ru/company/yandex/blog/251473/">блоге Яндекса</a> на Хабрахабр.

Для запуска склонируйте проект, перейдите в директорию проекта:

```
> cd sssr/
```

Установите `npm` зависимости:

```
> npm i
```

Соберите проект:
```
> ./node_modules/enb/bin/enb make
```

И запустите собранный `index.node.js`:

```
> node ./desktop.bundles/index/index.node.js
```

Откройте страницу [localhost:3000](http://localhost:3000)

Всем БЭМ.
