import express from 'express'
import cors from 'cors'
const app = express();
require('dotenv').config()


const port = process.env.PORT || 8080

app.use(cors());
app.use(express.json());

app.use((request, response, next)=>{
    response.header("Acess-Control-Allow-origin", "*");
    response.header("Acess-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    response.header("Acess-Control-Allow-Headers", "Content-Type");

    app.use(cors())
})
app.use('/user', require('./routes/User'));
app.use('/adm', require('./routes/Adm'));
app.use('/freelancer', require('./routes/Freelancer'));
app.use('/auth', require('./routes/Auth'));
app.use('/service', require('./routes/Service'));

app.listen(port, ()=>{
    console.log("Server starter at port ", port)
});