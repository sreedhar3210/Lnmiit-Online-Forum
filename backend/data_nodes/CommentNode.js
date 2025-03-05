const mongoose = require('mongoose');

const commentNode = (postId, commentContent, ownerIdString) => {
    const dateInMS = Date.now();
    const dateToday = new Date(dateInMS);
    const formattedDate = dateToday.toLocaleDateString("en-GB");
    const ownerId = new mongoose.Types.ObjectId(ownerIdString);

    postId = new mongoose.Types.ObjectId(postId);

    return({
        "postId": postId,
        "commentContent": commentContent,
        "netScore": 0,
        "createdDate": formattedDate,
        "owner": ownerId
    })
};

module.exports = commentNode;