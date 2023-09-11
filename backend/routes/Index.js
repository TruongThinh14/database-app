const Seller = require('./Seller');
const WarehouseAdmin = require('./WarehouseAdmin')
const Category = require("./Category")
const Customer = require("./Customer")

function route(app) {
    
    app.use('/seller', Seller);
    app.use('/warehouseAdmin',WarehouseAdmin)
    app.use('/category',Category)
    app.use('/customer',Customer)
}

module.exports = route;