import m from "https://esm.sh/mithril";


const NamedShineRow = {
    async oninit() {
        await customElements.whenDefined('sl-details');
    },

    view: ({ attrs: { area } })  => {
        let n_missing = area.missing_shines.length
        let n_have = area.have_shines.length
        
        return m("sl-details", [
                    m("div", {slot: "summary"}, [
                        m("img", {src: "./assets/img/shine.png", style: "width: 1.2em;height: 1.2em;margin-bottom: -4px;margin-left: -2px;"}),
                        " × " + area.shine_count.toString()+"/"+area.shine_state.length.toString()
                    ]),
                    (n_missing != 0) ? m("span.missing", "Missing: " + area.missing_shines) : null, 
                    (n_missing != 0 && n_have != 0) ? m("br") : null,
                    (n_have != 0)    ? m("span.have", "Have: " + area.have_shines)          : null, 
                ])
    }
}

export default NamedShineRow;