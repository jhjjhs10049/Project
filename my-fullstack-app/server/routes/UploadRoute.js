// server/routes/UploadRoute.js (파일 하나로)

const express = require('express');
const router = express.Router();
const multer = require('multer');
const moment = require('moment');
// const { useState } = require('react');
// multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            const type = req.query.type;
            cb(null, type); // e.g. "uploads/image"
        } catch (error) {
            console.log(error);
        }
    },
    filename: function (req, file, cb) {
        const decodedName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        req._decodedOriginalName = decodedName;  //수정된부분
        cb(null, moment().format('YYYYMMDDHHmmss') + "_" + decodedName);
    }
});

const upload = multer({ storage }).single("file");

// 업로드 라우터
router.post("/", (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError || err) {
            return next(err);
        }
        console.log('원본파일명:', req._decodedOriginalName);  //수정된부분
        console.log('저장파일명:', req.file.filename);
        console.log('크기:', req.file.size);
        return res.json({ filename: req.file.filename });
    });
});

module.exports = router;