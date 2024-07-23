




export function Select({label = null, info = null, id = null, placeholder = null, options = [{text, value}]}){

    const container = document.createElement('div')
    container.classList.add('selectContainer')

    if(label){
        const header = document.createElement('label')
        header.classList.add('select-label')     
        header.setAttribute('for', id)
        const h2 = document.createElement('h2')
        h2.innerText = label
        header.append(h2)

        if(info){
            const infoImg = document.createElement('img')
            infoImg.setAttribute('src', '/components/input/img/info.svg')
            infoImg.setAttribute('title', info)
            
            header.append(infoImg)
        }

        container.append(header)
    }
    
    const select = document.createElement('div')
    select.classList.add('select-btn')
    select.id = id

    const p = document.createElement('p')
    p.classList.add('p-select')
    p.innerText = placeholder
    select.append(p)

    const arrowImg = document.createElement('img')
    arrowImg.setAttribute('src', '/components/select/img/arrow.svg')
    select.append(arrowImg)

    const optionDiv = document.createElement('div')
    optionDiv.classList.add('options-container')
    optionDiv.classList.add('hidden')

    const optionsList = document.createElement('ul')
    optionsList.classList.add('options-ul')

    // aqui é a parte que o filho chora e a mãe não ve
    let selectedOptions = {
        content: [],
        values: []
    }
    if(options.length > 0){
        for(const option of options){
            const li = document.createElement('li')
            li.classList.add('option')
            li.innerText = option.text
            li.setAttribute('data-value', option.value)
            li.setAttribute('data-content', option.text)
            li.onclick = ()=>{
                li.classList.toggle('li-selected')
                const valueName = li.getAttribute('data-content')
                const value = li.getAttribute('data-value')
                if (selectedOptions.content.includes(valueName)){
                    li.classList.remove('li-selected')
                    selectedOptions.content = selectedOptions.content.filter(val => val !== valueName);
                } else {
                    selectedOptions.content.push(valueName)
                    li.classList.add('li-selected')
                }
                p.innerText = selectedOptions.content.join(', ')

                if(selectedOptions.content < 1){
                    p.innerText = placeholder
                }

                if (selectedOptions.values.includes(value)){
                    selectedOptions.values = selectedOptions.values.filter(val => val !== value);
                } else {
                    selectedOptions.values.push(value)
                }
                
                return selectedOptions.values
                
            }
            optionsList.append(li)
        }
    }

    select.onclick = ()=>{
        optionDiv.classList.toggle('animate-in')
        optionDiv.classList.toggle('hidden')
    }

    optionDiv.append(optionsList)
    select.append(optionDiv)

    container.append(select)

    return container
}