// Import the configured items from the server file:
const { default: mongoose } = require('mongoose');
var {app, PORT, HOST} = require('./server');

// Run the server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, HOST, () => console.log(`Server is running on port ${PORT}`));
})