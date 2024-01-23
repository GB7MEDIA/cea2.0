import express from 'express';
import { 
    LoginController, 
    RegisterController, 
    ForgotPasswordController, 
    NewPasswordController, 
    ActivateAccountController, 
    TwoFactorAuthenticationController
} from "../controllers/index.js";

import { 
    validateLogin, 
    validateRegister, 
    validateForgotPassword, 
    validateNewPassword, 
    validateActivateAccount, 
    validateTwoFactorAuthentication, 
    checkValidationResult 
} from '../middlewares/validation.middleware.js';

const router = express.Router();

router.post("/login", validateLogin, checkValidationResult, LoginController);
router.post("/register", validateRegister, checkValidationResult, RegisterController);
router.post("/password/forgot", validateForgotPassword, checkValidationResult, ForgotPasswordController);
router.post("/password/new", validateNewPassword, checkValidationResult, NewPasswordController);
router.post("/activate", validateActivateAccount, checkValidationResult, ActivateAccountController);
router.post("/tfa", validateTwoFactorAuthentication, checkValidationResult, TwoFactorAuthenticationController);

export const AuthRoutes = router;
