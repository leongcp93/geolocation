/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list:function(req,res){
        Article.find({}).exec(function(err, article){
            if (err){
                res.send(500, {error: 'Database Error'});
            }
           
            res.view('list',{article:article});
        });

        
    },
    add:function(req,res){
        res.view('add');
    },
    create:function(req,res){
        var title = req.body.title;
        var body = req.body.body;

        Article.create({title:title, body:body}).exec(function(err){
           if (err){
               res.send(500, {error: 'Database Error'});
           } 

           res.redirect('/article/list');
        });
    },
    delete: function(req, res){
        Article.destroy({id:req.params.id}).exec(function(err){
            if (err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/article/list');
        });

        return false;
    },

    edit: function(req, res){
        Article.findOne({id:req.params.id}).exec(function(err,article){
            if (err){
                res.send(500, {error: 'Database Error'});
            }

            res.view('edit', {article:article});
        });
    },

    update: function(req, res){
        var title = req.body.title;
        var body = req.body.body;

        Article.update({id: req.params.id},{title:title, body:body}).exec(function(err){
           if (err){
               res.send(500, {error: 'Database Error'});
           } 

           res.redirect('/article/list');
        });

        return false;
    }
};

