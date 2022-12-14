var allowdata;
function allow(){
    let staffid=$('#staffid').val();
    let subject=$('#subject').val();
    let division=$('#division').val();
    let Class=$('#class').val();

    allowdata=JSON.stringify({
		"StaffID": staffid,
		"Sub": subject,
		"Division": division,
		"Class": Class
	});
    
    var http=new XMLHttpRequest();

	http.open('POST',"http://127.0.0.1:5000/allow/",true);  

	http.send(allowdata);

	http.onreadystatechange=function(){
		if(http.readyState===4)
		{
			if(http.status===200)
			{
				alert(JSON.parse(http.response));
			}
			else if(http.status===500)
			{
				alert("Incorrect Data");
			}
			else
			{
				alert(JSON.parse(http.response));
			}
		}
	}
}