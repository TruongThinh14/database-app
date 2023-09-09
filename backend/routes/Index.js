const Seller = require('./Seller');
const WarehouseAdmin = require('./WarehouseAdmin')
const Category = require("./Category")

function route(app) {
    
    app.use('/seller', Seller);
    app.use('/warehouseAdmin',WarehouseAdmin)
    app.use('/category',Category)
}

module.exports = route;