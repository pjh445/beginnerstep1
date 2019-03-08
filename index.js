var express = require("express");
var app = express();

var http = require('http');
var fs = require('fs');
var url = require('url');

var app=http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
		
	fs.readdir('./data',function(error,filelist){
				//console.log(filelist);//배열오브젝트반환됨	
				
		fs.readFile(`data/${title}`,'utf8',	function(err,description){
			
				if(title==undefined || title == null){
					title="Dynamic Web";
					description='<p id="main">Node.js를 이용한 다이나믹 웹 만들기<br><br><img src="https://1.bp.blogspot.com/-qEnMk64JS24/VqyoIgdkWGI/AAAAAAAAELk/4zMqL-kbClg/s1600/best-web-browser.jpg" alt="WEB">dddd</p>'; 
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

<style>
a {text-decoration:none; color:black; padding:2px;}
nav ul {list-style:none; display:flex;}
nav li {flex:1; text-align:center;margin:5px;}
nav a {display:block; width:100%; transform:scale(1.2) translateY(-2px); font-weight:bold;}
nav a:hover, .active {background:gold;}
img {display:block; margin:auto; width:70%;}
#layout {width:60%; margin:auto;}
#main {background: skyblue; padding:10px;}
</style>
</head>
<body>
<div id="layout">
	<h1><a href="/">WEB</a></h1>
	<nav>${list}</nav>				  
	<h2>${title}</h2>
	${description}
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
	var txt= $("h2").text();
	var num=0;
	switch(txt){
		//case 'html':		num=0;break;
		case 'css':			num=1;break;
		case 'javascript':	num=2;break;
		case 'noejs':		num=3;
	}
	$("nav li").eq(num).children().addClass("active");
});
</script>
</body>
</html>`;
/*************/
						
			response.writeHead(200);
			response.write(template);
			response.end();
		});
	}); 

});
var PORT = process.env.PORT;
app.listen(PORT)