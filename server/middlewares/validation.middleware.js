import {body, validationResult} from "express-validator";

export const validateLogin = [
    body('email').isEmail().withMessage('Die E-Mail ist nicht gültig! Bitte versuchen sie es erneut mit einer gültigen E-Mail.'),
    body('password').notEmpty().withMessage('Das Passwort ist nicht gültig! Bitte versuchen sie es erneut mit einem gültigen Passwort.')
];

export const validateRegister = [
    body('name').isEmpty().withMessage('Das Feld Name darf nicht ausgelassen werden! Bitte versuchen Sie es erneut mit einem Namen.'),
    body('email').isEmail().withMessage('Die E-Mail ist nicht gültig! Bitte versuchen sie es erneut mit einer gültigen E-Mail.'),
    body('phonenumber').isMobilePhone('any', {strictMode: false}).withMessage('Die Telefonnummer ist nicht gültig! Bitte versuchen sie es erneut mit einer Gültigen Telefonnummer.'),
    body('password')
    .isLength({ min: 8 }).withMessage('Das Passwort muss mindestens 8 Zeichen lang sein!')
    .matches(/\d/).withMessage('Das Passwort muss mindestens eine Zahl beinhalten!')
    .matches(/[a-zA-Z]/).withMessage('Das Passwort muss mindestens einen Buchstaben enthalten!')
];

export const validateForgotPassword = [
    body('email').isEmail().withMessage('Die E-Mail ist nicht gültig! Bitte versuchen sie es erneut mit einer gültigen E-Mail.')
];

export const validateNewPassword = [
    body('newpasswordcode').isEmpty().withMessage('Der New Passwort Code darf nicht ausgelassen werden! Bitte versuchen Sie es erneut mit einem gültigem New Passwort Code.'),
    body('newpassword')
    .isLength({ min: 8 }).withMessage('Das Passwort muss mindestens 8 Zeichen lang sein!')
    .matches(/\d/).withMessage('Das Passwort muss mindestens eine Zahl beinhalten!')
    .matches(/[a-zA-Z]/).withMessage('Das Passwort muss mindestens einen Buchstaben enthalten!')
];

// andere validate Functions ...

export const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    next();
}