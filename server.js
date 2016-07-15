
// referenced from:http://zellwk.com/blog/crud-express-mongodb/

const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
var db
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

MongoClient.connect('mongodb://chelimin:password@ds015584.mlab.com:15584/chquotes', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/quotes', (req, res) => {
  db.collection('quotes').findOneAndUpdate({name: 'yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1}, //search through db, starting fr newest entry
    upsert: true
    //insert (or save) if no entries are found
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
      console.log("updated")
  })
})

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
    {sort: {_id: -1},
  },
  (err, result) => {
    if (err) return res.send(err)
    res.send('A Darth Vadar quote got deleted')
    console.log('deleted')
  })
})
