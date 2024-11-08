const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const path = require('path');

let pdfBuffer = null

router.use(cookieParser());
router.get('/',(req,res)=>{

    const sessionId = req.cookies.sessionId;

    if(sessionId){
        res.sendFile(path.join(__dirname , '../index.html'));
        console.log(sessionId);
    }
    else{
        res.send("sorry session-id not found!! \n PLEASE RELOAD");
    }
})



const fileFilter = (req,file,cb) => {
    if(file.mimetype ==='application/pdf'){
        cb(null,true);
    }
    else{
        cb(new Error('Only PDF files are allowed'), false);
    }
}

const storage = multer.memoryStorage();
const upload = multer({
    storage:storage,
    fileFilter:fileFilter
});


router.post('/upload',upload.single('file'),(req,res)=>{
    if(req.file){
        pdfBuffer = req.file.buffer; // Store PDF in memory
        res.redirect('/edit');
    }
    else{
        res.send('some error occured')
    }
})


router.get('/pdf', (req, res) => {
    if (pdfBuffer) {
        res.contentType("application/pdf");
        res.send(pdfBuffer);
    } else {
        res.status(404).send('PDF not found');
    }
});


// Serve the edit HTML page
router.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, '../edit.html'));
});


module.exports = router;

