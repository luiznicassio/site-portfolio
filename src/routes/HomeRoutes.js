const express = require('express');
const routesHome = express.Router();

routesHome.get('/', (req,res)=>{
    res.render('home')
})

routesHome.get('/Projetos', (req,res)=>{
    res.render('projetos')
})

routesHome.get('/Sobre',(req,res)=>{
    res.render('sobreMin')
})

module.exports = routesHome;