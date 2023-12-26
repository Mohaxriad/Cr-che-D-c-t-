const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const sendEmail = require('../config/sendEmail');
const validator = require('validator');
const htmlToText = require('html-to-text');
const crecheController = require('./crecheController');
const enfantController = require('./enfantController');
const { setDB_URL, connectDB} = require('../config/db');


const createToken = (user) => {
    const userImportansData = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }
    const payload = {user : userImportansData};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const expiresIn = process.env.ACCESS_EXPIRES_IN;
    //the res is json object that will be sent to the client
    return jwt.sign(payload, secret, {expiresIn})
}
const createRefreshToken = (res, user) => {
    const payload = {id: user._id};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const expiresIn = process.env.REFRESH_EXPIRES_IN;
    const token = jwt.sign(payload, secret, {expiresIn});
    res.cookie('refreshToken', token, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000});
}

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({message: 'Please fill all fields'});
    }

    const user = await User.findOne({email});
    try {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            createRefreshToken(res, user);
            const accessToken  = createToken(user);
            const Enfant = await enfantController.getEnfant(req.user = user);
            const liste_creches = await crecheController.getCreatedCreches(req.user = user);
            const crechesauvgardes = await crecheController.getSavedCreches(req.user = user);
            const userImportansData = {
                username: user.username,
                email: user.email,
                roles: user.role,
                nom : user.nom,
                prenom : user.prenom,
                sexe : user.sexe,
                adresse : user.adresse,
                telephone : user.telephone,
                wilaya : user.wilaya,
                commune : user.commune,
                codePostal : user.codePostal,
                liste_creches : liste_creches,
                crechesauvgardes : crechesauvgardes,
                Enfant : Enfant,
                confirmationToken : user.confirmationToken,

            }
            res.status(200).json({accessToken, user: userImportansData});
           
        } else {
            res.status(400).json({message: 'Invalid password'});
        }
    } catch (error) {
        res.status(400).json({message: 'Invalid email'});
        
    }
});

const signup = asyncHandler(async (req, res) => {
    const {
        nom,
        prenom,
        username,
        email,
        password,
        role,
        sexe,
        adresse,
        telephone,
        wilaya,
        commune,
        codePostal
    } = req.body;
    // validation
    if (!email || !password || !nom || !sexe || !adresse || !telephone || !wilaya || !commune || !codePostal || !username || !prenom) {
        res.status(400).json({message: 'Please fill all fields'});
    }
    if (!validator.isEmail(email)) {
        res.status(400).json({message: 'Please enter a valid email'});
    }
    if (!validator.isStrongPassword(password)) {
        res.status(400).json({message: 'Please enter a strong password'});
    }
    const existingUser = await User.findOne({email});
    if (existingUser) {
        res.status(409).json({message: 'Email already exists'});
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sexeUp = sexe.toUpperCase();
        //5 digit code
         const Code = Math.floor(10000 + Math.random() * 90000);
        // to string
        const confirmationToken = jwt.sign({email}, process.env.EMAIL_SECRET, {expiresIn: '1h'});
        const confirmationCode = Code.toString();
        const user  = await User.create({
            nom,
            email,
            password: hashedPassword,
            role,
            sexe: sexeUp,
            adresse,
            telephone,
            wilaya,
            commune,
            codePostal,
            username,
            prenom,
            confirmationCode,
            confirmationToken
        })
        const message = `<h1>Email Confirmation</h1>
                                             <h2>Hello ${username}</h2>
                                             <p>Thank you for subscribing. paste the follwoing code </p>
                                            <a>${confirmationCode}</a>
                                            </div>`
        try {
            sendEmail({
                to: user.email,
                subject: 'Email Confirmation',
                text: message
            });
            createRefreshToken(res, user);
            const userImportansData = {
                username: user.username,
                email: user.email,
                roles: user.role,
                nom : user.nom,
                prenom : user.prenom,
                sexe : user.sexe,
                adresse : user.adresse,
                telephone : user.telephone,
                wilaya : user.wilaya,
                commune : user.commune,
                codePostal : user.codePostal,
                confirmationToken : user.confirmationToken,
            }
            const accessToken = createToken(user);
            res.status(200).json({accessToken, user: userImportansData });
        }catch (error) {
            res.status(400).json({message: 'Something went wrong'});
        }

    }
});

const logout = asyncHandler(async (req, res) => {
    res.clearCookie('refreshToken');
    res.status(200).json({message: 'Logged out successfully'});
});

const refresh = asyncHandler(async (req, res) => {
// refresh the access token if the refresh token exists
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({message: ' token is required'});
    }
    try {
        // verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // check if the user still exists in the database
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({message: 'User not found'});
        }
        const Enfant = await enfantController.getEnfant(req.user = user);
        const liste_creches = await crecheController.getCreatedCreches(req.user = user);
        const crechesauvgardes = await crecheController.getSavedCreches(req.user = user);
        const userImportansData = {
            username: user.username,
            email: user.email,
            roles: user.role,
            nom : user.nom,
            prenom : user.prenom,
            sexe : user.sexe,
            adresse : user.adresse,
            telephone : user.telephone,
            wilaya : user.wilaya,
            commune : user.commune,
            codePostal : user.codePostal,
            liste_creches : liste_creches,
            crechesauvgardes : crechesauvgardes,
            Enfant : Enfant,
            confirmationToken : user.confirmationToken,

        }
        const accessToken = createToken(user);
        res.status(200).json({accessToken});
    } catch (error) {
        res.status(401).json({message: 'Invalid token'});
    }
});

