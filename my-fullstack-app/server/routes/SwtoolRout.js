//my-fullstack-app/server/routes/SwtoolRout.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dbconnect_Module = require('./dbconnect_Module');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (req, res, next) => {
  const type = req.query.type;
 ////////////////////////////////////////////////////////////////////
  if (type == 'list') {
    try {
      req.body.mapper = 'SwToolsMapper';        // mybatis xml 파일명
      req.body.crud = 'select';                 // 쿼리 타입
      req.body.mapper_id = 'selectSwToolsList'; // 쿼리 ID

      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  }
  ////////////////////////////////////////////////////////////////////
  else if (type == 'save') {
    //Swtool 관리자 저장
    try {
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
      req.body.crud = 'insert';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'insertSwToolsInfo';

      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  }
  ///////////////////////////////////////////////////////////////////
  else if (type == 'modify') {
    //Swtool 수정
    try {
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updateSwToolsInfo';

      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  }
  ///////////////////////////////////////////////////////////////////////
  else if (type == 'delete') {
    //Swtool 삭제
    try {
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
      req.body.crud = 'delete';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'deleteSwToolsInfo';

      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  }
  ///////////////////////////////////////////////////////////////////////
});


module.exports = router;