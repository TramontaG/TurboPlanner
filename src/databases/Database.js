import Realm from 'realm';

class Database {
    constructor(){
        this.DatabaseVersion = 5;
        this._RealmInstance;
        this.init();
    }

    init = async () => {
        this._RealmInstance = await this.openRealm();
        return this._RealmInstance
    }

    getRealm = async () => {
        if (this._RealmInstance) return this._RealmInstance;
        return await this.init();
    }

    useRealm = async component => {
        component.setState({database: this.RealmInstance});
        component.componentWillUnmount = async () => {
            await realm.close();
        }
        return true;
    } 
   
    incrementID(DB, entity){
        return DB.objects(entity).max("id") + 1 || 1
    }

    async openRealm(){
        const config = {
            schema: Object.values(this.schemas),
            schemaVersion: this.DatabaseVersion,
        };
        return await new Realm(config);
    }

    schemas = {
        categorias: {
            name: "categoria",
            primaryKey: "id",
            properties: {
                id: {type: 'int', indexed: true},
                name: "string",
            }
        },
        lancamento: {
            name: "lancamento",
            primaryKey: "id",
            properties: {
                id: {type: 'int', indexed: true},
                type: "string",
                value: "int",
                date: "date",
                category: "categoria?",
            }
        },
        conta: {
            name: "conta",
            primaryKey: "id",
            properties: {
                id: {type: 'int', indexed: true},
                name: "string",
                balance: "int",
                history: "lancamento[]",
            }
        },
    }
}

export default new Database();