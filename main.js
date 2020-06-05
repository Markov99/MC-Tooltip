window.addEventListener("load", function () {

    function handler(event, config) {
        minetip = event.currentTarget.querySelector("div");
        if (event.type == "mousemove" || event.type == "mouseover") {
            minetip.style.display = "block";
            if (window.innerWidth < event.pageX + config.Xoffset + minetip.offsetWidth) {
                minetip.style.left = event.pageX - config.Xoffset - minetip.offsetWidth + "px";
            } else {
                minetip.style.left = event.pageX + config.Xoffset + "px";
            }
            if (window.innerHeight < event.pageY - config.Yoffset + minetip.offsetHeight) {
                minetip.style.top = event.pageY - (event.pageY + minetip.offsetHeight - window.innerHeight) + "px";
            } else {
                minetip.style.top = event.pageY - config.Yoffset + "px";
            }
        } else if (event.type == "mouseout") {
            minetip.style.display = "none";
        }
    }

    // for (i = 0; i < config.length; i++) {
    //     // let t = configs[i].getAttribute("data-img-width");
    //     // console.log(t);
    //     // t = configs[i].getAttribute("data-img-height");
    //     // console.log(t);
    //     // t = configs[i].getAttribute("data-img-alt");
    //     // console.log(t);
    // }

    var i, j;
    var minetip;
    var default_config = {
        load: {
            Xoffset: 20,
            Yoffset: 40,
        },
        event: {
            Xoffset: 20,
            Yoffset: 40,
        },
    };

    var configs = document.querySelectorAll("span.minetips");
    var minetips = configs.querySelectorAll("span.minetip");
    var config;
    for (i = 0; i < configs.length; i++) {
        for (j = 0; j < minetips.length; j++) {
            minetips[j].addEventListener("mouseover", function (event) {
                return handler(event, config.event);
            });
            minetips[j].addEventListener("mouseout", function (event) {
                return handler(event, config.event);
            });
            minetips[j].addEventListener("mousemove", function (event) {
                return handler(event, config.event);
            });
        }
    }

});