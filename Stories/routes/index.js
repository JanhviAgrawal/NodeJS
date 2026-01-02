const express = require('express');
const multer = require('multer');
const path = require('path');

// WishList stories
// Continues stories

const {
    homePage,
    addStoryPage,
    addStory,
    viewStory,
    editStory,
    updateStory,
    deleteStory,
    errorPage
} = require('../controllers/home.controller');

const router = express.Router();

// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Setup upload to accept TWO different file fields
const upload = multer({ storage: storage }).fields([
    { name: 'story_image_vertical', maxCount: 1 },
    { name: 'story_image_horizontal', maxCount: 1 }
]);

router.get('/', homePage);
router.get('/addStory', addStoryPage);

router.post('/addStory', upload, addStory);
router.get('/story/:id', viewStory);
router.get('/edit/:id', editStory);
router.post('/updateStory/:id', upload, updateStory);
router.get('/deleteStory/:id', deleteStory);


router.get('/error', errorPage);

module.exports = router;