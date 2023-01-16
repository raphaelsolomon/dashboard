require('dotenv').config();
const bcrypt = require('bcrypt');
const fs = require('fs');
const http = require('http');
const path = require('path');


exports.verifyPassword = (password, hash) => {
    const verify = bcrypt.compareSync(password, hash);
    if (verify) {
        return true;
    }
    return false;
}

exports.download = (url, dest, cb) => {
    const file = fs.createWriteStream(dest);

    const request = http.get(url, (response) => {
        // check if response is success
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }

        response.pipe(file);
    });

    // close() is async, call cb after close completes
    file.on('finish', () => file.close(cb));

    // check for request error too
    request.on('error', (err) => {
        fs.unlink(dest, () => cb(err.message)); // delete the (partial) file and then return the error
    });

    file.on('error', (err) => { // Handle errors
        fs.unlink(dest, () => cb(err.message)); // delete the (partial) file and then return the error
    });
};

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(200).json('/login');
}

exports.isGoogleAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(200).redirect('/salon/login');
}

exports.options = {
    key: fs.readFileSync(path.resolve(__dirname, './../ssl/dechdash_net.key')),
    cert: fs.readFileSync(path.resolve(__dirname, './../ssl/dechdash_net.crt')),
   // ca: fs.readFileSync(path.resolve(__dirname, './../ssl/dechdash_net.ca-bundle')),
}