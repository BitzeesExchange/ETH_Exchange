const connectDB = require('../DBConfig/ConnectDB')

module.exports.StoreNewUserData = (id, utype, email, PRIVATEencryptedString, PUBLICencryptedString) => {
    return new Promise((resolved, reject) => {
        let qryString = "INSERT INTO user(id,utype, email,privatekey , publickey) VALUES(?,?,?,?,?)"
        connectDB.query(qryString, [id,utype, email, PRIVATEencryptedString, PUBLICencryptedString], (err, result) => {
            if (err) throw err
            resolved(result)
        });
    });
};