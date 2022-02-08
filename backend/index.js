const connectToMongoose = require('./database');
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

connectToMongoose();

app.use(express.json());
app.use(cors({ origin: '*' }));

//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNoteBook app listening on port ${port}`)
})
