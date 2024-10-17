import m from "https://esm.sh/mithril";

import State from "../models/State.js";

const BluesSortInput = {
    view: ({attrs: {name, class_name, sorts}}) => {
        // const available_sorts = [["mario_party_legacy_num", "Mario Party Legacy order"], ["mario_wiki_num", "Mario Wiki order"], ["mem_num", "Memory order"]];
        
        return m("fieldset#bluesSortRadios"+name, [
            m("legend", "Choose " + name + " blue coin numbering scheme"),
                ...sorts.map((key) => {
                    return m("div", [m("input", {type: "radio", 
                                                id: name+key[0], 
                                                name: "blue_sort_" + name.toLowerCase(), 
                                                value: key[0], 
                                                checked: (State.blues_sort_keys[class_name] === key[0]), 
                                                onchange: () => State.blues_sort_keys[class_name] = key[0]}),
                                    m("label", {for: name+key[0]}, key[1])]);
                }
             ),
        ])
    }
}

  export default BluesSortInput;
  