const postNode = (postContent, tags) => {

    const dateInMS = Date.now();
    const dateToday = new Date(dateInMS);
    const formattedDate = dateToday.toLocaleDateString("en-GB");

    return({
        "postContent": postContent,
        "netScore": 0,
        "comments": [],
        "tags": tags,
        "createdDate": formattedDate
    })
};

module.exports = postNode;