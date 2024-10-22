import m from "https://esm.sh/mithril";

import BlueTooltipContent from "./BluesTooltipContent.js";

import State from "../models/State.js"

const BluesRow = {
    view: ({attrs: {area}}) => {     
        const area_type = area.constructor.name
        const sort_fn = (a,b) => {return a[State.blues_sort_keys[area_type]] - b[State.blues_sort_keys[area_type]]}
        const blues = area.blues_data.toSorted(sort_fn);    

        if (blues.length == 0) {
            return null
        }

        return m("tr.blues-row", [m("th", area.name),
                                    ...blues.map(function (blue) {
                                        let key = State.blues_sort_keys[area_type];
                                        
                                        return m("td", {class: blue.obtained.toString()}, 
                                                    m("a", {href: area.url(key, blue[key]), 
                                                            target: "_blank", 
                                                            rel: "noreferrer noopener"}, 
                                                        m("sl-tooltip", [m(BlueTooltipContent, {area, blue}),m(".expander")])
                                                        )
                                                )
                                    })
                                    ]
                )
    }
}

export default BluesRow;