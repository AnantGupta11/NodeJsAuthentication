//require express
const express= require('express');
//use router
const router=express.Router();

const usersController=require('../controllers/userController');

router.get('/signin',usersController.signIn);
router.get('/signup',usersController.signUp);

router.post('/create',usersController.create);







module.exports=router;