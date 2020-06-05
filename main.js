/*jshint esversion: 6 */
window.addEventListener("load", function () {

    function create_handler(config) {
        config["data-offset-x"] = parseInt(config["data-offset-x"]);
        config["data-offset-y"] = parseInt(config["data-offset-y"]);
        return function (event) {
            return eval("var config=" + JSON.stringify(config) + ";" + handler_base);
        };
    }

    const handler_base = 'minetip=event.currentTarget.querySelector("div");if(event.type=="mousemove"||event.type=="mouseover"){minetip.style.display="block";if(window.innerWidth<event.pageX+config["data-offset-x"]+minetip.offsetWidth){minetip.style.left=event.pageX-config["data-offset-x"]-minetip.offsetWidth+"px"}else{minetip.style.left=event.pageX+config["data-offset-x"]+"px"}if(window.innerHeight<event.pageY-config["data-offset-y"]+minetip.offsetHeight){minetip.style.top=event.pageY-(event.pageY+minetip.offsetHeight-window.innerHeight)+"px"}else{minetip.style.top=event.pageY-config["data-offset-y"]+"px"}}else if(event.type=="mouseout"){minetip.style.display="none"}';

    const default_config_load = {
        "data-img-width": "32px",
        "data-img-height": "32px",
        "data-img-alt": "*image*",
    };
    const default_config_event = {
        "data-offset-x": 20,
        "data-offset-y": 40,
    };

    var i, j, k;
    var minetips;
    var config_event = {};
    var attributes;
    var handler;
    var configs = document.querySelectorAll("span.minetips");
    for (i = 0; i < configs.length; i++) {
        minetips = configs[i].querySelectorAll("span.minetip");
        for (j = 0; j < minetips.length; j++) {
            attributes = minetips[j].parentElement.attributes;
            config_event = {};
            for (k in default_config_event) {
                if (attributes.hasOwnProperty(k)) {
                    config_event[k] = attributes[k].value;
                } else {
                    config_event[k] = default_config_event[k];
                }
            }
            handler = create_handler(config_event);
            minetips[j].addEventListener("mouseover", handler);
            minetips[j].addEventListener("mouseout", handler);
            minetips[j].addEventListener("mousemove", handler);
        }
    }
});