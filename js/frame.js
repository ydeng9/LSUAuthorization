/**
 * 
 */
function getCookie(key){
	var coos = document.cookie.split('; ');
	var value = "";
	$.each(coos, function(i, item){
		var coo = item.split('=');
		//console.log(coo[0]);
		if(coo[0] == key){
			value = coo[1];
			//console.log(value);
			return false;
		}
	});
	return value;
}

function loadNav(loadDiv, pos){
	loadTopNav();
	var level = getCookie("level");
	if(level == "2"){
		loadUserNav(loadDiv, pos);
		loadManagerNav(loadDiv, pos);
	}
	else if(level == "1"){
		loadManagerNav(loadDiv, pos)
	}
	else if(level == "0"){
		loadUserNav(loadDiv, pos);
	}
	else{
		window.location.href="TestLoginServlet";
	}
	loadDiv.parent().append($("<img src='./image/lsu_tower_logo.jpg' class='fixed-bottom' style='max-height:5rem;'>"));
}

function loadTopNav(){
	$('body').prepend($("<div id='topNav' class='px-4 py-1' style='background-color: #eee;border-bottom:1px solid #D0D0D0;'>"
			+ "<form id='formLogout' action='/LSUAuthorization/LogOutServlet' method='get' role='form'>"
			+ "<a href=# id='aLogout' class='float-right'>logout</a></form>"
			//+ "<a class='navbar-brand' href='#'>LSU</a>"
			+"<img src='./image/LSU-Logo.png' style='max-height:1rem;'></div>"));
	$('#topNav #aLogout').click(function(){
		$('#formLogout').submit();
	});
}

function loadUserNav(loadDiv, pos){
	var activeStyle = " name='active1' style='background-color: LightSteelBlue;'";
	var l1 = "", l2 = "";
	if(pos=="request") l1 = activeStyle;
	else if(pos=="requestHistory") l2 = activeStyle;
	//else return false;
	loadDiv.append($("<li class='nav-item border-bottom pl-3'" + l1 + ">"
				+ "<a class='nav-link text-primary' href='userrequest.html'><span class='fa fa-paper-plane fa-lg fa-fw'></span>Request</a></li>"
				+ "<li class='nav-item border-bottom pl-3'" + l2 + ">"
				+ "<a class='nav-link text-primary' href='userrequesthistory.html'><span class='fa fa-archive fa-lg fa-fw'></span>Request History</a></li>"));

}

function loadManagerNav(loadDiv, pos){
	var activeStyle = " name='active1' style='background-color: LightSteelBlue;'";
	var l1 = "", l2 = "", l3 = "", l4 = "", l5 = "", l6 = "", c1="";
	if(pos=="requestList"){ 
		l1 = activeStyle;
		c1 = "class='collapse' ";
	}
	else if(pos=="ManageUsers") l2 = activeStyle;
	else if(pos=="ManageUserGroup") l3 = activeStyle;
	else if(pos=="ManageAuthority") l4 = activeStyle;
	else if(pos=="ManageAction") l5 = activeStyle;
	else if(pos=="Setting"){ 
		l6 = activeStyle;
		c1 = "class='collapse' ";
	}
	else c1 = "class='collapse' ";
	var undone = getCookie("undone");
	//alert(undone + ", " + undone.length + ", " + document.cookie);
	var badge = "";
	if(undone.length > 0){
		badge = "<span class='badge badge-pill badge-primary float-right'>" + undone + "</span>";
	}
	
	loadDiv.append($("<li class='nav-item border-bottom pl-3'" + l1 + "  id='menuRequest'>"
				+ "<a class='nav-link text-primary' href='requestlist.html'>" + badge + "<span class='fa fa-tasks fa-lg fa-fw'></span>Request List</a></li>"
				+ "<li class='nav-item border-bottom pl-3'>"
				+ "<a class='nav-link text-primary collapsed' href='#' data-toggle='collapse' data-target='#managementPane'><span class='fa fa-navicon fa-lg fa-fw'></span>Management</a></li>"
				+ "<div id='managementPane' " + c1 + "data-parent='#accordionSidebar'>"
				+ "<li class='nav-item collapsePane1 border-bottom'" + l2 + ">"
				+ "<a class='nav-link text-primary collapse-item' href='manageusers.html'><span class='fa fa-user fa-lg fa-fw'></span>Users</a></li>"
				+ "<li class='nav-item collapsePane1 border-bottom'" + l3 + ">"
				+ "<a class='nav-link text-primary collapse-item' href='manageusergroup.html'><span class='fa fa-group fa-lg fa-fw'></span>User Groups</a></li>"
				+ "<li class='nav-item collapsePane1 border-bottom'" + l4 + ">"
				+ "<a class='nav-link text-primary collapse-item' href='manageauthority.html'><span class='fa fa-tags fa-lg fa-fw'></span>Authorities</a></li>"
				+ "<li class='nav-item collapsePane1 border-bottom'" + l5 + ">"
				+ "<a class='nav-link text-primary collapse-item' href='manageaction.html'><span class='fa fa-star fa-lg fa-fw'></span>Actions</a></li>"
				+ "</div>"
				+ "<li class='nav-item border-bottom pl-3'" + l6 + ">"
				+ "<a class='nav-link text-primary' href='setting.html'><span class='fa fa-wrench fa-lg fa-fw'></span>Setting</a></li><li></li>"));
}

function escapeJSON(str){
	if (/(\"|\\|\t|\r|\n|\f)/g.test(str)) {
		str = str.replace(/\"/g, "\"");
		str = str.replace(/\\/g,"\\\\\\\\");
		str = str.replace(/\t/g, "\\t");
		str = str.replace(/\r/g, "\\r");
		str = str.replace(/\n/g, "\\n");
		str = str.replace(/\f/g, "\\f");
	}
	else if (/(%22|%5C|%0D|%0A|%09|%08|%0C)/g.test(str)){
		str = str.replace(/%5C/g, "%5C%5C"); //\ \\
		str = str.replace(/%22/g, "%5C%22"); //" \"
		str = str.replace(/%0D/g, "%5C72%"); //carriage return \r
		str = str.replace(/%0A/g, "%5C%6E"); //line feed \n
		str = str.replace(/%09/g, "%5C74%"); //tab \t
		str = str.replace(/%08/g, "%5C62%"); //backspace \b
		str = str.replace(/%0C/g, "%5C%66"); //form feed \f
		
	}
	return str;
}

