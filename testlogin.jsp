<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" import="java.util.*,bean.*,java.sql.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Test Login Page</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<script type="text/javascript" src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
    <script type="text/javascript" src="./js/testlogin.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<style>
html, body{
	width: 100%;
	height: 100%;
}
.loginPane{
	background-color:rgba(255,255,255,0.8);
	position:relative;
	top:3rem;
	left:3rem;
}
#wrapper{
    width:100%;
    height:100%;
    min-width: 1000px;
    z-index:-10;     
    zoom: 1;
    background-color: white;
    background-image: url(./image/tower1.jpg);
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
}
</style>
</head>
<body>
<div id='topNav' class='px-4 my-0' style='background-color: #eee;border-bottom:1px solid #D0D0D0;'>
		<img src='./image/LSU-Logo.png' style='max-height:2rem'> 
</div>
<div id='wrapper' class='m-0 p-0 h-100 w-100'> 
<div class='loginPane border rounded-lg  p-2 w-50'>
<h1 style='font-family: Impact, Charcoal, sans-serif'>Test Login Page</h1>
<form id='formLogin' action="/LSUAuthorization/UserGroupVerificationServlet" method="post" role="form">
	<label>Login as: </label> <br>
	<p class='text-danger' id='warn1' style='display:none;'>user not found, new user will be added</p>
	<div class='form-group row'>
		<div class='col-sm-5'>
    		<input type="text" class='form-control' name='PAWSID' placeholder='PAWSID' required='required'>
    	</div>
    	<div class='col-sm-5'>
    		<input type='email' class='form-control' name='email' placeholder='Email' required='required'>
    	</div>
  	</div>
  	<div class='form-group row' style='display:none;'>
		<div class='col-sm-5'>
    		<input type='text' class='form-control' name='firstname' placeholder='first name' required='required'>
    	</div>
    	<div class='col-sm-5'>
    		<input type='text' class='form-control' name='lastname' placeholder='last name' required='required'>
    	</div>
  	</div>
  	<c:if test='${groups==nulll}'>
  	<jsp:forward page='/TestLoginServlet'/>
  	</c:if>
	<c:forEach items='${groups}' var='a' varStatus='st'>
	<div class='form-check'>
        <label>
        	<p style='display:none'>${a.getId()}</p>
        	<input type='checkbox' class='form-check-input' name='group' value="${a.getId()}">${a.getGroupName()}<br>
        </label>
    </div>
    </c:forEach>
    <input type='text' name='addUser' value='0' style='display:none'>
    <input type='text' name='groups' value='0' style='display:none'>
    <!--<button type="submit" class="btn btn-outline-secondary">Login</button>-->
	<a id='submit1' class='btn btn-outline-secondary' href='#'>Login</a>
</form>
</div>
<div class='w-50'>
<p>
Use ydeng9(admin) or cwell6(manager) to login.
</p>
</div>
</div>
<script>
	$('#formLogin').on('change','input[name="PAWSID"]',function(){
		searchUser($(this));
	});
	$('#formLogin #submit1').click(function(){
		//onSubmit();
		var checked = $('#formLogin input:checkbox[name="group"]:checked');
		var group = "";
		$.each(checked,function(i){
			group += checked.eq(i).prev().text() + ",";
		});
		if(group.length==0){
			alert("Please choose user group.");
			return;
		}
		group = group.slice(0,-1);
		$('#formLogin input[name="groups"]').val(group);
		console.log(group);
		$('#formLogin').submit();
	});
</script>
</body>
</html>