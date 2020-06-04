window.addEventListener("load", () => {



var minetip = document.createElement("div");
minetip.className = "minetip";


function handler(event) {
    // console.log(event.target);
    // console.log(event.type);
    // console.log(event.currentTarget.attributes);
    console.log(event.currentTarget.attributes["data-minetip-title"].nodeValue);
    console.log(event.currentTarget.attributes["data-minetip-text"].nodeValue);
    if (event.type == "mouseover") {

    } else if (event.type == "mouseout") {
        
    } else if (event.type == "mousemove") {

    }
}


var minetips = document.querySelectorAll("span.minetip");
for (var i=0; i<minetips.length;i++) {
    // console.log(minetips[i]);
    minetips[i].addEventListener("mouseover", handler);
    minetips[i].addEventListener("mouseout", handler);
    minetips[i].addEventListener("mousemove", handler);
}



});





