const { v4: uuidv4 } = require('uuid');
const { checkRecordExist, insertRecord, deleteRecord, createTable, executeQuery } = require('../../utils/sqlFunction');
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
            friendId,
            friendCount: 1 // Initialize friend count
        };
        const result = await insertRecord('friendships', friendship);

        // Update friend count for both users
        await executeQuery(`UPDATE users SET friendCount = friendCount + 1 WHERE userId = ?`, [userId]);
        await executeQuery(`UPDATE users SET friendCount = friendCount + 1 WHERE userId = ?`, [friendId]);

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

        // Update friend count for both users
        await executeQuery(`UPDATE users SET friendCount = friendCount - 1 WHERE userId = ?`, [userId]);
        await executeQuery(`UPDATE users SET friendCount = friendCount - 1 WHERE userId = ?`, [friendId]);

        res.status(200).json({ message: 'Friend removed successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const acceptFriend = async (req, res) => {
    const { friendId } = req.body;
    const xuserId = req.user.id;

    // Logic to accept the friend request
    // Example: Update the database to mark the friend request as accepted

    res.status(200).json({ message: 'Friend request accepted' });
};

const declineFriend = async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user.id;

    // Logic to decline the friend request
    // Example: Update the database to mark the friend request as declined

    res.status(200).json({ message: 'Friend request declined' });
};

module.exports = {
    addFriend,
    removeFriend,
    acceptFriend,
    declineFriend,
};
