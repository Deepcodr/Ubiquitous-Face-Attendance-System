document.getElementById("passwordfield").addEventListener('input',allowlogin);

function allowlogin(e){
    var pass=e.target.value;
    var un=document.getElementById('usernamefield').value;
    if(pass.length>=8 && un!=="")
    {
        document.getElementById('loginbtn').classList.remove("disabled");
    }
    else
    {
        document.getElementById('loginbtn').classList.add("disabled");
    }    
}