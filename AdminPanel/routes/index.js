const express = require('express');
const multer = require('multer');
const { loginPage, checkLogin, logout, dashboardPage, profilePage, changePasswordPage, changePassword, forgetPage, verifyEmail, OTPpage, OTPVerify, newPasswordPage, changeNewPassword, addAdminPage, viewAdminPage, insertAdmin, deleteAdmin, editAdminPage, updateAdmin } = require('../controller/admin.controller');
const route = express.Router();

// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/admin/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Routes
route.get('/', loginPage);
route.post('/login', checkLogin);
route.get('/logout', logout);
route.get('/dashboard', dashboardPage);
route.get('/profile', profilePage);

route.get('/change-password', changePasswordPage);
route.post('/change-password', changePassword);

route.get('/verify-email', forgetPage);
route.post('/verify-email', verifyEmail);
route.get('/otp-page', OTPpage);
route.post('/otp-verify', OTPVerify);
route.get('/newPasswordPage', newPasswordPage);
route.post('/change-new-password', changeNewPassword);

route.get('/addAdminPage', addAdminPage);
route.get('/viewAdminPage', viewAdminPage);
route.post('/insertAdmin', upload.single('profile_image'), insertAdmin);
route.get('/deleteAdmin', deleteAdmin);
route.get('/editAdmin/:adminId', editAdminPage);
route.post('/editAdmin/:adminId', upload.single('profile_image'), updateAdmin);

module.exports = route;