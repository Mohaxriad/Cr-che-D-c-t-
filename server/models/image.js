const monogoose = require('mongoose');

const ImageSchema = new monogoose.Schema({
    url : {
        type: String,
        required: true
    },
    type : {
        enum : ['user', 'creche'],
        required: true
    },
    id : {
        type: monogoose.Schema.Types.ObjectId,
        required: true
    }
});

const Image = monogoose.model('Image', ImageSchema);