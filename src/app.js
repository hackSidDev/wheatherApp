const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Path for express config
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Header Partials'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Header Partials'
  })
})

app.get('/about/team', (req, res) => {
  res.send('Team')
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
      return res.send({
          error: 'You must provide an address!'
      })
  }
 
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if(error){
        return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if(error){
          return res.send({ error })
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        })

      })
  })

})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not found'
  })
})

app.listen(port, () =>{
    console.log('App Running on:' + port)
})

  