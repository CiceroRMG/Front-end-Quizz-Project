


export function Input({label = null, img = null, placeholder = null, style = "default", info = null, id = null, error = null, type = "text"}){

    const container = document.createElement('div')
    container.classList.add('inputContainer')

    if(label){
        const header = document.createElement('label')
        header.classList.add('input-label')     
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
    
    const input = document.createElement('input')
    input.classList.add('input')
    input.setAttribute('type', type)
    if(placeholder){
        input.setAttribute('placeholder', placeholder)
    }
    input.id = id
    
    if(style === "default" || style === "outline"){
        input.classList.add(style)
    }
    
    container.append(input)
    
    if(type === "password"){
        input.setAttribute('placeholder', '••••••••••••')
        const spanDiv = document.createElement('div')
        spanDiv.classList.add('image-container')
        spanDiv.innerHTML = 
            `
                <span class="eyes"><img src="/components/input/img/eyes-see.svg"></span>
                <span class="eyes-see hidden"><img src="/components/input/img/eyes-not-see.svg"></span>
            `
        const eyesOpen = spanDiv.querySelector('.eyes')
        const eyesClosed = spanDiv.querySelector('.eyes-see')
        eyesOpen.onclick = ()=>{
            input.type = "text"
            eyesClosed.classList.remove('hidden')
            eyesOpen.classList.add('hidden')
        }
        eyesClosed.onclick = ()=>{
            input.type = "password"
            eyesClosed.classList.add('hidden')
            eyesOpen.classList.remove('hidden')
        }

        container.append(spanDiv)
    }
    
    if(img){
        const spanDiv = document.createElement('div')
        spanDiv.classList.add('image-container')
        spanDiv.innerHTML = 
            `
                <span class="input-img"><img src=${img}></span>
            `
        container.append(spanDiv)
    }

    if(error){
        const spanError = document.createElement('span')
        spanError.classList.add('input-error')
        spanError.classList.add('hidden')
        spanError.id = `${id}Error`
        spanError.innerText = error
        container.append(spanError)
    }
    

    return container
}