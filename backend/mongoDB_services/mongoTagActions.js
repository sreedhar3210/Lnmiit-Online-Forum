const Tag = require('../mongoDB_models/Tag');

const formatTag = (tag) => {
    return({
        "Id": tag._id,
        "TagName": tag.tagName,
        "TagDescription": tag.tagDescription
    });
}

const mongoFetchTags = async() => {
    const tags = await Tag.find();
    var i;
    var formattedTag;
    var formattedTags = [];
    for(i=0;i<tags.length;i++){
        formattedTag = formatTag(tags[i]);
        formattedTag.Id = String(formattedTag.Id);
        formattedTags.push(formattedTag);
    }
    return tags;
}

module.exports = { mongoFetchTags };