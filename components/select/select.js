




export function Select({label = null, info = null, id = null, placeholder = null, options = [{text: null, value: null}], type = "default", preSelectedOptions = {content: [], values: []}}){

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

    if(!label){
        optionDiv.classList.add('notLabel')
    }

    const optionsList = document.createElement('ul')
    optionsList.classList.add('options-ul')


    // aqui é a parte que o filho chora e a mãe não ve
    if(type === "default"){
        
        let selectedOptions = {
            content: preSelectedOptions.content || [],
            values: preSelectedOptions.values || []
        }
        p.innerText = selectedOptions.content.join(', ') || placeholder
        let event = ""
        if(preSelectedOptions.content && preSelectedOptions.values){
            event = new CustomEvent(id, { detail: selectedOptions });
            document.dispatchEvent(event);
        }
        if(options.length > 0){
            for(const option of options){
                const li = document.createElement('li')
                li.classList.add('option')
                li.innerText = option.text
                li.setAttribute('data-value', option.value)
                li.setAttribute('data-content', option.text)
                if (selectedOptions.values.includes(option.value)) {
                    li.classList.add('li-selected')
                }
                li.onclick = () => {

                    // Remover 'li-selected' de todos os outros itens
                    optionsList.querySelectorAll('.li-selected').forEach(selectedLi => {
                        if (selectedLi !== li) {
                            selectedLi.classList.remove('li-selected');
                        }
                    });
            
                    li.classList.toggle('li-selected');
                
                    const valueName = li.getAttribute('data-content');
                    const value = li.getAttribute('data-value');
                
                    if (li.classList.contains('li-selected')) {
                        selectedOptions.content = [valueName]; 
                        selectedOptions.values = [value];
                        p.innerText = valueName;
                    } else {
                        selectedOptions.content = [];
                        selectedOptions.values = [];
                        p.innerText = placeholder;
                    }

                    event = new CustomEvent(id, { detail: selectedOptions });
                    document.dispatchEvent(event);
                };
                    
                optionsList.append(li)
            }
        } else{
            optionDiv.style.display = "none"
            p.style.color = "#88807B"
            select.style.cursor = "default"
            arrowImg.style.display = "none"
        }

    }

    if(type === "multiselect"){
        let selectedOptions = {
            content: preSelectedOptions.content || [],
            values: preSelectedOptions.values || []
        }
        p.innerText = selectedOptions.content.join(', ') || placeholder
        let event = ""
        if(preSelectedOptions.content && preSelectedOptions.values){
            event = new CustomEvent(id, { detail: selectedOptions });
            document.dispatchEvent(event);
        }

        if(options.length > 0){
            for(const option of options){
                const li = document.createElement('li')
                li.classList.add('option')
                li.innerText = option.text
                li.setAttribute('data-value', option.value)
                li.setAttribute('data-content', option.text)

                if (selectedOptions.values.includes(option.value)) {
                    li.classList.add('li-selected')
                }

                li.onclick = async (event)=>{
                    event.stopPropagation();
                    li.classList.toggle('li-selected')
                    const valueName = li.getAttribute('data-content')
                    const value = li.getAttribute('data-value')
                    if (selectedOptions.content.includes(valueName)){
                        li.classList.remove('li-selected')
                        selectedOptions.content = selectedOptions.content.filter(val => val !== valueName);
                        selectedOptions.values = selectedOptions.values.filter(val => val !== value);
                    } else {
                        selectedOptions.content.push(valueName)
                        selectedOptions.values.push(value);
                        li.classList.add('li-selected')
                    }
                    p.innerText = selectedOptions.content.join(', ')

                    if(selectedOptions.content.length < 1){
                        selectedOptions.values = []
                        p.innerText = placeholder
                    }
    
                    event = new CustomEvent(id, { detail: selectedOptions });
                    document.dispatchEvent(event);
                    
                }
                optionsList.append(li)
            }
        }

    }

    select.onclick = ()=>{
        optionDiv.classList.toggle('animate-in')
        optionDiv.classList.toggle('hidden')
    }

    optionDiv.append(optionsList)
    select.append(optionDiv)

    container.append(select)

    document.addEventListener('click', (event) => {
        const selectContainer = document.querySelectorAll('.selectContainer');
        selectContainer.forEach((select) =>{
            if (!select.contains(event.target)) {
                const optionDiv = select.querySelector('.options-container');
                optionDiv.classList.add('hidden');
                optionDiv.classList.remove('animate-in')
            }
        })
    });

    return container
}