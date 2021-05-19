class HistoryController {
    constructor(DBInstance) {
        this.DB = DBInstance;
    }
    
    createCategory = (categoryInfo) => {
        const categoryName = categoryInfo.name;
        const filteredObjects = this.DB.objects('categoria').filtered(`name='${categoryName}'`);
        if (filteredObjects.length > 0) throw "Category already exists"
        return this.DB.create("categoria", categoryInfo);
    }

    getAllCategories = () => {
        return this.DB.objects('categoria');
    }

    deleteAllCategories = () => {
        return this.DB.delete(this.DB.objects('categoria'));
    }

    getCategory = id => {
        const safeID = typeof id === "string" ? parseInt(id) : id;
        const category = this.DB.objectForPrimaryKey("categoria", safeID);
        if (category) return category;
        else throw "Invalid ID: No object matches the provided ID";
    }
}

export default HistoryController;