# README #

This README would normally document whatever steps are necessary to get your application up and running.

### How to run ###

+ Enter into the folder and type
```bash
npm install
```
+ Then run the gulp task by typing
 ```bash
 gulp build
 ```
+ Enter in the project folder and run the *server.py* script by typing
```bash
 python server.py
```

+ Otherwise you could run project in Node js by typing
```bash
 gulp server:start
```
+ Connect to [http://localhost:8000](http://localhost:8000)

### Used Technologies ###

+ jQuery 3.1.0
+ jQuery DataTable 10.10.2
+ MaterializeCSS
+ Google Material Icons
+ FontAwesome 4.6
+ Native Javascript
+ Native CSS 3
+ HTML 5
+ Gulp


### Must to know ###

+ The table will automatically refresh every 30 seconds
+ The is pre-ordered by the *"Id"* column, but you could choose your preferred order by using the arrows
+ On the table are displayed most relevant information
+ By clicking on the "eye" a modal, with all event's detail, will appear
+ By passing the mouse over the "ellipses" of the descriptions a tooltip with the whole description will appear
+ By using the "Search" input you will filter the table on your query string ex 1:*"host.mac=0a:77:0e:13:2b:37"*, ex 2:*"docker"*.
+ By using the "Show" select you will see more or less table rows
+ By using the arrows near the columns title you will order ASC or DESC all the table