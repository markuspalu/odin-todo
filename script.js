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
const maintasks = document.querySelector(".maintasks");
const fillTodoBlanks = document.createElement("p");
fillTodoBlanks.className = "fillTodoBlanks";
const fillProjectBlanks = document.createElement("p");
fillProjectBlanks.className = "fillProjectBlanks";
const exitTodoButton = document.querySelector(".exitTodoButton");
const exitProjectButton = document.querySelector(".exitProjectButton");

projectList = [];

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
        newTodoName.className = "newTodoName";
        // const newTodoPriority = document.createElement("p");
        // const newTodoNotes = document.createElement("p");


        newTodoName.innerHTML = addedTodo.title;
        // newTodoPriority.innerHTML = addedTodo.priority;
        // newTodoNotes.innerHTML = addedTodo.notes;

        newTodo.appendChild(newTodoName);
        // newTodo.appendChild(newTodoPriority);
        // newTodo.appendChild(newTodoNotes);
        clickTodo(newTodo);
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

    clickTodo = (newTodo) => {
        newTodo.firstChild.addEventListener("click", () => {   // Click Toggle for showing/hiding todo
            const projectName = document.querySelector(".projectName");
            const foundProject = projectList.find((project) => project.name === projectName.innerHTML); // finds project name
            const newTodoNameElement = newTodo.querySelector(".newTodoName");
            const foundTodo = foundProject.todoList.find((todo) => todo.title === newTodoNameElement.textContent); // finds right todo

            const addedProjectNotes = newTodo.querySelector(".newTodoNotes");
            const addedProjectPriority = newTodo.querySelector(".newTodoPriority");
            const addedProjectDelete = newTodo.querySelector(".newTodoDelete");
            

            if (!addedProjectNotes && !addedProjectPriority && !addedProjectDelete) {

                const priorityElement = document.createElement("p");
                priorityElement.className = "newTodoPriority";

                const notesElement = document.createElement("p");
                notesElement.className = "newTodoNotes";

                const deleteElement = document.createElement("button");
                deleteElement.className = "newTodoDelete";

                newTodo.appendChild(priorityElement);
                newTodo.appendChild(notesElement);
                newTodo.appendChild(deleteElement);

                notesElement.innerText = foundTodo.notes;
                priorityElement.innerText = foundTodo.priority;
                deleteElement.innerText = "❌";

                deleteElement.addEventListener("click", () => {
                    deleteArrayItem(foundProject.todoList, foundTodo); // find todo in project todolist and delete
                    newTodo.remove();
                });

                if (priorityElement.innerText == "Low") {
                    priorityElement.style.backgroundColor = "green";
                } else if (priorityElement.innerText == "Medium") {
                    priorityElement.style.backgroundColor = "yellow";
                } else {
                    priorityElement.style.backgroundColor = "red";
                }
            } else {
                addedProjectNotes.remove();
                addedProjectPriority.remove();
                addedProjectDelete.remove();
            }
        });
    }

    return {title, notes, priority, clickTodo, deleteArrayItem};
}

deleteArrayItem = (array, item) => {
    const index = array.indexOf(item);
    if (index !== -1) {
        array.splice(index, 1);
    }
}

// ------------- CLICK BUTTONS ---------------

addProject.addEventListener("click", () => { // Click Add Project
    maincontainer.style.filter = "blur(5px)";
    maincontainer.style.pointerEvents = "none";
    addProjectScreen.style.display = "flex";
    addName.value = "";
    addNotes.value = "";
    exitProjectButton.addEventListener("click", () => {
        maincontainer.style.filter = "none";
        maincontainer.style.pointerEvents = "auto";
        addProjectScreen.style.display = "none";
    });
});

addButton.addEventListener("click", () => { // Click Confirm Add Project
    let addedName = addName.value;
    let addedNotes = addNotes.value;
    if (addedName != "") {
        const newProject = Project(addedName, addedNotes);
        projectList.push(newProject);

        const addedNewProject = document.createElement("div");
        const deleteProject = document.createElement("button");
        const spanElement = document.createElement("span");

        addedNewProject.className = "addedNewProject";
        deleteProject.className = "deleteProject";
        
        spanElement.innerHTML = newProject.name;
        

        deleteProject.innerText = "❌";

        deleteProject.addEventListener("click", () => {
            deleteArrayItem(projectList, newProject);
            addedNewProject.remove();
        })


        addedProjects.appendChild(addedNewProject);
        addedNewProject.appendChild(deleteProject);
        addedNewProject.appendChild(spanElement);

        spanElement.addEventListener("click", () => { // Click around Projects
            console.log("clicked");
            newProject.isClicked();
            newProject.printAll(newProject);
        });

        maincontainer.style.filter = "none";
        maincontainer.style.pointerEvents = "auto";
        addProjectScreen.style.display = "none";
        fillProjectBlanks.innerHTML = "";
    } else {
        fillProjectBlanks.innerHTML = "Fill all the required blanks!";
        addProjectScreen.appendChild(fillProjectBlanks);
    }
});

addTodo.addEventListener("click", () => { // Click Add Todo
    maincontainer.style.filter = "blur(5px)";
    maincontainer.style.pointerEvents = "none";
    addTodoScreen.style.display = "flex";

    addTodoName.value = "";
    addTodoPriority.value = "";
    addTodoNotes.value = "";
    exitTodoButton.addEventListener("click", () => {
        maincontainer.style.filter = "none";
        maincontainer.style.pointerEvents = "auto";
        addTodoScreen.style.display = "none";
    });
});

addTodoButton.addEventListener("click", () => { // Click Confirm Add Todo
    const addTodoScreen = document.querySelector(".addTodoScreen");
    const projectName = document.querySelector(".projectName");
    if (projectName.innerHTML == "") {
        alert("You haven't selected a project");
        maincontainer.style.filter = "none";
        maincontainer.style.pointerEvents = "auto";
        addTodoScreen.style.display = "none";
    }

    let addedTodoName = addTodoName.value;
    let addedTodoNotes = addTodoNotes.value;
    let addedTodoPriority = addTodoPriority.value;

    if (addedTodoName != "" && addedTodoNotes != "" && addedTodoPriority != "") {
        const selectedProject = projectList.find((project) => project.name === projectName.innerHTML);
        selectedProject.addNewTodo(addedTodoName, addedTodoNotes, addedTodoPriority);
        selectedProject.printAll(selectedProject);    

        maincontainer.style.filter = "none";
        maincontainer.style.pointerEvents = "auto";
        addTodoScreen.style.display = "none";
        fillTodoBlanks.innerHTML = "";
    } else {
        fillTodoBlanks.innerHTML = "Fill all the required blanks!";
        addTodoScreen.appendChild(fillTodoBlanks);
    }
});




