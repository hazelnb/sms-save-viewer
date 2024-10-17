import m from "https://esm.sh/mithril";


const BlueTooltipContent = {
    view: ({attrs: {area, blue}}) => {
        if (area.constructor.name == "VanillaArea") {
            return m("div", {slot: "content"}, 
                        [m("b", blue["description"]),
                         m("br"),
                         m("span", `MP Legacy # = ${blue["mario_party_legacy_num"]}`),
                         m("br"),
                         m("span", `Mario Wiki # = ${blue["mario_wiki_num"]}`),
                         m("br"),
                         m("span", `Flag ID # = ${"0x" + (0x10000 + area.blues_address(blue["mem_num"]-1)).toString(16)}`)]
                )
        } else if (area.constructor.name == "EclipseArea") {
            return m("div", {slot: "content"}, 
                        [m("b", blue["description"]),
                         m("br"),
                         m("span", `Subway Circuit # = ${blue["subway_circuit_num"]}`),
                         m("br"),
                         m("span", `Flag ID # = ${"0x" + (0x10000 + area.blues_address(blue["mem_num"]-1)).toString(16)}`)]
                    )
        }
    }
}

export default BlueTooltipContent;