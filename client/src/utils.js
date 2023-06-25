import axios from 'axios';

const SERVER = 'https://notesserver-w3zq.onrender.com';

class User {
    constructor(_id, email, token, isLoggedIn) {
        this._id = _id;
        this.email = email;
        this.token = token;
        this.isLoggedIn = isLoggedIn;
    }

    async checkLoggedIn() {
        try {
            const response = await axios.get(`${SERVER}/user/authentication`, { withCredentials: true });
            if (response.status === 200) {
                return new User(response.data._id, response.data.email, response.data.token, true);
            }
        } catch (err) {
            throw err;
        }
        return new User('', '', '', false);
    }

    async logout() {
        try {
            const response = await axios.get(`${SERVER}/user/logout`, { withCredentials: true });
            if (response.status === 200) {
                return new User('', '', '', false);
            }
        } catch (err) {
            throw err;
        }
    }

    async fetchFolders() {
        try {
            const response = await axios.get(`${SERVER}/folder`, {
                headers: {
                    Authorization: `${this.token}`
                }
            });

            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            throw err;
        }
    }

    async fetchNotes(folderId) {
        try {
            const response = await axios.get(`${SERVER}/folder/${folderId}/notes`, {
                headers: {
                    Authorization: `${this.token}`
                }
            });

            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            throw err;
        }
    }

    async addNote(folderId, title, content) {
        try {
            const response = await axios.put(`${SERVER}/folder/${folderId}/notes`, {
                title: title,
                content: content
            }, {
                headers: {
                    Authorization: `${this.token}`
                }
            });
            if (response.status === 200) {
                const updatedNotes = await this.fetchNotes(folderId);
                return updatedNotes;
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            throw err;
        }
    }

    async editNote(folderId, noteId, title, content) {
        try {
            const response = await axios.put(`${SERVER}/folder/${folderId}/${noteId}`, {
                title: title,
                content: content
            }, {
                headers: {
                    Authorization: `${this.token}`
                }
            });

            if (response.status === 200) {
                const updatedNotes = await this.fetchNotes(folderId);
                return updatedNotes;
            }
        } catch (err) {
            throw err;
        }
    }

    async deleteNote(folderId, noteId) {
        try {
            const response = await axios.delete(`${SERVER}/folder/${folderId}/${noteId}`, {
                headers: {
                    Authorization: `${this.token}`
                }
            });
            if (response.status === 200) {
                const updatedNotes = await this.fetchNotes(folderId);
                return updatedNotes;
            }
        } catch (err) {
            throw err;
        }
    }

    async addFolder(folderName) {
        try {
            if (folderName !== '') {
                const response = await axios.post(`${SERVER}/folder`, {
                    name: folderName
                }, {
                    headers: {
                        Authorization: `${this.token}`
                    }
                });
                if (response.status === 201) {
                    const updatedFolders = await this.fetchFolders();
                    return updatedFolders;
                }
            }
        } catch (err) {
            throw err;
        }
    }

    async deleteFolder(folderId) {
        try {
            const response = await axios.delete(`${SERVER}/folder/${folderId}`, {
                headers: {
                    Authorization: `${this.token}`
                }
            });
            if (response.status === 200) {
                const updatedFolders = await this.fetchFolders();
                return updatedFolders;
            }
        } catch (err) {
            throw err;
        }
    }

    async editFolder(folderId, folderName) {
        try {
            const response = await axios.put(`${SERVER}/folder/${folderId}`, {
                name: folderName
            }, {
                headers: {
                    Authorization: `${this.token}`
                }
            });
            if (response.status === 200) {
                return true;
            }
        } catch (err) {
            throw err;
        }
    }
}

export { User, SERVER };