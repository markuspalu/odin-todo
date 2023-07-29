const addTodoScreen = document.querySelector(".addTodoScreen");
const addTodo = document.querySelector(".addTodo");
const addTodoButton = document.querySelector(".addTodoButton");

const addTodoName = document.getElementById("addTodoName");
const addTodoPriority = document.getElementById("addTodoPriority");
const addTodoNotes = document.getElementById("addTodoNotes");

const addProject = document.querySelector(".addProject");
const maincontainer = document.querySelector(".maincontainer");
const addProjectScreen = document.querySelector(".addProjectScreen");

const addButton = document.querySelector(".addButton");
const addName = document.getElementById("addName");
const addNotes = document.getElementById("addNotes");

const addedProjects = document.querySelector(".addedProjects");




const Project = (name, notes) => {
    let todoList = [];

    const addNewTodo = (name, notes, priority) => {
        const newTodo = Todo(name, notes, priority);
        todoList.push(newTodo);
    }

    const printTodos = (addedTodo) => {
        const todoList = document.querySelector(".todoList");
        const newTodo = document.createElement("div");
        newTodo.className = "newTodo";
        todoList.appendChild(newTodo);

        const newTodoName = document.createElement("p");
        const newTodoPriority = document.createElement("p");
        const newTodoNotes = document.createElement("p");

        newTodoName.innerHTML = addedTodo.title;
        newTodoPriority.innerHTML = addedTodo.priority;
        newTodoNotes.innerHTML = addedTodo.notes;

        newTodo.appendChild(newTodoName);
        newTodo.appendChild(newTodoPriority);
        newTodo.appendChild(newTodoNotes);
    }

    const isClicked = () => {
        const projectName = document.querySelector(".projectName");
        projectName.innerHTML = name;
    }

    const printAll = (project) => {
        const todoList = document.querySelector(".todoList");
        todoList.innerHTML = "";
        for (let i = 0; i < project.todoList.length; i++) {
            printTodos(project.todoList[i]);
        }
    }

    return {name, notes, isClicked, todoList, addNewTodo, printTodos, printAll}
}


const Todo = (title, notes, priority) => {

    return {title, notes, priority};
}

projectList = [];

addProject.addEventListener("click", () => { // Click Add Project
    maincontainer.style.filter = "blur(5px)";
    addProjectScreen.style.display = "flex";
    addName.value = "";
    addNotes.value = "";
});

addButton.addEventListener("click", () => { // Click Confirm Add Project
    let addedName = addName.value;
    let addedNotes = addNotes.value;

    const newProject = Project(addedName, addedNotes);
    projectList.push(newProject);

    const addedNewProject = document.createElement("div");
    addedNewProject.className = "addedNewProject";
    addedNewProject.innerHTML = newProject.name;
    addedProjects.appendChild(addedNewProject);

    addedNewProject.addEventListener("click", () => { // Click around Projects
        newProject.isClicked();
        newProject.printAll(newProject);
    });

    maincontainer.style.filter = "none";
    addProjectScreen.style.display = "none";
});

addTodo.addEventListener("click", () => { // Click Add Todo
    maincontainer.style.filter = "blur(5px)";
    addTodoScreen.style.display = "flex";

    addTodoName.value = "";
    addTodoPriority.value = "";
    addTodoNotes.value = "";


});

addTodoButton.addEventListener("click", () => { // Click Confirm Add Todo
    const projectName = document.querySelector(".projectName");

    let addedTodoName = addTodoName.value;
    let addedTodoNotes = addTodoNotes.value;
    let addedTodoPriority = addTodoPriority.value;

    const selectedProject = projectList.find((project) => project.name === projectName.innerHTML);
    selectedProject.addNewTodo(addedTodoName, addedTodoPriority, addedTodoNotes);
    selectedProject.printAll(selectedProject);    
    // for (let i = 0; i < selectedProject.todoList.length; i++) {
    //     selectedProject.printTodos(selectedProject.todoList[i]);
    // }
    maincontainer.style.filter = "none";
    addTodoScreen.style.display = "none";


})



// const projectList = document.querySelectorAll(".addedNewProject");




