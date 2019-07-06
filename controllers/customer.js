// Packages
const _ = require('lodash');
const { ObjectID } = require('mongodb');

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

exports.updateCustomer = (req, res) => {
    const customerId = req.params.id;
    const body = _.pick(req.body, ["name", "phone"]);

    if (!ObjectID.isValid(customerId)) {
        return res.status(400).send();
    }

    Customer.findOne({ _id: customerId })
        .then(customer => {
            if (!customer) {
                return res.status(404).send("Customer doesnt exist");                
            }

            if ((body.name) && (body.name.length > 3) && (typeof body.name === 'string')) {
                customer.name = body.name
            }

            if ((body.phone) && (body.phone.length >= 10) && (typeof body.phone === 'string')) {
                customer.phone = body.phone
            }

            return Customer.findOneAndUpdate({ _id: customerId }, {$set: customer}, { new: true });
        }).then((updatedCustomer) => {
            res.send(updatedCustomer);
        }).catch((err) => {
            res.status(400);            
        });

};
