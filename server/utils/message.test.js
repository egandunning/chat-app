const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('Generate Message', () => {
   it('should generate a message object', () => {
      let beforeTime = Date.now();
      let msg = generateMessage('user', 'message text');

      expect(msg.from).toBe('user');
      expect(msg.text).toBe('message text');
   });
});

describe('generateLocationMessage', () => {
   it('should generate a location message', () => {
      let beforeTime = Date.now();
      let msg = generateLocationMessage('user', 1, 1);

      expect(msg.from).toBe('user');
      expect(msg.url).toBe('https://google.com/maps?q=1,1');
   });
});