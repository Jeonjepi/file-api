// express import
const express = require("express");
const app = express();

// 서버 포트넘버 할당
const server = app.listen(3000, () => 
{
    console.log("포트넘버는 3000!");
});

//정적 파일 제공
app.use('/static', express.static(__dirname + '/resource'));

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/resource/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res, next) => 
{
    const {destination, filename, path, file, originalname} = req.file;
    console.log("파일 이름 : " + filename);
    console.log("파일 경로 : " + destination);
    console.log("파일 전체경로 : " + path);
    //res.download("/file-api/resource/" + filename)
    res.send("http://workspace.caitory.com:3000/static/" + filename)
})