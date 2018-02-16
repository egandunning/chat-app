const {isRealString} = require('./validators');

const join = (name, room, password) => {
   if(!isRealString(name) || !isRealString(room)) {
      return callback('Display name and room name must not be blank');
   }

   if(password != 

