 async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json
  } catch (error) {
    console.error(error.message);
  }
 }
const VANILLA_METADATA = await getData("https://gist.githubusercontent.com/hazelnb/9c8102ec43812982c23f5c02b3a16b6c/raw/f328743f086feb1b1a811be4a839642e4f447743/vanilla.json");
const ECLIPSE_METADATA = await getData("https://gist.githubusercontent.com/hazelnb/dc980a375e29b133f88fc01c32d6904e/raw/8ed0182c7f5bff522cb24043df7f543a1515c78b/eclipse.json");

import m from "https://esm.sh/mithril";
m.route.set('/')

var State = {
  selected_slot: "A",
  blues_sort_keys: {
    "VanillaArea": "mario_party_legacy_num",
    "EclipseArea": "subway_circuit_num",
  },
  is_eclipse: false
}

// ECLIPSE SHINES are at offset 0x254 from section 1 starting at flag 0x6040
// ERTO & 0x01 = Shine 6
// ERTO & 0x02 = Shine 5
// ERTO & 0x04 = Shine 3
// ERTO & 0x08 = Shine 4
// ERTO & 0x10 = Shine 2
// ERTO & 0x20 = Shine 1
// ERTO & 0x40 = Shine 7
// ERTO & 0x80 = Shine 8
// ERTO & 0x01 = Rocket secret shine
// ERTO & 0x02 = Secret red coins shine
// LIGHTHOUSE & 0x04-0x08
// WARSHIP    & 0x10-0x20
// LACRIMA    & 0x40-0x80
// PIT & 0x01 = Top of the great tree
// PIT & 0x02 = Tramplin Stu Monster on the Loose
// PIT & 0x04 = Tree Top Village Chuckster
// PIT & 0x08 = Cheep-Cheep Chow Down
// PIT & 0x10 = Douse the Campfires
// PIT & 0x20 = Mega Mushroom Ground Pound
// CRUISER & 0x40 = Job for a Plumbr
// CRUISER & 0x80 = Dine N' Dash
// CRUISER & 0x01 = Durian Excursion
// CRUISER & 0x02 = Flight Path Peril
// CRUISER & 0x04 = Flight Path Peril Red Coins
// DREAM     & 0x08-0x40
// LANCIA    & 0x80-0x04
// VAPORWAVE & 0x08-0x40
// YOSHI     & 0x80-0x04
// RED LILY  & 0x08-0x40
// P BEACH   & 0x80-0x04
// CASINO    & 0x08-0x40
// I. DELFINO & 0x80 = Bollente Crypt
// I. DELFINO & 0x01 = Arido Trail
// I. DELFINO & 0x02 = Arcobaleno Cove
// I. DELFINO & 0x04 = Sonnolento Grove
// I. DELFINO & 0x08 = Rugivosa Marsh
// I. DELFINO & 0x10 = Giovane Creek
// I. DELFINO & 0x20 = Marea Reef
// I. DELFINO & 0x40 = Ricco Station
// & 0x80, 0x01-0x80, 0x01-0x08 100 Coins, in order (starting at rel 0x0010)
// I. DELFINO & 0x10 = Delfino Express

class Area {
  name;
  shine_state;
  blues_state;
  
  constructor({metadata, id, name, n_shines, n_blues, blues_idx=null, shine_idx=null, shine_names =null} = {}) {
    if (this.constructor == Area) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    
    this.id = id;
    this.name = name;
    this.shine_idx = shine_idx
    this.blues_idx = blues_idx
    this.shine_state = new Array(n_shines).fill(false);
    this.blues_state = new Array(n_blues).fill(false);
    this.shine_names = shine_names;
     
    const blues_metadata = metadata["blues_metadata"][this.id.toString()];
    this.blues_data = blues_metadata.map((blue) => {blue.obtained = this.blues_state; return blue})
  };
  
  update_shine_state(section1) {
    for (let i = 0; i < this.shine_state.length; i++) {
      this.shine_state[i] = !!section1.get(this.shine_address(i))
    }
  };
  
  update_blue_state(section1) {
    for (let i = 0; i < this.blues_state.length; i++) {
      this.blues_state[i] = !!section1.get(this.blues_address(i))
    }
    
    this.blues_data.forEach(blue => {blue.obtained = this.blues_state[blue.mem_num-1]});
  };
  
