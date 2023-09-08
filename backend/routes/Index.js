const Seller = require('./Seller');

function route(app) {
    
    app.use('/seller', Seller);
}

module.exports = route;