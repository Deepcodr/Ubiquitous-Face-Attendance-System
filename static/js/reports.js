window.onload=function(){
    var i=1;

    var http=new XMLHttpRequest();

    var uid=JSON.parse(document.getElementById("user_id").textContent);
    var url="http://127.0.0.1:5000/attendance"+"?uid="+encodeURIComponent(uid);
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
    const node1=document.createTextNode(i)
    const node2=document.createTextNode(item['Sub'])
    const node3=document.createTextNode(item['StaffID'])
    const node4=document.createTextNode(item['DateStamp'])
    const node5=document.createTextNode(item['Attendance_time'])
    td1.appendChild(node1);
    td2.appendChild(node2);
    td3.appendChild(node3);
    td4.appendChild(node4);
    td5.appendChild(node5);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
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

// function generateLabelsFromTable() {
//     var labels = [];
//     var rows = jQuery("tr");
//     rows.each(function (index) {
//         if (index != 0)
//         {
//             var cols = $(this).find("td");
//             labels.push(cols.first().text());
//         }
//     });
//     return labels;
// }

// function generateDataSetsFromTable() {
//     var data;
//     var datasets = [];
//     var rows = jQuery("tr");
//     var data = [];
//     rows.each(function (index) {
//         if (index != 0)
//         {
//             var cols = $(this).find("td");
//             cols.each(function (innerIndex) {
//                 if (innerIndex != 0)
//                    data.push($(this).text());
//             });
//         }
//     });
//     var dataset = {
//         fillColor: "rgba(238,155,0,0.2)",
//         strokeColor: "rgba(217,0,0,1)",
//         pointColor: "rgba(166,0,0,1)",
//         pointStrokeColor: "#fff",
//         pointHighlightFill: "#fff",
//         pointHighlightStroke: "rgba(151,187,205,1)",
//         data: data
//     }
//     datasets.push(dataset);
//     return datasets;
// }
