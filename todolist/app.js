let taskList = {};
let taskCount = 0;

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
        alert("One or More Task Details Missing, Nothing Should Be Left Blank 🙂");
    } else {
        //OUR WAY OF PRESENTING THE TASK ON THE BROWSER USING THE DETAILS ENTERED
        newTask = taskTitle + '  |  ' + taskDetails + '  |  ' + taskDate;
        // NOW, THE BELOW FUNCTION HAS BEEN WRAPPED TOGETHER
        // BECAUSE IT'LL BE USED AGAIN BY ANOTHER BUTTON
        // IT IS CALLED TWICE:
        // WHEN A NEW TASK IS BEING ADDED
        // AND WHEN A TASK IS BEING UNMARKED AS DONE, SO IT GOES BACK AS "NEW TASK"
        function addTask(taskToAdd=newTask) {
            // OUR TASK GOES INTO A PARAGRAPH
            let taskParagraph = document.createElement("p");
            // SOME LITTLE STYLING
            taskParagraph.style.marginBottom = "0";
            taskParagraph.textContent = newTask;
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
            taskDiv.appendChild(taskParagraph);
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
            containerDiv.id = taskCount; // EACH TASK HAS A SERIAL ID
            taskCount += 1; // INCREMENT TO ENSURE ALL IDs ARE UNIQUE

            taskList[containerDiv.id] = newTask;
            console.log(taskList);
            // CLEARING INPUT BOXES TO ADD THE NEXT TASK
            // GETTING THE CURRENT INPUT FILES AGAIN
            let task = document.getElementById('title');
            let details = document.getElementById('actual');
            let date = document.getElementById('taskdate');
            task.value = "";
            details.value = "";
            date.value = "";

            alert('Task Added ✅ / Readded ⏳');

    // ----------- SECTION 2: CREATING USEFUL BUTTONS TO HELP EDIT (UPDATE), REMOVE, OR MARK A TASK AS COMPLETE ------------- 
        
    // ALL THESE FUNCTIONS ARE TIED TO THE THREE BUTTONS WE CREATED
        completeButton.addEventListener("click", () => {
            // HELPS TO MARK AN ITEM COMPLETE AND REMOVE IT FROM THE LIST
            confirmMessage = "Are You Sure You're Done? ";
            if (!window.confirm(confirmMessage)) {
                // NOTHING HAPPENS
            } else {
                parentId = completeButton.parentElement.parentElement.id;
                completedTaskText = document.getElementById(parentId); // WE GET THE TEXT OF THE COMPLETED TASK
                completeTasksArea = document.getElementById("completeTasks"); // WE WILL POST THE COMPLETED TASK HERE ONCE IT IS MARKED COMPLETE
                completeParagraph = document.createElement('p'); // WE CREATE A PARAGRAPH TO POST THE COMPLETED TASK
                completedTaskText.removeChild(completedTaskText.lastChild) // WE NEED TO REMOVE ALL BUTTONS BEFORE WE POST THE TASK
                // REMEMBER THAT THEY ARE ALL ONE UNIT
                completeParagraph.innerHTML = completedTaskText.textContent + ' ✅'; //THE COMPLETED TASK WILL BE POSTED IN
                // THE COMPLETED TASK  WITH A ✅ NEXT TO IT

                let unmarkButton = document.createElement("button");
                let completeTaskDiv = document.createElement('div'); // WE CREATE A DIV TO STORE THE TASK
                let unmarkButtonDiv = document.createElement('div'); //ANOTHER DIV FOR THE BUTTONS
                let completeContainerDiv = document.createElement('div'); //WILL CARY BOTH DIVS ABOVE
                completeContainerDiv.id = "M" + parentId;

                completeTaskDiv.appendChild(completeParagraph); // ADDING THE CLEAN COMPLETED TASK TO THE COMPLETE TASKS AREA
                unmarkButton.textContent = "⏳ Unmark as Done";
                unmarkButtonDiv.appendChild(unmarkButton); // THIS WILL HELP TO UNMARK THE TASK AS DONE
                completeContainerDiv.appendChild(completeTaskDiv);
                completeContainerDiv.appendChild(unmarkButtonDiv);
                completeTasksArea.appendChild(completeContainerDiv);
                
                // ATTEMPTING TO REMOVE COMPLETED TASK FROM OUR taskList Object
                completeContainerDiv.id  = completeContainerDiv.id.replace("M", "");
                delete taskList[completeContainerDiv.id];
                console.log(taskList);

                containerDiv.remove(); // THE CONTAINER DIV WILL BE REMOVED FROM THE TASKS-AT-HAND AREA
                alert('Task Completed ✅');

                // ONCE A TASK HAS BEEN MARKED AS COMPLETE
                // IT MOVES TO THE COMPLETE TASK AREA
                // THEN THE BELOW FUNCTION ADD A 
                unmarkButton.addEventListener('click', function handleClick() {
                    completeContainerDiv = document.getElementById(unmarkButton.parentElement.parentElement.id);
                    completeContainerDiv.removeChild(completeContainerDiv.lastChild);
                    let cleanComplete = completeContainerDiv.firstChild.firstChild.textContent;
                    cleanComplete = cleanComplete.replace(' ✅', '');
                    completeContainerDiv.firstChild.firstChild.innerHTML = cleanComplete;
                    completeContainerDiv.remove(); // REMOVES TASK FROM COMPLETE AREA
                    addTask(cleanComplete); // TRIGGERS THE FUNCTION TO ADD A NEW TASK
                    // BUT NOT A NEW ONE IN THIS CASE
                    // IN THIS CASE, IT WILL ADD THE COMPLETED ITEM BACK
                });
            }
        });

        deleteButton.addEventListener("click", () => {
            // HELPS REMOVE AN ITEM FROM THE TASKS-AT-HAND AREA
            confirmMessage = 'Are You Sure You Want to Delete The Task? 🗑️';
            if (window.confirm(confirmMessage)){
                let containsTask = deleteButton.parentElement.parentElement.id;
                delete taskList[containsTask];
                containerDiv.remove(); // THE CONTAINER DIV WILL BE REMOVED FROM THE TASKS-AT-HAND AREA
                alert('Task Removed ➖🗑️');
                console.log(taskExists);
            } else {
                // NOTHING HAPPENS
            }
        });

        editButton.addEventListener('click', function handleClick() {
            // HELPS A USER TO EDIT THE TASK USING A BROWSER PROMPT
            let containsTask = editButton.parentElement.parentElement.id;
            let savedTask = document.getElementById(containsTask);
            savedTask = savedTask.firstChild.firstChild.textContent;
            //SAVED TASK STORES THE VALUE OF THE TASK CREATED
            let taskChanges = prompt('Edit the Task Here: ', savedTask);
            if(taskChanges){
                // CHECK IF TASKS HAS REALLY CHANGED
                // ALERTS DIFFERENT MESSAGE
                if (taskChanges == savedTask){
                    alert('No Changes Effected ✍️');
                } else {
                    taskParagraph.textContent = taskChanges;
                    taskList[editButton.parentElement.parentElement.id] = taskChanges;
                    alert('Tasks Details Changed ✍️');
                    console.log(taskList);
                }
            } else{
                taskChanges = savedTask;
            }
        });
        }

        addTask(); // THIS CALL TRIGGERS THE FOLLOWING:
        // IT CREATES A ITEM TOGETHER WITH THE THREE BUTTONS
        // AND IT CREATES FUNCTIONS FOR EACH OF THISE BUTTONS
    }
}