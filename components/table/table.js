import { Dialog } from "../dialog/dialog.js"

function createEditBtn(anchor){
    const editBtn = document.createElement('a')
    editBtn.setAttribute('href', anchor)
    editBtn.classList.add('table-element-a')
    editBtn.classList.add('edit-a-table')
    editBtn.innerText = 'Editar'

    return editBtn
}

function createRemoveBtn(){
    const removeBtn = document.createElement('button')
    removeBtn.classList.add('table-element-button')
    removeBtn.innerText = 'Remover'
    return removeBtn
}

export function TableItem({content1, content2, action, dialogData, editAnchor, id}){

    const tr = document.createElement('tr')
    tr.classList.add('tr-body')
    if(id){
        tr.id = id
    }
    
    const td1 = document.createElement('td')
    td1.classList.add('table-td')
    td1.innerHTML = 
            `
                <p class="table-element-p">${content1}</p>
            `
    tr.append(td1)

    const td2 = document.createElement('td')
    td2.classList.add('table-td')
    td2.innerHTML = 
            `
                <p class="table-element-p">${content2}</p>
            `
    tr.append(td2)

    const td3 = document.createElement('td')
    td3.classList.add('table-td')
    if(action){            
        const element = document.createElement(action.as)
        element.innerText = action.content
        
        if(action.hoverItens){
            element.classList.add('hover')
            const ul = document.createElement('ul')
            ul.classList.add('hover-content')
            ul.classList.add('hidden')
            element.addEventListener('mouseover', () => {
                ul.classList.add('animate-in');
                action.hoverItens.forEach((li)=>{
                    const liDiv = document.createElement('li')
                    liDiv.innerHTML = `<p>${li}</p>`
                    ul.append(liDiv)
                })
                ul.classList.remove('hidden');
            });
        
            element.addEventListener('mouseout', () => {
                ul.classList.add('hidden');
                ul.innerHTML = ''
            });
            element.append(ul)
        }

        if(action.as === "button"){
            element.classList.add('table-element-button')
            element.onclick = ()=> action.onclick(action.onclick)
        }
        if(action.as === "a"){
            element.classList.add('table-element-a')
            element.setAttribute('href', action.href)
        }
        if(action.as === "h1"){
            element.classList.add('table-element-h1')
        }
        if(action.as === "p"){
            element.classList.add('table-element-p')
        }
        if(action.as === "span"){
            element.classList.add('table-element-tag')
        }

        td3.append(element)
        tr.append(td3)
    }
    
    const tdActions = document.createElement('td')
    tdActions.classList.add('table-td')
    tdActions.classList.add('actions')

    const editBtn = createEditBtn(editAnchor)
    const removeBtn = createRemoveBtn()
    
    removeBtn.addEventListener('click', ()=>{
        const deleteDialog = {
            title: dialogData.title,
            paragraph: dialogData.paragraph,
            dialogButtons: dialogData.dialogButtons
        } 
        const dialog = Dialog(deleteDialog)
        tr.append(dialog)
        dialog.showModal()
        dialog.classList.add('animate-in')
    })

    tdActions.append(editBtn)
    tdActions.append(removeBtn)

    tr.append(tdActions)

    return tr
}


export function Table({columns = [{text}], rows = []}){
    const container = document.createElement('div')
    container.classList.add('table-container')

    const table = document.createElement('table')
    table.classList.add('table')

    const thead = document.createElement('thead')
    thead.classList.add('thead')
    const headTr = document.createElement('tr')
    thead.append(headTr)

    for(const column of columns){
        const th = document.createElement('th')
        const content = document.createElement('p')
        content.innerText = column.text

        th.append(content)
        headTr.append(th)
    }

    table.append(thead)

    const tbody = document.createElement('tbody')
    tbody.classList.add('tbody')

    for(const row of rows){
        const trElement = TableItem({
            content1: row.content1,
            content2: row.content2,
            action: row.action,
            dialogData: row.dialogData,
            editAnchor: row.editAnchor,
            id: row.id
        })
        tbody.append(trElement)
    }

    table.append(tbody)

    container.append(table)

    return container
}
