import m from "https://esm.sh/mithril";
import NamedShineRow from "./NamedShineRow.js";

const ShineRow = {
    view: ({ attrs: { area } }) => {
        if (area.shine_state.length == 0){
            return null;
        } else if (area.shine_names != undefined) {
            return  m("tr.shine-row", [m("th", area.name),m("td",{colspan: 11}, m(NamedShineRow, {area}))])
        } else {
            return m("tr.shine-row", [m("th", area.name),
                    ...area.shine_state.map((state) => m("td", {class: state.toString()}))])
        }
    }
}

export default ShineRow;
  