let allTasks = [];

tasksAdded = 0;

function taskClicked(){
    alert('Task Clicked!')
}

function mainEvent(){
    let taskTitle = document.getElementById('title').value;  //GETTING THE TASK TITLE
    let taskDetails = document.getElementById('actual').value; //GETTING THE ACTUAL TASK DETAILS
    let taskDate = document.getElementById('taskdate').value; //GETTING THE TASK DATE

    // CHECKING IF THE USER HAS ENTERED SOMETHING VALID, AND THAT THE INPUT FIELDS ARE NOT BLANK
    if (taskDate === "" || taskTitle === "" || taskDate === ""){
        alert("One or Task Details Missing, Cannot Be Left Blank");
    } else {
        //OUR WAY OF PRESENTING THE TASK ON THE BROWSER USING THE DETAILS ENTERED
        newTask = taskTitle + '  |  ' + taskDetails + '  |  ' + taskDate;
        
        // OUR TASK GOES INTO A BUTTON
        let taskButton = document.createElement("p");
        // SOME LITTLE STYLING
        taskButton.style.marginBottom = "0";

        taskButton.textContent = newTask;
        // EACH TIME A TASK IS CREATED, THREE BUTTONS ARE CREATED ALONG WITH IT
        // 1. THE MARK COMPLETED TASK BUTTON ✅
        let completeButton = document.createElement("button");
        completeButton.textContent = "✅ Done";
        
        // 2. THE EDIT TASK BUTTON ✍️
        let editButton = document.createElement("button");
        editButton.textContent = "✍️ Edit";
        
        // 3. THE DELETE TASK BUTTON 🗑️ 
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️ Delete";

        //WE NEED A BREAKLINE TO SEPARATE THE TASK AND THE BUTTONS
        let breakLine = document.createElement('br');
        // WE NEED A DIV TO STORE THE TASK AND THE BUTTONS
        // THEN WE'LL REFERENCE IT WHEN TRYING TO DELETE THE TASK
        let taskDiv = document.createElement('div'); // WE CREATE A DIV TO STORE THE TASK
  
        let buttonsDiv = document.createElement('div'); //ANOTHER DIV FOR THE BUTTONS

        let containerDiv = document.createElement('div'); //WILL CARY BOTH DIVS ABOVE

        //THROWING THE TASK INTO THE TASK DIV
        taskDiv.appendChild(taskButton);
        // THROWING THE BUTTONS INTO THE BUTTONS DIV
        buttonsDiv.appendChild(completeButton)
        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);

        // PUTTING BOTH DIVS THAT CONTAIN TASK AND BUTTON
        containerDiv.appendChild(taskDiv);
        containerDiv.appendChild(buttonsDiv);

        // GETTING THE VIEW TASK AREA 
        newTaskArea = document.getElementById('pendingTasks');
        // THROWING THE CONTAINER DIV THERE
        newTaskArea.appendChild(containerDiv);
        // ADDING FUNCTIONALITY TO EACH BUTTON GIVEN FOR THE TASK
        //1. THE COMPLETE BUTTON

        alert('Task Added');
        completeButton.addEventListener("click", () => {
            completedTaskText = document.getElementById("pendingTasks").firstChild; // WE GET THE TEXT OF THE COMPLETED TASK
            completeTasksArea = document.getElementById("completeTasks"); // WE WILL POST THE COMPLETED TASK HERE ONCE IT IS MARKED COMPLETE
            completeParagraph = document.createElement('p');

            completedTaskText.removeChild(completedTaskText.lastChild)
            console.log(completedTaskText.textContent);
            completeParagraph.innerHTML = completedTaskText.textContent + ' ✅';
            
            completeTasksArea.appendChild(completeParagraph);
            containerDiv.remove();
            alert('Task Done, Way to Go!')
        });

        deleteButton.addEventListener("click", () => {
            confirmMessage = 'Are You Sure You Want to Delete The Task? ';
            if (window.confirm(confirmMessage)){
                containerDiv.remove();
            }
            
        });

        editButton.addEventListener('click', function handleClick() {
            let taskChanges = prompt('Edit the Task Here: ', newTask);

            taskButton.textContent = taskChanges;
        });

        
    }
}