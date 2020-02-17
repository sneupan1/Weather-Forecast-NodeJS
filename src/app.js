const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Defined paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get("/", (req, res) => {
    res.render("index.hbs", {
        title: 'weather app',
        name: "Saurav Neupane"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: 'About me',
        name: 'Saurav Neupane'
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        message: 'This is the dynamic help message',
        title: 'Help',
        name: 'Saurav Neupane'
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You did not provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You need to send a search query'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        errorMessage: "Help article not found",
        title: 404,
        name: 'Saurav'
    })
})

app.get("*", (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Saurav',
        errorMessage: "page not found"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})