  update_state(section1) {
    this.update_shine_state(section1);
    this.update_blue_state(section1);
  }
  
  tooltip() {
    return {
      view: () => {
        
      }
    }
  }
  
  shine_address(n) {
    throw new Error("Method 'shine_address(n)' must be implemented.");
  }
  
  blues_address(n) {
    throw new Error("Method 'blues_address(n)' must be implemented.");
  }
  
  get shine_count() {
    return this.shine_state.filter(Boolean).length;
  }
  
  get blues_count() {
    return this.blues_state.filter(Boolean).length;
  }
  
  get remaining_shines_count() {
    return this.shine_state.length - this.shine_count;
  }
  
  get remaining_blues_count() {
    return this.blues_state.length - this.blues_count;
  }
  
  get have_shines() {
    let have = this.shine_names.filter((_, i) => this.shine_state[i])
    let bc_shine_count = have.filter((name) => name.includes("Blue coin")).length
    have = have.filter((name) => !name.includes("Blue coin"))
    let bc_string = (bc_shine_count) ?  bc_shine_count.toString() + "x" + "BC shines, " : null
    return [bc_string, have.join(', ')].join('')
  }
  
  get missing_shines() {
    let missing = this.shine_names.filter((_, i) => !this.shine_state[i])
    let bc_shine_count = missing.filter((name) => name.includes("Blue coin")).length
    missing = missing.filter((name) => !name.includes("Blue coin"))
    let bc_string = (bc_shine_count) ?  bc_shine_count.toString() + "x" + "BC shines, " : null
    return [bc_string, missing.join(', ')].join('')
  }
}

class VanillaArea extends Area {
  HUNDRED_COIN_OFFSET = 100;
  
  constructor({id, name, n_shines, n_blues, blues_idx=null, shine_idx=null, shine_names=null} = {}) { 
    blues_idx = blues_idx || (id)
    shine_idx = shine_idx || (id)
    n_shines = (!!n_shines || n_shines===0) ? n_shines : 11
    n_blues  = (!!n_blues  || n_blues ===0) ? n_blues  : 30
        
    super({metadata: VANILLA_METADATA, id, name, n_shines, n_blues, blues_idx, shine_idx, shine_names})
  }
  
  shine_address(n) {
    if ((n < 10) || (n < 30 && this.id==7)) {
      return 10*this.shine_idx + n
    } else if (30 <= n && n <= 41) {
      return 10*this.shine_idx + n + 7
    } else {
      return this.shine_idx + this.HUNDRED_COIN_OFFSET
    };
  }
  
  blues_address(n) {
    let offset = 0;
    const base = 170

    offset = base + 50*this.blues_idx + 
             ((this.blues_idx == 7) ? 20 : 0) // additional offset for Corona Mountain
    
    return offset + n;
  }
  
  url(n) {
    switch (State.blues_sort_keys.VanillaArea) {
      case "mario_wiki_num": 
        return this.mario_wiki_url(n); break;
      case "mario_party_legacy_num": 
        return this.mario_party_legacy_url(n); break;
      case "mem_num":
        return this.mem_url(n); break;
    }
  }
  
  mario_party_legacy_url(n) {
    let area_lower = this.name.toLowerCase().replace(' ', '-')
    return `https://mariopartylegacy.com/guides/super-mario-sunshine/${area_lower}-blue-coins#coin-${n}`;
  }
  
  mario_wiki_url(n) {
    const area_slug1 = this.name.replace(' ', '_')
    let area_slug2 = ""
    let bc_string = "Blue_Coin"
    let num_string = String(n).padStart(2, '0');
    let prefix = "SMS_"

    if (this.id < 3) {
      area_slug2 = this.name.replace(' ', '')
      bc_string = "BlueCoin"
      num_string = String(n)
    } else if (this.id < 7) {
      area_slug2 = area_slug1
      if (this.id == 4) {
        prefix = ""
      }
    } else {
      area_slug2 = "DP"
    }

    return `https://www.mariowiki.com/${area_slug1}#/media/File:${prefix}${area_slug2}_${bc_string}_${num_string}.png`;
  }
  
