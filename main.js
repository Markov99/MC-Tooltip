/*jshint esversion: 6 */
window.addEventListener("load", function () {

    const default_config_load_img = {
        "data-img-width": "32px",
        "data-img-height": "32px",
        "data-img-alt": "*img*",
        "data-img-src": "static/img/placeholder.png",
    };
    const default_config_event = {
        "data-offset-x": 20,
        "data-offset-y": 40,
    };

    function create_handler(config) {
        config["data-offset-x"] = parseInt(config["data-offset-x"]);
        config["data-offset-y"] = parseInt(config["data-offset-y"]);
        return function (event) {
            /* jshint ignore:start */
            return eval("var config=" + JSON.stringify(config) + ";" + handler_base);
            /* jshint ignore:end */
        };
    }

    const handler_base = 'minetip=event.currentTarget.querySelector("div");if(event.type=="mousemove"||event.type=="mouseover"){minetip.style.display="block";if(window.innerWidth<event.pageX+config["data-offset-x"]+minetip.offsetWidth){minetip.style.left=event.pageX-config["data-offset-x"]-minetip.offsetWidth+"px"}else{minetip.style.left=event.pageX+config["data-offset-x"]+"px"}if(window.innerHeight<event.pageY-config["data-offset-y"]+minetip.offsetHeight){minetip.style.top=event.pageY-(event.pageY+minetip.offsetHeight-window.innerHeight)+"px"}else{minetip.style.top=event.pageY-config["data-offset-y"]+"px"}}else if(event.type=="mouseout"){minetip.style.display="none"}';
    var a, b, c, d; //counters for loops
    var minetips;
    var config_event = {};
    var config_load_img = {};
    var config_attributes;
    var image_attributes;
    var handler;
    var configs = document.querySelectorAll("span.minetips");
    for (a = 0; a < configs.length; a++) {
        minetips = configs[a].querySelectorAll("span.minetip");
        for (b = 0; b < minetips.length; b++) {
            config_attributes = minetips[b].parentElement.attributes;
            minetip_images = minetips[b].querySelectorAll("img");
            config_event = {};
            for (c in default_config_event) {
                if (config_attributes.hasOwnProperty(c)) {
                    config_event[c] = config_attributes[c].value;
                } else {
                    config_event[c] = default_config_event[c];
                }
            }
            for (c = 0; c < minetip_images.length; c++) {
                image_attributes = minetip_images[c].attributes;
                config_load_img = {};
                for (d in default_config_load_img) {
                    if (image_attributes.hasOwnProperty(d.replace("data-img-", ""))) {
                        config_load_img[d] = image_attributes[d.replace("data-img-", "")].value;
                    } else if (config_attributes.hasOwnProperty(d)) {
                        config_load_img[d] = config_attributes[d].value;
                    } else {
                        config_load_img[d] = default_config_load_img[d];
                    }
                }
                console.log(image_attributes);
                console.log(config_attributes);
                console.log(config_load_img);
                for (d in config_load_img) {
                    if (config_load_img.hasOwnProperty(d)) {
                        minetip_images[c].setAttribute(d.replace("data-img-", ""), config_load_img[d]);
                    }
                }
            }
            handler = create_handler(config_event);
            minetips[b].addEventListener("mouseover", handler);
            minetips[b].addEventListener("mouseout", handler);
            minetips[b].addEventListener("mousemove", handler);
        }
    }
});