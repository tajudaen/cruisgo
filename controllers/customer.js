//custom module
const { Customer } = require('./../models/customer');
const { validateCustomer } = require('./../utils/validator');

exports.getCustomers = (req, res) => {
    Customer.find()
        .then((customers) => {
            res.send(customers);
        }).catch((err) => {
            res.status(400);
        });
};

exports.getCustomer = (req, res) => {
    Customer.findById(req.params.id)
        .then((customer) => {
            if (!customer) {
                return res.status(400).send("Customer not found");
            }

            res.send(customer);
        }).catch((err) => {
            res.status(400);
        });
};

exports.postCustomer = (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) {
        const payLoad = [];
        error.details.forEach(err => {
            payLoad.push(err.message);
        });

        return res.status(400).send(payLoad);
    }

    const customer = new Customer({ name: req.body.name, phone: req.body.phone });

    customer.save()
        .then((customer) => {
            res.send(customer);
        }).catch((err) => {
            res.status(400);
        });

};
