const {model,Schema,Types} = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'AiiKey'
const COLLECTION_NAME = 'ApiKeys'
// Declare the Schema of the Mongo model
const apikeySchema = new Schema({
  key:{
    type: String,
    required: true,
    unique: true
  },
  status:{
    type: Boolean,
    default :true,
  },
  permissions:{ // cung cấp cho nhiều nơi sử dụng cung cấp bởi admin và người dùng sử dụng key này để add vào header service và kèm theo , verify phù hợp thì lấy
    type: [String],
    require: true,
    enum: ['0000','1111','2222'
    ]
  },

},{
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME,apikeySchema);