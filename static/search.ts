// settings menu
{
    const menu: HTMLElement = document.getElementById("menu")!;

    enum OptionType {
        Checkbox,
        Input,
        Select,
    }

    class Option {

        id: string;
        type: OptionType;
        param: Array<any>;
        func: Function;

        constructor(id: string, type: OptionType, param: Array<any>, func: Function) {
            this.id = id;
            this.type = type;
            this.param = param;
            this.func = func;

            switch (type) {
                case OptionType.Checkbox: {
                    let isChecked = "checked";
                    if (parseInt(localStorage[id]) == 1) {
                        this.param[0] = 1;
                        func(1);
                    } else if (parseInt(localStorage[id]) == 0) {
                        this.param[0] = 0;
                        func(0);
                    } else {
                        this.param[0] = param[0];
                        func(param[0]);
                    }

                    let button = document.createElement("DIV");
                    let sid = "";
                    if (param[0] === 1) sid = isChecked;

                    button.classList.add("checkbox");
                    button.innerHTML += `
                        <label for="` + id + "%menu" + `">` + id + `</label>
                        <button class="checkbox ` + sid + `" id="` + id + "%menu" + `"></button>
                    `;
                    menu.appendChild(button);

                    let checkbox = (button.children[1] as HTMLButtonElement);
                    checkbox.onclick = () => {
                        if (checkbox.classList.contains(isChecked)) {
                            checkbox.classList.remove(isChecked);
                            localStorage[id] = "0";
                            func(0);
                        } else {
                            checkbox.classList.add(isChecked);
                            localStorage[id] = "1";
                            func(1);
                        }
                    };
                    break;
                }
                case OptionType.Input: {
                    let inputBox = document.createElement("DIV");
                    inputBox.innerHTML += `
                        <label for="` + id + `">` + id + `</label>
                        <input class="value" value="` + param[0] + `" id="` + id + "%menu" + `"></button>
                    `;
                    let input = (inputBox.children[1] as HTMLButtonElement);
                    if (localStorage[id] != null && localStorage[id].length != 0) {
                        input.value = localStorage[id];
                    }

                    func(this.param[1], input.value);
                    input.oninput = () => {
                        func(this.param[1], input.value);
                        localStorage[id] = input.value;
                    };

                    menu.appendChild(inputBox);
                    break;
                }
				case OptionType.Select: {
					let selectBox = document.createElement("DIV");
					selectBox.classList.add("checkbox");
                    selectBox.innerHTML += `
                        <label for="` + id + `">` + id + `</label>
						<select>
							<option value="0"><span>goofy</span></option>
							<option value="1"><span>dark</span></option>
							<option value="2"><span>light</span></option>
						</select>
                    `;

                    let select = (selectBox.children[1] as HTMLSelectElement);

					func(localStorage[id])

					select.onclick = (e) => {
						e.preventDefault();
						let themeId = select.selectedIndex;
                        localStorage[id] = themeId;
						func(themeId)
					} 

					menu.appendChild(selectBox);
					break;
				} 
            }
        }

    }

    let options: Option[] = [
        new Option("Shortcut Menu", OptionType.Checkbox, [1], (enabled) => {
            let menu = document.getElementById("Shortcut Menu");
            if (menu == null) return;
            if (!enabled) {
                menu.classList.add("fade-out");
                setTimeout(() => {
                    menu.classList.add("hide");
                    menu.classList.remove("fade-out");
                }, 200);
            } else {
                menu.style.display = "block";
                menu.classList.remove("fade-in");
                menu.classList.remove("hide");
            }
        }),
        new Option("Show Image", OptionType.Checkbox, [1], (enabled) => {
            let img = document.getElementById("searchImg");
            if (enabled) {
                img.classList.remove("hide");
            } else {
                img.classList.add("hide");
            }
        }),
        new Option("Custom Image", OptionType.Input, ["https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-yVgNlYD_lXY%2FTgF_TH-OFUI%2FAAAAAAAAC_o%2FKUr5UQtVKLw%2Fs1600%2Fnyan-cat-animated.gif&f=1&nofb=1", "searchImg"], (elemToChange, change) => {
            let input = document.getElementById(elemToChange);
            if (input instanceof Image) {
                input.src = change;
            }
        }),
        new Option("Search Engine", OptionType.Input, ["https://google.com/search", "search"], (elemToChange, change) => {
            let input = document.getElementById(elemToChange);
            if (input instanceof HTMLFormElement) {
                input.action = change;
            }
        }),
        new Option("Theme", OptionType.Select, [], (selectId) => {
			let theme;
			if (selectId == 0) {
				theme = `
					--text_color: white;
					--primary: #101638;
					--secondary: #141C48;
					--secondary-hover: #1d2654;
					--accent: #ff0c58;
					--border: .9em;
				`
			} else if(selectId == 1) {
				theme = `
					--text_color: white;
					--primary: #121212;
					--secondary: #1f2126;
					--secondary-hover: #2a2d33;
					--accent: #009c5a;
					--border: .9em;
				`
			} else if(selectId == 2) {
				theme = `
					--text_color: black;
					--primary: #f0dddd;
					--secondary: #fff5f5;
					--secondary-hover: #fff;
					--accent: #ff0c58;
					--border: .9em;
				`
			}

			document.getElementById("theme").innerHTML = ":root{" + theme + "}";
		}),
    ];

}

// dropdowns
function dropdown(node: HTMLElement) {
    let sibling = node.nextElementSibling;
    if (sibling != null) {
        node.classList.toggle('toggled');
        sibling.classList.toggle('animate');
        setTimeout(() => {
            if (node.classList.contains('toggled')) {
                sibling.classList.add('hide');
            } else if (!node.classList.contains('toggled')) {
                sibling.classList.remove('hide');
            }
            sibling.classList.toggle('animate');
        }, 180);
    }
}

// other
window.onload = () => {
    const timer = document.getElementById("timer");
    timer.innerHTML = getTime();
    setInterval(() => {
        timer.innerHTML = getTime();
    }, 1000);
}

function getTime() {
    var timeNow = new Date();
    var hours = timeNow.getHours();
    var minutes = timeNow.getMinutes();
    var time = "" + ((hours > 12) ? hours - 12 : hours);
    time += ((minutes < 10) ? ":0" : ":") + minutes;
    time += (hours >= 12) ? " PM" : " AM";
    return time;
}
