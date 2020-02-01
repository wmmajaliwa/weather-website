const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('..//utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express() //create express application

const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name:   'Wilfried'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Weather App | Help',
        name: 'Wilfried'
    })
})

app.get('/weather', (req, res) => {

    const search = req.query.address

    if(!search){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(search, (error, {longitude, latitude, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecastData
            })
          })
    })    
})

app.get('/products', (req, res) => {

    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App | About',
        name: 'Wilfried'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Weather App | 404',
        error: 'Help article not found.',
        name: 'Wilfried'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: 'Weather App | 404',
        error: 'Page not found.',
        name: 'Wilfried'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})