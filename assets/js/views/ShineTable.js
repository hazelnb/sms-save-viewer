import m from "https://esm.sh/mithril";
import ShineRow from "./ShineRow.js"
import Areas from "../models/Areas.js";

const ShineTable = {
    view: () => {
        const SHINE_NAMES = ["1", "2", "3", "4", "5", "6", "7", "8"]
  
        return m("table#shineTable", [
            m("thead", m("tr", [
                m("th.corner", "Shines"), 
                ...SHINE_NAMES.map((name) => m("th", name)),
                m("th", {colspan: 2}, "???"),
                m("th.coin")
            ])),
                m("tbody", Areas.list.map((area) => m(ShineRow, {area})))]
              )
    }
}

export default ShineTable;