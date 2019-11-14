/**
 * 
 */
function withdrawRequests(checkedlist){
	var url="WithdrawRequestServlet";
	var filter={"checkedlist":checkedlist};
	$.post(
			url,
            {"data":JSON.stringify(filter)},
            function(data) { 
            
                	
    });
}
