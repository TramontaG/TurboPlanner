import Database from "../databases/Database";
import HistoryController from './HistoryManager';
import CategoriesManager from './CategoriesManager';

class AccountManager {
    constructor(){
        this.DB;
        this.init();
    }

    init = async () => {
        this.DB = await Database.getRealm();
        this.HistoryController = new HistoryController(this.DB);
        this.CategoriesManager = new CategoriesManager(this.DB);
    }
    
    createAccount = accountData => {
        try {
            let newAccount;
            this.DB.write(() => {
                newAccount = this.DB.create("conta", {
                    id: Database.incrementID(this.DB, "conta"),
                    balance: 0,
                    history: [],
                    ...accountData,
                });
            });
            return newAccount;
        } catch (e) {
            console.warn(e);
        }
    }

    _deleteAllAccounts = () => {
        try {
            this.DB.write(() => {
                this.DB.delete(this.DB.objects("conta"));
            });
            return true
        } catch (e) {
            console.warn(e);
            return false;
        }
    }

    deleteAccount = id => {
        try {
            const account = this.getAccount(id);
            if (!account) return false;
            this.DB.write(() => {
                this.DB.delete(account);
            });
            return true;
        } catch (e) {
            console.warn(e);
        }
    }

    getAccount = id => {
        const safeID = typeof id === "string" ? parseInt(id) : id;
        const account = this.DB.objectForPrimaryKey("conta", safeID);
        if (account) return account;
        else throw "Invalid ID: No object matches the provided ID";
    }

    getAllAccounts = () => {
        return this.DB.objects("conta");
    }

    insertMovement = (accountID, movementInfo) => {
        try {
            this.DB.write(() => {
                const account = this.getAccount(accountID);
                const movement = this.HistoryController.createMovement(movementInfo);
                account.history.push(movement);
            });
        } catch (e) {
            console.warn(e);
        }
    }

    createCategory = categoryInfo => {
        try {
            let category
            this.DB.write(() => {
                category = this.CategoriesManager.createCategory({
                    id: Database.incrementID(this.DB, "categoria"),
                    ...categoryInfo,
                });
            });
            return category
        } catch (e) {
            console.warn(e);
            return null;
        }
    }

    getAllCategories = () => {
        return this.CategoriesManager.getAllCategories();
    }

    deleteAllCategories = () => {
        try {
            this.DB.write(() => {
                this.CategoriesManager.deleteAllCategories();
            });
            return true;
        } catch (e) {
            console.warn(e);
            return null;
        }
    }

    getCategory = id => {
        let cat;
        try {
            this.DB.write(() => {
                cat = this.CategoriesManager.getCategory(id);
            });
            return cat;
        } catch (e) {
            console.warn(e);
            return null;
        }
    }

    deleteCategory = id => {
        try {
            const cat = this.getCategory(id);
            if (!cat) return false;
            this.DB.write(() => {
                this.DB.delete(cat);
            });
            return true;
        } catch (e) {
            console.warn(e);
        }
    }
}

export default new AccountManager();