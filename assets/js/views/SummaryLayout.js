import m from "https://esm.sh/mithril";
import SlotSelect from "./SlotSelect.js";
import ShineTable from "./ShineTable.js";
import BluesTable from "./BluesTable.js";

const SummaryLayout = {
    view: () => {
      return m("#summaryLayout", [m(SlotSelect), m("#tables", [m(ShineTable), m(BluesTable)])]);
    }
}

export default SummaryLayout;