// settings menu
{
    var menu_1 = document.getElementById("menu");
    var OptionType = void 0;
    (function (OptionType) {
        OptionType[OptionType["Checkbox"] = 0] = "Checkbox";
        OptionType[OptionType["Input"] = 1] = "Input";
    })(OptionType || (OptionType = {}));
    var Option_1 = /** @class */ (function () {
        function Option(id, type, param, func) {
            var _this = this;
            this.id = id;
            this.type = type;
            this.param = param;
            this.func = func;
            switch (type) {
                case OptionType.Checkbox: {
                    var isChecked_1 = "checked";
                    if (parseInt(localStorage[id]) == 1) {
                        this.param[0] = 1;
                        new func(1);
                    }
                    else if (parseInt(localStorage[id]) == 0) {
                        this.param[0] = 0;
                        new func(0);
                    }
                    else {
                        this.param[0] = param[0];
                        new func(param[0]);
                    }
                    var button = document.createElement("DIV");
                    var sid = "";
                    if (param[0] === 1)
                        sid = isChecked_1;
                    button.classList.add("checkbox");
                    button.innerHTML += "\n                        <label for=\"" + id + "%menu" + "\">" + id + "</label>\n                        <button class=\"checkbox " + sid + "\" id=\"" + id + "%menu" + "\"></button>\n                    ";
                    menu_1.appendChild(button);
                    var checkbox_1 = button.children[1];
                    checkbox_1.onclick = function () {
                        if (checkbox_1.classList.contains(isChecked_1)) {
                            checkbox_1.classList.remove(isChecked_1);
                            localStorage[id] = "0";
                            new func(0);
                        }
                        else {
                            checkbox_1.classList.add(isChecked_1);
                            localStorage[id] = "1";
                            new func(1);
                        }
                    };
                    break;
                }
                case OptionType.Input: {
                    var inputBox = document.createElement("DIV");
                    inputBox.innerHTML += "\n                        <label for=\"" + id + "%menu" + "\">" + id + "</label>\n                        <input class=\"value\" value=\"" + param[0] + "\" id=\"" + id + "%menu" + "\"></button>\n                    ";
                    var input_1 = inputBox.children[1];
                    if (localStorage[id] != null && localStorage[id].length != 0) {
                        input_1.value = localStorage[id];
                    }
                    new func(this.param[1], input_1.value);
                    input_1.oninput = function () {
                        new func(_this.param[1], input_1.value);
                        localStorage[id] = input_1.value;
                    };
                    menu_1.appendChild(inputBox);
                    break;
                }
            }
        }
        return Option;
    }());
    var options = [
        new Option_1("Shortcut Menu", OptionType.Checkbox, [1], function (enabled) {
            var menu = document.getElementById("Shortcut Menu");
            if (menu == null)
                return;
            if (!enabled) {
                menu.classList.add("fade-out");
                setTimeout(function () {
                    menu.classList.add("hide");
                    menu.classList.remove("fade-out");
                }, 200);
            }
            else {
                menu.style.display = "block";
                menu.classList.remove("fade-in");
                menu.classList.remove("hide");
            }
        }),
        new Option_1("Show Image", OptionType.Checkbox, [1], function (enabled) {
            var img = document.getElementById("searchImg");
            if (enabled) {
                img.classList.remove("hide");
            }
            else {
                img.classList.add("hide");
            }
        }),
        new Option_1("Custom Image", OptionType.Input, ["https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-yVgNlYD_lXY%2FTgF_TH-OFUI%2FAAAAAAAAC_o%2FKUr5UQtVKLw%2Fs1600%2Fnyan-cat-animated.gif&f=1&nofb=1", "searchImg"], function (elemToChange, change) {
            var input = document.getElementById(elemToChange);
            if (input instanceof Image) {
                input.src = change;
            }
        }),
        new Option_1("Search Engine", OptionType.Input, ["https://duckduckgo.com/", "search"], function (elemToChange, change) {
            var input = document.getElementById(elemToChange);
            if (input instanceof HTMLFormElement) {
                input.action = change;
            }
        }),
    ];
}
// shortcut menu
{
    var shortcuts_1 = document.querySelectorAll(".shortcut-id");
    var shortcutTabs_1 = [];
    var currentTab_1 = parseInt(localStorage['tabIndex']) || 0;
    var _loop_1 = function (i) {
        var shortcutTab = document.getElementById("shortcut_" + i);
        shortcutTabs_1.push(shortcutTab);
        if (i != currentTab_1) {
            shortcuts_1[i].classList.add("hide");
        }
        else {
            shortcutTabs_1[currentTab_1].classList.add("link");
        }
        shortcutTab.onclick = function () {
            var fadeOutDuration = 200;
            if (currentTab_1 == i) {
                return;
            }
            shortcuts_1[currentTab_1].classList.add("fade-out");
            setTimeout(function () {
                shortcuts_1[currentTab_1].classList.remove("fade-out");
                // swap tabs
                shortcutTabs_1[currentTab_1].classList.remove("link");
                shortcutTab.classList.add("link");
                currentTab_1 = i;
                localStorage['tabIndex'] = i.toString();
                for (var o = 0; o < shortcuts_1.length; o++) {
                    if (o != i) {
                        shortcuts_1[o].classList.remove("fade-in");
                        shortcuts_1[o].classList.add("hide");
                    }
                }
                shortcuts_1[i].classList.remove("hide");
                shortcuts_1[i].classList.add("fade-in");
            }, fadeOutDuration);
        };
    };
    for (var i = 0; i < shortcuts_1.length; i++) {
        _loop_1(i);
    }
}
// dropdowns
function dropdown(node) {
    var sibling = node.nextElementSibling;
    if (sibling != null) {
        node.classList.toggle('toggled');
        sibling.classList.toggle('animate');
        setTimeout(function () {
            if (node.classList.contains('toggled')) {
                sibling.classList.add('hide');
            }
            else if (!node.classList.contains('toggled')) {
                sibling.classList.remove('hide');
            }
            sibling.classList.toggle('animate');
        }, 180);
    }
}
// other
window.onload = function () {
    var timer = document.getElementById("timer");
    timer.innerHTML = getTime();
    setInterval(function () {
        timer.innerHTML = getTime();
    }, 1000);
};
function getTime() {
    var timeNow = new Date();
    var hours = timeNow.getHours();
    var minutes = timeNow.getMinutes();
    var time = "" + ((hours > 12) ? hours - 12 : hours);
    time += ((minutes < 10) ? ":0" : ":") + minutes;
    time += (hours >= 12) ? " PM" : " AM";
    return time;
}
