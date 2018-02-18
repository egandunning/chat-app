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
         const room = {name:'room1', password:''};
         expect(rooms.removeRoom('room1')).toEqual(room);
         expect(rooms.rooms.length).toBe(1);
      });
   });

   describe('Get all rooms', () => {
      it('should get list of all room names', () => {
         const roomNames = ['room1', 'room2'];
         expect(rooms.getRooms()).toEqual(roomNames);
      });
   });

   describe('Get room by name', () => {
      it('should get a room object', () => {
         const room = {name: 'room1', password: ''};
         const foundRoom = rooms.getRoom('room1');
         expect(foundRoom).toEqual(room);
      });

      it('should return undefined if room isn\'t found', () => {
         expect(rooms.getRoom('room3')).toBe(undefined);
      });
   });

   describe('Determine if room can be joined', () => {
      it('should be able to join room with matching name, password', () => {
         const room = rooms.getRoom('room1');
         expect(rooms.canJoin('room1', '', room)).toBe(true);
      });

      it('shouldn\'t be able to join room without matching password', () => {
         const room = rooms.getRoom('room1');
         expect(rooms.canJoin('room1', 'password', room)).toBe(false);
      });

      it('shouldn\'t be able to join room that doesn\'t exist', () => {
         const room = rooms.getRoom('room3');
         expect(rooms.canJoin('room3', '', room)).toBe(false);
      });
   });
});
