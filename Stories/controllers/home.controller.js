const Story = require('../models/story.model');

const homePage = async (req, res) => {
    try {
        const stories = await Story.find();
        res.render('home', { stories });
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
};

const addStoryPage = (req, res) => {
    res.render('addStory');
};

const errorPage = (req, res) => {
    res.render('error');
};

const addStory = async (req, res) => {
    try {
        const { story_name, story_category, story_description } = req.body;

        // When using upload.fields(), files are in req.files
        // We get the filename from the first element [0] of each field array
        const story_image_vertical = req.files['story_image_vertical']
            ? req.files['story_image_vertical'][0].filename
            : null;

        const story_image_horizontal = req.files['story_image_horizontal']
            ? req.files['story_image_horizontal'][0].filename
            : null;

        const story = await Story.create({
            story_name,
            story_category,
            story_description,
            story_image_vertical,
            story_image_horizontal
        });

        console.log("Story inserted successfully:", story);
        res.redirect('/');
    } catch (error) {
        console.log("Error inserting story:", error);
        res.redirect('/error');
    }
};

const viewStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) return res.redirect('/error');
        
        res.render('storyDetail', { story });
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
};

const editStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        res.render('editStory', { story });
    } catch (error) {
        res.redirect('/error');
    }
};

const updateStory = async (req, res) => {
    try {
        const { story_name, story_category, story_description } = req.body;
        const oldStory = await Story.findById(req.params.id);

        // Check if new images were uploaded, otherwise use the old ones
        const story_image_vertical = req.files['story_image_vertical'] 
            ? req.files['story_image_vertical'][0].filename 
            : oldStory.story_image_vertical;

        const story_image_horizontal = req.files['story_image_horizontal'] 
            ? req.files['story_image_horizontal'][0].filename 
            : oldStory.story_image_horizontal;

        await Story.findByIdAndUpdate(req.params.id, {
            story_name,
            story_category,
            story_description,
            story_image_vertical,
            story_image_horizontal
        });

        res.redirect(`/story/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
};

const deleteStory = async (req, res) => {
    try {
        await Story.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
};

module.exports = {
    homePage,
    addStoryPage,
    addStory,
    viewStory,
    editStory, 
    updateStory,
    deleteStory,
    errorPage
};