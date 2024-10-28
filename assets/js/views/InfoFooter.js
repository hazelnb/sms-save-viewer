import m from "https://esm.sh/mithril";

const InfoFooter = {
    view: (vnode) => {
        return m("footer", {class: vnode.attrs.class}, [
            m("div", ["Sunshine Scorecard v1.0.0 by ", m("a", {href: "https://github.com/hazelnb", target: "_blank"}, "Hazel Brenner")]),
            m("div", [m("img.icon", {src: "./assets/img/i-github.svg"}), m("a", {href: "https://github.com/hazelnb/sunhsine-scorecard", target: "_blank"}, "See on Github")])
        ])
    }
}

export default InfoFooter;