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
const express_1 = __importDefault(require("express"));
const ormconfig_1 = require("./ormconfig");
const taskRepository_1 = require("./db_functions/taskRepository");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
ormconfig_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
    app.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tasks = yield (0, taskRepository_1.getAllTasks)();
            res.json(tasks);
        }
        catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ error: 'An error occurred while fetching tasks' });
        }
    }));
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});
