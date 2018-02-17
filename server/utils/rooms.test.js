const expect = require('expect');

const {Rooms} = require('./rooms');

describe('Add room', () => {
   it('should add a new room', () => {
      let rooms = new Rooms();
      rooms.addRoom('room1');
      expect(rooms.rooms.length).toBe(1);
      rooms.addRoom('room2');
      expect(rooms.rooms.length).toBe(2);
   });

   it('should not add duplicate rooms', () => {
      let rooms = new Rooms();
      rooms.addRoom('room1');
      rooms.addRoom('room1');
      expect(rooms.rooms.length).toBe(1);
   });
});

describe('Remove room', () => {
   it('should delete a room', () => {
      let rooms = new Rooms();
      rooms.addRoom('room1');
      rooms.addRoom('room2');
      expect(rooms.removeRoom('room1')).toEqual({name:'room1'});
      expect(rooms.rooms.length).toBe(1);
   });
});
