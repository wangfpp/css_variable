window.onload = function() {
    let change_item_li = document.querySelectorAll("li.change_theme_item");
    let menu_item = document.querySelectorAll("li.menu_item");
    menu_item.forEach(menu => {
        menu.onclick = function(e) {
            let { target } = e;
            menu_item.forEach(item => {
                removeClass(item, "active");
            })
            addClass(target, "active");
            
        }
    })
    change_item_li.forEach(item => {
        let isActive = item.getAttribute("class").includes("active");
        if (isActive) {
            let theme = item.getAttribute("color");
            changeTheme(theme);
        }
        item.onclick = function(e) {
            let { target } = e,
            type = target.getAttribute("color");
            change_item_li.forEach(item => {
                removeClass(item, "active");
            })
            addClass(target, "active");
            changeTheme(type);
            
        }
    })

}

/**
 * @description 切换主题
 * @param {String} theme 主题类型
 */
function changeTheme(theme) {
    for (const key in cssVariable[theme]) {
        let value = cssVariable[theme][key];
        document.getElementById("root").style.setProperty(key, value)
    }
}

/**
 * @description 增加className
 * @param {Element} target Dom节点
 * @param {String} class_name 
 */
function addClass(target, class_name) {
    let class_name_list_str = target.getAttribute("class"),
    class_names = class_name_list_str.split(" ");
    if (!class_names.includes(class_name)) {
        class_names.push(class_name);
    }
    target.setAttribute("class", class_names.join(" "));
}


/**
 * @description 删除节点的某一class_name
 * @param {Element} target Dom节点
 * @param {String} class_name 属性class名
 */
function removeClass(target, class_name) {
    let class_name_list_str = target.getAttribute("class");
    if (class_name_list_str.includes(class_name)) {
        let new_class = class_name_list_str.replace(class_name, "");
        target.setAttribute("class", new_class);
    }
}



/**
 * @description 判断原始类型
 * @param {Any} variable 
 */
function variableType(variable) {
    let type = typeof variable;
    if (variable === undefined) {
        return undefined
    }
    if (type === "object") {
        let obj_type = Object.prototype.toString.call(variable)
        let obj_rep = obj_type.replace(/(^\[)[*](\]$)/, "")
        console.log(obj_type, obj_rep)
    }
    
}

document.onreadystatechange = e => {
    let { target } = e;
    if (target.readyState === "complete") {
        console.log("document loaded complete");
    }
}