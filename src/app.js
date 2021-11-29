// I've installed 'np, request@2.88.2' for the geocode() and forecast() in order for them to work.
const path = require('path')
const express = require('express') // (NPM module)Express is not an object this time but a function.
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) // registerPartials() Takes a path to the directory, where my partials live


// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

// rout handlers to render images:
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Oz Kook'
    })
})

app.get('/about',(req, res) => {
    res.render('about', { // 'about' and the others are the about.hbs. in express I just need to give the name of the file. without the path and the extention 
        title: 'About Me',
        name: 'Oz Kook'
    })
})

app.get('/help', (req, res) => {
    res.render('help', { // see '/about'
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Oz Kook'
    })
})

// The information on the query string lives in rep(The information is: ?key-value pair like ?search=games&rating=5). 
// query is an obj and it holds all the query information.

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
                })
            })
        })
    })
     
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Oz Kook',
        errorMessage: 'Help article not found'
     })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Oz Kook',
        errorMessage: 'Page not found'
    }) 
})

//The listen function (in the express library) sets up the server. 
//The first argument goes for the port. The second argument is a callback function.
app.listen(30002, () => { 
    console.log('server is up on port 30002')
})