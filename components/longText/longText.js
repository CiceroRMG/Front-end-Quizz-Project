

export function LongText({title = null, placeholder}){

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
    textArea.setAttribute('placeholder', placeholder)
    longTextContainer.append(textArea)


    return longTextContainer
}