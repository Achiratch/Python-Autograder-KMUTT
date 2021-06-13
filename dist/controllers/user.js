"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersInfo = exports.EditRole = exports.Login = exports.Register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = __importDefault(require("../config/keys"));
// Load Input Validation
const register_1 = __importDefault(require("../validation/register"));
const login_1 = __importDefault(require("../validation/login"));
const is_empty_1 = __importDefault(require("../validation/is-empty"));
// Load User models
const User_1 = __importDefault(require("../models/User"));
const async_1 = __importDefault(require("../middleware/async"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const Register = (req, res) => {
    const { errors, isValid } = register_1.default(req.body);
    const email = req.body.email;
    const studentID = req.body.studentID;
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const checkEmail = () => {
        return User_1.default.findOne({ email });
    };
    const checkStudentID = () => {
        return User_1.default.findOne({ studentID });
    };
    const checkDuplicate = () => __awaiter(void 0, void 0, void 0, function* () {
        let dEmail = yield checkEmail();
        let dStudentID = yield checkStudentID();
        if (dEmail) {
            errors.email = "Email already exists";
        }
        if (dStudentID) {
            errors.studentID = "StudentID already exists";
        }
        return errors;
    });
    const createUser = () => __awaiter(void 0, void 0, void 0, function* () {
        let dbErrors = yield checkDuplicate();
        const noDuplicate = is_empty_1.default(dbErrors);
        if (!noDuplicate) {
            console.log(dbErrors);
            return res.status(400).json(dbErrors);
        }
        else {
            const newUser = new User_1.default({
                studentID: req.body.studentID,
                password: req.body.password,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role
            });
            bcryptjs_1.default.genSalt(10, (err, salt) => {
                bcryptjs_1.default.hash(newUser.password, salt, (err, hash) => {
                    if (err)
                        throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));
                });
            });
        }
    });
    createUser();
};
exports.Register = Register;
const Login = (req, res) => {
    const { errors, isValid } = login_1.default(req.body);
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const studentID = req.body.studentID;
    const password = req.body.password;
    //Find user by student id
    User_1.default.findOne({ studentID }).then((user) => {
        //check for user
        if (!user) {
            errors.studentID = "User not found";
            return res.status(404).json(errors);
        }
        //check password
        bcryptjs_1.default.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // User Matched
                const payload = { id: user.id, studentID: user.studentID, role: user.role }; // Create JWT Payload
                // Sign Token
                jsonwebtoken_1.default.sign(payload, keys_1.default.secretOrKey, { expiresIn: 9999999999999 }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });
            }
            else {
                errors.password = "Password incorrect";
                return res.status(400).json(errors);
            }
        });
    });
};
exports.Login = Login;
// @desc    Edit Role
// @route   PUT /api/users/role/edit
// @acess   Private
exports.EditRole = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, role } = req.body;
    let currentUser = yield User_1.default.findById(user);
    if (!currentUser) {
        return next(new errorResponse_1.default(`We don't have this user!`, 400));
    }
    const newUser = {
        studentID: currentUser.studentID,
        password: currentUser.password,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        role: role
    };
    const update = yield currentUser.updateOne(newUser);
    let updatedUser = yield User_1.default.findById(user).select("-password");
    res.status(201).json({
        success: true,
        detail: updatedUser
    });
}));
// @desc    Get all user info
// @route   GET /api/users/
// @acess   Private
exports.GetUsersInfo = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search;
    const page = req.query.page;
    const limit = parseInt(req.query.limit);
    const queryArray = [];
    if (!is_empty_1.default(search))
        queryArray.push({ "$or": [{ "firstName": { $regex: search, $options: 'i' } }, { "email": { $regex: search } }] });
    let users;
    if (is_empty_1.default(search)) {
        users = yield User_1.default.find().select("-password");
    }
    else {
        users = yield User_1.default.find({ $and: queryArray }).select("-password");
    }
    if (!users) {
        return next(new errorResponse_1.default(`We don't have any user!`, 404));
    }
    res.status(201).json({
        success: true,
        detail: users
    });
}));
