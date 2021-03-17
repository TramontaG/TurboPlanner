import Database from "../databases/Database";
import HistoryController from './HistoryController';

class AccountManager {
    constructor(){
        this.DB;
        this.HistoryController = HistoryController;
    }

    init = async () => {
        this.DB = await Database.getRealm();
        this.HistoryController.DB = this.DB;
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

    deleteAccount =  id => {
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

    getAccountList = () => {
        return this.DB.objects("conta");
    }

    getAccount = id => {
        const safeID = typeof id === "string" ? parseInt(id) : id;
        const account = this.DB.objectForPrimaryKey("conta", safeID);
        if (account) return account;
        else throw "Invalid ID: No object matches the provided ID";
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
}

export default new AccountManager();