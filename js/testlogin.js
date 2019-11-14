/**
 * 
 */
function searchUser(input){
	$("#warn1").hide();
	$('#formLogin input[name!="PAWSID"]').val('');
	$('#formLogin input:checkbox').prop('checked',false);
	$('#formLogin input:checkbox').unbind();
	var PAWSID = input.val();
	if(PAWSID.length>2){
		var url="SearchUserServlet";
		$.post(
			url,
			{"data":PAWSID},
	        function(data) { 
				var jsondata = JSON.parse(data);
				if(jsondata.length==0){
					$("#warn1").show();
					$('#formLogin').find('div.row').eq(1).show();
					$('#formLogin input[name="addUser"]').val("1");
					$('#formLogin input[name="email"]').removeAttr("readonly");
				}
				else{
					$('#formLogin input[name="email"]').val(jsondata[0].email);
					$('#formLogin input[name="firstname"]').val(jsondata[0].firstName);
					$('#formLogin input[name="lastname"]').val(jsondata[0].lastName);
					$('#formLogin').find('div.row').eq(1).hide();
					$('#formLogin input:checkbox').prop('checked',false);
					$('#formLogin input[name="addUser"]').val("0");
					$.each(jsondata, function(i){
						//console.log('p:contains(value="' + jsondata[i].userGroup + '")');
						var checked = $('#formLogin').find('p:contains("' + jsondata[i].userGroup + '")');
						checked.next().prop('checked',true);
					});
					$('#formLogin input:checkbox').bind('click',function(){return false;});
					$('#formLogin input[name="email"]').attr("readonly","readonly");
				}
	 	});
	}
}

function onSubmit(){
	var formData = $('#formLogin').serialize();
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
	formData += "&group=" + group;
	var json = {"data": formData};
	$.ajax({
			type: 'post',
			url: 'UserGroupVerificationServlet',
			data: JSON.stringify(json),
			xhrFields: {withCredentials: true},
			success: function(data) {
				//console.log(data);
				window.location.href=data;
			}
	});
	
}