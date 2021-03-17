import Database from './../databases/Database';

class HistoryController {
    constructor() {
        this.DB;
    }

    createMovement = movementInfo => {
        try {
            let movement = this.DB.create("lancamento", {
                date: new Date(),
                id: Database.incrementID(this.DB, "lancamento"),
                ...movementInfo,
            });
            return movement;
        } catch (e) {
            console.warn(e);
        }
    }
    
}

export default new HistoryController();