import { Schema, model } from 'mongoose';
import reactionSchema from './Reaction';
// Thought Schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema], // Nested reactions schema
}, {
    timestamps: true, // ✅ Automatically adds createdAt and updatedAt
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false, // Removes default `_id` field when converting to JSON
});
// Virtual to get the reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
