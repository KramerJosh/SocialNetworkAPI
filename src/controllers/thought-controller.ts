// create a thought

// update thought
    
// delete thought

// add a reaction to a thought

// remove reaction from a thought

import { Request, Response } from 'express';
import Thought from '../models/Thought.js';
import User from '../models/User.js';



const thoughtController = {
// get all thoughts

  async getAllThoughts(_req: Request, res: Response) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// get single thought by id
async getThoughtById(req: Request, res: Response) {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.json(thought); // Explicitly return here
  } catch (err) {
    return res.status(500).json(err); // Explicitly return in catch
  }
},


  // Create a thought
  async createThought(req: Request, res: Response) {
    try {
      const thought = await Thought.create(req.body);

      // Push thought _id to associated user's thoughts array
      await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a thought
  async updateThought(req: Request, res: Response) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });

      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      return res.json(updatedThought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(req: Request, res: Response) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      return res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async addReaction(req: Request, res: Response) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      return res.json(updatedThought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Remove a reaction from a thought
  async removeReaction(req: Request, res: Response) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      return res.json(updatedThought);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
};

export default thoughtController;
