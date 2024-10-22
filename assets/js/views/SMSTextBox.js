import m from "https://esm.sh/mithril";

const SMSTextBox = {
    view: (vnode) => {
        return m(".box", {class: vnode.attrs.className},
            [...vnode.children,
            ...["tl", "tr", "br", "bl"].map((n) => m("div.circ", {class: n}))]
        )
    }
}

export default SMSTextBox;