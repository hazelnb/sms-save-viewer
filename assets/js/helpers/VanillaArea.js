import Area from "./Area.js"
import VANILLA_METADATA from "../../data/vanilla.js";

class VanillaArea extends Area {
    static metadata = VANILLA_METADATA;
    HUNDRED_COIN_OFFSET = 100;

    constructor({ id, name, n_shines, n_blues, blues_idx = null, shine_idx = null, shine_names = null } = {}) {
        blues_idx = blues_idx || (id)
        shine_idx = shine_idx || (id)
        n_shines = (!!n_shines || n_shines === 0) ? n_shines : 11
        n_blues = (!!n_blues || n_blues === 0) ? n_blues : 30

        super({ metadata: VANILLA_METADATA, id, name, n_shines, n_blues, blues_idx, shine_idx, shine_names })
    }

    shine_address(n) {
        if (this.id == 8) {
            return 8*0xE + 7;
        }
        if ((n < 10) || (n < 30 && this.id == 7)) {
            return 10 * this.shine_idx + n
        } else if (30 <= n && n <= 41) {
            return 10 * this.shine_idx + n + 7
        } else {
            return this.shine_idx + this.HUNDRED_COIN_OFFSET
        };
    }

    blues_address(n) {
        let offset = 0;
        const base = 170

        offset = base + 50 * this.blues_idx +
            ((this.blues_idx == 7) ? 20 : 0) // additional offset for Corona Mountain

        return offset + n;
    }

    url(key, n) {
        switch (key) {
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
        return `https://docs.google.com/spreadsheets/d/1ElTW-akaTUF9OC2pIFR9-7aVPwpJ54AdEVJyJ_jvg0E/edit?gid=273297098#gid=273297098&range=D${this.blues_address(n) + 1}`;
    }
}

export default VanillaArea;