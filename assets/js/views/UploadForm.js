import m from "https://esm.sh/mithril";
import Parser from "../models/SaveParser.js";
import SMSTextBox from "./SMSTextBox.js";

const UploadForm = {
    view: () => {
      return [m(SMSTextBox, {className: "titleBox"}, m("p.contents", 'Sunshine Scorecard')),
        m(SMSTextBox, {className: "uploadBox"}, [m("p.contents", "Save File Parser+Viewer"), m("form#uploadForm",
          [m("input#saveFile", {type: "file", accept: ".gci", style: "display:none;", onchange: Parser.readSave.bind(Parser)}),
          m("label#saveFileLabel", {for: "saveFile"}, "Upload your SMS save")]
      )])]
    }
}

export default UploadForm;