
var http=require('http');
var fs=require('fs');

http.createServer(function(req,res){
  if(req.url=='/'){
  	fs.readFile('./titles.json',function(err,data){//读取json文件
  		if(err){
  			console.error(err);
  			res.end('Server Error');
  		}else{
  			var title=JSON.parse(data.toString());//解析json文本数据
  			
  			fs.readFile('./index.html',function(err,data){//读取html文件
  				if(err){
  				    console.error(err);
  			        res.end('Server Error');	
  				}else{
  					var tmp1=data.toString();
  					var html=tmp1.replace('%',title.join('<li></li>'));
  					res.writeHead(200,{'Content-Type':'text/html'});
  					res.end(html);//将html发送到客户端

  				}
  			})
  		}
  	})
  }
}).listen(8080);
console.log('running in the client.port is 8080');