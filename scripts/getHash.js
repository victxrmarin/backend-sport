async function getHash(pwd) {
    const bcrypt = require('bcrypt');
    var hash;
    return new Promise((resolve, reject) => {
        bcrypt.hash(pwd, 5)
            .then((passHashed) => { resolve(hash = passHashed) })
            .catch(e => reject(e))
    });
};


let hash = getHash('host')
console.log(hash)
