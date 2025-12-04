'use strict'
//!dmbg


const {Schema,model} = require('mongoose'); // Erase if already required
const DOCUMENT_NAME ='Key';
const COLLECTION_NAME ='keys'
// Declare the Schema of the Mongo model
var KeyTokenSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'shop'
    },
    publicKey:{
        type:String,
        required:true,
    },
    refeshToken:{
        type: Array,
        default: []
    }
}
, { 
        collection: COLLECTION_NAME,
        timestamps: true
    }
);

//Export the model
module.exports = model(DOCUMENT_NAME,KeyTokenSchema);