import { Schema, model, Document } from 'mongoose';
import reactionSchema, { IReaction } from './Reaction';

// Thought Interface
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

// Thought Schema
const thoughtSchema = new Schema<IThought>(
  {
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
  },
  {
    timestamps: true, // ✅ Automatically adds createdAt and updatedAt
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false, // Removes default `_id` field when converting to JSON
  }
);


// Virtual to get the reaction count
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
