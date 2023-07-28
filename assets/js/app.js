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
//    let deletIcon = eve.getElementById('deleteListItem')
    
    let editId = eve.getAttribute('data-id')
    let editValue = document.getElementById(editId).firstElementChild.innerHTML;
    let confirmEdit = confirm(`Do you really want to edit list : ${editValue}`)
    if (confirmEdit) {

        let editObj = listArr.find((list) => {
            return list.skillId === editId
        })
        localStorage.setItem('editObj', JSON.stringify(editObj))
        toDoItem.value = editObj.skillName
        btnSubmit.classList.add('d-none')
        btnUpdate.classList.remove('d-none')
        // Swal.fire({
        //     icon: 'success',
        //     text: `${deletedValue.toUpperCase()} is deleted successfully!!`,
        //     timer: 3000
        // })
    } else {
        return false;
    }

}
// on btnDELETE functionality
const btnDelete = (list) => {
    toDoForm.reset();
    let deleteId = list.getAttribute('data-id')
    let deletedValue = document.getElementById(deleteId).firstElementChild.innerHTML;
    cl(deletedValue)
    let confirmDelete = confirm(`Do you really want to delete list : ${deletedValue}`)
    if (confirmDelete) {
        listArr = listArr.filter(list => {
            return list.skillId != deleteId;
        })
        localStorage.setItem('listArr', JSON.stringify(listArr))
        document.getElementById(deleteId).remove()
        Swal.fire({
            icon: 'success',
            text: `${deletedValue.toUpperCase()} is deleted successfully!!`,
            timer: 3000
        })
    } else {
        return false;
    }



    toDoForm.focus()
    toDoForm.reset()
}

// TEMPLATING functionality
const templating = (arr) => {
    let result = "";
    arr.forEach(list => {
        result +=
            `
                        <li class="list-group-item toDoList text-uppercase " id = "${list.skillId}" >
                            <span class="toDoListItem" >${list.skillName}</span>
                            <span>
                                <i class="fa-solid fa-pen-to-square fa-2x editListItem" id="btnEdit"
                                onclick = "btnEdit(this)"
                                data-id = "${list.skillId}"></i>
                                <i class="fa-solid fa-trash-can fa-2x deleteListItem" 
                                onclick = "btnDelete(this)" id="deleteListItem"
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
    // listArr.push(skillObj)
    listArr.unshift(skillObj)
    // templating(listArr)
    let newLi = document.createElement('li')
    newLi.id = skillObj.skillId
    newLi.className = 'list-group-item toDoList text-uppercase " id = "${list.skillId}'
    newLi.innerHTML = `
                        <span class="toDoListItem" >${skillObj.skillName}</span>
                         <span>
                                <i class="fa-solid fa-pen-to-square fa-2x editListItem" 
                                onclick = "btnEdit(this)"
                                data-id = "${skillObj.skillId}"></i>
                                <i class="fa-solid fa-trash-can fa-2x deleteListItem" 
                                onclick = "btnDelete(this)"
                                data-id = "${skillObj.skillId}"></i>
                            </span>
    
    
                    `
    toDoListItem.prepend(newLi)
    Swal.fire({
        icon: 'success',
        text: `${skillObj.skillName.toUpperCase()} is added successfully!!`,
        timer: 3000
    })
    localStorage.setItem('listArr', JSON.stringify(listArr))
    item.target.reset();
    toDoListItem.focus();
}

// btnUPDATE FUNCTIONALITY

let onBtnUpdateForm = (eve) => {
    let updatedValue = toDoItem.value;
    let editObj = JSON.parse(localStorage.getItem('editObj'))

    for (let i = 0; i < listArr.length; i++) {
        if (listArr[i].skillId === editObj.skillId) {
            listArr[i].skillName = updatedValue
            break;
        }
    }

    localStorage.setItem('listArr', JSON.stringify(listArr));

    let targetLi = document.getElementById(editObj.skillId)
    targetLi.firstElementChild.innerHTML = updatedValue;
    Swal.fire({
        icon: 'success',
        title: `${updatedValue.toUpperCase()} is updated in place of ${editObj.skillName}successfully!!`,
        timer: 3000
    })
    // templating(listArr)
    toDoForm.reset();
    toDoForm.focus();
    btnSubmit.classList.remove('d-none');
    btnUpdate.classList.add('d-none');

}

// EVENTS 
btnUpdate.addEventListener('click', onBtnUpdateForm)
toDoForm.addEventListener('submit', onFormSubmit)


