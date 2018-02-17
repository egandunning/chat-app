const {isRealString} = require('./validators');

class Rooms {

   /**
    * Represents a list of chat rooms.
    * @constructor
    */
   constructor() {
      this.rooms = []
   }

   /**
    * Add a new room to list of chat rooms. If the room already exists in the
    * list of rooms, the room is not added.
    * @param {string} name - The name of the room. Must be a non-empty string.
    * @param {string} password - the password required to access room. Can be
    * blank.
    * @return {Object} The room that was added.
    */
   addRoom(name, password) {
      if(!this.rooms.find(room => room.name === name)) {
         if(isRealString(name)) {
            this.rooms.push({name, password});
            return {name, password};
         }
      }
   }

   /**
    * Remove a room from the list of rooms.
    * @param {string} name - The name of the room to remove.
    * @returns {Object} The room that was deleted.
    */
   removeRoom(name) {
      const roomIndex = this.rooms.find(room => room.name === name);
      if(roomIndex != -1) {
         return this.rooms.splice(roomIndex, 1)[0];
      }
   }

   /**
    * Get the list of room names.
    * @returns {Array} List of rooms.
    */
   getRooms() {
      return this.rooms.map(room => room.name);
   }
}

module.exports = {Rooms};
