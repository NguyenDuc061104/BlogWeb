const { v4: uuidv4 } = require('uuid');
const { checkRecordExist, insertRecord, deleteRecord, createTable } = require('../../utils/sqlFunction');
const friendshipSchema = require('../../schemas/friendshipSchema');

const addFriend = async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user.userId;

    if (!friendId) {
        return res.status(400).json({ message: 'Friend ID is required' });
    }

    try {
        await createTable(friendshipSchema);
        const friendship = {
            friendshipId: uuidv4(),
            userId,
            friendId
        };
        const result = await insertRecord('friendships', friendship);
        res.status(201).json(result);
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const removeFriend = async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user.userId;

    if (!friendId) {
        return res.status(400).json({ message: 'Friend ID is required' });
    }

    try {
        const friendship = await checkRecordExist('friendships', 'userId', userId, 'friendId', friendId);
        if (!friendship) {
            return res.status(404).json({ message: 'Friendship not found' });
        }

        await deleteRecord('friendships', 'friendshipId', friendship.friendshipId);
        res.status(200).json({ message: 'Friend removed successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addFriend, removeFriend };