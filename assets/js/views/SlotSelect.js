import m from "https://esm.sh/mithril";
import Parser from "../models/SaveParser.js";
import State from "../models/State.js";

const SlotSelect = {
    view: () => {
        const fnames = ["A", "B", "C"];

        return m("fieldset#slotSelectRadio", [
            m("legend", "Choose save slot"),
            ...fnames.map((key) => {
                return m("div", [m("input", {type: "radio", 
                                             id: key, 
                                             name: "slot_select", 
                                             value: key, 
                                             checked: (State.selected_slot === key), 
                                             onchange: Parser.swapSlot.bind(Parser)}),
                                 m("label", {for: key}, "File " + key)]);
          }),
        ])
      }
}

export default SlotSelect;