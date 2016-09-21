var express = require('express');
var router = express.Router();

var fs = require("fs");
var multer  = require('multer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* upload page. */
router.get('/upload', function(req, res, next) {
  res.render('upload', {msg: "请先上传"});
});


var upload = multer({ dest: '/tmp/' })
router.post('/file_upload', upload.array('image'), function(req, res, next) {

	console.log(req.files[0]);  // 上传的文件信息
	if(undefined == req.files[0])
	{
		res.end( JSON.stringify( {message:"文件不存在！"} ) );
	}
	
	var response = {};

	var des_file = "./files/" + req.files[0].originalname;
	fs.readFile( req.files[0].path, function (err, data) {
		fs.writeFile(des_file, data, function (err) {
			if( err ){
				console.log( err );
				response = {
					message:'File uploaded failed', 
					filename:err
				};
			}else{
				response = {
					message:'File uploaded successfully', 
					filename:req.files[0].originalname
				};
			}
			console.log( response );
			res.end( JSON.stringify( JSON.stringify( response ) ) );
		});
	});
   
});


module.exports = router;
