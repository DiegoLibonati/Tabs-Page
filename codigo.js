const btns = document.querySelectorAll(".buttons");
const newText = document.querySelector(".text");


btns.forEach(function(btn){
    btn.addEventListener("click", (e)=>{
        let myActualButton = e.target.id;

        if (myActualButton == "btnhistory"){
            newText.innerHTML = "La historia de este lugar es xD"
        } else if (myActualButton == "btnvision"){
            newText.innerHTML = "La vision es xD"
        } else {
            newText.innerHTML = "Los goals son xd"
        }
    });
});

document.body.addEventListener("keydown", (e)=>{
    let myActualButton = e.target.id;  
    if (e.key == "Tab"){
        if (myActualButton == ""){
            newText.innerHTML = "La historia de este lugar es xD"
        } else if (myActualButton == "btnhistory"){
            newText.innerHTML = "La vision es xD"
        } else if (myActualButton == "btnvision"){
            newText.innerHTML = "Los goals son xd"
            
        }
    }
});