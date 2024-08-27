
export function Item({contents = [{as: null, text, link: "#", onclick: null, img: null}], style = "normal", id = null, click = false, onclick}){
    
    const div = document.createElement('div')
    div.classList.add('item-container')
    
    if(id){
        div.id = id
    }

    const section = document.createElement('div')
    section.classList.add('section')

    if(click){
        div.style.cursor = "pointer"
        div.onclick = onclick
    }
    
    for(const content of contents){
        
        const element = document.createElement(content.as)
        element.innerText = content.text
        if(content.as === "a"){
            element.setAttribute('href', content.link)
            element.classList.add('element-a')
        }
        if(content.as === "button"){
            element.classList.add('element-button')
            element.type = "button"
            element.onclick = content.onclick
            if(content.img){
                element.innerHTML = ""
                element.classList.add('img')
                const image = document.createElement('img')
                image.classList.add('element-img')
                image.src = content.img
                element.append(image)
            }
        }
        if(content.as === "h1"){
            element.classList.add('element-h1')
        }
        if(content.as === "p"){
            element.classList.add('element-p')
        }
        if(content.as === "span"){
            element.classList.add('element-tag')
        }
        
        if(style === "space"){
            if(contents.indexOf(content) === 0){
                div.append(element)
            } else {
                section.append(element)
            }     
        }
        
        if(style === "normal"){
            div.append(element)
        }
    }
    
    if(style === "space"){
        div.classList.add('item-content-space')
        div.append(section)
    }
    
    if(style === "normal"){
        div.classList.add('item-content-normal')
    }
    
    return div
}


export function ListItens({elements = [{as, text}], itens = []}){
    const container = document.createElement('div')
    container.classList.add('layout-container')

    const div = document.createElement('div')
    div.classList.add('titles-container')

    for(const element of elements){
        const content = document.createElement(element.as)
        content.innerText = element.text

        div.append(content)
    }

    container.append(div)

    const list = document.createElement('ul')
    list.classList.add('ul-itens')

    for (const item of itens){
        const li = document.createElement('li')
        const itemm = Item({
            contents: item.contents,
            style: item.style,
            click: item.click,
            onclick: item.onclick,
            id: item.id
        })
        li.append(itemm)
        list.append(li)
    }

    container.append(list)

    return container
}