const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body;

    await User.findOne({email}, async (err, user) => {
        if (err || !user) {
            res.status(404).json({message: 'User not found'});
        } else {
            let resetToken = crypto.randomBytes(32).toString('hex');
            resetToken = await bcrypt.hash(resetToken + user._id, 10);
            //send password reset email to user using sendgrid
            const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
            // the message is a good html template
            const message = `
                <h1>Hi ${user.username}</h1>
                <p>Please click the link below to reset your password</p>
                <a href=${resetURL}>${resetURL}</a>
            `;
            const html = htmlToText.fromString(message);
            const resetExpiresIn = new Date(Date.now() + process.env.PASSWORD_RESET_EXPIRES_IN * 1000);
            await user.updateOne({passwordResetToken: resetToken, passwordResetExpires: resetExpiresIn});
            try {
                await sendEmail({
                    to: user.email,
                    subject: 'Password reset',
                    text: html
                });
                res.status(200).json({message: 'Password reset email sent'});
            } catch (error) {
                await user.updateOne({passwordResetToken: undefined, passwordResetExpires: undefined});
                res.status(500).json({message: 'Email could not be sent'});
            }
        }
    });
});

const resetPassword = asyncHandler(async (req, res) => {
    //find the user with the token and check if the token has expired
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");
    const user = await User.findOne({resetPasswordToken});
    // check if token has expired
    if (!user) {
        res.status(400).json({message: 'Invalide email'});
    } else if (user.passwordResetExpires > Date.now()) {
        res.status(400).json({message: 'Token has expired'});
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await user.updateOne({
            password: hashedPassword,
            passwordResetToken: undefined,
            passwordResetExpires: undefined
        });
        // 4) Log the user in, send JWT
        createRefreshToken(res, user);
        const accessToken = createToken(user);
        res.status(200).json({accessToken, user});
    } catch (error) {
        res.status(400).json({error});
    }
});
const changePassword = asyncHandler(async (req, res) => {
    try {
        // Retrieve the oldPassword and newPassword from the request body
        const { oldPassword, newPassword } = req.body;
        console.log (oldPassword);
        console.log (newPassword);

        // Check if both oldPassword and newPassword are provided
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Find the user by their ID
        const user = await User.findById(req.user.id);

        // Compare the old password with the one in the database
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        console.log (isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // Check if the newPassword meets the required criteria
        if (!validator.isStrongPassword(newPassword)) {
            return res.status(400).json({ message: 'Please enter a strong password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await user.updateOne({ password: hashedPassword });

        // Update the token
        createRefreshToken(res, user);
        const accessToken = createToken(user);

        // Return the updated user's important data
        const userImportansData = {
            username: user.username,
            email: user.email,
            roles: user.role,
            nom: user.nom,
            prenom: user.prenom,
            sexe: user.sexe,
            adresse: user.adresse,
            telephone: user.telephone,
            wilaya: user.wilaya,
            commune: user.commune,
            codePostal: user.codePostal,
            confirmationToken: user.confirmationToken,
        };
        console.log (userImportansData);
        res.status(200).json({ accessToken, userImportansData });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


const verifyEmail = asyncHandler(async (req, res) => {
    const {confirmationToken} = req.params;
    const confirmationCode = req.body;
    try {
        const email = jwt.verify(confirmationToken, process.env.EMAIL_VERIFICATION_TOKEN_SECRET);
        const user = await User.findOne({email});
        if (!user) {
            res.status(404).json({message: 'User not found'});
        }
        else if (user.status === 'Active') {
            res.status(400).json({message: 'Email already verified'});
        }
        else if (confirmationCode !== user.confirmationCode) {
            res.status(400).json({message: 'Invalid confirmation code'});
        }

        await user.updateOne({status: 'Active'});
        res.status(200).json({message: 'Email verified successfully'});
    } catch (error) {
        res.status(401).json({message: 'Invalid token'});
    }

});
const upldateUser = asyncHandler(async (req, res) =>{
    const {id} = req.user;
    const {username, email, nom, prenom, sexe, adresse, telephone, wilaya, commune, codePostal} = req.body;
    const user = await User.findById(id);
  
    if(!user){
        res.status(404).json({message: 'User not found'});
    }
    try {
        await user.updateOne({username, email, nom, prenom, sexe, adresse, telephone, wilaya, commune, codePostal});
        const user2 = await User.findById(id);
        const userImportansData = {
            username: user2.username,
            email: user2.email,
            roles: user2.role,
            nom : user2.nom,
            prenom : user2.prenom,
            sexe : user2.sexe,
            adresse : user2.adresse,
            telephone : user2.telephone,
            wilaya : user2.wilaya,
            commune : user2.commune,
            codePostal : user2.codePostal,
            confirmationToken : user2.confirmationToken,

        }
       
        res.status(200).json({  user2 : userImportansData });
    }
    catch (error) {
        res.status(401).json({message: 'Invalid token'});
    }
}
);


module.exports = {
    login,
    signup,
    logout,
    refresh,
    forgotPassword,
    resetPassword,
    changePassword,
    verifyEmail,
    updateUser: upldateUser
}

