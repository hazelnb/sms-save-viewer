import Area from "./Area.js"
import ECLIPSE_METADATA from "/assets/data/eclipse.js";

class EclipseArea extends Area {
    static metadata = ECLIPSE_METADATA;
    HUNDRED_COIN_OFFSET = 87; // relative to shine base
    SHINE_BASE = 0x254 * 8;
    BLUES_BASE = 0x47 * 8 + 2;

    constructor({ id, name, n_shines, n_blues, blues_idx = null, shine_idx = null, shine_names = null, blues_subway_circuit_url = null }) {
        n_shines = (!!n_shines || n_shines === 0) ? n_shines : 11
        n_blues = (!!n_blues || n_blues === 0) ? n_blues : 20
        blues_idx = blues_idx || (id - 9)
        shine_idx = shine_idx || (id - 9)

        super({ metadata: ECLIPSE_METADATA, id, name, n_shines, n_blues, blues_idx, shine_idx, shine_names })

        this.blues_subway_circuit_url = blues_subway_circuit_url
    };

    shine_address(n) {
        if (n != (this.shine_state.length - 1)) {
            if (this.shine_idx <= 4) { // 11-shine stages
                if (this.shine_idx == 0 && n < 6) {
                    n = [5, 4, 2, 3, 1, 0][n] // erto permutation
                }

                return this.SHINE_BASE + 10 * this.shine_idx + n;
            } else if (this.shine_idx > 5 && this.shine_idx <= 13) {
                return this.SHINE_BASE + 10 * 4 + 11 + 4 * (this.shine_idx - 6) + n;
            } else if (this.shine_idx == 5) {
                return this.SHINE_BASE + 10 * 4 + 6 + n;
            }
        } else {
            return this.SHINE_BASE + this.HUNDRED_COIN_OFFSET + this.shine_idx;
        }
    };

    blues_address(n) {
        return this.BLUES_BASE + 20 * this.blues_idx + n;
    };

    url(key, n) {
        console.log(key, n)
        let blue = this.blues_data[n-1]
        return this.blues_subway_circuit_url + "&t=" + blue.subway_circuit_t
    }
}

export default EclipseArea;