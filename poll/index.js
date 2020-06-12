const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3500;
app.set('view engine', 'ejs')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://tiger123:tiger@cluster0-cp2rs.mongodb.net/<dbname>?retryWrites=true&w=majority',{useNewUrlParser: true},
function(err){
    if(err){
        console.log(err)
    } else{
        console.log('아틀라스connected')
    }

})

const pollEx = new mongoose.Schema({
    gender:String,
    animal:String,
})
const poll = mongoose.model('poll',pollEx)



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))
app.get('/', (req,res)=>{
    res.sendFile('index.html')
})

app.get('/Servey', (req,res)=>{
    console.log(req.query)
    const pollModel = new poll()
    pollModel.gender = req.query.gender;
    pollModel.animal = req.query.animal;
    pollModel.save()
    .then(()=>{
        console.log("완료")
        let arr = []
        poll.countDocuments({gender:"남", animal:"호랑이"}, (err,c)=>{
            arr.push(c);
            poll.countDocuments({gender:"남", animal:"코끼리"}, (err,c)=>{
                arr.push(c);
                poll.countDocuments({gender:"여", animal:"호랑이"}, (err,c)=>{
                    arr.push(c);
                    poll.countDocuments({gender:"여", animal:"코끼리"}, (err,c)=>{
                        arr.push(c);
                        res.render('index',{data:arr})
                    })
                })        
            })
        })
        
    })
    .catch(err =>{
        if(err){
            res.send(err)
        }
        })    
})

app.listen(port, ()=>{
    console.log('http://localhost:'+port);
})
