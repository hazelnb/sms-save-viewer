import m from "https://esm.sh/mithril";
import State from "./State.js";
import Areas, {VanillaAreas} from "./Areas.js";

class SaveParser {
    reader = new FileReader();
    flag_regions = {A: null, B: null, C: null};
    
    constructor(areas) {
        this.areas = areas
    };
    
    readSave(e) {
        const file = e.target.files[0];

        
        if (file) {
            this.reader.addEventListener("loadend", this.parseSave.bind(this));
            this.reader.readAsArrayBuffer(file);
        }
    };
    
    parseSave(e) {
        this.buffer = this.detectFmt(this.reader.result);
        this.view = new DataView(this.buffer);

        let game_id = String.fromCharCode(... new Uint8Array(this.buffer.slice(0,6)))
        
        if (! game_id.match(/GMS[A-Z]0[14]/)) {
            console.error("Uploaded invalid save file")
            return
        }

        this.chooseNewestBlocks();
        this.updateAreas();
        State.is_eclipse = (game_id == "GMSE04")
        
        if (!State.is_eclipse) {
            Areas.list = [... VanillaAreas]
        }

        m.route.set("/summary")
    };

    detectFmt(buffer) {
        const gcs_string = String.fromCharCode(... new Uint8Array(buffer.slice(0,6)))
        const sav_string = String.fromCharCode(... new Uint8Array(buffer.slice(0,0x0C)))

        if (gcs_string == "GCSAVE") {
            return buffer.slice(0x110)
        } else if (sav_string == "DATELGC_SAVE") {
            return buffer.slice(0x80)
        } else {
            return buffer
        }
    }
    
    chooseNewestBlocks() {
        const A1SEC1 = 0x20A0
        
        for (let i=0; i<3; i++) {
            let t1 = this.view.getUint32(0x2058 + i*0x4000, false);
            let t2 = this.view.getUint32(0x4058 + i*0x4000, false);
            
            let offset = ((t1 < t2) ? A1SEC1 + 0x2000 : A1SEC1) + i*0x4000;
            this.flag_regions[["A","B","C"][i]] = new BitSet(new Uint8Array(this.buffer, offset, 0x400));
        }
    }
    
    updateAreas() {
        this.areas.forEach((area) => {
            area.update_state(this.flag_regions[State.selected_slot]);
        })
    }
    
    swapSlot(e) {
        State.selected_slot = e.target.value;
        this.updateAreas()
    }
}

const Parser = new SaveParser(Areas.list);
export default Parser;