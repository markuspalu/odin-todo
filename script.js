const addTodoScreen = document.querySelector(".addTodoScreen");
const addTodo = document.querySelector(".addTodo");
const addTodoButton = document.querySelector(".addTodoButton");
const addTodoName = document.getElementById("addTodoName");
const addTodoPriority = document.getElementById("addTodoPriority");
const addTodoNotes = document.getElementById("addTodoNotes");
const addTodoDate = document.getElementById("addTodoDate");
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
const projectName = document.querySelector(".projectName");
const projectNotes = document.querySelector(".projectNotes");
const todoList = document.querySelector(".todoList");

projectList = [];

const Project = (name, notes) => {
    let todoList = [];

    const addNewTodo = (name, notes, priority, date) => {
        const newTodo = Todo(name, notes, priority, date);
        todoList.push(newTodo);
    }

    const printTodos = (addedTodo) => {
        const todoList = document.querySelector(".todoList");
        const newTodo = document.createElement("div");
        newTodo.className = "newTodo";
        todoList.appendChild(newTodo);

        const newTodoName = document.createElement("p");
        newTodoName.className = "newTodoName";
        newTodoName.innerHTML = addedTodo.title;
        newTodo.appendChild(newTodoName);

        clickTodo(newTodo);
    }

    const isClicked = () => {
        const projectName = document.querySelector(".projectName");
        projectName.innerHTML = name;
        const projectNotes = document.querySelector(".projectNotes");
        projectNotes.innerHTML = notes;
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

const Todo = (title, notes, priority, date) => {

    clickTodo = (newTodo) => {
        newTodo.firstChild.addEventListener("click", () => {   // Click Toggle for showing/hiding todo
            const projectName = document.querySelector(".projectName");
            const foundProject = projectList.find((project) => project.name === projectName.innerHTML); // finds project name
            const newTodoNameElement = newTodo.querySelector(".newTodoName");
            const foundTodo = foundProject.todoList.find((todo) => todo.title === newTodoNameElement.textContent); // finds right todo

            const addedProjectNotes = newTodo.querySelector(".newTodoNotes");
            const addedProjectPriority = newTodo.querySelector(".newTodoPriority");
            const addedProjectDelete = newTodo.querySelector(".newTodoDelete");
            const addedProjectDate = newTodo.querySelector(".newTodoDate");
            

            if (!addedProjectNotes && !addedProjectPriority && !addedProjectDelete && !addedProjectDate) {

                const priorityElement = document.createElement("p");
                priorityElement.className = "newTodoPriority";

                const notesElement = document.createElement("p");
                notesElement.className = "newTodoNotes";

                const dateElement = document.createElement("p");
                dateElement.className = "newTodoDate";

                const deleteElement = document.createElement("button");
                deleteElement.className = "newTodoDelete";

                newTodo.appendChild(priorityElement);
                newTodo.appendChild(notesElement);
                newTodo.appendChild(dateElement);
                newTodo.appendChild(deleteElement);

                notesElement.innerText = foundTodo.notes;
                priorityElement.innerText = foundTodo.priority;
                dateElement.innerText = foundTodo.date;

                deleteElement.innerText = "❌";

                deleteElement.addEventListener("click", () => { // Click delete Todo
                    deleteArrayItem(foundProject.todoList, foundTodo);
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
                addedProjectDate.remove();
            }
        });
    }

    return {title, notes, priority, clickTodo, deleteArrayItem, date};
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

    addProjectScreen.classList.add("zoom-in");
    setTimeout(() => {
      addProjectScreen.classList.remove("zoom-in");
    }, 1000);

    exitProjectButton.addEventListener("click", () => { // Click Exit Add Project
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

        deleteProject.addEventListener("click", () => { // Click Delete Project
            deleteArrayItem(projectList, newProject);
            addedNewProject.remove();
            if (projectList.length === 0) {
                const projectName = document.querySelector(".projectName");
                const projectNotes = document.querySelector(".projectNotes");
                addTodo.style.display = "none";
                projectName.style.display = "none";
                projectNotes.style.display = "none";
                todoList.style.display = "none";
            }
        })


        addedProjects.appendChild(addedNewProject);
        addedNewProject.appendChild(deleteProject);
        addedNewProject.appendChild(spanElement);

        spanElement.addEventListener("click", () => { // Click around Projects
            addTodo.style.display = "block";
            projectName.style.display = "block";
            projectNotes.style.display = "block";
            todoList.style.display = "flex";
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

    addTodoScreen.classList.add("zoom-in");
    setTimeout(() => {
      addTodoScreen.classList.remove("zoom-in");
    }, 1000);

    addTodoScreen.style.display = "flex";

    addTodoName.value = "";
    addTodoPriority.value = "";
    addTodoNotes.value = "";
    addTodoDate.value = "";

    exitTodoButton.addEventListener("click", () => { // Click Exit Add Todo
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
    let addedTodoDate = addTodoDate.value;

    if (addedTodoName != "" && addedTodoNotes != "" && addedTodoPriority != "" && addedTodoDate) {
        const selectedProject = projectList.find((project) => project.name === projectName.innerHTML);
        selectedProject.addNewTodo(addedTodoName, addedTodoNotes, addedTodoPriority, addedTodoDate);
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




