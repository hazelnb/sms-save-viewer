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
                     ...Areas.list.map((area) => m(BluesRow, {area}))]),
                     m(BluesSortInput, {name: "Vanilla", class_name: "VanillaArea", sorts: [["mario_party_legacy_num", "Mario Party Legacy order"], ["mario_wiki_num", "Mario Wiki order"], ["mem_num", "Memory order"]]}),
                     State.is_eclipse ? m(BluesSortInput, {name: "Eclipse", class_name: "EclipseArea", sorts: [["subway_circuit_num", "Subway Circuit yt order"], ["mem_num", "Memory order"]]}) : null]
    }
}

export default BluesTable;