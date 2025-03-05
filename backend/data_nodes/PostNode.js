const mongoose = require('mongoose');

const postNode = (postContent, tags, userIdString) => {

    const dateInMS = Date.now();
    const dateToday = new Date(dateInMS);
    const formattedDate = dateToday.toLocaleDateString("en-GB");
    const userId = new mongoose.Types.ObjectId(userIdString);

    const convertToObjectIds = (tags) => {
        var tagObjectIds = [];
        for(var i=0; i<tags.length; i++){
            tagObjectIds.push(new mongoose.Types.ObjectId(tags[i]));
        }
        return tagObjectIds;
    }

    return({
        "postContent": postContent,
        "netScore": 0,
        "comments": [],
        "tags": convertToObjectIds(tags),
        "createdDate": formattedDate,
        "owner": userId
    })
};

module.exports = postNode;