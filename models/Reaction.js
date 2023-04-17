const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280
      },
      username: {
        type: String, 
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
      }
    },
    {
      toJSON: {
        getters: true
      },
      id: false
    }
  );
  
  
  module.exports = reactionSchema;

//  {#46b,16}
/* 
    Line 1: Grabbing our Schema class to setup a reactionSchema
    from the mongoose module.
    line 2: Getting the dateFormat file to be used in the getter function
    on line 21.
    Line 3: Starts the new schema.

    Line 5: We are setting up the first argument of our callback function
      - reactionId is given the reaction that a user posts a specific ID.
    Line 9: Is setting up the reaction body.
      - It needs to be a string, it is required, and cannot exceed 280 characters.
    Line 14: we need the username, it must be a string.
    Line 18: we are setting up when the reaction was posted.
    Line 25: Is where the second argument starts. Getter functions will appear in JSON format.
      - Will exclude the id from the formatted JSON.
*/