window.onload=function(){
    var http=new XMLHttpRequest();

    var uid=JSON.parse(document.getElementById("user_id").textContent);
    var url="http://127.0.0.1:5000/student"+"?uid="+encodeURIComponent(uid);
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
                    $('#rollfield').text(data[0]['StudentRoll']);
                    $('#genderfield').text(data[0]['Gender']);
                    $('#classfield').text(data[0]['Class']);
                    $('#deptfield').text(data[0]['Department']);
                    $('#divfield').text(data[0]['Division']);
                }
            }
            else
            {
                alert("failed to get data");
            }
        }
    } 
}