window.addEventListener("load", function () {

    var minetip;
    var Xoffset = 20;
    var Yoffset;

    function handler(event) {
        minetip = event.currentTarget.querySelector("div");
        Yoffset = minetip.offsetHeight * 0.25;
        if (event.type == "mousemove" || event.type == "mouseover") {
            minetip.style.display = "block";
            if (window.innerWidth < event.pageX + Xoffset + minetip.offsetWidth) {
                minetip.style.left = event.pageX - Xoffset - minetip.offsetWidth + "px";
            } else {
                minetip.style.left = event.pageX + Xoffset + "px";
            }
            if (window.innerHeight < event.pageY - Yoffset + minetip.offsetHeight) {
                minetip.style.top = event.pageY - (event.pageY + minetip.offsetHeight - window.innerHeight) + "px";
            } else {
                minetip.style.top = event.pageY - Yoffset + "px";
            }
        } else if (event.type == "mouseout") {
            minetip.style.display = "none";
        }
    }


    var minetips = document.querySelectorAll("span.minetip");
    for (var i = 0; i < minetips.length; i++) {
        minetips[i].addEventListener("mouseover", handler);
        minetips[i].addEventListener("mouseout", handler);
        minetips[i].addEventListener("mousemove", handler);
    }

});