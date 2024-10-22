import m from "https://esm.sh/mithril";

import State from "../models/State.js";
import SlotSelect from "./SlotSelect.js";
import ShineTable from "./ShineTable.js";
import BluesTable from "./BluesTable.js";
import BluesSortInput from "./BluesSortInput.js";

const SummaryLayout = {
    view: () => {
      return m("#summaryLayout", [m(SlotSelect), m("#tables", [m(ShineTable), m(BluesTable)]), m(BluesSortInput, {name: "Vanilla", class_name: "VanillaArea", sorts: [["mario_party_legacy_num", "Mario Party Legacy order"], ["mario_wiki_num", "Mario Wiki order"], ["mem_num", "Memory order"]]}),
      State.is_eclipse ? m(BluesSortInput, {name: "Eclipse", class_name: "EclipseArea", sorts: [["subway_circuit_num", "Subway Circuit yt order"], ["mem_num", "Memory order"]]}) : null]);
    }
}

export default SummaryLayout;