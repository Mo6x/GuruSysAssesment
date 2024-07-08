import { Router } from "express";
import {loginAuthenticate} from "../authentication/authLogins";
import {registerAuthenticate} from "../authentication/authRegisters";


const router = Router();

router.post('/login', loginAuthenticate);
router.post('/register', registerAuthenticate);

export default router;
