const Admin = require('../model/admin.model');
const fs = require('fs');
const nodemailer = require('nodemailer');

// Login Page
module.exports.loginPage = async (req, res) => {
    try {
        if (req.cookies.adminId) {
            const admin = await Admin.findById(req.cookies.adminId);
            if (admin) return res.redirect('/dashboard');
        }
        return res.render('auth/login');
    } catch (err) {
        console.log("Something went Wrong..", err);
        return res.render('auth/login');
    }
};

// Login Logic
module.exports.checkLogin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin || admin.password !== req.body.password) {
            console.log("Invalid Email or Password");
            return res.redirect('/');
        }
        res.cookie('adminId', admin._id);
        return res.redirect('/dashboard');
    } catch (err) {
        console.log("Something went Wrong..", err);
        return res.render('/');
    }
};

// Dashboard
module.exports.dashboardPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');
        return res.render('dashboard', { admin });
    } catch (err) {
        console.log("Something went Wrong..", err);
        return res.render('/');
    }
};

// Profile Page
module.exports.profilePage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');
        return res.render('profile/profilePage', { admin, singleAdmin: admin });
    } catch (err) {
        console.log("Something went Wrong..", err);
        return res.render('/');
    }
};

// View Admins
module.exports.viewAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (req.cookies.adminId == undefined || !admin) {
            return res.redirect('/');
        }

        let allAdmin = await Admin.find();
        allAdmin = allAdmin.filter((subadmin) => subadmin.email != admin.email);

        return res.render('admin/viewAdminPage', { allAdmin, admin });
    } catch (err) {
        console.log("Something went Wrong..", err);
        return res.render('/dashboard');
    }
};

// Add Admin Page
module.exports.addAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');
        return res.render('admin/addAdminPage', { admin });
    } catch (err) {
        console.log("Something went Wrong..", err);
        return res.render('/dashboard');
    }
};

// Insert Admin
module.exports.insertAdmin = async (req, res) => {
    try {
        // Verification logic
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');

        if (req.file) req.body.profile_image = req.file.path;
        await Admin.create(req.body);
        return res.redirect('/viewAdminPage');
    } catch (err) {
        console.log("Something went Wrong..", err);
        return res.render('/addAdminPage');
    }
};

// Edit Admin Page
module.exports.editAdminPage = async (req, res) => {
    try {
        // Verification logic
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');

        const singleAdmin = await Admin.findById(req.params.adminId);
        return res.render('admin/editAdminPage', { admin, singleAdmin });
    } catch (err) {
        console.log("Something went Wrong..", err);
        return res.redirect('/viewAdminPage');
    }
};

// Update Admin logic
module.exports.updateAdmin = async (req, res) => {
    try {
        // Verification logic
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');

        if (req.file) {
            req.body.profile_image = req.file.path;
            const updateAdmin = await Admin.findByIdAndUpdate(req.params.adminId, req.body);
            if (updateAdmin.profile_image) fs.unlink(updateAdmin.profile_image, () => { });
            return res.redirect('/viewAdminPage')
        }
        else {
            const updateAdmin = await Admin.findByIdAndUpdate(req.params.adminId, req.body, { new: true });
            if (!updateAdmin) {
                return res.redirect('/viewAdminPage')
            }
            return res.redirect('/viewAdminPage')
        }
    } catch (err) {
        console.log("Something went Wrong..", err);
        return res.redirect('/viewAdminPage');
    }
};

// Delete Admin logic
module.exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (req.cookies.adminId == undefined || !admin) {
            return res.redirect('/');
        }

        const deletedUser = await Admin.findByIdAndDelete(req.query.adminId);
        if (deletedUser) {
            if (deletedUser.profile_image) fs.unlink(deletedUser.profile_image, () => { });
            console.log("Admin deleted successfully...");
        }

        return res.redirect('/viewAdminPage');
    } catch (err) {
        console.log("Something went Wrong..", err);
        return res.render('/viewAdminPage');
    }
};

// Change Password Page
module.exports.changePasswordPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');

        res.render('profile/changePasswordPage', { admin });
    } catch (err) {
        console.log("Something went wrong..", err);
        return res.render('/dashboard');
    }
};

