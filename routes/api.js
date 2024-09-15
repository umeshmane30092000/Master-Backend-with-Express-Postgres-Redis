import { Router } from "express"
import AuthController from "../controllers/AuthControllers.js";
import authMiddleware from "../middleware/Authenticate.js";
import ProfileController from "../controllers/ProfileController.js";

const router = Router();


router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);


//profile controller route it is private route we need to pass midddleware in it
// in the postman we need to pass access token in headers otherwse it will throw error


router.get("/profile", authMiddleware, ProfileController.index);
router.put("/profile/:id", authMiddleware, ProfileController.update);// put-update method

export default router;