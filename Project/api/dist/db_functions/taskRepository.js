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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.getAllTasks = getAllTasks;
const ormconfig_1 = require("../ormconfig");
const Task_1 = require("../entities/Task");
const taskRepository = ormconfig_1.AppDataSource.getMongoRepository(Task_1.Task);
function createTask(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const newTask = taskRepository.create({
            text: text,
        });
        yield taskRepository.save(newTask);
        console.log('Task has been saved:', newTask);
    });
}
function getAllTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const tasks = yield taskRepository.find();
        console.log('Found tasks:', tasks);
        return tasks;
    });
}

