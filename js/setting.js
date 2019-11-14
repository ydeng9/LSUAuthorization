/**
 * 
 */
function loadSetting(){
	var url="LoadSettingServlet";
	$.get(
			url,
            function(data) {
				var jsondata = JSON.parse(data);
				$('#formSetting input[name="address"]').val(jsondata.address);
				$('#formSetting input[name="password"]').val("**********");
				$('#formSetting input[name="port"]').val(jsondata.port);
				$('#formSetting input[name="host"]').val(jsondata.host);
				
     });
}
function startEdit(){
	$("#done").show();
	$("#cancelEdit").show();
	$('#formSetting input').removeAttr("disabled");
}
function endEdit(address, port, host){
	$("#done").hide();
	$("#cancelEdit").hide();
	$('#formSetting input[name="address"]').val(address);
	$('#formSetting input[name="password"]').val("**********");
	$('#formSetting input[name="port"]').val(port);
	$('#formSetting input[name="host"]').val(host);
	$('#formSetting input').attr('disabled','disabled');
}
function editSetting(){
	var formData = $('#formSetting').serialize();
	var formData1 = escapeJSON(formData);
	var jsondata = {"data":formData1};
	var url = "EditSettingServlet";
	$.post(
			url,
			{"data":JSON.stringify(jsondata)},
            function(data) {
				var jsondata = JSON.parse(data);
            	if(jsondata.validation == "true"){
            		alert("reset successed");
            		var address1 = $('#formSetting input[name="address"]').val();
            		var port1 = $('#formSetting input[name="port"]').val();
            		var host1 = $('#formSetting input[name="host"]').val();
            		endEdit(address1, port1, host1);
            	}
            	else{
            		alert("email connection failed, please check the settings");
            	}
     });
}