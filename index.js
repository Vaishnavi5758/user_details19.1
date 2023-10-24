


//const baseURL = e71cb1bfabef45eda4aaab1457157299;
const myForm = document.querySelector('#myForm');
const amount = document.querySelector('#amount');
const description = document.querySelector('#description');
const category = document.querySelector('#category');
const usersList = document.querySelector('#data');






myForm.addEventListener("submit",onsubmit);



function onsubmit(e){

    e.preventDefault();
    var user = {
 
      amount: amount.value ,
      description: description.value,
      category:category.value
    };
     
    console.log(user);
    
      axios.post("https://crudcrud.com/api/562d9747c638493492856d9a2a89aafd/myData",user)
      .then((response)=>{
          showNewUserOnScreen(response.data);
          console.log(response)
      })
      .catch((error)=>{
          console.log(error)
      })
 
  // Clear fields
  amount.value = '';
  description.value = '';
    }

function showAllUserOnScreen(){
window.addEventListener("DOMContentLoaded",()=>{
   
    axios.get("https://crudcrud.com/api/562d9747c638493492856d9a2a89aafd/myData")
    .then((response)=>{

        for(var i=0;i<response.data.length;i++){
        showNewUserOnScreen(response.data[i]);
        }
      //  console.log(response)
    })
    .catch((error)=>{
        console.log(error)
    })
})
}

 function showNewUserOnScreen(user){
  const uniqueId=  user._id;
  console.log(uniqueId);
    const li= document.createElement('li');
    
    li.appendChild(document.createTextNode(`${user.amount} - ${user.description} - ${user.category}` ));
     //li.id= `${user.userId}`;
    
    //li.setAttribute("data-id",nextUserId);

     const deleteButton = createDeleteButton(uniqueId);
     const editButton = createEditButton(uniqueId);
      
    const span = document.createElement('span');
    span.appendChild(deleteButton);
    span.appendChild(editButton);


     li.appendChild(span);
     usersList.appendChild(li);
    // console.log(usersList);

 }

 
 showAllUserOnScreen();

function createDeleteButton(uniqueId) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.type="delete-btn";
   //The anonymous function is passed as the event listener. When the delete button is clicked
    deleteButton.addEventListener('click', () => deleteItemFromServer(uniqueId));
    //usersList.removeChild(li);

    return deleteButton;
  
}


function createEditButton(uniqueId) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
   // editButton.addEventListener('click', onEdit);
    editButton.addEventListener('click', () => onEdit(uniqueId));
    return editButton;
}



// Function to delete an item from the server
function deleteItemFromServer(userId) {
 
  if(confirm('Are you sure?')){
 axios.delete(`https://crudcrud.com/api/562d9747c638493492856d9a2a89aafd/myData/${userId}`)
.then((response)=>{
  
  removeUserFromScreen(userId);
  console.log("item deleted successfully from server");
})
.catch((err)=>{
  console.log(err)
})
}
}  



function removeUserFromScreen(userId){
  const parentNode = document.getElementById(data);
  const childNodeToBeDeleted = document.getElementById(userId);
if(childNodeToBeDeleted){
  parentNode.removeChild(childNodeToBeDeleted);
 // showAllUserOnScreen();
}
console.log("item deleted successfully from screen");
}
    
    

function onEdit(userId) {
   
axios.get(  `https://crudcrud.com/api/562d9747c638493492856d9a2a89aafd/myData/${userId}`)
.then((response)=>{

   const user =response.data;
document.getElementById("amount").value = user.amount;
document.getElementById("description").value = user.description;
document.getElementById("category").value = user.category;
    }
  //  console.log(response)
)
.catch((error)=>{
    console.log(error)
})
deleteItemFromServer(userId);

}