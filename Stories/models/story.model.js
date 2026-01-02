const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    story_name: { type: String, required: true },
    story_image_vertical: { type: String, required: true },
    story_image_horizontal: { type: String, required: true },
    story_category: { type: [String], required: true },
    story_description: { type: String, required: true }
});

module.exports = mongoose.model('Story', storySchema);