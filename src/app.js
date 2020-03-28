const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//****************************Config path for express**********************
const viewPath = path.join(__dirname, '../templates/views')
const publicDirPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')

//****************Setting up config for view and public*******************
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//-------------------Setting dir to be served as public---------------------
app.use(express.static(publicDirPath))


//-----------------------------Routes---------------------------------------
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Dr. Doofenshmirtz'
        
    })
});
app.get('/help', (req, res) => {
    res.render('help',{
        message: 'Help ME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        title: 'Help',
        name: 'Dr. Doofenshmirtz'
    })
})
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me !',
        name: 'Dr. Doofenshmirtz'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'location Not provided'
        })
    }

    geoCode(req.query.address, (error, data) => {
        if (error) {
            return res.send({error})
        }
        forecast(data, (error, location) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: location.forecast,
                location: location.address,
                address: req.query.address
            })

        })
    })

})
app.get('/help/*', (req, res) => {
    res.render('404Page', {
    title: 'Error :404 ',
    name: 'Dr. Doofenshmirtz',
    errorMessage: 'Help article Not Found'
    })
});
app.get('*', (req, res) => {
    res.render('404Page',{
            title: 'Error :404 ',
            name: 'Dr. Doofenshmirtz',
            errorMessage: 'Page Not Found'
    })
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});