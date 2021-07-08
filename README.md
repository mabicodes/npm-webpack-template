### ( Cómo crear el proyecto )
#### Guía - jsrois
1. Crear una carpeta

```bash 
mkdir npm-webpack-template
cd npm-webpack-template
```

Después de crear la carpeta, podemos abrirla con IntelliJ

2. Dentro de la carpeta, inicializar el proyecto npm (esto crea un archivo `package.json`):

```bash
npm init -y
```

3. instalar las siguientes dependencias usando `npm install`:

```text
babel-loader
bootstrap
css-loader
html-webpack-plugin
jquery
mini-css-extract-plugin
node-sass
sass-loader
webpack
webpack-cli
```

4. Creamos un archivo `.gitignore` para no commitear por accidente las carpetas `.idea` y `node_modules`


5. Creamos un archivo `index.html` en una carpeta `src`. Añadimos lo siguiente:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Click!</title>
</head>
<body>
<div class="card">
    <p> Hola! Haz click en el botón para aumentar el contador </p>
    <button id="clicker">Click me!</button>
    <div id="counter"></div>
</div>
</body>
</html>
```

6. Creamos un archivo de estilos en `src/css/style.scss`:
```scss
.card {
  width: 300px;
  border: thin solid black;
  border-radius: 7px;
  box-shadow: black 1px 1px;
  margin: auto;
  padding: 10px;
}

#clicker {
  margin-bottom: 10px;
  &:hover {
    transform: translate(2px, 2px);
  }
}
```

7. Dentro de `src/js`, creamos dos archivos, `main.js` y `counter.js`.

`main.js` es el archivo principal de javascript, que utiliza jQuery y una clase `Counter` para incrementar un contador 
cada vez que pulsemos un botón.

```js
import $ from 'jquery';
import {Counter} from "./counter";

let counter = new Counter()

$(document).ready(function () {
    $('#counter').text("No clicks! Start clicking!")
})

$('#clicker').click(function () {
    $('#counter').text(`The count is ${counter.incrementAndReturn()}`)
})
```

`counter.js` contiene una **clase** que representa un "Contador". Cada vez que llamemos a la función `incrementAndReturn`, 
este objeto incrementará el contador y nos devolverá el número actual.

```js
export class Counter {
    constructor() {
        this.count = 0
    }

    incrementAndReturn() {
        return this.count++;
    }
}
```

### Webpack! 

8. Creamos un archivo de configuración para webpack, `webpack.config.js`. En este archivo añadimos la siguiente configuración:

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: [
        path.join(__dirname, 'src/js/main.js'),
        path.join(__dirname, 'src/css/style.scss')
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    resolve: {
        extensions: [".js", ".scss"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[fullhash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[fullhash].css'
        })
    ]

}
```

9. modificamos el archivo `package.json`, añadiendo el comando `build`:

```json
    "scripts": {
        "build": "webpack --mode=production"
    }
```


Esto significa que cuando hagamos `npm run build` se ejecutará webpack, que generará nuestra página web estática en la carpeta "build".
   

## Entendiendo el archivo `webpack.config.js`:

La configuración de webpack se escribe en este archivo de javascript.


Este bloque hace que webpack procese los archivos principales de Javascript y SCSS:
```js
    entry: [
        path.join(__dirname, 'src/js/main.js'),
        path.join(__dirname, 'src/css/style.scss')
    ]
```

Hace que el resultado de la compilación se genere en la carpeta "build", en un archivo `bundle.js`
```js
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'build'),
        clean: true
    }
```

La sección `rules` determina lo que queremos hacer con cada archivo. Los archivos `.js` son procesados por `babel-loader`,
un componente que _transpila_ (convierte) el código a una versión "clásica" de Javascript. Los archivos `.scss` se procesan
con varios loaders que terminan generando un solo archivo css.
```js
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
```


### Referencias

https://desarrolloweb.com/articulos/procesamiento-css-sass-webpack.html

https://desarrolloweb.com/articulos/html-webpack-plugin-inyectar-bundles.html

https://desarrolloweb.com/articulos/transpilado-javascript-webpack.html