const expect = require('expect');

const {generateMessage} = require('./message');

describe('Generate Message', () => {
   it('Generate a message object', () => {
      let beforeTime = Date.now();
      let msg = generateMessage('user', 'message text');

      expect(msg.from).toBe('user');
      expect(msg.text).toBe('message text');
      expect(msg.createdAt).toBeGreaterThanOrEqual(beforeTime);
   });
});