import m from "https://esm.sh/mithril";
import Parser from "../models/SaveParser.js";
import State from "../models/State.js";

const SlotSelect = {
    view: () => {
        const fnames = ["A", "B", "C"];

        return m("fieldset#slotSelectRadio", 
            fnames.map((key) => {
                return m("span", [m("input", {type: "radio", 
                                             id: key, 
                                             name: "slot_select", 
                                             value: key, 
                                             checked: (State.selected_slot === key), 
                                             onchange: Parser.swapSlot.bind(Parser)}),
                                 m("label", {for: key}, 
                                    m("img", {src: "./assets/img/"+key+"_block.png", width: "100em"})
                                 )]);
          }),
        )
      }
}

export default SlotSelect;