  mem_url(n) {
    return `https://docs.google.com/spreadsheets/d/1ElTW-akaTUF9OC2pIFR9-7aVPwpJ54AdEVJyJ_jvg0E/edit?gid=273297098#gid=273297098&range=D${this.blues_address(n)+1}`;
  }
}

class EclipseArea extends Area {
  HUNDRED_COIN_OFFSET = 87; // relative to shine base
  SHINE_BASE = 0x254*8;
  BLUES_BASE = 0x47*8 + 2;
  
  constructor({id, name, n_shines, n_blues, blues_idx=null, shine_idx=null, shine_names=null}) {
    n_shines = (!!n_shines || n_shines === 0) ? n_shines : 11
    n_blues  = (!!n_blues  || n_blues  === 0) ? n_blues  : 20
    blues_idx = blues_idx || (id - 9)
    shine_idx = shine_idx || (id - 9)
    
    super({metadata: ECLIPSE_METADATA, id, name, n_shines, n_blues, blues_idx, shine_idx, shine_names})
  };
  
  shine_address(n) {
    if (n != (this.n_shines - 1)) {
      if (this.shine_idx <= 4) { // 11-shine stages
        if (this.shine_idx == 0 && n < 6) {
          n = [5, 4, 2, 3, 1, 0][n] // erto permutation
        }
        
        return this.SHINE_BASE + 10*this.shine_idx + n;
      } else if (this.shine_idx > 5 && this.shine_idx <= 13) {
        return this.SHINE_BASE + 10*4 + 11 + 4*(this.shine_idx - 6) + n;
      } else if (this.shine_idx == 5) { 
        return this.SHINE_BASE + 10*4 + 6 + n;
      }
    } else {
      return this.SHINE_BASE + this.HUNDRED_COIN_OFFSET + this.shine_idx;
    }
  };
  
  blues_address(n) {
    return this.BLUES_BASE + 20*this.blues_idx + n;
  };
  
  url(n) {
    return "";
  }
}

class SMSSaveParser {
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
    this.buffer = this.reader.result;
    this.view = new DataView(this.buffer);
    
    this.chooseNewestBlocks();
    this.updateAreas();
    let game_id = String.fromCharCode(... new Uint8Array(this.buffer.slice(0,6)))
    State.is_eclipse = (game_id == "GMSE04")
    
    if (!State.is_eclipse) {
      Areas.list = [... VanillaAreas]
    }
    
    m.route.set("/summary")
  };
  
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

const VanillaAreas = VANILLA_METADATA["areas"].map((area) => new VanillaArea(area))
const EclipseAreas = ECLIPSE_METADATA["areas"].map((area) => new EclipseArea(area))

var Areas = {
  list: [...VanillaAreas, ...EclipseAreas] //, ...EclipseAreas]
}

const parser = new SMSSaveParser(Areas.list);

const SlotSelect = {
  view: () => {
    const fnames = ["A", "B", "C"];
    
    return m("fieldset#slotSelectRadio", [
      m("legend", "Choose save slot"),
      ...fnames.map((key) => {
        return m("div", [m("input", {type: "radio", 
                                     id: key, 
                                     name: "slot_select", 
                                     value: key, 
                                     checked: (State.selected_slot === key), 
                                     onchange: parser.swapSlot.bind(parser)}),
                         m("label", {for: key}, "File " + key)]);
      }),
    ])
  }
}

const NamedShineRow = {
  view: ({ attrs: { area } })  => {
    return m("sl-details", {summary: area.shine_count.toString() + " shines"},
            [m("span.missing", "Missing: " + area.missing_shines), m("br"),
             m("span.have", "Have: " + area.have_shines)])
  }
}

const ShineRow = {
  view: ({ attrs: { area } }) => {
    if (area.shine_state.length == 0){
      return null;
    } else if (area.shine_names != undefined) {
      return  m("tr.shine-row", [m("th", area.name),m("td",{colspan: 11}, m(NamedShineRow, {area}))])
    } else {
      return m("tr.shine-row", [m("th", area.name),
                ...area.shine_state.map((state) => m("td", {class: state.toString()}))])
    }
  }
}

