const crypto = require('crypto');
const multer = require('multer');
const sharp = require('sharp');

const User = require('../models/userModel');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: fileFilter
});

const controller = {};

controller.sendForm = (req, res, next) => {
    try {
        res.render('index.pug');
    } catch (error) {
        next(error);
    }
};

controller.uploadPhoto = upload.single('photo');

controller.createUser = async (req, res, next) => {
    try {
        const { firstname, lastname, email,  } = req.body;
        
        const randomId = crypto.randomUUID();
        const userPhoto = req.file.path;

        const croppedPhotoLink = req.file.destination + randomId + req.file.originalname;
        
        const metadata = await sharp(userPhoto).metadata();

        const left = Math.round(metadata.width / 2 -100);
        const top = Math.round(metadata.height / 2 -100);

        sharp(userPhoto).
            extract({ left: left, top: top, width: 200, height: 200 }).
            toFile(croppedPhotoLink);

        const newUser = await User.create({ firstname, lastname, email, croppedPhotoLink });
        
        res.json( {
            id: newUser._id
    });
    } catch (error) {
        next(error);
    }    
};

controller.getUser = async (req, res, next) => {
    try {
        const { id } = req.query;
        const user = await User.findById(id);
        
        if(user) {
            res.render('info.pug', {
                user
            });
        } else res.end('Sorry, no users with such id');
    } catch (error) {
        next(error);
    }    
};

module.exports = controller;