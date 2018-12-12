import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import task from './app/routes/task';
import db from './app/utils/connection'

const PORT = 3000

const app = express()

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use('/task', task)

app.get('*', (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404
  })
});

app.listen(PORT, (err) => {
  if(err) { console.error(err) }
  else { console.info(`\n API running on ${PORT}\n`) }
});
