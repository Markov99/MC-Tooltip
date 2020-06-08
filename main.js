/*jshint esversion: 6 */
window.addEventListener("load", function () {

    /*---FUNCTIONS---*/
    function string2element(string) {
        let d = document.createElement('div');
        d.innerHTML = string;
        return d.firstChild;
    }

    function attributes2object(element, prefix_regex, replace_prefix_to = "") {
        let object = {};
        let attributes = element.attributes;
        for (let i = 0; i < attributes.length; i++) {
            let k = attributes[i].name;
            if (k.startsWith(prefix_regex)) {
                object_k = k.replace(prefix_regex, replace_prefix_to);
                structure = object_k.split("-");
                if (structure.length > 1) {
                    for (let j = 0; j < structure.length - 1; j++) {
                        if (!object.hasOwnProperty(structure[j])) {
                            object[structure[j]] = {};
                        }
                        object[structure[j]][structure[j + 1]] = attributes[k].value;
                    }
                } else {
                    object[object_k] = attributes[k].value;
                }
            }
        }
        return object;
    }

    function apply_template(template_string, parameters_object) {
        for (const k in parameters_object) {
            if (parameters_object.hasOwnProperty(k)) {
                template_string = template_string.split("{{k}}".replace("k", k)).join(parameters_object[k]);
            }
        }
        return string2element(template_string);
    }

    function create_handler(config) {
        const handler_base = 'mctooltip=event.currentTarget.querySelector("div");if(event.type=="mousemove"||event.type=="mouseover"){mctooltip.style.display="block";if(window.innerWidth<event.pageX+config["data-offset-x"]+mctooltip.offsetWidth){mctooltip.style.left=event.pageX-config["data-offset-x"]-mctooltip.offsetWidth+"px"}else{mctooltip.style.left=event.pageX+config["data-offset-x"]+"px"}if(window.innerHeight<event.pageY-config["data-offset-y"]+mctooltip.offsetHeight){mctooltip.style.top=event.pageY-(event.pageY+mctooltip.offsetHeight-window.innerHeight)+"px"}else{mctooltip.style.top=event.pageY-config["data-offset-y"]+"px"}}else if(event.type=="mouseout"){mctooltip.style.display="none"}';
        config["data-offset-x"] = parseInt(config["data-offset-x"]);
        config["data-offset-y"] = parseInt(config["data-offset-y"]);
        return function (event) {
            /* jshint ignore:start */
            return eval("var config=" + JSON.stringify(config) + ";" + handler_base);
            /* jshint ignore:end */
        };
    }

    function create_mctooltip(item, and_setup = true) {
        if (template.hasOwnProperty(item.type)) {
            let mctooltip = document.createElement('span');
            mctooltip.className = "mctooltip";

            let img = document.createElement('img');
            img.setAttribute("src", item.icon);

            let desc = apply_template(template[item.type], item.property);

            mctooltip.appendChild(img);
            mctooltip.appendChild(desc);
            if (and_setup) {
                setup_mctooltip(mctooltip);
            }
            return mctooltip;
        }
    }

    function setup_mctooltip(mctooltip, mctooltips) {
        if (!mctooltip.hasAttribute("data-listening")) {
            let config_attributes;
            if (mctooltips) {
                config_attributes = mctooltips.attributes;
            } else {
                config_attributes = {};
            }
            let mctooltip_images = mctooltip.querySelectorAll("img");
            let config_event = {};
            for (let c in default_config_event) {
                if (config_attributes.hasOwnProperty(c)) {
                    config_event[c] = config_attributes[c].value;
                } else {
                    config_event[c] = default_config_event[c];
                }
            }
            for (let c = 0; c < mctooltip_images.length; c++) {
                let image_attributes = mctooltip_images[c].attributes;
                let config_load_img = {};
                for (let d in default_config_setup_img) {
                    if (image_attributes.hasOwnProperty(d.replace("data-img-", ""))) {
                        config_load_img[d] = image_attributes[d.replace("data-img-", "")].value;
                    } else if (config_attributes.hasOwnProperty(d)) {
                        config_load_img[d] = config_attributes[d].value;
                    } else {
                        config_load_img[d] = default_config_setup_img[d];
                    }
                }
                for (let d in config_load_img) {
                    if (config_load_img.hasOwnProperty(d)) {
                        mctooltip_images[c].setAttribute(d.replace("data-img-", ""), config_load_img[d]);
                    }
                }
            }
            let handler = create_handler(config_event);
            mctooltip.addEventListener("mouseover", handler);
            mctooltip.addEventListener("mouseout", handler);
            mctooltip.addEventListener("mousemove", handler);
            mctooltip.setAttribute("data-listening", true);
        }
    }

    function setup_mctooltips() {
        //inside .mctooltips
        let configs = document.querySelectorAll(".mctooltips");
        for (let a = 0; a < configs.length; a++) {
            if (!configs[a].hasAttribute("data-listening")) {
                let mctooltips = configs[a].querySelectorAll(".mctooltip");
                for (let b = 0; b < mctooltips.length; b++) {
                    let mctooltip = mctooltips[b];
                    if (!mctooltip.querySelector("div")) {
                        let item = attributes2object(mctooltip, "data-item-");
                        mctooltip.innerHTML = create_mctooltip(item, false).innerHTML;
                    }
                    setup_mctooltip(mctooltip, configs[a]);
                }
                configs[a].setAttribute("data-listening", true);
            }
        }
        //outside .mctooltips   
        let mctooltips = document.querySelectorAll(':not(.mctooltips) > .mctooltip');
        for (let b = 0; b < mctooltips.length; b++) {
            let mctooltip = mctooltips[b];
            if (mctooltip.hasAttribute("data-item-type")) {
                let item = attributes2object(mctooltip, "data-item-");
                mctooltip.innerHTML = create_mctooltip(item, false).innerHTML;
                setup_mctooltip(mctooltip);
            } else {
                setup_mctooltip(mctooltip);
            }
        }
    }

    /*---DEFAULT-SETTINGS---*/
    const default_config_setup_img = {
        "data-img-width": "32px",
        "data-img-height": "32px",
        "data-img-alt": "*img*",
        "data-img-src": "static/img/placeholder.png",
    };

    const default_config_event = {
        "data-offset-x": 20,
        "data-offset-y": 40,
        // "data-offset-x": 16,
        // "data-offset-y": 36,
    };

    /*---TEMPLATES---*/
    // Aka item types
    const template = {
        sword: '<div><span>{{name}}</span><br><br> <span style="color: #A8A8A8; text-shadow: 0.11em 0.11em #292929;">When in main hand:</span><br> <span style="color: #00A800; text-shadow: 0.11em 0.11em #002900;">&nbsp;{{attackspeed}} Attack Speed</span><br> <span style="color: #00A800; text-shadow: 0.11em 0.11em #002900;">&nbsp;{{damage}} Attack Damage</span><br> <span>Durability: {{durability}}/{{durability}}</span><br> <span style="color: #545454; text-shadow: 0.11em 0.11em #151515;">{{id}}</span></div>',
        helmet: '<div> <span>{{name}}</span><br><br> <span style="color: #A8A8A8; text-shadow: 0.11em 0.11em #292929;">When on head:</span><br> <span style="color: #5454FC; text-shadow: 0.11em 0.11em #15153E;">&nbsp;+{{armortoughness}} Armor Toughness</span><br> <span style="color: #5454FC; text-shadow: 0.11em 0.11em #15153E;">&nbsp;+{{armor}} Armor</span><br> <span>Durability: {{durability}}/{{durability}}</span><br> <span style="color: #545454; text-shadow: 0.11em 0.11em #151515;">{{id}}</span><br></div>',
        chestplate: '<div> <span>{{name}}</span><br><br> <span style="color: #A8A8A8; text-shadow: 0.11em 0.11em #292929;">When on body:</span><br> <span style="color: #5454FC; text-shadow: 0.11em 0.11em #15153E;">&nbsp;+{{armortoughness}} Armor Toughness</span><br> <span style="color: #5454FC; text-shadow: 0.11em 0.11em #15153E;">&nbsp;+{{armor}} Armor</span><br> <span>Durability: {{durability}}/{{durability}}</span><br> <span style="color: #545454; text-shadow: 0.11em 0.11em #151515;">{{id}}</span><br></div>',
        leggings: '<div> <span>{{name}}</span><br><br> <span style="color: #A8A8A8; text-shadow: 0.11em 0.11em #292929;">When on legs:</span><br> <span style="color: #5454FC; text-shadow: 0.11em 0.11em #15153E;">&nbsp;+{{armortoughness}} Armor Toughness</span><br> <span style="color: #5454FC; text-shadow: 0.11em 0.11em #15153E;">&nbsp;+{{armor}} Armor</span><br> <span>Durability: {{durability}}/{{durability}}</span><br> <span style="color: #545454; text-shadow: 0.11em 0.11em #151515;">{{id}}</span><br></div>',
        boots: '<div> <span>{{name}}</span><br><br> <span style="color: #A8A8A8; text-shadow: 0.11em 0.11em #292929;">When on feet:</span><br> <span style="color: #5454FC; text-shadow: 0.11em 0.11em #15153E;">&nbsp;+{{armortoughness}} Armor Toughness</span><br> <span style="color: #5454FC; text-shadow: 0.11em 0.11em #15153E;">&nbsp;+{{armor}} Armor</span><br> <span>Durability: {{durability}}/{{durability}}</span><br> <span style="color: #545454; text-shadow: 0.11em 0.11em #151515;">{{id}}</span><br></div>',
        
    };

    /*---ITEMS---*/
    const item = {
        obsidian_sword_item: {
            type: "sword",
            icon: "wip/obsidian_sword_item.png",
            property: {
                name: "Obsidian Sword",
                attackspeed: "1.6",
                damage: "6",
                durability: "2341",
                id: "obsidianta:obsidian_sword_item",
            },
        },
        /*
        my_sword: {
            type: "sword", //template
            property: {
                icon: "my_sword.png", //img src
                name: "Obsidian Sword",
                attackspeed: "1.6",
                damage: "6",
                durability: "2341",
                id: "mod_id:my_sword",
            },
        },
        */
    };
    setup_mctooltips();
});
// probably i need to create "create_mctooltips" func, that is for it:
// <span class="mctooltips" data-offset-x="20" data-offset-y="40" data-img-width="32px" data-img-height="32px"
// data-img-alt="*image*" data-img-src="wip/obsidian_sword_item.png">