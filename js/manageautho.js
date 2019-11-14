/**
 * 
 */
function makeEdit(table, editor){
	var resource = $('#divResourceList').find('a[name="resourceLink"]');
	//console.log(resource.eq(0));
	var str1 = "";
	resource.each(function(i){
		str1 += resource.eq(i).text() + ";";
	});
	var rowData = table.rows({ selected: true }).data().toArray();
	var email = rowData[0].emailContent;

	var formData = $('#formEditAuthority').serialize();
	var formData1 = escapeJSON(formData);
	var message = escapeJSON(editor.getData());
	formData1 += "&message=" + message + "&resource=" + str1 + "&email=" + email;
	var json = {"data": formData1};
	//console.log(formData1);
	var url = "EditAuthorityServlet";
	$.post(
			url,
            {"data":JSON.stringify(json)},
            function(data) { 
            	if(data.length > 1){
            		$('#modalAuthority').modal('hide');
            		table.ajax.reload(null, false).draw();
            		//deleteItems = '';
            	}
            	else alert("update failed");
     });
}
function deleteResource(div){
	var url = "DeleteAuthorityResourceServlet";
	var json = {"data": div.first().text()};
	$.post(
			url,
            {"data":JSON.stringify(json)},
            function(data) { 
            	//alert("callback");
            	div.remove();
     }).error(function() { alert("fail to delete resource"); })
		
	
}

function uploadResourceFile(f1){
	var files = $('#inputGroupFile').prop("files");
	if(!files || files.length == 0){
		alert("please select a file");
		return;
	}
	var formData = new FormData($("#formEditAuthority")[0]);
	formData.append('tableName','authority');
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
        		alert("File " + jsondata["exist"] + " already exist, please change the file name!");
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
        		$('#divResourceList').append(str2);
        	}
        },
        error:function(e){
            alert("failed");
        }
    });
}
function addOneAuthority(actionSelector){
	$('#modalAuthority').modal({
		backdrop: 'static'
	});
	$('#modalAuthority .modal-title').text("Add Authority");
	$('#modalAuthority .modal-footer').append("<button id='btnAdd1' type='button' class='btn btn-light'>Add</button>");
	var actionSelector1 = "<select name='action' class='custom-select-sm'>" + actionSelector;
	$('#modalAuthority #actionSelect').html(actionSelector1);

}
function makeAdd(table){
	var name = $('#modalAuthority input[name="authorityName"]').val();
	var info = $('#modalAuthority input[name="info"]').val();
	var idUserGroup = $('#modalAuthority select[name="action"]').val();
	if(name.length==0 || info.length==0){
		alert("please fill the form!");
		return;
	}
	var formData = $('#formEditAuthority').serialize();
	var formData1 = escapeJSON(formData);
	var json = {"data": formData1};
	var url = "AddAuthorityServlet";
	$.post(
			url,
            {"data":JSON.stringify(json)},
            function(data) { 
            	if(data.length > 1){
            		$('#modalAuthority').modal('hide');
                	table.ajax.reload(null, false).draw();
            	}
            	else alert("add failed");
     })
}

function deleteAuthority(table){
	var tableRows = table.rows({ selected: true });
	var rowData = tableRows.data().toArray();
	if(rowData.length == 0){
		alert("empty selection");
		return;
	}
	else{
		var json = {"data": rowData[0].id};
		var url = "DeleteAuthorityServlet";
		$.post(
				url,
	            {"data":JSON.stringify(json)},
	            function(data) { 
	            	//alert("callback1");
	            	table.ajax.reload(null, false).draw();
	     });
	}
	
}

function editAuthority(table, cols, actionSelector, editor){
	//table.rows({selected: true}).nodes().to$().addClass("table-warning");
	var tableRows = table.rows({ selected: true });
	var rowData = tableRows.data().toArray();
	if(rowData.length == 0){
		alert("empty selection");
		return;
	}
	else{//alert(rowData[0]);
		$('#modalAuthority').modal({
			backdrop: 'static'
		});
		$('#modalAuthority .modal-title').text("Edit Authority");
		$('#modalAuthority .modal-footer').append("<button id='btnUpdate' type='button' class='btn btn-light'>Update</button>");
		$('#modalAuthority input[name="idAuthority"]').val(rowData[0].id);
		$('#modalAuthority input[name="authorityName"]').val(rowData[0].authorityName);
		$('#modalAuthority input[name="info"]').val(rowData[0].info);
		var actionSelector1 = "<select name='action' class='custom-select-sm'>" 
				+ "<option value='" + rowData[0].idUserAction + "'>" + rowData[0].userAction + "</option>"
				+ actionSelector;
		$('#actionSelect').html(actionSelector1);
		
		if(rowData[0].resource != 0){
			var files = rowData[0].resource.split(";");
	    	var strResource = "";
			for(var j=0; j<files.length;j++){
				if(files[j].length > 0){
					strResource += "<div><a name='resourceLink' href='ShowResourceServlet?file="+ files[j] + "' target='_blank'>" 
						+ files[j] 
						+ "<a name='deleteResource' class='btn btn-light' href='#'><span class='fa fa-trash-o fa-lg text-danger'></span></a></div>";
				}
			}
			$('#divResourceList').prepend(strResource);
			//$('#modalAuthority input[name="resourceList"]').val(rowData[0].resource);
			
		}
		
		if(rowData[0].idUserAction == 2){
			if(rowData[0].emailContent.length != 0){
				var url = "ShowResourceServlet";
				$.get(url,{"file":rowData[0].emailContent},function(data){
					var n1 = data.indexOf("\n");
					$('#modalAuthority input[name="emailSubject"]').val(data.slice(0,n1));
					editor.setData(data.slice(n1+1));
				});
			}
			$('#divResource').show();
			$('#divEmailEditor').show();
		}
	}
}
function cancelEditAuthority(editor){
	$('#modalAuthority input').val("");
	$('#modalAuthority #divResourceList').html("");
	$('#modalAuthority #actionSelect').html("");
	$('#modalAuthority #divEmailEditor').hide();
	$('#modalAuthority #divResource').hide();
	$('#modalAuthority #btnUpdate').remove();
	$('#modalAuthority #btnAdd1').remove();
	$('#modalAuthority .custom-file-label').html("");
	editor.setData("");
	
}
