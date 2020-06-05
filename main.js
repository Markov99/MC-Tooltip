window.addEventListener("load", function () {

    var offset = 20;

    function handler(event) {

        minetip = event.currentTarget.querySelector("div");
        if (event.type == "mousemove" || event.type == "mouseover") {
            minetip.style.display = "block";
            if (window.innerWidth < event.pageX + offset + minetip.offsetWidth) {
                minetip.style.left = event.pageX - offset - minetip.offsetWidth + "px";
            } else {
                minetip.style.left = event.pageX + offset + "px";
            }
            if (window.innerHeight < event.pageY - offset + minetip.offsetHeight) {
                minetip.style.top = event.pageY - (event.pageY + minetip.offsetHeight - window.innerHeight) + "px";
            } else {
                minetip.style.top = event.pageY - offset + "px";
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