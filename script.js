const Project = (name, notes) => {
    const todos = [];

    const projectName = document.querySelector(".projectName");
    makeClickable = (project) => {
        project.addEventListener("click", () => {
            projectName.innerHTML = name;
        })
    }



    const addNewTodo = (name, notes, priority) => {
        console.log("is run");
        const newTodo = Todo(name, notes, priority);
        todos.push(newTodo);
        return newTodo;
    };

    addTodoButton.addEventListener("click", () => {
        console.log("addtodo clicked");
        let addedTodoName = addTodoName.value;
        let addedTodoPriority = addTodoPriority.value;
        let addedTodoNotes = addTodoNotes.value;

        const selectedProject = createdProjects.find((project) => project.name === projectName.innerHTML);

    
        selectedProject.addNewTodo(addedTodoName, addedTodoPriority, addedTodoNotes);
        selectedProject.printTodos(addedTodoName, addedTodoPriority, addedTodoNotes);

        maincontainer.style.filter = "none";
        addTodoScreen.style.display = "none";
    })

    const printTodos = (title, priority, notes) => {
        const todoList = document.querySelector(".todoList");
        const newTodo = document.createElement("div");
        newTodo.className = "newTodo";
        todoList.appendChild(newTodo);

        const newTodoName = document.createElement("p");
        const newTodoPriority = document.createElement("p");
        const newTodoNotes = document.createElement("p");

        newTodoName.innerHTML = title;
        newTodoPriority.innerHTML = priority;
        newTodoNotes.innerHTML = notes;

        newTodo.appendChild(newTodoName);
        newTodo.appendChild(newTodoPriority);
        newTodo.appendChild(newTodoNotes);
    }

    return {name, notes, makeClickable, addNewTodo, todos, printTodos};
}


const Todo = (title, notes, priority) => {

    return {title, notes, priority};
}

const addProject = document.querySelector(".addProject");
const maincontainer = document.querySelector(".maincontainer");
const addProjectScreen = document.querySelector(".addProjectScreen");

const addButton = document.querySelector(".addButton");
const addName = document.getElementById("addName");
const addNotes = document.getElementById("addNotes");

const addedProjects = document.querySelector(".addedProjects");


let createdProjects = [];

addProject.addEventListener("click", () => {
    maincontainer.style.filter = "blur(5px)";
    addProjectScreen.style.display = "flex";
    addName.value = "";
    addNotes.value = "";
});

addButton.addEventListener("click", () => {
    let addedName = addName.value;
    let addedNotes = addNotes.value;

    const newProject = Project(addedName, addedNotes);
    createdProjects.push(newProject);

    const addedNewProject = document.createElement("div");
    addedNewProject.className = "addedNewProject";
    addedNewProject.innerHTML = newProject.name;
    addedProjects.appendChild(addedNewProject);
    makeClickable(addedNewProject);

    maincontainer.style.filter = "none";
    addProjectScreen.style.display = "none";
});





const addTodoScreen = document.querySelector(".addTodoScreen");
const addTodo = document.querySelector(".addTodo");
const addTodoButton = document.querySelector(".addTodoButton");

const addTodoName = document.getElementById("addTodoName");
const addTodoPriority = document.getElementById("addTodoPriority");
const addTodoNotes = document.getElementById("addTodoNotes");

addTodo.addEventListener("click", () => {
    maincontainer.style.filter = "blur(5px)";
    addTodoScreen.style.display = "flex";

    addTodoName.value = "";
    addTodoPriority.value = "";
    addTodoNotes.value = "";
});





// const projectList = document.querySelectorAll(".addedNewProject");




