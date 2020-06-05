/*jshint esversion: 6 */
window.addEventListener("load", function () {

    function clone_simple_object(object) {
        return JSON.parse(JSON.stringify(object));
    }

    function update_simple_dict(obj, ...arguments) {
        for (var i = 1; i < arguments.length; i++) {
            for (var prop in arguments[i]) {
                var val = arguments[i][prop];
                if (typeof val == "object") // this also applies to arrays or null!
                    update_dict(obj[prop], val);
                else
                    obj[prop] = val;
            }
        }
        return obj;
    }

    function eventHandler(event) {
        return handler(event, event_config);
    }

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

    var default_load_config = {
        img_width: "32px",
        img_height: "32px",
        img_alt: "*image*",
    };
    var default_event_config = {
        Xoffset: 20,
        Yoffset: 40,
    };

    var i, j;
    var minetip;
    var minetips;
    var event_config;
    var load_config;
    var configs = document.querySelectorAll("span.minetips");
    for (i = 0; i < configs.length; i++) {
        minetips = configs[i].querySelectorAll("span.minetip");
        for (j = 0; j < minetips.length; j++) {
            event_config = clone_simple_object(default_event_config);
            load_config = clone_simple_object(default_load_config);
            // console.log(event_config);
            update_simple_dict(event_config, {
                Xoffset: parseInt(minetips[j].parentElement.attributes["data-xoffset"].value),
                Yoffset: parseInt(minetips[j].parentElement.attributes["data-yoffset"].value),
            });
            // console.log(event_config);
            console.log('minetips[j].parentElement.attributes["data-xoffset"]:', minetips[j].parentElement.attributes["data-xoffset"].value);
            console.log('minetips[j].parentElement.attributes["data-yoffset"]:', minetips[j].parentElement.attributes["data-yoffset"].value);
            console.log(parseInt(minetips[j].parentElement.attributes["data-xoffset"].value));
            console.log(parseInt(minetips[j].parentElement.attributes["data-yoffset"].value));
            console.log(typeof minetips[j].parentElement.attributes["data-xoffset"].value);
            // console.log("minetips[j].parentElement:", minetips[j].parentElement);
            // console.log("minetips[j].parentElement.attributes:", minetips[j].parentElement.attributes);
            // console.log('minetips[j].parentElement.attributes["data-xoffset"]:', minetips[j].parentElement.attributes["data-xoffset"]);
            // console.log('minetips[j].parentElement.attributes["data-yoffset"]:', minetips[j].parentElement.attributes["data-yoffset"]);
            // console.log("event_config:", event_config);
            update_simple_dict(load_config, {
                img_width: "32px",
                img_height: "32px",
                img_alt: "*image*",
            });
            
            minetips[j].addEventListener("mouseover", eventHandler);
            minetips[j].addEventListener("mouseout", eventHandler);
            minetips[j].addEventListener("mousemove", eventHandler);
        }
    }
});
/*

obj1 = {1:2,2:3,dict:"dict",realdict:{1:2}}
obj2 = {1:5,dict:{6:7,3:0},realdict:{1:2}}
function update_simple_dict(obj, ...arguments) {
    for (var i = 1; i < arguments.length; i++) {
        for (var prop in arguments[i]) {
            var val = arguments[i][prop];
            if (typeof val == "object") // this also applies to arrays or null!
                update_dict(obj[prop], val);
            else
                obj[prop] = val;
        }
    }
    return obj;
}


var test1 = update_simple_dict(obj1, obj2)
console.log(test1, obj1)

*/


