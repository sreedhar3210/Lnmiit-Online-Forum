const Tag = require('../mongoDB_models/Tag');

const formatTag = (tag) => {
    return({
        "value": tag._id,
        "label": tag.tagName
    });
}

const mongoInsertTag = async(tag) => {
    const newTag = new Tag(tag);
    
    await newTag.save();
}

const mongoFetchTags = async() => {
    const tags = await Tag.find();
    var formattedTag;
    var formattedTags = [];
    for(var i=0;i<tags.length;i++){
        formattedTag = formatTag(tags[i]);
        formattedTag.value = String(formattedTag.value);
        formattedTags.push(formattedTag);
    }
    return formattedTags;
}

module.exports = { mongoFetchTags, mongoInsertTag };