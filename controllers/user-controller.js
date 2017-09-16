const User = require('../models/users');
const Movie = require('../models/movies');

module.exports = {
    
    readAll (req,res) {
        User.find().then( (users) =>{
             res.send(users);
        });
    },
    read (req,res) {
        const id = req.params.id;
        User.findById({_id:id}).then( (user) => {
             res.send({user});
        })
       
    },
    create(req,res){
        const name = req.body.name;
        const age = req.body.age;
        const user = new User({name, age});
        const movie = new Movie({title:"movie test",duration:'999'})
        user.movies.push(movie);
            user.save().then(() => {
               movie.save().then(()=>{ res.send({user});});
              
            });
    },
        
    delete(req,res){
         const id = req.body.id;
         User.findByIdAndRemove({_id:id}).then( (user) =>{
             res.send({user});
         }); 
    },

    oldest(req,res){
        User.find().sort({'age':-1}).limit(2).then( (user) => {
             res.send({user});
        });
    },

     youngest(req,res){
        User.find().sort({'age':1}).limit(2).then( (user) => {
             res.send({user});
        });
    },

    hasLongestMovie(req,res){
        User.findOne({},'name') // On ne recupera que le nom du user
        .populate({path: 'movies', options: { sort: { 'duration': -1 } } })
        .then( (user) => {
            res.send({user});
        })
    },
};