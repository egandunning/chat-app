const generateMessage = (from, text) => {
   return {
      from,
      text,
      createdAt: Date.now()
   }
};

const generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        url: `https://google.com/maps?q=${lat},${lng}`,
        createdAt: Date.now()
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
};