const cl = console.log;

const toDoForm = document.getElementById('toDoForm');
const toDoItem = document.getElementById('toDoItem')
const btnSubmit = document.getElementById('btnSubmit')
const btnUpdate = document.getElementById('btnUpdate')


let listArr = JSON.parse(localStorage.getItem('listArr')) || [];

// UID Function
function uuid() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

// on btnEDIT functionality
const btnEdit = (eve) => { 
    let editId = eve.getAttribute('data-id')
    localStorage.setItem('editId', editId)
    cl(editId)

   let editObj = listArr.find((list) => {
       return list.skillId ===editId
    })
    toDoItem.value = editObj.skillName 
    btnSubmit.classList.add('d-none')
    btnUpdate.classList.remove('d-none')

}
// on btnDELETE functionality
const btnDelete = (list) =>{
    let deleteId = list.getAttribute('data-id')
    cl(deleteId)
    listArr = listArr.filter(list =>{
        return list.skillId != deleteId;
    })
    localStorage.setItem('listArr',JSON.stringify(listArr))
    templating(listArr)
    toDoForm.focus()
}

// TEMPLATING functionality
const templating = (arr) => {
    let result = "";
    arr.forEach(list => {
        result +=
            `
                        <li class="list-group-item toDoList text-uppercase" >
                            <span class="toDoListItem" > 
                                <strong>
                                ${list.skillName}
                                </strong>
                            </span>
                            <span>
                                <i class="fa-solid fa-pen-to-square fa-2x editListItem" 
                                onclick = "btnEdit(this)"
                                data-id = "${list.skillId}"></i>
                                <i class="fa-solid fa-trash-can fa-2x deleteListItem" 
                                onclick = "btnDelete(this)"
                                data-id = "${list.skillId}"></i>
                            </span>
                         </li>
                 `
    })
    toDoListItem.innerHTML = result;
    // toDoItem.innerHTML = result;
}

// CALLING TEMPLATE IN GLOBAL SCOPE
templating(listArr)

// FORM SUBMIT FUNCTIONALITY
let onFormSubmit = (item) => {
    item.preventDefault()
    let listItem = toDoItem.value;
    let skillObj = {
        skillName: listItem,
        skillId: uuid(),
    }  
    listArr.push(skillObj)
    templating(listArr)
    localStorage.setItem('listArr', JSON.stringify(listArr))
    item.target.reset();
    toDoItem.focus();
}

// btnUPDATE FUNCTIONALITY

let onBtnUpdateForm = (eve)=>{
    let updatedValue = toDoItem.value;
    cl(updatedValue)
    let updateId = localStorage.getItem('editId')
    cl(updateId)
    let updateObj = listArr.forEach(list =>{
        if(list.skillId ===updateId){
            list.skillName = updatedValue;
        }
    })
    templating(listArr)
    localStorage.setItem('listArr',JSON.stringify(listArr))
    toDoForm.reset();
    toDoItem.focus();
    btnSubmit.classList.remove('d-none')
    btnUpdate.classList.add('d-none')
    
}

// EVENTS 
btnUpdate.addEventListener('click',onBtnUpdateForm)
toDoForm.addEventListener('submit', onFormSubmit)