// Change Password Logic
module.exports.changePassword = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');

        const { current_psw, new_psw, confirm_psw } = req.body;
        if (current_psw !== admin.password || new_psw !== confirm_psw) return res.redirect('/change-password');

        await Admin.findByIdAndUpdate(admin._id, { password: new_psw });
        res.clearCookie('adminId');
        return res.redirect('/');
    } catch (err) {
        console.log("Something went Wrong..", err);
        return res.render('/dashboard');
    }
};

// Forgot Password Page (Public)
module.exports.forgetPage = (req, res) => res.render('auth/forgetPage');

// Verify Email (Public)
module.exports.verifyEmail = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) return res.redirect('/verify-email');

        const OTP = Math.floor(100000 + Math.random() * 900000);
        let transporter = nodemailer.createTransport({
            service: "gmail", auth: { user: "workjanhvi21@gmail.com", pass: "dfzhehtwnrbvomaj" }
        });

        await transporter.sendMail({
            from: 'Admin Panel',
            to: req.body.email,
            subject: "OTP Verification",
            html: `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <meta charset="UTF-8">
                        <title>Verification Code</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        </head>
                        <body style="margin:0;padding:0;background-color:#f8f6f6;font-family:Arial, Helvetica, sans-serif;">

                        <!-- Wrapper -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f6f6;padding:20px;">
                            <tr>
                            <td align="center">

                                <!-- Card -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;">

                                <!-- Header -->
                                <tr>
                                    <td style="background:#f6cdcb;padding:24px;text-align:center;">
                                    <h2 style="margin:0;color:#201212;font-size:22px;font-weight:bold;">
                                        AdminCore
                                    </h2>
                                    </td>
                                </tr>

                                <!-- Body -->
                                <tr>
                                    <td style="padding:32px;text-align:center;color:#5D6B6B;">

                                    <h1 style="margin:0 0 16px;font-size:28px;color:#201212;">
                                        Verification Code
                                    </h1>

                                    <p style="margin:0 0 32px;font-size:16px;line-height:24px;">
                                        Please use the following one-time password to complete your secure verification.
                                        This code is valid for <strong>10 minutes</strong>.
                                    </p>

                                    <!-- OTP Box -->
                                    <table align="center" cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                                        <tr>
                                        <td style="
                                            background-color:#f6cdcb;
                                            border-radius:10px;
                                            padding:16px 32px;
                                            font-size:32px;
                                            letter-spacing:6px;
                                            font-weight:bold;
                                            color:#201212;
                                        ">
                                            ${OTP}
                                        </td>
                                        </tr>
                                    </table>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="padding:20px;text-align:center;background-color:#fafafa;color:#999999;font-size:11px;">
                                    © 2024 AdminCore Systems Inc.<br><br>
                                    This is an automated message. Please do not reply.
                                    </td>
                                </tr>

                                </table>

                            </td>
                            </tr>
                        </table>

                        </body>
                        </html>
                        `
        });

        res.cookie("OTP", OTP);
        res.cookie("Id", admin._id);
        return res.redirect('/otp-page');
    } catch (err) {
        return res.render('/verify-email');
    }
};

// Otp page rendering
module.exports.OTPpage = (req, res) => {
    if (!req.cookies.OTP) return res.redirect('/'); // Security check
    res.render('auth/OTPpage');
};

// OTP logic 
module.exports.OTPVerify = (req, res) => {
    if (req.body.adminOTP == req.cookies.OTP) return res.redirect('/newPasswordPage');
    return res.redirect('/otp-page');
};

// rendering resetpassword page
module.exports.newPasswordPage = async (req, res) => {
    try {
        if (!req.cookies.Id) return res.redirect('/');

        res.clearCookie('OTP');
        return res.render('auth/resetPassword');
    } catch (err) {
        return res.redirect('/');
    }
};

// reset password logic
module.exports.changeNewPassword = async (req, res) => {
    try {
        const { new_password, confirm_password } = req.body;
        if (new_password !== confirm_password) return res.redirect('/newPasswordPage');

        const adminId = req.cookies.Id;
        if (!adminId) return res.redirect('/');

        const updatePassword = await Admin.findByIdAndUpdate(adminId, { password: new_password });

        res.clearCookie('Id');
        res.clearCookie('OTP');

        return res.redirect('/');
    } catch (err) {
        return res.redirect('/');
    }
};

// logout 
module.exports.logout = (req, res) => {
    res.clearCookie('adminId');
    return res.redirect('/');
};