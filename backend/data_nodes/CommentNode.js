
const commentNode = (postId, commentContent) => {
    const dateInMS = Date.now();
    const dateToday = new Date(dateInMS);
    const formattedDate = dateToday.toLocaleDateString("en-GB");

    return({
        "postId": postId,
        "commentContent": commentContent,
        "netScore": 0,
        "createdDate": formattedDate
    })
};

Module.exports = commentNode;