const { Folder } = require('../models/folderModel');

const getFolders = async (req, res) => {
    try {
        const user = req.user;
        const folders = await Folder.find({ _id: { $in: user.folderList } }).sort('_id');
        return res.status(200).json(folders);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error when getting all folders!' });
    }
};

const getNotes = async (req, res) => {
    try {
        const user = req.user;
        const folder = await Folder.findById(req.params.id);

        if (!folder) {
            return res.status(404).json({ error: 'Folder not found!' });
        }

        if (!user.folderList.includes(folder._id.toString())) {
            return res.status(400).json({ error: "Notes don't belong to this user!" });
        }

        return res.status(200).json(folder.noteList);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error when getting notes!' });
    }
}

const createFolder = async (req, res) => {
    try {
        const user = req.user;
        const { name } = req.body;
        const newFolder = await Folder.create({ name });
        user.folderList.push(newFolder._id);
        await user.save();
        return res.status(201).json(newFolder);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error when creating folder!' });
    }
};

const createNote = async (req, res) => {
    try {
        const user = req.user;

        const folder = await Folder.findById(req.params.id);
        if (!folder) {
            return res.status(404).json({ error: 'Folder not found!' });
        }

        if (!user.folderList.includes(folder._id.toString())) {
            return res.status(400).json({ error: "Folder doesn't belong to this user!" });
        }

        const { title, content } = req.body;
        const date = new Date(new Date().getTime() + (3 * 60 * 60 * 1000));
        const newNote = { title, content, date };

        folder.noteList.push(newNote);
        await folder.save();
        return res.status(200).json({ message: 'Folder updated!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error when updating folder!' });
    }
}

const deleteFolder = async (req, res) => {
    try {
        const user = req.user;

        const folder = await Folder.findById(req.params.id);
        if (!folder) {
            return res.status(404).json({ error: 'Folder not found!' });
        }

        if (!user.folderList.includes(folder._id.toString())) {
            return res.status(400).json({ error: "Folder doesn't belong to this user!" });
        }

        const newFolderList = user.folderList.filter(f => f.toString() !== folder._id.toString());
        user.folderList = newFolderList;

        await folder.remove();
        await user.save();
        return res.status(200).json({ message: 'Folder deleted!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error when deleting folder!' });
    }
}

const deleteNote = async (req, res) => {
    try {
        const user = req.user;

        const folder = await Folder.findById(req.params.id);
        if (!folder) {
            return res.status(404).json({ error: 'Folder not found!' });
        }

        if (!user.folderList.includes(folder._id.toString())) {
            return res.status(400).json({ error: "Note doesn't belong to this user!" });
        }

        const noteId = req.params.noteId;
        const noteIndex = folder.noteList.findIndex(note => note._id.toString() === noteId);
        if (noteIndex === -1) {
            return res.status(404).json({ error: 'Note not found!' });
        }

        folder.noteList.splice(noteIndex, 1);
        await folder.save();

        return res.status(200).json({ message: 'Note deleted!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error when deleting note!' });
    }
}

const updateFolder = async (req, res) => {
    try {
        const user = req.user;

        const { name } = req.body;
        const folder = await Folder.findById(req.params.id);

        if (!folder) {
            return res.status(404).json({ error: 'Folder not found!' });
        }

        if (!user.folderList.includes(folder._id.toString())) {
            return res.status(400).json({ error: "Folder doesn't belong to this user!" });
        }

        folder.name = name || folder.name;
        await folder.save();

        return res.status(200).json({ message: 'Folder updated!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error when updating folder!' });
    }
}

const updateNote = async (req, res) => {
    try {
        const user = req.user;

        const folder = await Folder.findById(req.params.id);
        if (!folder) {
            return res.status(404).json({ error: 'Folder not found!' });
        }

        if (!user.folderList.includes(folder._id.toString())) {
            return res.status(400).json({ error: "Note doesn't belong to this user!" });
        }

        const noteId = req.params.noteId;
        const noteIndex = folder.noteList.findIndex(note => note._id.toString() === noteId);
        if (noteIndex === -1) {
            return res.status(404).json({ error: 'Note not found!' });
        }

        const updates = {};
        for (const [key, value] of Object.entries(req.body)) {
            if (value) {
                updates[key] = value;
            }
        }
        const date = new Date(new Date().getTime() + (3 * 60 * 60 * 1000));
        updates['date'] = date;

        folder.noteList[noteIndex] = { ...folder.noteList[noteIndex], ...updates };
        await folder.save();

        return res.status(200).json({ message: 'Note updated!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error when updating note!' });
    }
}

module.exports = { getFolders, getNotes, createFolder, createNote, deleteNote, updateNote, deleteFolder, updateFolder };