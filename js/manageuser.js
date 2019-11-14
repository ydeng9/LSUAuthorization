/**
 * 
 */
function editUser(table, cols, groupSelector){
	//table.rows({selected: true}).nodes().to$().addClass("table-warning");
	var tableRows = table.rows({ selected: true });
	var rowData = tableRows.data().toArray();
	if(rowData.length == 0){
		alert("empty selection");
	}
	else{
		var trs = tableRows.nodes().to$();
		trs.each(function(i){
			//trshtml[i] = $(this).html();
			var tds = $(this).children();
			tds.each(function(j){
				if(j!=0 && j!=7){
					var value = $(this).text();
					$(this).html("<input type='text' class='form-control' name='" + cols[j] 
						+ "' value='" + value + "'>");
				}
				else if (j==7){
					var value = $(this).text();
					var groupSelector1 = "<select name='userGroup' class='custom-select-sm'>" 
							+ "<option value='" + rowData[0].userGroup + "'>" + value + "</option>"
							+ groupSelector;
					$(this).html(groupSelector1);
				}
			});
		});
		table.buttons( 1, '.editing' ).nodes().toggle();
		table.buttons( 1, '#btnEdit' ).disable();
	}
}
function cancelEdit(table){
	table.buttons( 1, '.editing' ).nodes().toggle();
	table.buttons( 1, '#btnEdit' ).enable();
}
function makeEdit(table){
	//var trs = table.rows({ selected: true }).nodes().to$();
	
	/*trs.each(function(i){
		var rowData = $(this).serialize();
		alert(rowData);
		formData = formData + rowData + "&";
	});*/
	var formData = $('#formUserList').serialize();
	var formData1 = escapeJSON(formData);
	var rowData = table.rows({ selected: true }).data().toArray();
	formData1 = formData1 + "&id=" + rowData[0].id
	//alert(formData1);
	var jsondata = {"data":formData1};
	var url="EditUserServlet";
	$.post(
		url,
		{"data":JSON.stringify(jsondata)},
        function(data) { 
			if(data.length > 1){
				table.ajax.reload(null, false).draw();
				table.buttons( 1, '.editing' ).nodes().toggle();
				table.buttons( 1, '#btnEdit' ).enable();
			}
			else alert("please input valid information");
 	});
	
}

function addUser(groupSelector){
	var groupSelector1 = "<label>User Group:</label><br>"
			+ "<select name='userGroup' class='custom-select-sm col-sm-4'>"
			+ "<option value='0'>Choose a group</option>"
			+ groupSelector;
	$('#groupSelect').html(groupSelector1);
	$('#newUser').modal({
		backdrop: 'static'
	});
}

function addOneUser(table){
	if($('#formUser input[name="firstName"]').val().length == 0
		|| $('#formUser input[name="lastName"]').val().length == 0
		|| $('#formUser input[name="PAWSID"]').val().length == 0
		|| $('#formUser input[name="email"]').val().length == 0
		|| $('#formUser input[name="title"]').val().length == 0
		|| $('#formUser input[name="department"]').val().length == 0){
		
		alert("please input required information");
		return false;
	}
	if($('#formUser [name="userGroup"]').val() == 0){
		alert("please select a group");
		return false;
	}
		
	var formData = $('#formUser').serialize();
	var data = {"data":formData+"&id=&groupName="}
	var url = "AddUserServlet";
	$.post(
			url,
            {"data":JSON.stringify(data)},
            function(data) {
            	if(data.length > 0){
            		$('#newUser').modal('hide');
            		$('#formUser input').val("");
            		table.ajax.reload(null, false).draw();
            	}
            	else alert("please input valid information");
            	
     });
}

function deleteUser(table){
	var tableRows = table.rows({ selected: true });
	var rowData = tableRows.data().toArray();
	if(rowData.length == 0){
		alert("empty selection");
	}
	else{
		var data = {"data":rowData[0].id};
		var url = "DeleteUserServlet";
		$.post(
				url,
	            {"data":JSON.stringify(data)},
	            function(data) { 
	            	table.ajax.reload(null, false).draw();
	            	
	     });
	}
	
}
function addFromFile(table){
	var formData = new FormData($('#addFile')[0]);
	formData.append('tableName','user');
	//formData.append('tableField',["firstName","lastName","PAWSID","Department","title","idUserGroup","Email"]);
	$.ajax({
        url:"addUserFileServlet",
        type:'post',
        data:formData,
        cache:false,
        processData:false,
        contentType:false,
        success:function(data){
        	if(data.length > 0) alert("success");
        	else alert("one or more user add failed, please check the input file");
        	$('#newUser').modal('hide');
        	table.ajax.reload(null, false).draw();
        },
        error:function(e){
            alert("failed");
        }
    });
}
