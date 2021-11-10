const http = require('http')
const path = require('path')
const express = require('express');
const hbs = require('hbs')
const app = express()
const session = require('express-session')

app.use(express.json())
app.use(express.static('express'))

app.use(express.urlencoded({extended:false}))

app.set('view engine','hbs')

app.use('/public', express.static(path.join(__dirname,'public')))

hbs.registerPartials(__dirname + '/views/partials')

app.use(
    session(
        {
            cookie:{
                maxAge: 1000 * 60 * 60 * 2,
                secure: false,
                httpOnly: true,
            },
            sstore: new session.MemoryStore(),
            saveUninitialized: true,
            resave: false,
            secret: 'secretkey'
        }
        )
        )
        
        // set up flash message 
        app.use(function(request, response, next){
            response.locals.message = request.session.message
            delete request.session.message
            next()
        })

// get connection
const dbConnection = require('./connection/db')

var isLogin = false

app.get('/',function (request, response){
    const title = 'Dashboard'
    response.render('index', {
        title : title
    })
})


app.get('/mylist',function (request, response){
    let id = request.session.user.id
    
    const title = 'My Task'
    const query = `SELECT users_tb.username, task_tb.name, task_tb.id FROM task_tb INNER JOIN collections_tb on collections_tb.id = task_tb.collections_id INNER JOIN users_tb ON users_tb.id = collections_tb.user_id WHERE users_tb.id = 1 AND is_done = 1`
    const query1 = `SELECT users_tb.username, task_tb.name, task_tb.id FROM task_tb INNER JOIN collections_tb on collections_tb.id = task_tb.collections_id INNER JOIN users_tb ON users_tb.id = collections_tb.user_id WHERE users_tb.id = ${id} AND is_done = 0`
    const query2 = `SELECT * FROM collections_tb`

    dbConnection.getConnection(function (err, conn) {
     if (err) throw err;
 
     conn.query(query, function (err, results) {
       if (err) throw err
 
       const taskDone = []
       for (let result of results) {          
        taskDone.push({
           id: result.id,
           name: result.name,
           username: result.username
         })
       }

       

     conn.query(query1, function (err, results) {
        if (err) throw err
  
        const taskProgress = []
        for (let result of results) {
        taskProgress.push({
            id: result.id,
            name: result.name,
          })
        }

        conn.query(query2, function (err, results) {
            if (err) throw err
      
            const listCollection = []
      
            for (let result of results) {
            listCollection.push({
                id: result.id,
                name: result.name,
              })
            }
            response.render('myList', {
              title: title,
              isLogin: request.session.isLogin,
              taskProgress,
              taskDone,
              listCollection
         })
      })
    })
    })
     dbConnection.releaseConnection(conn)
   })
})

app.post('/add-task',function (request, response){
    const {task, listCollection} = request.body
    let is_done = 0

    if(task == '' || listCollection == '') {
        request.session.message = {
            type : 'danger',
            message : 'Please insert all data'
        }
        response.redirect('/myList')
    }

    const query = `INSERT INTO task_tb (name,is_done,collections_id) VALUES ("${task}",${is_done},${listCollection})`
    dbConnection.getConnection(function(err, conn){
        if(err) throw err
        request.session.message = {
            type : 'success',
            message : 'You Task Success Registerd'
        }

        conn.query(query, function(err, results){
            if(err) throw err

            response.redirect('/mylist')
            
        })
        dbConnection.releaseConnection(conn)
    })
})

