import m from "https://esm.sh/mithril";
m.route.set('/')

import UploadForm from "./views/UploadForm.js";
import SummaryLayout from "./views/SummaryLayout.js";

m.route(document.getElementById("app"), "/upload", {
  "/upload": UploadForm,
  "/summary": SummaryLayout
})