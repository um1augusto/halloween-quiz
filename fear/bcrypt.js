const bcrypt = require('bcrypt');

const password = 'password123';
const saltRounds = 10;

//Hash senha
bcrypt.hash(password, saltRounds, (err, hash) => {
    if(err) throw err;
    console.log(`Senha encriptada: ${hash}`);

    bcrypt.compare("password123", hash, (err, result) => {
        if(err) throw err;
        if(result){
            console.log('Senha valida!!');
        }else{
            console.log('Senha invalida!!');
        }
    });
});