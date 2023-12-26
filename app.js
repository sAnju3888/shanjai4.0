
const { createPost, getNotes } = require('./models/database.js');
 var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/home',(req,res)=>{
    res.render('home');
});


app.get('/project',(req,res)=>{
    res.render('project');
});

app.get('/bio',(req,res)=>{
    res.render('bio');
});
app.get('/task',(req,res)=>{
    res.redirect("https://sanju3888.github.io/hash_tasks/");
});


app.post('/submit',async(req,res)=>{
    const ins = await createPost(req.body.topicName, req.body.topicHeading, req.body.topicContent);
    res.redirect('/view-all');
});


app.get('/view-all',async (req,res)=>{
    const notes = await getNotes();
    res.render('display',{notes:JSON.stringify(notes)});
});

app.get('/edit',(req,res)=>{
    res.render('blog');
});

app.get('/blogs',async (req,res)=>{
    const notes = await getNotes();
    res.render('display',{notes:JSON.stringify(notes)});

});


app.get('/notes',async (req,res)=>{
    const raw = req.query.raw;
    const notes = await getNotes();
    //res.send(notes);
    if(raw){
        res.send(notes);
    }
    else{
        res.render('display', { notes });
    }
    
})

app.get('/notes/:id',async (req,res)=>{
    const id = req.params.id;
    const note = await getNotes(id);
    res.send(note);
})


app.use((err,req,res,next) =>{
    console.error(err.stack);
    res.status(500).send('Something went wrong');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
