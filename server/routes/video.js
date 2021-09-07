const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");

// STORAGE MULTER CONFIG
const storage = multer.diskStorage({
    destination: (req, file, cb) => { // file을 어디에 저장할지
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'video/mp4') {
        cb(null,true);
    } else {
        cb({msg: 'mp4 파일만 업로드 가능합니다.'}, false);
    }
}

const upload = multer({storage: storage}).single("file");

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {

    // 비디오를 서버에 저장한다.
    upload(req, res ,err => {
        if(err) {
            return res.json({success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
    })

})

module.exports = router;
