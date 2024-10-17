import m from "https://esm.sh/mithril";
import ShineRow from "./ShineRow.js"
import Areas from "../models/Areas.js";

const ShineTable = {
    view: () => {
      const SHINE_NAMES = ["1", "2", "3", "4", "5", "6", "7", "8", "Secret 1", "Secret 2", "100 Coins"]
  
      return m("table#shineTable", 
               [m("tr", [m("th.corner", "Shines"), ...SHINE_NAMES.map((name) => m("th", name))]),
                ...Areas.list.map((area) => m(ShineRow, {area}))]
              )
    }
}

export default ShineTable;