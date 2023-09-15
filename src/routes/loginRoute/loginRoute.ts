import { Router } from 'express';
import { userLogin } from '../../controllers/login/loginController'

const loginRoute = () => {
    const router = Router();
    router.post('/userLogin', userLogin);
}
export { loginRoute }