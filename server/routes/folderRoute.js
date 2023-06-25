const router = require('express').Router();
const { getFolders, getNotes, createFolder, createNote, deleteNote, updateNote, deleteFolder, updateFolder } = require('../controllers/folderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.route('/').get(getFolders).post(createFolder);
router.route('/:id').delete(deleteFolder).put(updateFolder);
router.route('/:id/notes').get(getNotes).put(createNote);
router.route('/:id/:noteId').delete(deleteNote).put(updateNote);

module.exports = router;