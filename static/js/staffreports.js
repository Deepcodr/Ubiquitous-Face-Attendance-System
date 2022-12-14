window.onload=function(){
    var i=1;

    var http=new XMLHttpRequest();

    var uid=JSON.parse(document.getElementById("user_id").textContent);
    var url="http://127.0.0.1:5000/attendancestaff"+"?uid="+encodeURIComponent(uid);
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
                    console.log(data)
                    data.forEach((item) => {
                        addrow(item,i);
                        i++;    
                    });
                    generatechartdata(data);
                }
            }
            else
            {
                alert("failed to get data");
            }
        }
    } 
}

function addrow(item,i){
    const row=document.createElement('tr');
    const td1=document.createElement('td')
    const td2=document.createElement('td')
    const td3=document.createElement('td')
    const td4=document.createElement('td')
    const td5=document.createElement('td')
    const td6=document.createElement('td')
    const td7=document.createElement('td')
    const node1=document.createTextNode(i)
    const node2=document.createTextNode(item['Roll_no'])
    const node3=document.createTextNode(item['Class'])
    const node4=document.createTextNode(item['Division'])
    const node5=document.createTextNode(item['Sub'])
    const node6=document.createTextNode(item['DateStamp'])
    const node7=document.createTextNode(item['Attendance_time'])
    td1.appendChild(node1);
    td2.appendChild(node2);
    td3.appendChild(node3);
    td4.appendChild(node4);
    td5.appendChild(node5);
    td6.appendChild(node6);
    td7.appendChild(node7);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    row.appendChild(td7);
    document.getElementById('tblbdy').appendChild(row);
}

function generatechartdata(data){
    var ctx = document.getElementById("myChart").getContext("2d");
    const labels = ['January','February','March','April','May','June','July'];
    const chardata={
        labels:labels,
        datasets : [{
        label: 'Attendance Data',
        data: data
        }]
    }
    
    lineChart = new Chart(ctx,{
       type: 'bar',
        data: chardata,
        options: {
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        } 
    });
// var lineChartData2 = {
//     labels: generateLabelsFromTable(),
//     datasets: generateDataSetsFromTable()
};