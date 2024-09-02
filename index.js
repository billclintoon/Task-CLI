const fs = require('fs');
const path = require('path');

// Define the path to the tasks file
const tasksFile = path.join(__dirname, 'tasks.json');

// Load tasks from the JSON file
function loadTasks() {
    if (!fs.existsSync(tasksFile)) {
        return [];
    }
    const data = fs.readFileSync(tasksFile, 'utf-8');
    return JSON.parse(data);
}

// Save tasks to the JSON file
function saveTasks(tasks) {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 4));
}

// Generate a new unique ID
function generateId(tasks) {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
}

// Add a new task
function addTask(description) {
    const tasks = loadTasks();
    const newTask = {
        id: generateId(tasks),
        description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log('Task added:', newTask);
}

// Update an existing task
function updateTask(taskId, description = null, status = null) {
    const tasks = loadTasks();
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        console.log(`Task with id ${taskId} not found.`);
        return;
    }
    if (description) {
        task.description = description;
    }
    if (status) {
        task.status = status;
    }
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log('Task updated:', task);
}

// Delete a task
function deleteTask(taskId) {
    let tasks = loadTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(tasks);
    console.log(`Task with id ${taskId} deleted.`);
}

// List tasks with optional status filtering
function listTasks(status = null) {
    const tasks = loadTasks();
    tasks.filter(task => !status || task.status === status).forEach(task => {
        console.log(task);
    });
}

// CLI handling
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
    case 'add':
        if (args.length < 1) {
            console.log('Usage: node taskTracker.js add [description]');
        } else {
            addTask(args.join(' '));
        }
        break;

    case 'update':
        if (args.length < 2) {
            console.log('Usage: node taskTracker.js update [id] [description|status]');
        } else {
            const taskId = parseInt(args[0], 10);
            const updateValue = args[1];
            if (['todo', 'in-progress', 'done'].includes(updateValue)) {
                updateTask(taskId, null, updateValue);
            } else {
                updateTask(taskId, updateValue);
            }
        }
        break;

    case 'delete':
        if (args.length < 1) {
            console.log('Usage: node taskTracker.js delete [id]');
        } else {
            const taskId = parseInt(args[0], 10);
            deleteTask(taskId);
        }
        break;

    case 'list': {

        const status = args[0] || null;
        listTasks(status);
        break;
    }

    default:
        console.log('Unknown command. Use add, update, delete, or list.');
        break;
}
