const mongoose = require('mongoose');

const commentNode = (postId, commentContent) => {
    const dateInMS = Date.now();
    const dateToday = new Date(dateInMS);
    const formattedDate = dateToday.toLocaleDateString("en-GB");
    postId = new mongoose.Types.ObjectId(postId);

    return({
        "postId": postId,
        "commentContent": commentContent,
        "netScore": 0,
        "createdDate": formattedDate
    })
};

module.exports = commentNode;