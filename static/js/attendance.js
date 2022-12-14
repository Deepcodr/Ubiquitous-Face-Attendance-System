let imagepath = window.location.href;
const video = document.getElementById("video");
let click_button = document.querySelector("#click-photo");
const isScreenSmall = window.matchMedia("(max-width: 700px)");
let camera_button = document.querySelector("#start-camera");
var uid = JSON.parse(document.getElementById("user_id").textContent);
var data;
var studentdata;

window.onload = function () {
    var http = new XMLHttpRequest();

    var url = "http://127.0.0.1:5000/allow" + "?uid=" + encodeURIComponent(uid);
    http.open('GET', url, true);
    http.send();

    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            if (http.status === 200) {
                if (JSON.parse(http.response) === "No Attendance Found" || JSON.parse(http.response) === "Attendance Time Out") {
                    alert(JSON.parse(http.response));
                }
                else {
                    data = JSON.parse(http.response)
                    console.log(data);
                    localStorage.setItem('data',JSON.stringify(data[0]));
                    if (!isEmptyObject(data[0])) {
                        click_button.disabled = false;
                        camera_button.disabled = false;
                        var http1 = new XMLHttpRequest();

                        var uid = JSON.parse(document.getElementById("user_id").textContent);
                        var url = "http://127.0.0.1:5000/student" + "?uid=" + encodeURIComponent(uid);
                        http1.open('GET', url, true);
                        http1.send();

                        http1.onreadystatechange = function () {
                            if (http1.readyState === 4) {
                                if (http1.status === 200) {
                                        studentdata = JSON.parse(http1.response);
                                        console.log(studentdata)
                                        localStorage.setItem('studentdata',JSON.stringify(studentdata[0]))
                                }
                                else {
                                    alert(JSON.parse(http1.response));
                                }
                            }
                        }
                    }
                    else {
                        click_button.disabled = true;
                        camera_button.disabled = true;
                    }
                }
            }
            else {
                alert("No Attendance To Mark");
            }
        }
    }
}

function isEmptyObject(obj) {
    return JSON.stringify(obj) === '{}';
}


navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

click_button.addEventListener('click', function () {
    takeASnap();
    $(document).ready(face());
});

camera_button.addEventListener('click', async function () {
    navigator.getUserMedia(
        { video: {} },
        stream => (video.srcObject = stream),
        err => console.error(err)
    );
});


function takeASnap() {
    video.remove();
    video.pause();
    video.style.display = 'none';
    document.getElementById('OriginalImage').style.display = 'block';
    const canvas = document.createElement('canvas'); // create a canvas
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');
    document.getElementById('OriginalImage').setAttribute('src', image_data_url);
}

async function face() {
    const MODEL_URL = '/static/models' //model directory

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL) // model to detect face landmark
    await faceapi.loadFaceRecognitionModel(MODEL_URL) //model to Recognise Face
    await faceapi.loadFaceExpressionModel(MODEL_URL) //model to detect face expression

    const img = document.getElementById('OriginalImage')
    let faceDescriptions = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors()
    const canvas = $('#reflay').get(0);
    faceapi.matchDimensions(canvas, img)

    faceDescriptions = faceapi.resizeResults(faceDescriptions, img)
    // faceapi.draw.drawDetections(canvas, faceDescriptions)
    // faceapi.draw.drawFaceLandmarks(canvas, faceDescriptions)
    // faceapi.draw.drawFaceExpressions(canvas, faceDescriptions)


    const labels = ['shashank', 'prasad2', 'deepak', 'deepak3', 'idphoto', 'soheb', 'kartik', 'prasad']

    const labeledFaceDescriptors = await Promise.all(
        labels.map(async label => {
            imgUrl = `/static/images/faces/` + `${label}.jpg`;
            const img = await faceapi.fetchImage(imgUrl);
            const faceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

            if (!faceDescription) {
                alert("No Face Matched");
            }

            const faceDescriptors = [faceDescription.descriptor]
            return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
        })
    );

    const threshold = 0.6
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, threshold)

    const results = faceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))

    results.forEach((bestMatch, i) => {
        // const box = faceDescriptions[i].detection.box
        const text = bestMatch.toString()
        if (text.includes("unknown")) {
            alert("No Matching face found" + text);
        }
        else 
        {
            console.log("face found" + text);
            var subdata=JSON.parse(localStorage.getItem('data'))
            var stdata=JSON.parse(localStorage.getItem('studentdata'))
            var roll= stdata['StudentRoll']
            var id= subdata['StaffID']
            var sub= subdata['Sub']
            var cls=subdata['Class']
            var dept=stdata['Department']
            var div=subdata['Division']

            postdata = JSON.stringify({
                "Roll_no": roll,
                "StaffID": id,
                "Sub": sub,
                "Class": cls,
                "Department": dept,
                "Division": div
            });

            var http = new XMLHttpRequest();

            http.open('POST', "http://127.0.0.1:5000/attendance/", true);

            http.send(postdata);

            http.onreadystatechange = function () {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                        alert(JSON.parse(http.response));
                        location.reload();
                    }
                    else if (http.status === 500) {
                        alert("Incorrect Data");
                        location.reload();
                    }
                    else {
                        alert(JSON.parse(http.response));
                        location.reload();
                    }
                }
            }


        }
        // const drawBox = new faceapi.draw.DrawBox(box, { label: text })
        // drawBox.draw(canvas)
    })
    console.log("end of face");
}