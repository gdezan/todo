"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const PORT = process.env.PORT || 8000;
const app = express_1.default();
app.use(express_1.default.json());
app.use(morgan_1.default("tiny"));
app.use(express_1.default.static("public"));
app.use(routes_1.default);
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
