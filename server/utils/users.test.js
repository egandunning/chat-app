const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

   let users;

   beforeEach(() => {
      users = new Users();
      users.users = [{
         id: '1',
         name: 'Matt',
         room: 'Foss'
      }, {
         id: '2',
         name: 'Brendon',
         room: 'Foss'
      }, {
         id: '3',
         name: 'Jimbo',
         room: 'room3'
      }];
   });

   it('should add new user', () => {
      let users = new Users();
      let user = {
         id: '344234',
         name: 'Fred',
         room: 'myroom'
      };

      let result = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
   });

   it('should return all users in foss list', () => {
      let userList = users.getUserList('Foss');

      expect(userList).toEqual(['Matt', 'Brendon']);
   });

   it('should remove a user', () => {
      users.removeUser('1');

      expect(users.users.length).toBe(2);
      expect(users.users.find(user => user.id === '1')).toBe(undefined);
   });

   it('shouldn\'t remove nonexistent user', () => {
      users.removeUser('4');
      expect(users.users.length).toBe(3);
   });

   it('should find user', () => {
      let user = users.getUser('1');
      expect(user).toEqual(users.users[0]);
   });

   it('shouldn\'t find nonexistent user', () => {
      let user = users.getUser('5');
      expect(user).toBe(undefined);
   });
});