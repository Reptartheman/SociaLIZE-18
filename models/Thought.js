const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //  {#5a4,1} CHECK THIS
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);


thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;



//  {#502,30}
/* 
    The first three lines are simply importing our...
        - Schema and model classes from the mongoose module.
        - Our reactionSchema.
        - PENDING: our date format.
    Starting at line 6, we start to define our schema for our
    Thought model.
        - Line 8: Is defining the structure of the "thought"
        - Line 14: Is saying what time the "thought" was left.
        - Line 20: Is defining the username and saying it 
        needs to be there.
        - Line 24: Is an array of objects from our reactionSchema.
        - Line 27: Means that documents from the collection will 
        be converted to JSON. Getters should be included in the JSON
        representation.

    Line 35: A virtual property simply allows you to make a new
    property that does not get saved to the database.
        - An example would be if you have a firstName and lastName
        property and you want to turn it into a fullName property.
        - Line 35 is going to save a reaction count that is associated
        with the specific thought.

    Line 39: Is creating our Thought model.
        - The model object gives us a way to interact with a
        specific collection.
        - A model is a representation of a mongoDB collection.
        - In this case we have a collection of Thoughts. The collection
        contains documents which have the data.
*/


