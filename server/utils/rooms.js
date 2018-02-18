const {isRealString} = require('./validators');

class Rooms {

   /**
    * Represents a list of chat rooms.
    * @constructor
    */
   constructor() {
      this.rooms = [];
   }

   /**
    * Add a new room to list of chat rooms. If the room already exists in the
    * list of rooms, the room is not added.
    * @param {string} name - The name of the room. Must be a non-empty string.
    * @param {string} password - the password required to access room. Is
    * optional, if ommitted, the password is stored as an empty string.
    * @return {Object} The room object. This object is returned even if the
    * room was not added to the list.
    */
   addRoom(name, password) {
      
      if(!password) {
         password = '';
      }
      
      if(!this.rooms.find(room => room.name === name)) {
         if(isRealString(name)) {
            this.rooms.push({name, password});
         }
      }
      return {name, password}
   }

   /**
    * Remove a room from the list of rooms.
    * @param {string} name - The name of the room to remove.
    * @returns {Object} The room that was deleted.
    */
   removeRoom(name) {
      const room = this.rooms.find(room => room.name === name);
      if(room) {
         return this.rooms.splice(room, 1)[0];
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
    * @returns {boolean} True if the given room name, password pair matches the
    * name and password of the given room object.
    */
   canJoin(name, password, roomToJoin) {
      if(roomToJoin && name === roomToJoin.name &&
            password === roomToJoin.password) {
         return true;
      }
      return false;
   }
   
   /**
    * Gets a room object by name.
    * @param {string} name - Room name to find.
    * @returns {Object} The room object if found. If not found, returns
    * undefined.
    */
   getRoom(name) {
      return this.rooms.find(room => room.name === name);
   }
}

module.exports = {Rooms};
