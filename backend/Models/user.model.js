const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,   // ✅ should be "type" not "typeof"
        required: true,
    },
    email: {
        type: String,   // ✅ fixed
        required: true,
        unique: true
    },
    password: {
        type: String,   // ✅ fixed
        required: true,
    }
});

const userModel = mongoose.model('userinfos', userSchema);

module.exports = userModel;
