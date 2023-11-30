import express from 'express'
import bodyParser from 'body-parser';
import { getNotes, getNote , createPost} from './models/database.js';
const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT);
app.use(express.static("public"))
app.set('view engine','ejs');

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
    const notes = await getNotes()
    res.render('display',{notes:JSON.stringify(notes)});
});

app.get('/edit',(req,res)=>{
    res.render('blog');
});

app.get('/blogs',async (req,res)=>{
    const notes = await getNotes()
    res.render('display',{notes:JSON.stringify(notes)});

});


app.get('/notes',async (req,res)=>{
    const raw = req.query.raw;
    const notes = await getNotes()
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
    const note = await getNotes(id)
    res.send(note);
})


app.use((err,req,res,next) =>{
    console.error(err.stack);
    res.status(500).send('Something went wrong');
})