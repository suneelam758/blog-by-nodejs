const ex = require("express");
const app = ex();
const bp = require("body-parser");
var mysql = require('mysql');

app.use(bp.urlencoded({extended:true}));
var con = mysql.createPool({
    connectionLimit : 10, // default = 10
    host: "localhost",
    user: "root",
    password: "",
    database:"blogpro"
});
app.use(ex.static(__dirname+"/statics"));

/*app.get('/' , function(req,res){
   
    var sql = "SELECT * FROM dataa";
    con.query(sql,function(err,result){
        if(err) throw err;
        else
        res.render('welcome',{data:result});
    });
});*/
app.get('/' , function(req,res){
   
    var sql = "SELECT * FROM dataa";
    con.query(sql,function(err,result){
        if(err) throw err;
        else
        res.render('welcome',{data:result});
    });
});

app.get("/reg",function(req,res)
{
    res.sendFile(__dirname + "/htmlpages/reg.html");
});
app.get("/admin",function(req,res)
{
    res.sendFile(__dirname + "/htmlpages/admin.html");
});
app.get("/login",function(req,res)
{
    res.sendFile(__dirname + "/htmlpages/login.html");
});
//for welcome with the help of ejs

app.set('views','./view');
app.set('view engine', 'ejs');

//admin registratuion
app.post("/ad",function(req,res){
    
    let na = req.body.i1;
    let em = req.body.i2;
    let pa = req.body.i3
    con.getConnection(function(err){
        if (err) throw err;
        console.log("connected");
        var sql ="INSERT INTO admin (name, email, password) VALUES ('"+na+"','"+em+"','"+pa+"')";
        con.query(sql, function(err,result){
            if (err) throw err;
        });
    });
    res.send("Inserted");
});

//admin column
app.post("/ch",function(req,res){
    
    let pe = req.body.i1;
    let em = req.body.i2;

    con.getConnection(function(err){
        if (err) throw err;
        console.log("connected");
        var sql ="INSERT INTO dataa (title, data) VALUES ('"+pe+"','"+em+"')";
        con.query(sql, function(err,result){
            if (err) throw err;
        });
    });
    res.send("Inserted");
});


//admin login
app.post("/log" ,function(req,res)
{
    let c = req.body.i1;
    let pw = req.body.i2;

    
    
        con.query("SELECT * FROM admin WHERE name = '"+c+"' and password = '"+pw+"'", function (err, result) {
          if (err) throw err;
          else
          var sql = "SELECT * FROM dataa";
        con.query(sql,function(err,result){
            if(err) throw err;
            else
            res.render('print',{data:result});
        });
         // res.render('welcome' , {title:'hey' , Name:c});
        });
      });

      app.get('/list' , function(req,res){
   
        var sql = "SELECT * FROM dataa";
        con.query(sql,function(err,result){
            if(err) throw err;
            else
            res.render('print',{data:result});
        });
    });

    //edit query
    app.get("/edit",function(req,res)
{
            con.query("SELECT * FROM dataa WHERE id="+req.query["id"], function (err1, result) {
          if (err1) throw err1;
          else
          res.render('editd',{data:result});
        });
      });
      app.post("/upload",function(req,res){
        let c = req.body.i1;
        let em = req.body.i2;
        let id = req.body.t0;
        
            var sql = "update dataa set title='"+c+"',data='"+em+"' where id="+id;
            con.query(sql,function(err,result){
                if(err) throw err;
                else
                {
                    var sql = "SELECT * FROM dataa";
                    con.query(sql,function(err,result){
                        if(err) throw err;
                        else
                        res.render('print',{data:result});
                    });
                }
            });
    });

    //delete query
    app.get("/del",function(req,res)
{

    var sql = "delete from dataa where id="+req.query["id"];
    con.query(sql,function(err,result){
        if(err) throw err;
        else
        var sql = "SELECT * FROM dataa";
        con.query(sql,function(err,result){
            if(err) throw err;
            else
            res.render('print',{data:result});
        });
    });
});

app.listen(3011,function(req,res)
{
    console.log("server is running");
});