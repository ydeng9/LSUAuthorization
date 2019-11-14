/**
 * 
 */

function onApprove(checkedlist, editor){
	if(checkedlist.length == 0) return false;
	var url="ApproveRequestServlet";
	var filter={"checkedlist":checkedlist};
		$.post(
			url,
	           {"data":JSON.stringify(filter)},
	           function(data) { 
	        	   //alert(data);
	        	   if(data.length > 0){
	    	           var jsondata = JSON.parse(data);
	    	           $('#emailEditor input[name="sendto"]').val(jsondata.sendto);
	    	           $('#emailEditor input[name="subject"]').val(jsondata.subject);
	    	           $('#emailEditor input[name="attachment"]').val(jsondata.attachment);
	    	           var fileNames = jsondata.attachment.split(';');
	    	           var str2 = "";
	    	           for(var i=0;i<fileNames.length-1;i++){
	    	        	   str2 += "<div><a name='resourceLink' href='ShowResourceServlet?file="+ fileNames[i] + "' target='_blank'>" + fileNames[i] + "</a>"
	    	        	   		+ "<a name='deleteResource' class='btn btn-light' href='#'><span class='fa fa-trash-o fa-lg text-danger'></span></a></div>";
	    	           }
	    	           //console.log(str2);
	    	           $('#emailEditor #divResourceList').append(str2);
	    	           //editor.setData(jsondata.message);
	    	           //editor.setText(jsondata.message);
	    	           $('#emailEditor .ql-editor').html(jsondata.message);
	    	           $('#emailEditor').modal('show');
	        	   }  	
	    }).fail(function(XMLHttpRequest, textStatus){ 
	    	alert("error");
	    	var redirect=XMLHttpRequest.getResponseHeader("REDIRECT");
            if(redirect=="REDIRECT"){
                alert("login first");
                window.location.href=XMLHttpRequest.getResponseHeader("CONTEXTPATH");
            }
	    });
}
function onReject(checkedlist){
	var url="RejectRequestServlet";
	var filter={"checkedlist":checkedlist};
	$.post(
			url,
	        {"data":JSON.stringify(filter)},
	        function(data) { 
	            //alert("success R");
	});
}
function sendApproveEmail(editor){
	var resource = $('#emailEditor #divResourceList').find('a[name="resourceLink"]');
	//console.log(resource.eq(0));
	var str1 = "";
	resource.each(function(i){
		str1 += resource.eq(i).text() + ";";
	});
	var formData = $('#formEmailEditor').serialize();
	var formData1 = escapeJSON(formData);
	//alert(formData1);
	var message = escapeJSON($('#emailEditor .ql-editor').html());
	//alert(message);
	var jsondata = {"data":formData1+"&message="+message+"&attachment="+str1};
	var url="RequestEmailServlet";
	$.post(
		url,
		{"data":JSON.stringify(jsondata)},
        function(data) { 
			//alert("sent");
			$('#emailEditor').modal('hide');
 	});
}
function onEmailEditorHide(editor){
	$('#emailEditor input[name="sendto"]').val("");
    $('#emailEditor input[name="subject"]').val("");
    $('#emailEditor input[name="attachment"]').val("");
    $('#emailEditor #divResourceList').html("");
    //editor.setData("");
    editor.setText("");
}
function uploadResourceFile(f1){
	var files = $('#formEmailEditor #inputGroupFile').prop("files");
	if(!files || files.length == 0){
		alert("please select a file");
		return;
	}
	var formData = new FormData($("#formEmailEditor")[0]);
	formData.append('tableName','requestEmail');
	$.ajax({
        url:"UploadResourceServlet",
        type:'post',
        data:formData,
        cache:false,
        processData:false,
        contentType:false,
        success:function(data){
        	//alert("111");
        	var jsondata = JSON.parse(data);
        	if(jsondata.hasOwnProperty("exist")){
        		alert("File " + jsondata["exist"] + " already uploaded, please change the file name!");
        	}
        	if(jsondata.hasOwnProperty("fileName")){
        		var fileNames = jsondata.fileName;
        		if(typeof(fileNames)=="string"){
            		var str2 = "<div><a name='resourceLink' href='ShowResourceServlet?file="+ fileNames + "' target='_blank'>" + fileNames + "</a>"
    				+ "<a name='deleteResource' class='btn btn-light' href='#'><span class='fa fa-trash-o fa-lg text-danger'></span></a></div>";
        		}
        		else{
        			var str1 = fileNames.toString().replace(",",";");
            		//console.log(str1);
            		var str2 = "";
            		for(var i=0;i<fileNames.length;i++){
            			str2 += "<div><a name='resourceLink' href='ShowResourceServlet?file="+ fileNames[i] + "' target='_blank'>" + fileNames[i] + "</a>"
            			+ "<a name='deleteResource' class='btn btn-light' href='#'><span class='fa fa-trash-o fa-lg text-danger'></span></a></div>";
            		}
        		}
        		$('#emailEditor #divResourceList').append(str2);
        	}
        },
        error:function(e){
            alert("failed");
        }
    });
}
