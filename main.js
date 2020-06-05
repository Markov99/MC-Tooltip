window.addEventListener("load", () => {



    var minetip = document.createElement("div");
    minetip.className = "minetip";
    minetip.innerHTML = "test</br>test2";


    function handler(event) {
        // pageX = event.pageX;
        // pageY = event.pageY;
        minetip = event.currentTarget.querySelector("div");
        // console.log(minetip);
        // console.log(event.target);
        // console.log(event.type);
        // console.log(event.currentTarget.attributes);
        // console.log(event.currentTarget.attributes["data-minetip-title"].nodeValue);
        // console.log(event.currentTarget.attributes["data-minetip-text"].nodeValue);
        if (event.type == "mouseover") {
            minetip.style.display = "block";
            minetip.style.left = event.pageX+"px";
            // minetip.style.top = (event.pageY-minetip.offsetHeight/2)+"px";
            minetip.style.top = event.pageY-20+"px";
        } else if (event.type == "mouseout") {
            minetip.style.display = "none";
        } else if (event.type == "mousemove") {
            minetip.style.left = event.pageX+"px";
            // minetip.style.top = (event.pageY-minetip.offsetHeight/2)+"px";
            minetip.style.top = event.pageY-20+"px";
        }
    }


    var minetips = document.querySelectorAll("span.minetip");
    for (var i = 0; i < minetips.length; i++) {
        // console.log(minetips[i]);
        // event.currentTarget.appendChild(minetip);
        minetips[i].addEventListener("mouseover", handler);
        minetips[i].addEventListener("mouseout", handler);
        minetips[i].addEventListener("mousemove", handler);
    }



});