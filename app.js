const express = require('express');
const path = require('path');
const fs= require("fs");
const { isUtf8 } = require('buffer');
const app = express();


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/edit/:filename', (req, res) => {
   fs.readFile(`./hisab/${req.params.filename}`,"utf-8",function (err,filedata) {
      if (err) return res.status(500).send(err);
      res.render('edit',{filedata,filename:req.params.filename}); // Render the 'index.ejs' file  
   })
});
app.post('/update/:filename', (req, res) => {
   fs.writeFile(`./hisab/${req.params.filename}`,req.body.content,function (err) {
      if(err) return res.status(500).send(err);
      res.redirect("/")
    })
});
app.get('/hisaab/:filename', (req, res) => {
   fs.readFile(`./hisab/${req.params.filename}`,"utf-8",function (err,filedata) {
      if (err) return res.status(500).send(err);
      res.render('hisaab',{filedata,filename:req.params.filename}); // Render the 'index.ejs' file  
   })
});
app.get('/delete/:filename', (req, res) => {
   fs.unlink(`./hisab/${req.params.filename}`,function (err) {
      if (err) return res.status(500).send(err);
      res.redirect('/'); // Render the 'index.ejs' file  
   })
});

app.get('/', (req, res) => {
   fs.readdir(`./hisab`,function (err,files) {
      if (err) return res.status(500).send(err);
      res.render('index',{files:files}); // Render the 'index.ejs' file  
   })
});
app.get('/create',(req,res)=>{
 
res.render('create')
})
app.post('/createhisab',(req,res)=>{
   console.log (req.body);
  
  var currentDate= new Date();
  const time = `${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;
  var date=`${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}`;
  
 fs.writeFile(`./hisab/${date}_${time}.txt`,req.body.content,function (err) {
   if(err) return res.status(500).send(err);
   res.redirect("/")
 })
   
})
   


app.listen(3000, () => {
   console.log(`Server is running on http://localhost:3000`);
});

