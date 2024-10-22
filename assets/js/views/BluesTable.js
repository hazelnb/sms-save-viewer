import m from "https://esm.sh/mithril";

import BluesTableHeader from "./BluesTableHeader.js";
import BluesRow from "./BluesRow.js";
import BluesSortInput from "./BluesSortInput.js";

import State from "../models/State.js"
import Areas from "../models/Areas.js"

const BluesTable = {
    view: () => { 
        return [m("table#bluesTable", 
                    [m(BluesTableHeader),
                     m("tbody", [...Areas.list.map((area) => m(BluesRow, {area}))])])]
    }
}

export default BluesTable;