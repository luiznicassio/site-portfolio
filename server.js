const express = require('express')
const app = express()
const { engine } = require("express-handlebars");
const path = require("path");

// Configuração 
// Handlebars
app.engine("handlebars", engine({  
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "src/views/layouts"),
    partialsDir: path.join(__dirname, "src/views/partials"),
    helpers: {
        section: function(name, options){ // Corrigido o typo 'opitions' para 'options'
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src/views"));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "src/public")));

// Import de rotas 
const homeRoutes = require('./src/routes/HomeRoutes')
app.use("/home", homeRoutes)

app.get('/', (req, res) => {
    res.send("ola mundo")
})

// AJUSTE PARA A VERCEL: Só liga o servidor localmente se não estiver na produção da Vercel
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log(`App rodando localmente em http://localhost:${port}/home`))
}

// Exporta o app para a Vercel tratá-lo como uma Serverless Function
module.exports = app;