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

   /**
    * Checks if a given room name, password pair match the passed in room
    * object.
    * @param {string} name - Name of the room to join.
    * @param {string} password - The password of the room to join.
    * @param {Object} roomToJoin - The room to join
    */
   canJoin(name, password, roomToJoin) {
      if(name === roomToJoin.name && password === roomToJoin.password) {
         return true;
      }
   }
   
   /**
    * Gets a room object by name.
    * @param {string} name - Room name to find.
    * @returns {Object} The room object if found. If not found, returns
    * undefined.
    */
   getRoom(name) {
      const roomIndex = this.rooms.find(room => room.name === name);
      if(roomIndex != -1) {
         return this.rooms[roomIndex];
      }
   }
}

module.exports = {Rooms};
