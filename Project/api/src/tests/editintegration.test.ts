import dotenv from "dotenv";
import {DataSource} from 'typeorm';
import * as taskRepository from '../db_functions/taskRepository';
import {Task} from '../entities/Task';
import {ObjectId} from 'mongodb';
import {AppDataSource} from '../ormconfig';


dotenv.config();

describe('MongoDB Connection Test', () => {
    // Before running the test, initialize the DataSource (connect to the database)
    beforeAll(async () => {
        await AppDataSource.initialize();
    });
    // After all tests, close the connection
    afterAll(async () => {
        await AppDataSource.destroy();
    });


    it('should connect to MongoDB successfully', async () => {
        const connection = AppDataSource.isInitialized;
        expect(connection).toBe(true); // Check if the connection is initialized
    });

    it("should fail to connect to MongoDB", async () => {

        const WrongDataSource = new DataSource({
            type: 'mongodb',
            url: 'wrong connection string',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            synchronize: true,
            logging: false,
        });

        await expect(WrongDataSource.initialize()).rejects.toThrow();
    });

    it("should fail to connect to MongoDB", async () => {

        const WrongDataSource = new DataSource({
            type: 'mongodb',
            url: 'wrong connection string',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            synchronize: true,
            logging: false,
        });

        await expect(WrongDataSource.initialize()).rejects.toThrow();
    });

});




describe("edit integration tests", () => {

    let dummyTask: Task = {
        id: new ObjectId("66dd91c906cded5f17cc8cfe"),
        text: 'Test Task',
        deadline: undefined,
        isCompleted: false,
        category: 0
    };
    beforeAll(async () => {
        await AppDataSource.initialize();
        await taskRepository.taskRepository.save(dummyTask);

    });
    // After all tests, close the connection
    afterAll(async () => {
        await taskRepository.taskRepository.clear()
        await AppDataSource.destroy();
    });

    it('should make call the database function and edit a task', async () => {

        const updatedTask = {...dummyTask, text: 'Updated Task'};
        const result = await taskRepository.editTask(dummyTask.id.toString(), updatedTask);
        expect(result).toEqual(updatedTask);
    });
});

describe("add integration tests", () => {


    beforeAll(async () => {
        await AppDataSource.initialize();
    });
    // After all tests, close the connection
    afterAll(async () => {
        await taskRepository.taskRepository.clear()
        await AppDataSource.destroy();
    });

    it('should make an api and add task', async () => {
        console.log("Test add Task");
        const task: Task = {
            id: new ObjectId("55dd91c906cded5f17cc8cfe"),
            text: 'Test add Task',
            deadline: "NOW",
            isCompleted: false,
            category: 0
        };

        const result = await taskRepository.createTask(task.text, task.deadline, task.isCompleted);

        expect(result.text).toEqual(task.text);
        expect(result.deadline).toEqual(task.deadline);
        expect(result.isCompleted).toEqual(task.isCompleted);

    });
});