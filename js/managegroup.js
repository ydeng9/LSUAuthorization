/**
 * 
 */
function format ( d ) {
    // 'd' is the original data object for the row
	var childtable = "<table class='table child-table table-sm w-100' value='" + d.id
				+ "'><tr><th></th><th>Authorities</th><th></th></tr>";
	var idAuthority = d.idAuthority;
	if(idAuthority==0) return;
	var authorityName = d.authorityName;
	if(idAuthority.toString().length == 1){
		childtable += "<tr><td value='" + idAuthority + "'></td><td class='pl-5 w-50'>" + authorityName + "</td>"
		+ "<td><li class='fa fa-trash fa-lg text-danger' name='btnDeleteAuthority'></li><td></tr>"
	}
	else{
		$.each(idAuthority,function(i){
			childtable += "<tr><td value='" + idAuthority[i] + "'></td><td class='pl-5 w-50'>" + authorityName[i] + "</td>"
					+ "<td><li class='fa fa-trash fa-lg text-danger' name='btnDeleteAuthority'></li><td></tr>"
		});
	}
	childtable += "</table>";
	//console.log(d);
	return childtable;
}

function editUserLevel(table){
	var formData = $('#editUserLevel #formUserLevel').serialize();
	var levelName = $('#editUserLevel input[name="levelName"]').val();
	if(levelName == $('#editUserLevel #levelName').val()) formData += "&edit=0";
	else formData += "&edit=1";
	var formData1 = escapeJSON(formData);
	console.log(formData1);
	var json = {"data":formData1};
	var url = "EditUserLevelServlet";
	$.post(
			url,
            {"data":JSON.stringify(json)},
            function(data) { 
            	//alert("callback");
            	$('#editUserLevel').modal('hide');
            	table.ajax.reload(null, false).draw();
     });
	
}

function editUserGroup(table){
	var formData = $('#editUserGroup #formUserGroup').serialize();
	var idAuthority2 = new Array();
	var autholist2 = $('#editUserGroup #modalNewAuthorityList').children('div');
	$.each(autholist2, function(i){
		idAuthority2.push(autholist2.eq(i).attr('value'));
	});
	if(idAuthority2.length>0) formData += "&idAuthority2=[" + idAuthority2.toString() + "]";
	//console.log($('#editUserGroup input[name="groupName"]').val()+", "+$('#editUserGroup #groupName').val());
	if($('#editUserGroup input[name="groupName"]').val() == $('#editUserGroup #groupName').val()) formData += "&edit=0";
	else formData += "&edit=1";
	
	var formData1 = escapeJSON(formData);
	//console.log(formData1);
	var json = {"data":formData1};
	var url = "EditUserGroupServlet";
	$.post(
			url,
            {"data":JSON.stringify(json)},
            function(data) { 
            	//alert("callback");
            	$('#editUserGroup').modal('hide');
            	table.ajax.reload(null, false).draw();
    });
}

function deleteUserGroup(table){
	alert("delete group");
	var idUserGroup = $('#editUserGroup input[name="idUserGroup"]').val();
	var json = {"data":idUserGroup};
	var url = "DeleteUserGroupServlet";
	$.post(
			url,
            {"data":JSON.stringify(json)},
            function(data) { 
            	//alert("callback");
            	$('#editUserGroup').modal('hide');
            	table.ajax.reload(null, false).draw();
    });
}

function deleteAuthority(tr, table){
	var idAuthority = tr.children("td").eq(0).attr("value");
	var idUserGroup = tr.closest("table").attr("value");
	//console.log(idAuthority + "," + idUserGroup);
	var json = {"idUserGroup":idUserGroup,"idAuthority":idAuthority};
	var url = "DeleteA_UServlet";
	$.post(
			url,
            {"data":JSON.stringify(json)},
            function(data) { 
            	alert("callback");
            	$('#editUserGroup').modal('hide');
            	table.ajax.reload(null, false).draw();
    });
}

function startEditUserLevel(tr, table){
	var levelName = tr.children('td').eq(0).text();
	$('#editUserLevel input[name="idUserLevel"]').val(tr.children('td').eq(1).attr("value"));
	$('#editUserLevel #levelName').val(levelName);
	$('#editUserLevel input[name="levelName"]').val(levelName);
	$('#editUserLevel input[name="groupName"]').val("");
	$('#editUserLevel').modal({
		backdrop: 'static'
	});
}

function startEditUserGroup(tr, table){editUserGroup
	var data = table.row(tr[0]).data();
	//console.log(data);
	if(data.id!=0){
		$('#editUserGroup input[name="idUserGroup').val(data.id);
		$('#editUserGroup input[name="groupName"]').val(data.groupName);
		$('#editUserGroup #groupName').val(data.groupName);
		$('#editUserGroup #modalNewAuthorityList').html("");
		//$('#editUserGroup input[name="idAuthority').val(data.idAuthority.toString());
		/*/if(data.authorityName.length>0){
			var strAuthority = "";
			for(var j=0; j<data.authorityName.length;j++){
				//if(j>0) strResource+="<br>";
				strAuthority += "<div value='" + data.idAuthority[j] + "'>" + data.authorityName[j] 
						+ "<li class='fa fa-trash-o fa-lg text-danger' name='deleteAuthority'></li></div>";
				
			}
			$('#editUserGroup #modalAuthorityList').html(strAuthority);
		}*/
		$('#editUserGroup').modal({
			backdrop: 'static'
		});
	}
}