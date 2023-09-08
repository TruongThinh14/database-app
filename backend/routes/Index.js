const Seller = require('./Seller');
const WarehouseAdmin = require('./WarehouseAdmin')

function route(app) {
    
    app.use('/seller', Seller);
    app.use('/warehouseAdmin',WarehouseAdmin)
}

module.exports = route;