//require express
const express= require('express');
//use router
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/userController');

router.get('/signin',usersController.signIn);
router.get('/signup',usersController.signUp);
// router.get('/profile/:id',usersController.profile);

//router for delete session
router.get('/delete-session',usersController.deleteSession);

router.post('/create',usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate('local',
{failureRedirect: '/users/signin'},
),usersController.createSession);
// router.post('/update/:id',usersController.updatePassword);






module.exports=router;