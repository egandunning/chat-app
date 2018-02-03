const generateMessage = (from, text) => {
   return {
      from,
      text,
      createdAt: Date.now()
   }
};

module.exports = {generateMessage};