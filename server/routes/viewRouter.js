const viewRouter = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Image = mongoose.model('Image');
const Experience = require('../models/experienceModel');
const conn = mongoose.createConnection(process.env.DATABASE);
let gfs;
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const Pdf = require('../models/pdfModel');
const Course = require('../models/courseModel');
conn.once('open',() => {
    //Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

viewRouter.get('/:id',function(req,res,next){
    console.log(req.params);

    User.findById(req.params.id)
        .then(function (user) {

            if (!user) {
                return res.sendStatus(401).send('The user does not exist.');
            }

            return res.json(user.toAuthJSON());
        })
        .catch(next);


});
viewRouter.get('/:id/image',function(req,res,next){
    User.findById(req.params.id).then(function(user){
        if (!user){
            return res.sendStatus(401).send('The user does not exist.');
        }
        Image.find({user: user._id, type: { $exists: false }}).distinct('fileId').then(function(image){
            console.log(image);
            gfs.files.find({_id: {$in: image}}).toArray((err,files)=>{
                if(!files || files.length ===0){
                    return res.json({
                        files: false
                    });
                }else{
                    files.map(file=>{
                        if(file.contentType ==="image/jpeg" || file.contentType === 'image/png')
                        {
                            file.isImage = true;
                        } else {
                            file.isImage = false;
                        }
                    });
                    var imgObj = [];
                    for(file of files){
                        if(file.isImage){
                            imgObj.push(file);
                        }
                    }
                    return res.json({'files':imgObj});
                }
            });
        });
    });

})

viewRouter.get('/:id/pdf',function(req,res){
    User.findById(req.params.id).then(function (user) {
        if (!user) {
            return res.sendStatus(401).send('The user does not exist.');
        }
        const result = [];
        Pdf.find({user: user._id}).then((pdfs) => {
            for (ele of pdfs) {
                result.push({
                    originalname: ele.originalName,
                    getFileLink: '/api/pdf/' + ele.filename,
                    deleteFileLink: '/pdf/' + ele.fileId,
                    date : ele.date,
                    title: ele.title
                });
            }
            return res.json({pdfs: result});
        });
    });
})


viewRouter.get('/:id/avatar',function(req,res){
    User.findById(req.params.id).then(function(user){
        if (!user){
            return res.sendStatus(401).send('The user does not exist.');
        }
        Image.find({user: user._id, type: 'avatar'}).distinct('fileId').then(function(image){
            gfs.files.find({_id: {$in: image}}).toArray((err,files)=>{
                if(!files || files.length ===0){
                    return res.json({
                        files: false
                    });
                }else{
                    files.map(file=>{
                        if(file.contentType ==="image/jpeg" || file.contentType === 'image/png')
                        {
                            file.isImage = true;
                        } else {
                            file.isImage = false;
                        }
                    });
                    var imgObj = [];
                    for(file of files){
                        if(file.isImage){
                            imgObj.push(file);
                        }
                    }
                    return res.json({'files':imgObj});
                }
            });
        });
    });
})

viewRouter.get("/:id/experience", async (req,res)=>{
    User.findById(req.params.id).then(async function(theuser){
        const experiences = await Experience.find({user:theuser._id});
        if(experiences){
            return res.send(experiences);
        }else{
            return res.send("no");
        }
    });
});
var _ = require('underscore');
viewRouter.get('/:id/course',(req,res)=>{
    User.findById(req.params.id).then(async (user)=>{
        const course = await Course.find({user:user});
        //console.log(_.groupBy(course,"year"));
        return res.json({"course":_.groupBy(course,"year")});
    })
});


module.exports = viewRouter;
