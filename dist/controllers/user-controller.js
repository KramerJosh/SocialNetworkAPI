// get all users
import User from '../models/User.js';
import Thought from '../models/Thought.js';
const userController = {
    // Get all users
    async getAllUsers(_req, res) {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single user by id
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.userId)
                .populate('thoughts')
                .populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(user);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        }
        catch (err) {
            res.status(400).json(err);
        }
    },
    // Update a user
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(updatedUser);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // Delete user and associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Remove associated thoughts
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            await user.deleteOne();
            return res.json({ message: 'User and associated thoughts deleted successfully' });
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // Add a friend to the friend list
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(user);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // Remove a friend from the friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(user);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
};
export default userController;
