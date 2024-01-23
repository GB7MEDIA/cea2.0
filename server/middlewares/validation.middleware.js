import { body, param, validationResult } from 'express-validator';

const ERROR_MESSAGES = {
    EMAIL_INVALID: 'Invalid email address. Please use a valid email.',
    PASSWORD_INVALID: 'Invalid password. Please use a valid password.',
    NAME_REQUIRED: 'Name is required. Please provide a valid name.',
    PHONE_INVALID: 'Invalid phone number. Please provide a valid phone number.',
    PASSWORD_LENGTH: 'Password must be at least 8 characters long.',
    PASSWORD_DIGIT: 'Password must contain at least one digit.',
    PASSWORD_LETTER: 'Password must contain at least one letter.',
    NEW_PASSWORD_CODE_REQUIRED: 'New password code is required.',
    USER_ID_REQUIRED: 'User ID is required.',
    ACTIVATE_ACCOUNT_CODE_REQUIRED: 'Activate account code is required.',
    TFA_CODE_REQUIRED: 'Two Factor Authentication code is required.',
    ROLE_REQUIRED: 'Role is required.',
    ACTIVE_REQUIRED: 'Active is required.',
    TFA_SETTING_REQUIRED: 'Two Factor Authentiction is required.'
};

export const validateLogin = [
    body('email')
      .isEmail()
      .withMessage(ERROR_MESSAGES.EMAIL_INVALID),
    body('password')
      .notEmpty()
      .withMessage(ERROR_MESSAGES.PASSWORD_INVALID),
];
  
export const validateRegister = [
    body('name')
      .notEmpty()
      .withMessage(ERROR_MESSAGES.NAME_REQUIRED),
    body('email')
      .isEmail()
      .withMessage(ERROR_MESSAGES.EMAIL_INVALID),
    body('phonenumber')
      .isMobilePhone('any', { strictMode: false })
      .withMessage(ERROR_MESSAGES.PHONE_INVALID),
    body('password')
      .isLength({ min: 8 })
      .withMessage(ERROR_MESSAGES.PASSWORD_LENGTH)
      .matches(/\d/)
      .withMessage(ERROR_MESSAGES.PASSWORD_DIGIT)
      .matches(/[a-zA-Z]/)
      .withMessage(ERROR_MESSAGES.PASSWORD_LETTER),
];
  
export const validateForgotPassword = [
    body('email')
      .isEmail()
      .withMessage(ERROR_MESSAGES.EMAIL_INVALID),
];
  
export const validateNewPassword = [
    body('newpasswordcode')
      .notEmpty()
      .withMessage(ERROR_MESSAGES.NEW_PASSWORD_CODE_REQUIRED),
    body('user_id')
      .notEmpty()
      .withMessage(ERROR_MESSAGES.USER_ID_REQUIRED),
    body('newpassword')
      .isLength({ min: 8 })
      .withMessage(ERROR_MESSAGES.PASSWORD_LENGTH)
      .matches(/\d/)
      .withMessage(ERROR_MESSAGES.PASSWORD_DIGIT)
      .matches(/[a-zA-Z]/)
      .withMessage(ERROR_MESSAGES.PASSWORD_LETTER),
];

export const validateActivateAccount = [
  body('user_id').notEmpty().withMessage(ERROR_MESSAGES.USER_ID_REQUIRED),
  body('activateaccountcode').notEmpty.withMessage(ERROR_MESSAGES.ACTIVATE_ACCOUNT_CODE_REQUIRED)
];

export const validateTwoFactorAuthentication = [
  body('user_id').notEmpty().withMessage(ERROR_MESSAGES.USER_ID_REQUIRED),
  body('tfa_code').notEmpty().withMessage(ERROR_MESSAGES.TFA_CODE_REQUIRED)
];

export const validateCreateUser = [
  body('name')
      .notEmpty()
      .withMessage(ERROR_MESSAGES.NAME_REQUIRED),
    body('email')
      .isEmail()
      .withMessage(ERROR_MESSAGES.EMAIL_INVALID),
    body('phonenumber')
      .isMobilePhone('any', { strictMode: false })
      .withMessage(ERROR_MESSAGES.PHONE_INVALID),
    body('password')
      .isLength({ min: 8 })
      .withMessage(ERROR_MESSAGES.PASSWORD_LENGTH)
      .matches(/\d/)
      .withMessage(ERROR_MESSAGES.PASSWORD_DIGIT)
      .matches(/[a-zA-Z]/)
      .withMessage(ERROR_MESSAGES.PASSWORD_LETTER),
];

export const validateEditUserById = [
  param('user_id').notEmpty().withMessage(ERROR_MESSAGES.USER_ID_REQUIRED),
  body('name')
      .notEmpty()
      .withMessage(ERROR_MESSAGES.NAME_REQUIRED),
    body('email')
      .isEmail()
      .withMessage(ERROR_MESSAGES.EMAIL_INVALID),
    body('phonenumber')
      .isMobilePhone('any', { strictMode: false })
      .withMessage(ERROR_MESSAGES.PHONE_INVALID),
    body('role')
      .notEmpty()
      .withMessage(ERROR_MESSAGES.ROLE_REQUIRED),
    body('active')
      .notEmpty()
      .withMessage(ERROR_MESSAGES.ACTIVE_REQUIRED),
    body('tfa_setting')
      .notEmpty()
      .withMessage(ERROR_MESSAGES.TFA_SETTING_REQUIRED),
];
  
// Similar modules for other validation types...
  
export const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};
  