

export function LongText({title = null, placeholder, id = null, style = "default"}){

    const longTextContainer = document.createElement('div')
    longTextContainer.classList.add('longText-container')

    if(title){
        const header = document.createElement('h1')
        header.classList.add('longText-h1')
        header.innerText = title
    
        longTextContainer.append(header)
    }

    const textArea = document.createElement('textarea')
    textArea.classList.add('longText-area')
    if(style === "small"){
        textArea.classList.add('sm')
    }
    textArea.setAttribute('placeholder', placeholder)
    longTextContainer.append(textArea)

    if(id){
        textArea.id = id
    }


    return longTextContainer
}