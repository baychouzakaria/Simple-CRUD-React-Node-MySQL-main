const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'articlesystem',
})

app.post('/create', (req, res) => {
  const name = req.body.name
  const code = req.body.code
  const description = req.body.description

  const sql1 = `INSERT INTO article (name, code, description,date,refstock,refmission) VALUES (?,?,?,CURRENT_DATE,(SELECT id FROM articlestock WHERE articlestock.codes='`
  const sql2 = `'),(SELECT id FROM mission WHERE id=(SELECT MAX(id) FROM mission)))`

  db.query(
    sql1.concat(code, sql2),
    [name, code, description],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Values Inserted')
      }
    },
  )
})

app.post('/starte', (req, res) => {
  const descm = req.body.descm
  db.query(
    'INSERT INTO mission(bool,date,descm) VALUES (1,CURRENT_DATE,?)',
    [descm],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Values Inserted')
      }
    },
  )
})

app.put('/stop', (req, res) => {
  db.query(
    'UPDATE mission SET bool=0 WHERE id=(SELECT MAX(id) FROM mission)',
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Values Inserted')
      }
    },
  )
})

app.get('/article', (req, res) => {
  db.query(
    'SELECT * FROM article where refmission=(select max(id) from mission)',
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    },
  )
})

app.get('/mission', (req, res) => {
  db.query('SELECT id,bool,date,descm FROM mission', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})
app.get('/articles', (req, res) => {
  db.query(
    'SELECT id, codes , names FROM articlestock s WHERE NOT EXISTS(SELECT code , codes FROM article a  WHERE a.code = s.codes AND (SELECT refmission=(select max(id) from mission ) )) ',
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    },
  )
})

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  db.query('DELETE FROM article WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.listen(3001, () => {
  console.log('Yey, your server is running on port 3001')
})
