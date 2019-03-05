var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
	
		
	fs.readdir('./data',function(error,filelist){
				//console.log(filelist);//배열오브젝트반환됨	
				
		fs.readFile(`data/${title}`,'utf8',	function(err,description){
			
				if(title===undefined){
							title="Dynamic Web";
							description="Node.js를 이용한 다이나믹 웹 만들기"; 
				}
				
				var list='<ul>';	
				var i=0;
				
				while(i<filelist.length){
					list+=`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
					i++;
				}
				
				list+='</ul>';				
				var template = 
				
/*************/
`<!doctype html>
<html lang="ko">
<head>
<title>WEB1 - ${title}</title>
<meta charset="utf-8">
</head>
<body>
<h1><a href="/">WEB</a></h1>
${list}				  
<h2>${title}</h2>
<p>${description}</p>
<img src="https://1.bp.blogspot.com/-qEnMk64JS24/VqyoIgdkWGI/AAAAAAAAELk/4zMqL-kbClg/s1600/best-web-browser.jpg" alt="WEB">
</body>
</html>`;
/*************/
						
						response.writeHead(200);
						response.write(template);
						response.end();
		});
	}); 

}).listen(3000);
