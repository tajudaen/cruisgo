// Packages
const _ = require('lodash');
const bcrypt = require('bcrypt');

// Custom modules
const { User } = require('./../models/user');
const { validateUser, validateLoginCredentials } = require('./../utils/validator');

exports.register = (req, res) => {
    const body = _.pick(req.body, ["name", "email", "password", "role"]);

    const { error } = validateUser(body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user;
    User.findOne({ email: body.email })
        .then((result) => {
            if (result) {
                return res.status(400).send("User already exist");
            }
            return bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
        }).then((salt) => {
            user = new User(body);
            return bcrypt.hash(user.password, salt);
        }).then((hashedPassword) => {
            user.password = hashedPassword;
            return user.save();
        }).then((user) => {
            const token = user.generateAuthToken();
            res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
        }).catch((err) => {
            res.status(400);            
        });
}


exports.login = (req, res) => {
    const body = _.pick(req.body, ["email", "password"]);

    const { error } = validateLoginCredentials(body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user;
    User.findOne({
            email: body.email
        })
        .then((result) => {
            if (!result) {
                return res.status(400).send("Invalid email or password.");
            }
            user = result;
            
            return bcrypt.compare(body.password, result.password);
        }).then((status) => {
            if (!status) {
                return res.status(400).send("Invalid email or password.");
            }

            const token = user.generateAuthToken();
            res.header('x-auth-token', token).send(token);
        }).catch((err) => {
            res.status(400);
        });
}
