import { Schema, Types, Document } from 'mongoose';

// Reaction Interface
export interface IReaction extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Reaction Schema
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true, // ✅ Automatically adds createdAt and updatedAt
    toJSON: { 
      getters: true // ✅ Ensures that Mongoose applies any getter functions
    } 
  }
);


export default reactionSchema;
