const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true }, function(err) {
    if (err) {
        console.log('Error: ', err);
        return;
    } 
    console.log('MONGODB IS CONNECTED!');
});

const UserSchema = new mongoose.Schema({
    username: { type: String, default: '' },
    password: { type: String, default: '' }
    
});
const animalSchema = new mongoose.Schema ({
    animal: { type: String, dafault: '' },
    Name: { type: String, dafault: '' },
    
}); 


const User = mongoose.model('UserSchema', UserSchema);
const animal  = mongoose.model('AnimalSchema', animalSchema);

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
// tell view engine to use ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'));

app.get('/signup', function(req, res) {
    User.find({}, function(err, results){
        if (err){
            res.json({
                confirmation:'failure',
                message:err
});
return;
        }
     res.render('index', {users: result});
    return;
})
});

app.post('/signup', function(req, res) {
    User.create(req.body, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'Failure',
                message: err
            });
        }
        res.json({
            confirmation: 'success',
            data: result
        });
    });
});


 

app.post('/createanimal', function(req, res) {
    animal.create(req.body, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'Failure',
                message: err
            });
        }
        res.json({
            confirmation: 'success',
            data: result
        });
    });
});
    

app.get('*', function(req, res) {
    res.send('Page does not exist. Check your url');
});


app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server is now running on PORT ${port}`);
});
