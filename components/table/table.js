
export function TableItens(item){

    const tr = document.createElement('tr')
    tr.classList.add('tr-body')

    const objectForArray = Object.values(item)

    objectForArray.forEach((value)=>{
        const td = document.createElement('td')
        td.classList.add('table-td')
        if(typeof value === 'object'){

            const element = document.createElement(value.as)
            element.innerText = value.content

            if(value.as === "button"){
                element.classList.add('table-element-button')
                element.onclick = ()=> value.onclick(item.name)
            }
            if(value.as === "a"){
                element.classList.add('table-element-a')
                element.setAttribute('href', value.href)
            }
            if(value.as === "h1"){
                element.classList.add('table-element-h1')
            }
            if(value.as === "p"){
                element.classList.add('table-element-p')
            }
            if(value.as === "span"){
                element.classList.add('table-element-tag')
            }

            td.append(element)

        } else{
            td.innerHTML = 
                `
                    <p class="table-element-p">${value}</p>
                `
        }
        tr.append(td)
    })

    const tdActions = document.createElement('td')
    tdActions.classList.add('table-td')
    tdActions.classList.add('actions')

    const editBtn = document.createElement('a')
    editBtn.classList.add('table-element-a')
    editBtn.classList.add('edit-a-table')
    editBtn.innerText = 'Editar'
    const removeBtn = document.createElement('button')
    removeBtn.classList.add('table-element-button')
    removeBtn.innerText = 'Remover'

    tdActions.append(editBtn)
    tdActions.append(removeBtn)

    tr.append(tdActions)

    return tr
}


export function Table({columns = [{as, text}], rows = []}){
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
        const trElement = TableItens(row)
        tbody.append(trElement)
    }

    table.append(tbody)

    container.append(table)

    return container
}
