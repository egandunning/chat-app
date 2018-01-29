const express = require('express');
const path = require('path');


const port = process.env.PORT || 3000;
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
   console.log(`server started on port ${port}`)
});
