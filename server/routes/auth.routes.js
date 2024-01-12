import { LoginController } from "../controllers/auth.controller";


export const AuthRoutes = (app) => {
    app.post("/login", (req, res) => {
        LoginController(req, res);
    })
}