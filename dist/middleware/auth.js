"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const passport_1 = __importDefault(require("passport"));
// export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
//     passport.authenticate("jwt", { session: false })(req, res, next);
// }
exports.protect = passport_1.default.authenticate("jwt", { session: false });