const ShineTable = {
  view: () => {
    const SHINE_NAMES = ["1", "2", "3", "4", "5", "6", "7", "8", "Secret 1", "Secret 2", "100 Coins"]

    return m("table#shineTable", 
             [m("tr", [m("th.corner", "Shines"), ...SHINE_NAMES.map((name) => m("th", name))]),
              ...Areas.list.map((area) => m(ShineRow, {area}))]
            )
  }
}

const BluesSortInput = {
  view: ({attrs: {name, class_name, sorts}}) => {
    // const available_sorts = [["mario_party_legacy_num", "Mario Party Legacy order"], ["mario_wiki_num", "Mario Wiki order"], ["mem_num", "Memory order"]];
    
    return m("fieldset#bluesSortRadios"+name, [
      m("legend", "Choose " + name + " blue coin numbering scheme"),
      ...sorts.map((key) => {
        return m("div", [m("input", {type: "radio", 
                                     id: key[0], 
                                     name: "blue_sort_" + name.toLowerCase(), 
                                     value: key[0], 
                                     checked: (State.blues_sort_keys[class_name] === key[0]), 
                                     onchange: () => State.blues_sort_keys[class_name] = key[0]}),
                         m("label", {for: key[0]}, key[1])]);
      }),
    ])
  }
}

const BluesTableHeader = {
  view: () => {
    return m("thead", 
             m("tr", 
               [m("th.corner", "Blues"), 
                ..._.range(1,31).map((name) => m("th", name))
               ]
              )
            )
  }
}

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
              m("span", `Flag ID # = ${"0x" + (0x10000 + area.blues_address(blue["mem_num"]-1)).toString(16)}`)
             ]
            )
    } else if (area.constructor.name == "EclipseArea") {
      return m("div", {slot: "content"}, 
             [m("b", blue["description"]),
              m("br"),
              m("span", `Subway Circuit # = ${blue["subway_circuit_num"]}`),
              m("br"),
              m("span", `Flag ID # = ${"0x" + (0x10000 + area.blues_address(blue["mem_num"]-1)).toString(16)}`)
             ]
            )
      }
    }
}

const BluesRow = {
  view: ({attrs: {area}}) => {
    const area_type = area.constructor.name
    let sort_fn = (a,b) => {return a[State.blues_sort_keys[area_type]] - b[State.blues_sort_keys[area_type]]}
    let blues = area.blues_data.toSorted(sort_fn);
                
    return m("tbody", 
             m("tr.blues-row", 
               [m("th", area.name),
                ...blues.map(function (blue) {
		 console.log(State.blues_sort_keys[area_type])
                  return m("td", {class: blue.obtained.toString()}, 
                           m("a", {href: area.url(blue[State.blues_sort_keys[area_type]]), 
                                   target: "_blank", 
                                   rel: "noreferrer noopener"}, 
                             m("sl-tooltip", 
                               [m(BlueTooltipContent, {area, blue}),
                                m(".expander")])))})
               ]
              )
             )
  }
}

const BluesTable = {
  view: () => { 
    return [m("table#bluesTable", 
             [m(BluesTableHeader),
              ...Areas.list.map((area) => m(BluesRow, {area}))]),
              m(BluesSortInput, {name: "Vanilla", class_name: "VanillaArea", sorts: [["mario_party_legacy_num", "Mario Party Legacy order"], ["mario_wiki_num", "Mario Wiki order"], ["mem_num", "Memory order"]]}),
              State.is_eclipse ? m(BluesSortInput, {name: "Eclipse", class_name: "EclipseArea", sorts: [["subway_circuit_num", "Subway Circuit yt order"], ["mem_num", "Memory order"]]}) : null]
  }
}

const UploadForm = {
  oncreate: (vnode) => {
    vnode.dom.addEventListener("change", parser.readSave.bind(parser));
  },
  view: () => {
    return m("form",
     [m("input#saveFile", {type: "file", accept: ".gci", style: "display:none;", onchange: "parser.readSave.bind(this)"}),
      m("label#saveFileLabel", {for: "saveFile"}, "Upload your SMS save")]
     )
  }
}

const SummaryLayout = {
  view: () => {
    return m("#summaryLayout", [m(SlotSelect), m("#tables", [m(ShineTable), m(BluesTable)])]);
  }
}

m.route(document.getElementById("app"), "/upload", {
	"/upload": UploadForm,
  "/summary": SummaryLayout
})

console.log(VANILLA_METADATA)
