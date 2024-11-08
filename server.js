// SERVER WILL BE CREATED HERE TO HANDLE THE UPLOAD AND EDITING OF FILE
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes'); // Import the routes file


const app = express();
const PORT = 3000;


//---------------------------------SETTING UP COOKIE AND SESSION-ID-------------------------------------

app.use(cookieParser());
app.use((req,res,next) => {
    if(!req.cookies.sessionId){
        const sessionId = generateSessionId();
        res.cookie('sessionId', sessionId, { httpOnly: true });
        return res.redirect('/');
    }
    next();
})


app.use(express.static('public')); // Serve static fi60 * 60 * 1,000les from 'public' folder
app.use('/',routes);


app.listen(PORT);



function generateSessionId(){
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}