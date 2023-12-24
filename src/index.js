const { default: mongoose } = require('mongoose');
var {app, PORT} = require('./server');

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})