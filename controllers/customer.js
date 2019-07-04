//custom module
const { Customer } = require('./../models/customer');

exports.getCustomers = (req, res) => {
    Customer.find()
        .then((customers) => {
            res.send(customers);
        }).catch((err) => {
            res.status(400);
        });
};

