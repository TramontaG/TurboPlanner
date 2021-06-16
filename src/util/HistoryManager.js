import Database from './../databases/Database';

class HistoryController {
    constructor(DBInstance) {
        this.DB = DBInstance;
    }

    getMovement = (movementID) => {
        try {
            const safeID =
                typeof movementID === 'string'
                    ? parseInt(movementID)
                    : movementID;
            const movement = this.DB.objectForPrimaryKey('lancamento', safeID);
            if (movement) return movement;
            else throw 'Invalid ID: No object matches the provided ID';
        } catch (e) {
            console.warn(e);
        }
    };

    createMovement = (movementInfo) => {
        try {
            let movement = this.DB.create('lancamento', {
                date: new Date(),
                id: Database.incrementID(this.DB, 'lancamento'),
                ...movementInfo,
            });
            return movement;
        } catch (e) {
            console.warn(e);
        }
    };

    deleteMovement = (movementId) => {
        try {
            const movement = this.DB.getMovement(movementId);
            this.DB.write(() => {
                this.DB.delete(movement);
            });
            return true;
        } catch (e) {
            console.warn(e);
            return false;
        }
    };
}

export default HistoryController;
