import m from "https://esm.sh/mithril";

const BluesTableHeader = {
    view: () => {
        return m("thead", 
                    m("tr", 
                        [m("th.corner", "Blues"), 
                        ..._.range(1,31).map((name) => m("th", name))
                        ]
                    )
                )
    }
}

export default BluesTableHeader;