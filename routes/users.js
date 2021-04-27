//require express
const express= require('express');
//use router
const router=express.Router();

const usersController=require('../controllers/userController');

router.get('/signin',usersController.signIn);
router.get('/signup',usersController.signUp);
router.get('/profile',usersController.profile);

//router for delete session
router.get('/delete-session',usersController.deleteSession);

router.post('/create',usersController.create);
router.post('/create-session',usersController.createSession);
// router.post('/update/:id',usersController.updatePassword);






module.exports=router;