app.get('/detail-collection/:id',function (request, response){
    let idUser = request.session.user.id
    const id = request.params.id
    const title = 'Detail By Collection'
    
    const query = `SELECT task_tb.name FROM task_tb INNER JOIN collections_tb on collections_tb.id = task_tb.collections_id INNER JOIN users_tb ON users_tb.id = collections_tb.user_id WHERE task_tb.collections_id = ${id} AND users_tb.id = ${idUser} AND is_done = 1`
    const query2 = `SELECT task_tb.name FROM task_tb INNER JOIN collections_tb on collections_tb.id = task_tb.collections_id INNER JOIN users_tb ON users_tb.id = collections_tb.user_id WHERE task_tb.collections_id = ${id} AND users_tb.id = ${idUser} AND is_done = 0`

    dbConnection.getConnection(function (err, conn) {
     if (err) throw err;
 
     conn.query(query, function (err, results) {
       if (err) throw err
 
       const detailCollectDone = []
 
       for (let result of results) {
        detailCollectDone.push({
           id: result.id,
           name: result.name,
         })
       }

       
        conn.query(query2, function (err, results) {
        if (err) throw err
  
        const detailCollectProgress = []
  
        for (let result of results) {
            detailCollectProgress.push({
            id: result.id,
            name: result.name,
          })
        }  
        response.render('detailTaskCollection', {
            title: title,
            isLogin: request.session.isLogin,
            detailCollectDone,
            detailCollectProgress
        })
    })
     dbConnection.releaseConnection(conn)
   })
})
})

app.get('/mylist/is-done/:id',function (request, response){
    // let idUser = request.session.user.id
    const id = request.params.id
    
    const query = `UPDATE task_tb SET is_done = 1 WHERE id = ${id}`

    dbConnection.getConnection(function (err, conn) {
     if (err) throw err;
 
     conn.query(query, function (err, results) {
       if (err) throw err
 
       response.redirect('/myList')
    })
     dbConnection.releaseConnection(conn)
   })
})


app.get('/mylist/delete-task/:id',function (request, response){
    // let idUser = request.session.user.id
    const id = request.params.id
    
    const query = `DELETE FROM task_tb WHERE id = ${id}`

    dbConnection.getConnection(function (err, conn) {
     if (err) throw err;
 
     conn.query(query, function (err, results) {
       if (err) throw err
 
       response.redirect('/myList')
    })
     dbConnection.releaseConnection(conn)
   })
})







app.get('/login',function (request, response){
    const title = 'Login'
    response.render('login', {
        title : title
    })
})

app.get('/signup',function (request, response){
    const title = 'Sign Up'
    response.render('signup', {
        title : title,
    })
})

app.post('/signup',function (request, response){
    const {username, email, password} = request.body

    if(username == '' || email == '' || password == '') {
        request.session.message = {
            type : 'danger',
            message : 'Please insert all data'
        }
        response.redirect('/signup')
    }

    const query = `INSERT INTO users_tb (username,email,password) VALUES ("${username}","${email}","${password}")`
    dbConnection.getConnection(function(err, conn){
        if(err) throw err
        request.session.message = {
            type : 'success',
            message : 'You Account Success Registerd'
        }

        conn.query(query, function(err, results){
            if(err) throw err

            response.redirect('/signup')
            
        })
        dbConnection.releaseConnection(conn)
    })
})


app.post('/login', function (request, response) {
    const { email, password } = request.body
  
    if (email == '' || password == '') {
      request.session.message = {
        type: 'danger',
        message: 'Please insert all data'
      }
      response.redirect('/login')
    }
  
    const query = `SELECT *, MD5(password) AS password FROM users_tb WHERE email = "${email}" AND password="${password}"`
    dbConnection.getConnection(function (err, conn) {
      if (err) throw err;
  
      conn.query(query, function (err, results) {
        if (err) throw err
  
        if (results.length == 0) {
          request.session.message = {
            type: 'danger',
            message: 'Email and password doesnt exist or match'
          }
          response.redirect('/login')
        } else {
          request.session.message = {
            type: 'success',
            message: 'You are logged'
          }
  
          request.session.isLogin = true;
  
          request.session.user = {
            id: results[0].id
          }
        }
        response.redirect('/mylist')
      })
      dbConnection.releaseConnection(conn)
    })
  });


app.get('/logout', function(request, response){
    request.session.destroy()
    response.redirect('/')
})


app.get('/mytask', function(request, response){
    const title = 'List Task'
    response.render('myTask', {
        title : title,
    })
})

const port = 3000
const server = http.createServer(app)
server.listen(port)