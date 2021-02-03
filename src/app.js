const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 8000
const static_path = path.join(__dirname, "../public")
const partial_path = path.join(__dirname, "../templates/partials")
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, "../templates/views"))
hbs.registerPartials(partial_path)
app.use(express.static(static_path))
app.get('/', (req, res)=>{
    res.status(200).render('index')
})
app.get('/weather', (req, res)=>{
    res.render('weather', {
        name : "shivam"
    })
})
app.get('*', (req, res)=>{
    res.render('404')
})
app.listen(port ,  ()=>{
    console.log(`Listening to port ${port}`)
})