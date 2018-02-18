const expect = require('expect');

const {Rooms} = require('./rooms');

describe('Rooms', () => {
   
   let rooms;
   beforeEach(() => {
      rooms = new Rooms();
      rooms.addRoom('room1');
      rooms.addRoom('room2');
   });
   
   describe('Add room', () => {
      it('should add a new room', () => {
         expect(rooms.rooms.length).toBe(2);
         rooms.addRoom('room3');
         expect(rooms.rooms.length).toBe(3);
      });

      it('should not add duplicate rooms', () => {
         rooms.addRoom('room1');
         expect(rooms.rooms.length).toBe(2);
      });
   });

   describe('Remove room', () => {
      it('should delete a room', () => {
         expect(rooms.removeRoom('room1')).toEqual({name:'room1'});
         expect(rooms.rooms.length).toBe(1);
      });
   });

   describe('Determine if room can be joined', () => {
      it('should be able to join room with matching name, password', () => {
         //let rooms = 
      });
   });
});
