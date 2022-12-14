window.onload=function(){
    var http=new XMLHttpRequest();

    var uid=document.getElementById("emailfield").innerText;
    var url="http://127.0.0.1:5000/staff"+"?uid="+encodeURIComponent(uid);
    http.open('GET',url,true);
    http.send();
    
    http.onreadystatechange=function(){
        if(http.readyState===4)
        {
            if(http.status===200)
            {
                if(JSON.parse(http.response)==="no data found")
                {
                    alert("no request data found");
                }
                else
                {
                    var data=JSON.parse(http.response);
                    $('#Empidfield').text(data[0]['StaffID']);
                    // $('#genderfield').text(data[0]['Gender']);
                    $('#phonefield').text(data[0]['StaffPhone']);
                    $('#deptfield').text(data[0]['Department']);
                    // $('#divfield').text(data[0]['Division']);
                }
            }
            else
            {
                alert("failed to get data");
            }
        }
    } 
}