const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs')
app.use(express.static('/public'))
// app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json())

// const mongoose = require('mongoose')
// const url = 'mongodb://127.0.0.1:27017/street-fighters'

// mongoose.connect(url, { useNewUrlParser: true })





const mongoConnection = 'mongodb+srv://guerra:guerra@cluster0.wkxix.mongodb.net/<dbname>?retryWrites=true&w=majority'


MongoClient.connect(mongoConnection, { useUnifiedTopology: true })  

    
    .then(client => {

      app.use(express.static(__dirname + '/public'))

        console.log('Connected to Database')

        const db = client.db('nodejs-blog')
        const quotesCollection = db.collection('quotes')

        app.use(bodyParser.urlencoded({ extended: true }))

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
              .then(result => {
                res.redirect('/')
              })
              .catch(error => console.error(error))
          })

          // app.get('/', (req, res) =>{            
          //   res.sendFile(__dirname + '/index.html')

            app.get('/', (req, res) => {
              db.collection('quotes').find().toArray()
              .then(results => {
                // console.log(results)
                res.render('index.ejs', {quotes : results})
              })  
              // const cursor = db.collection('quotes').find()
              // console.log(cursor)
            })


            app.put('/quotes', (req, res) => {
              console.log(req.body)
              quotesCollection.findOneAndUpdate( 
                { name: '' },
                { $set: {
                  name: req.body.name,
                  quote: req.body.quote
                }
              },
              {
                upsert: true
              }
            )
              .then(result => {
                res.json('Success')
                // console.log('Success')
              })
              .catch(error => console.error(error))
            })

            app.delete('/quotes', (req, res) => {
              quotesCollection.deleteOne(
                // { name: req.body.name }
                { id: req.body.deleteOne }

              )
              .then(result => {
                if (result.deletedCount === 0) {
                  return res.json('No quote to delete')
                }
                  res.json(`Deleted quote`)
                })
                .catch(error => console.error(error))
            })



          
            

          


       

          











          
          
          })
              .catch(error => console.error(error))

    app.listen(3000, function() {
        console.log('listening on 3000')
      })