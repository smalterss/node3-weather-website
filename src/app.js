const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlesbarsa engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Justin Donn"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Justin Donn"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Justin Donn"
    })
})

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        } else {
            forecast(latitude, longitude, (error, wData) => {
                if (error) {
                    return res.send({error})
                } else {
                    res.send({
                        forecast: wData,
                        location,
                        address: req.query.address
                    })
                }
            })
        }

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error",
        errMsg: "Help Article not found",
        name: "Justin Donn"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error",
        errMsg: "404 Page not found",
        name: "Justin Donn"
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})

