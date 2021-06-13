"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const users_1 = __importDefault(require("./routes/api/users"));
const course_1 = __importDefault(require("./routes/api/course"));
const question_1 = __importDefault(require("./routes/api/question"));
const assignment_1 = __importDefault(require("./routes/api/assignment"));
const score_1 = __importDefault(require("./routes/api/score"));
const error_1 = require("./middleware/error");
const path_1 = __importDefault(require("path"));
const app = express_1.default();
// Body parser middleware
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// DB config
const keys_1 = __importDefault(require("./config/keys"));
const db = keys_1.default.mongoURI;
// Connect to MongoDB
mongoose_1.default
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));
// Passport middleware
app.use(passport_1.default.initialize());
// Passport Config
require('./config/passport')(passport_1.default);
// Use Routes
app.use('/api/users', users_1.default);
app.use('/api/course', course_1.default);
app.use('/api/question', question_1.default);
app.use('/api/assignment', assignment_1.default);
app.use('/api/score', score_1.default);
// Test Api
app.get('/test', (req, res) => {
    // fs.readFile('F:/Senior Project/test/helloworld.py', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
    //     console.log(data)
    //     const eiei = { code: data }
    //     console.log(eiei.code)
    //     res.json({ code: data })
    // })
    res.send("sdfdsf");
});
// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express_1.default.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, 'clinet', 'build', 'index.html'));
    });
}
// ErrorHandler
app.use(error_1.errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
