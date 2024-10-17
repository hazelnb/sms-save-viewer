import VanillaArea from "../helpers/VanillaArea.js";
import EclipseArea from "../helpers/EclipseArea.js";

export const VanillaAreas = VanillaArea.metadata["areas"].map((area) => new VanillaArea(area))
export const EclipseAreas = EclipseArea.metadata["areas"].map((area) => new EclipseArea(area))

var Areas = {
    list: [...VanillaAreas, ...EclipseAreas] //, ...EclipseAreas]
}

export default Areas;