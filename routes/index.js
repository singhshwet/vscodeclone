var express = require('express');
var router = express.Router();
var fs = require("fs")
var foldername = "uploads"

/* GET home page. */
router.get('/', function (req, res) {
    fs.readdir(foldername, {withFileTypes:true} ,function (err, data) {
        console.log(data)
        var arr=[];
        data.forEach(function(val){
            arr.push({name:val.name,isfolder:val.isDirectory()})
        })

        res.render("index", { files:arr, fname: foldername });

    })
});

router.get("/file/:same",function(req,res){
    fs.readdir(foldername, {withFileTypes:true} ,function (err, data) {
        fs.readFile(`./${foldername}/${req.params.same}`,"utf-8",function(err,fdata){

            var arr=[];
            data.forEach(function(val){
                arr.push({name:val.name,isfolder:val.isDirectory()})
            })
    
            res.render("file", { files:arr, fname: `${foldername}`,filename:req.params.same,fdata:fdata});
        })

    })

})

router.get("/delete/:something/:check",function(req,res){
    if(req.params.check == 0){
        fs.unlink(`./${foldername}/${req.params.something}`,function(err){
            if(err){
                console.log(err)
            }else{
                res.redirect("/")
            }
        })
    }else{
        fs.rm(`./${foldername}/${req.params.something}`, {force:true, recursive:true}, function(err){
            if(err){
                console.log(err)
            }else{
                res.redirect("/")
            }
        })
    }
})
router.get("/create",function(req,res){
    fs.writeFile(`./${foldername}/${req.query.filename}`,"",function(err){
        if(err) throw err
        res.redirect("/")
    })
})

router.get("/createfolder",function(req,res){
    fs.mkdir(`./${foldername}/${req.query.foldername}`,function(err){
        res.redirect("/")
    })
})
router.get("/close",function(req,res){
    res.redirect("/")
})

router.post('/save/:txtsave',function(req,res){
    fs.writeFile(`./${foldername}/${req.params.txtsave}`, req.body.txtfile, function(err){
        if(err) throw  err
        res.redirect('back')
    })
})

router.get('/rename/:something', function(req, res){
    fs.rename(`/${foldername}/${req.params.something}`, `/${foldername}/abcd.txt`, function(err){
        res.redirect('/');
    })
})


module.exports = router;
