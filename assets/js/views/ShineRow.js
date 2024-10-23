import m from "https://esm.sh/mithril";
import NamedShineRow from "./NamedShineRow.js";

const ShineRow = {
    view: ({ attrs: { area } }) => {
        if (area.shine_state.length == 0){
            return null;
        } else if (area.shine_names != undefined) {
            return  m("tr.shine-row", [m("th", area.name),m("td",{colspan: 11}, m(NamedShineRow, {area}))])
        } else {
            let n = area.shine_state.length
            
            if (n != 1) {
                var states = [...area.shine_state.slice(0, n-1), ...Array(11-n).fill(""), area.shine_state[n-1]]
            } else {
                var states = area.shine_state
            }
            
            return m("tr.shine-row", [m("th", area.name),
                    ...states.map((state) => m("td", {class: String(state)}))])
        }
    }
}

export default ShineRow;
  