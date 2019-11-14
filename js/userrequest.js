/**
 * 
 */
function loadAuthorities(loadDiv,data){
	var jsondata = JSON.parse(data);
	var l = jsondata.length;
	
	for (var i = 0; i < l; i++){
		var authoDiv = $("<div class='form-row'></div>");
		loadDiv.append(authoDiv);
		authoDiv.append($("<div class='form-group col-md-3'><label>"
					+ "<input type='checkbox' name='autho' value='" + jsondata[i].id
					+ "'>" + jsondata[i].authorityName + "</label></div>"));
		authoDiv.append($("<div class='form-group col-md-4'>"
					+ "<input type='text' name='authoinfo' class='form-control' placeholder='" + jsondata[i].info
					+ "' disabled></div>"));
	}
	
	loadDiv.append($("<input type='button' name='submit1' id='btnSubmit' value='submit' class='btn btn-outline-primary' disabled>"));
	
	//binding events
	$('#formRequests').on('change','input[name="forWhom"]',function(){
		searchUser($(this));
	});
	loadDiv.on('change','input:checkbox[name="autho"]',function(){
		onCheckboxChange(loadDiv,$(this));
	});
	loadDiv.on('click','#btnSubmit',function(){
		onSubmit();
	});
	
}

function searchUser(input){
	$("#warn1").hide();
	$('#formRequests input[name="email"]').val('');
	$('#formRequests input[name="firstname"]').val('');
	$('#formRequests input[name="lastname"]').val('');
	var PAWSID = input.val();
	if(PAWSID.length>2){
		var url="SearchUserServlet";
		$.post(
			url,
			{"data":PAWSID},
	        function(data) { 
				var jsondata = JSON.parse(data);
				if(jsondata.length == 0 || jsondata[0].PAWSID.length==0){
					$("#warn1").show();
				}
				else{
					$('#formRequests input[name="email"]').val(jsondata[0].email);
					$('#formRequests input[name="firstname"]').val(jsondata[0].firstName);
					$('#formRequests input[name="lastname"]').val(jsondata[0].lastName);
				}
	 	});
	}
}

function onCheckboxChange(loadDiv,checkbox){
	var checkedAutho = checkbox.parent().parent().parent();
	var info = checkedAutho.find('[name="authoinfo"]');
	if(checkbox.prop('checked')){
		//alert('check');
		info.removeAttr('disabled');
	}
	else {
		info.prop('disabled','disabled');
	}
	var len = $('input:checkbox[name="autho"]:checked').length;
	if(len > 0) loadDiv.find('input[name="submit1"]').removeAttr('disabled');
		//$('#btnSubmit').removeAttr('disabled');
	else loadDiv.find('input[name="submit1"]').prop('disabled','disabled');
}

function onSubmit(){
	var fname = $('input[name="firstname"]').val();
	var lname = $('input[name="lastname"]').val();
	var PAWSID = $('input[name="forWhom"]').val();
	var email = $('input[name="email"]').val();
	//console.log(fname.length, lname.length, PAWSID.length, email.length);
	if(fname.length==0 || lname.length==0 || PAWSID.length==0 || email.length==0) {
		alert("please fill the required personal information");
		return false;
	}
	
	var formData = $('#formRequests').serialize();
	//var formData = $('#formRequests input').not(':disabled').serialize();
	var formData1 = escapeJSON(formData);
	var jsondata = {"data":formData1};
	var url="AddRequestsServlet";
	$.post(
		url,
		{"data":JSON.stringify(jsondata)},
        function(data) { 
			alert(data);
			$('#formRequests input:not(:button)').val('');
			$('#formRequests input:checkbox').prop("checked",false);;
			$("#warn1").hide();
 	});
	return true;
}
