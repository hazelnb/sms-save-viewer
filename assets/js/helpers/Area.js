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

export default Area;