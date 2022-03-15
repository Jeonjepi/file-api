// express import
const express = require("express");
const app = express();

// 서버 포트넘버 할당
const server = app.listen(3000, () => 
{
    console.log("포트넘버는 3000!");
});

//정적 파일 제공
app.use('/static', express.static(__dirname + '/var/www/html/docdo'));

const multer = require('multer')
const upload = multer({dest: __dirname + '/var/www/html/docdo'})

app.post('/upload', upload.single('file'), (req, res, next) => 
{
    const {destination, filename, path} = req.file;
    console.log("파일 이름 : " + filename);
    console.log("파일 경로 : " + destination);
    console.log("파일 전체경로 : " + path);

    res.send("http://workspace.caitory.com:3000/static/" + filename)
})