/**
 * Created by Lich on 02.11.2016.
 */
var path = require('path');
var express = require('express');
var mongoose = require(path.join(global.root_path, 'libs/mongoose_driver'));
var image_saver = require(path.join(global.root_path, 'libs/image_saver'));

var router = express.Router();

router.get('/', function(req, res) {
    //return res.render('singer', { title: 'Express' });
    return mongoose.Singers.api.findAll().then(function(singers){
        res.locals.singers = singers;
        return res.render('singers', { singers: singers });
    });
});

router.post('/', function(req, res) {
    var singer = {
        name: req.body.name,
        description: req.body.description,
        songs: [] //req.body.images
    };

    return mongoose.Singers.api.save(singer).then(function(result){
        return res.send({ status: 'OK', singers: singer });
    });

});

router.get('/:id', function(req, res) {
    return mongoose.Singers.api.findById(req.params.id).then(function(result){
        return res.send({ status: 'OK', singers: result });
    });
});

router.put('/:id', function (req, res){
    var singer = {
        name: req.body.name,
        description: req.body.description,
        songs: [] //req.body.images
    };
    return mongoose.Singers.api.update(req.params.id, singer).then(function(result){
        return res.send({ status: 'OK', singers: result });
    });
});

router.delete('/:id', function (req, res){
    return mongoose.Singers.api.delete(req.params.id).then(function(result){
        return res.send({ status: 'OK', singers: result });
    });
});
router.post('/upload', image_saver, function(req, res){

    return res.send({ status: 'OK' });
});

module.exports = router;