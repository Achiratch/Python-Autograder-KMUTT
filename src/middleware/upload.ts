import e from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import ErrorResponse from '../utils/errorResponse'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const user: any = req.user
        const filepath: string = path.join(`./uploads`, `${user._id}`, 'question');
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }
        console.log(file.mimetype)
        console.log(filepath)
        cb(null, filepath)
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/[-T:\.Z]/g, "") + '_' + file.originalname)
    }
})

const fileFilter = (req: e.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'text/plain' || file.mimetype === 'application/octet-stream' || file.mimetype === 'text/x-python-script' || file.mimetype === 'text/x-python') {
        cb(null, true)
        console.log(`upload Ja`)
    } else {
        cb(null, false)
        console.log('Upload Error')
    }
}
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
}).fields([{ name: 'sample', maxCount: 1 },
{ name: 'solution', maxCount: 1 },
{ name: 'sct', maxCount: 1 },
{ name: 'preExercise', maxCount: 1 }])

