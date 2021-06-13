"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const user = req.user;
        const filepath = path_1.default.join(`./uploads`, `${user._id}`, 'question');
        if (!fs_1.default.existsSync(filepath)) {
            fs_1.default.mkdirSync(filepath, { recursive: true });
        }
        console.log(file.mimetype);
        console.log(filepath);
        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/[-T:\.Z]/g, "") + '_' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/plain' || file.mimetype === 'application/octet-stream' || file.mimetype === 'text/x-python-script' || file.mimetype === 'text/x-python') {
        cb(null, true);
        console.log(`upload Ja`);
    }
    else {
        cb(null, false);
        console.log('Upload Error');
    }
};
exports.upload = multer_1.default({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
}).fields([{ name: 'sample', maxCount: 1 },
    { name: 'solution', maxCount: 1 },
    { name: 'sct', maxCount: 1 },
    { name: 'preExercise', maxCount: 1 }]);
