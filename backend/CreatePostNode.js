
function CreatePostNode(postContent){
    var postNode;
    var postComments = [];
    var netScore = 0;
    postNode = {
        "Content": postContent,
        "Comments": postComments,
        "NetScore": netScore
    }
    return postNode;
}

module.exports = CreatePostNode;