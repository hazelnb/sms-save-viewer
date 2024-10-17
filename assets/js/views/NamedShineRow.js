import m from "https://esm.sh/mithril";

const NamedShineRow = {
    async oninit() {
        await customElements.whenDefined('sl-details');
    },

    view: ({ attrs: { area } })  => {
        return m("sl-details", {summary: area.shine_count.toString() + " shines"},
                 [m("span.missing", "Missing: " + area.missing_shines), m("br"),
                  m("span.have", "Have: " + area.have_shines)])
    }
}

export default NamedShineRow;