import express from 'express'

const app = express();
require('dotenv').config()


const port = process.env.PORT || 8080


app.use(express.json());

app.use('/user', require('./routes/User'));
app.use('/adm', require('./routes/Adm'));
app.use('/freelancer', require('./routes/Freelancer'));
app.use('/auth', require('./routes/Auth'));

app.listen(port, ()=>{
    console.log("Server starter at port ", port)
})