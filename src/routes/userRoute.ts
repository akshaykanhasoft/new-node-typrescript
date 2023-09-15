//import express from 'express';
import { Router } from 'express';
// import UserController from '../controllers/users';
import { createUser, getUsersList, getUserInfoById, deleteByIdOrAllDelete } from '../controllers/users';
import { userLogin } from '../controllers/login/loginController'
import { imageUpload } from "../middleware/imageUpload";
import { apiMiddleware } from '../middleware/jwtAuthentication';
//const router = express.Router();
//router.post('create/user',UserController.createUser);
//router.route('/',createUser);
//router.route("/").post(createUser);
const userRoute = () => {
    const router = Router();

    //start login route
    router.post('/login/userLogin', userLogin);
    //end login route

    //users route start
    router.post('/users', imageUpload.single("image"), createUser);
    //router.get('/usersList', getUsersList);
    router.post('/usersList', getUsersList);
    router.post('/userFindById', getUserInfoById);
    router.post('/userDeleteByIdOrAllDelete', deleteByIdOrAllDelete);
    //users route end
    return router;
};

export { userRoute };