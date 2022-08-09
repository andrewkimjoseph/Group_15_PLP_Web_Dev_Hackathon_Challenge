function mainEvent(){
    // THIS IS THE MAIN EVENT FUNCTION
    // IT DOES THE FOLLOWING:
    // 1. IT TAKES IN THE TASK ENTERED AND ADDS IT TO THE VIEW TASK SECTION
    // 2. IT CREATES USEFUL BUTTONS TO HELP EDIT (UPDATE), REMOVE, OR MARK A TASK AS COMPLETE

    // ----------- SECTION 1: TAKING IN THE TASK ENTERED AND ADDING IT TO THE VIEW TASK SECTION ------------- 
    let taskTitle = document.getElementById('title').value;  //GETTING THE TASK TITLE
    let taskDetails = document.getElementById('actual').value; //GETTING THE ACTUAL TASK DETAILS
    let taskDate = document.getElementById('taskdate').value; //GETTING THE TASK DATE

    // CHECKING IF THE USER HAS ENTERED SOMETHING VALID, AND THAT THE INPUT FIELDS ARE NOT BLANK
    if (taskTitle === "" || taskDetails === "" || taskDate === ""){
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

        // CLEARING INPUT BOXES TO ADD THE NEXT TASK
        // GETTING THE CURRENT INPUT FILES AGAIN
        let task = document.getElementById('title');
        let details = document.getElementById('actual');
        let date = document.getElementById('taskdate');
        task.value = "";
        details.value = "";
        date.value = "";

        alert('Task Added');

    // ----------- SECTION 2: CREATING USEFUL BUTTONS TO HELP EDIT (UPDATE), REMOVE, OR MARK A TASK AS COMPLETE ------------- 
        // ALL THESE FUNCTIONS ARE TIED TO THE THREE BUTTONS WE CREATED
        completeButton.addEventListener("click", () => {
            // HELPS TO MARK AN ITEM COMPLETE AND REMOVE IT FROM THE LIST
            completedTaskText = document.getElementById("pendingTasks").firstChild; // WE GET THE TEXT OF THE COMPLETED TASK
            completeTasksArea = document.getElementById("completeTasks"); // WE WILL POST THE COMPLETED TASK HERE ONCE IT IS MARKED COMPLETE
            completeParagraph = document.createElement('p'); // WE CREATE A PARAGRAPH TO POST THE COMPLETED TASK

            completedTaskText.removeChild(completedTaskText.lastChild) // WE NEED TO REMOVE ALL BUTTONS BEFORE WE POST THE TASK
            // REMEMBER THAT THEY ARE ALL ONE UNIT
            completeParagraph.innerHTML = completedTaskText.textContent + ' ✅'; //THE COMPLETED TASK WILL BE POSTED IN
            // THE COMPLETED TASK AREA WITH A ✅ NEXT TO IT
            containerDiv.remove(); // THE CONTAINER DIV WILL BE REMOVED FROM THE TASKS-AT-HAND AREA
            completeTasksArea.appendChild(completeParagraph); // ADDING THE CLEAN COMPLETED TASK TO THE COMPLETE TASKS AREA
            alert('Task Done, Way to Go!')
        });

        deleteButton.addEventListener("click", () => {
            // HELPS REMOVE AN ITEM FROM THE TASKS-AT-HAND AREA
            confirmMessage = 'Are You Sure You Want to Delete The Task? ';
            if (window.confirm(confirmMessage)){
                containerDiv.remove(); // THE CONTAINER DIV WILL BE REMOVED FROM THE TASKS-AT-HAND AREA
            }
        });

        editButton.addEventListener('click', function handleClick() {
            // HELPS A USER TO EDIT THE TASK USING A BROWSER PROMPT
            let taskChanges = prompt('Edit the Task Here: ', newTask);
            if(taskChanges){
                taskButton.textContent = taskChanges;
            }else{
                taskChanges = newTask;
            }
        });
    }
}