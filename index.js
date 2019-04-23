const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const checkAge = (req, res, next) => {
  const age = req.query.age

  if (age === '' || age === undefined || isNaN(age)) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  const age = req.body.age

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  }

  return res.redirect(`/minor?age=${age}`)
})

app.get('/major', checkAge, (req, res) => {
  return res.render('response', {
    message: `Você é maior de idade e possui ${req.query.age} anos.`
  })
})

app.get('/minor', checkAge, (req, res) => {
  return res.render('response', {
    message: `Você é menor de idade e possui ${req.query.age} anos.`
  })
})

app.listen(3000)
