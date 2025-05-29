//my-fullstack-app/server/routes/dbconnect_Module.js
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const mybatisMapper = require("mybatis-mapper");
const bcrypt = require('bcrypt');
router.use(express.json());
// MySQL 서버 접속 정보
const db = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '0000',
  database: 'my_database',
});
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL 연결 성공');
});
router.post("/", (req, res) => {
  var param = req.body;
  mybatisMapper.createMapper(['./models/' + param.mapper + '.xml']);
  var query = mybatisMapper.getStatement(param.mapper, param.mapper_id, param);
  db.query(query, (error, results) => {
    if (error) {
      console.error("DB 오류:", error);
      return res.status(500).json({ error: "Database query error" });
    }

    ///////////////////////////////////////////////////////////////////
    if (param.crud == "select" && param.mapper_id == "selectLoginCheck") {
      console.log("결과=" + results[0].useremail);
      if (!results[0]) {
        res.json(null);
      }
      else {
        // result[0]에 값이 있으면
        bcrypt.compare(req.body.is_Password, results[0].userpassword, function (
          err,
          login_flag
        ) {
          if (login_flag == true) {
            //console.log("결과 true=" + login_flag);
            res.json(results[0]);
          } else {
            //console.log("결과 false=" + login_flag);
            res.json(null);
          }
        });
      }
      return;
    }
    ////////////////////////////////////////////////////////
    res.json(results);
  });
});
module.exports = router;