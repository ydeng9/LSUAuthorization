/**
 * 
 */
function loadData(page, count, data){
	var jsondata = JSON.parse(data);
	$('#loadtb').html("");
	var l = jsondata.length;
	totalPage = Math.ceil(l / count);
	
	for (var i = page * count - count; i < page * count && i < l; i++){
		var tr = $("<tr></tr>");
		$('#loadtb').append(tr);
		tr.append($("<td name='AuthorityName'>" + jsondata[i].id + "</td>"));
		tr.append($("<td name='extrainfo'>" + jsondata[i].description + "</td>"));
	}
}
function loadPagination(page, totalPage) {
	var s = "";
	s += "<li class='page-item pagePre'><a class='page-link'>&laquo;</a></li>";
	for (i = totalPage - 4; i < totalPage + 5; i++) {
		if (i >= 1 && i <= totalPage) {
			if (i == page) {
				s += " <li class='page-item pageNo active'><a class='page-link'>" + i + "</a></li>"
			} else {
				s += "<li class='page-item pageNo'><a class='page-link'>" + i + "</a></li>"
			}
		}
	}
	s += "<li class='page-item pageNext'><a class='page-link'>&raquo;</a></li>";
	$('#pages').html(s);
}