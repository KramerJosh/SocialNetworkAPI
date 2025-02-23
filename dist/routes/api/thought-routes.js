import { Router } from 'express';
import thoughtController from '../../controllers/thought-controller.js';
const router = Router();
// /api/thoughts
router.get('/', thoughtController.getAllThoughts);
router.get('/:thoughtId', thoughtController.getThoughtById);
router.post('/', thoughtController.createThought);
router.put('/:thoughtId', thoughtController.updateThought);
router.delete('/:thoughtId', thoughtController.deleteThought);
// /api/thoughts/:thoughtId/reactions
router.post('/:thoughtId/reactions', thoughtController.addReaction);
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);
export default router;
