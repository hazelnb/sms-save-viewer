import m from "https://esm.sh/mithril";
import Parser from "../models/SaveParser.js";
import SMSTextBox from "./SMSTextBox.js";
import InfoFooter from "./InfoFooter.js";

const UploadForm = {
    view: () => {
      return [m(SMSTextBox, {className: "titleBox"}, m("p.contents", 'Sunshine Scorecard')),
        m(SMSTextBox, {className: "uploadBox"}, [m("p.contents", "Save File Parser+Viewer"), m("form#uploadForm",
          [m("input#saveFile", {type: "file", accept: ".gci,.gcs,.sav", style: "display:none;", onchange: Parser.readSave.bind(Parser)}),
          m("label#saveFileLabel", {for: "saveFile"}, "Upload your SMS save")]
      )]), m(InfoFooter)]
    }
}

export default UploadForm;