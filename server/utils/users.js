class Users {
   constructor() {
      this.users = [];
   }

   addUser(id, name, room) {
      this.users.push({id, name, room});
      return {id, name, room};
   }

   removeUser(id) {
      let userIndex = this.users.findIndex(user => user.id === id);
      
      if(userIndex != -1) {
         return this.users.splice(userIndex, 1)[0];
      }
      return null;
   }

   getUser(id) {
      let userIndex = this.users.findIndex(user => user.id === id);
      return this.users[userIndex];
   }

   getUserList(room) {
      let users = this.users.filter(user => user.room === room);
      return users.map(user => user.name);
   }
}

module.exports = {Users};