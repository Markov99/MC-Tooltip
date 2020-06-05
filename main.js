/*jshint esversion: 6 */
window.addEventListener("load", function () {

    // function myfunction(foobar) {
    //     alert(foobar);
    // }
    // function decorate(func) {
    //     return function(...args) {
    //         func(...args);
    //     };
    // }
    // var result = decorate(func);
    // result("Hi there");


    // alter = (args, method) => args[method + "Class"]("active");
    // alter(args, "add");

    // function handler(event) {
    //     window.config_event["data-offset-x"] = parseInt(window.config_event["data-offset-x"]);
    //     window.config_event["data-offset-y"] = parseInt(window.config_event["data-offset-y"]);
    //     return handler(event, window.config_event);
    // }

    function handler(event) {
        var config = {};
        config["data-offset-x"] = parseInt(window.config_event["data-offset-x"]);
        config["data-offset-y"] = parseInt(window.config_event["data-offset-y"]);

        function func(event) {
            minetip = event.currentTarget.querySelector("div");
            if (event.type == "mousemove" || event.type == "mouseover") {
                minetip.style.display = "block";
                if (window.innerWidth < event.pageX + config["data-offset-x"] + minetip.offsetWidth) {
                    minetip.style.left = event.pageX - config["data-offset-x"] - minetip.offsetWidth + "px";
                } else {
                    minetip.style.left = event.pageX + config["data-offset-x"] + "px";
                }
                if (window.innerHeight < event.pageY - config["data-offset-y"] + minetip.offsetHeight) {
                    minetip.style.top = event.pageY - (event.pageY + minetip.offsetHeight - window.innerHeight) + "px";
                } else {
                    minetip.style.top = event.pageY - config["data-offset-y"] + "px";
                }
            } else if (event.type == "mouseout") {
                minetip.style.display = "none";
            }
        }
        return func(event);
    }

    // function func(event, config) {
    //     minetip = event.currentTarget.querySelector("div");
    //     if (event.type == "mousemove" || event.type == "mouseover") {
    //         minetip.style.display = "block";
    //         if (window.innerWidth < event.pageX + config["data-offset-x"] + minetip.offsetWidth) {
    //             minetip.style.left = event.pageX - config["data-offset-x"] - minetip.offsetWidth + "px";
    //         } else {
    //             minetip.style.left = event.pageX + config["data-offset-x"] + "px";
    //         }
    //         if (window.innerHeight < event.pageY - config["data-offset-y"] + minetip.offsetHeight) {
    //             minetip.style.top = event.pageY - (event.pageY + minetip.offsetHeight - window.innerHeight) + "px";
    //         } else {
    //             minetip.style.top = event.pageY - config["data-offset-y"] + "px";
    //         }
    //     } else if (event.type == "mouseout") {
    //         minetip.style.display = "none";
    //     }
    // }

    window.default_config_load = {
        "data-img-width": "32px",
        "data-img-height": "32px",
        "data-img-alt": "*image*",
    };
    window.default_config_event = {
        "data-offset-x": 20,
        "data-offset-y": 40,
    };

    var i, j, k;
    var minetip;
    var minetips;
    window.config_event = {};
    var load_config;
    var data;
    var key;
    var attributes;
    var configs = document.querySelectorAll("span.minetips");
    for (i = 0; i < configs.length; i++) {
        minetips = configs[i].querySelectorAll("span.minetip");
        for (j = 0; j < minetips.length; j++) {
            attributes = minetips[j].parentElement.attributes;
            for (k in window.default_config_event) {
                if (attributes.hasOwnProperty(k)) {
                    window.config_event[k] = attributes[k].value;
                } else {
                    window.config_event[k] = window.default_config_event[k];
                }
            }
            console.log(window.config_event);
            minetips[j].addEventListener("mouseover", handler);
            minetips[j].addEventListener("mouseout", handler);
            minetips[j].addEventListener("mousemove", handler);
        }
    }
});
