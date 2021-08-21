const router = require('express').Router();

const controller = require('../controllers/controller');





router.get('/', controller.sendForm);

router.post('/register', controller.uploadPhoto, controller.createUser);

router.get('/user', controller.getUser);

module.exports = router;