
const itemm = {
    contents: [
        {
            as: "h1",
            text: "Teste",        
        },
        {
            as: "p",
            text: "Teste",        
        },
        {
            as: "span",
            text: "Tag",        
        }
    ],
}

function Item({contents = [{as: null, text, link: null, onclick: null}], style = "normal"}){

    const div = document.createElement('div')
    div.classList.add('item-container')
    const section = document.createElement('div')

    
    for(const content of contents){
        const element = document.createElement(content.as)
        element.innerText = content.text
        if(content.as === "a"){
            element.setAttribute('href', content.link)
            element.classList.add('element-a')
        }
        if(content.as === "button"){
            element.classList.add('element-button')
            element.onclick = content.onclick
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

function page(){
    const items = Item(itemm)
    document.body.append(items)
}

page()
