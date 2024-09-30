
export function buttom({text = "Button", type = "primary-md", onclick = null, img = null, btnType = null, disabled = null}){

    const btn = document.createElement('button')
    btn.classList.add('button')

    if(btnType){
        btn.type = btnType
    }

    const p = document.createElement('p')
    p.innerText = text

    btn.classList.add(`${type}`)

    if(onclick){
        btn.onclick = onclick
    } 
    if(disabled){
        btn.style.opacity = '0.5'
        btn.style.cursor = "default"
    }
    
    if(img){
        const image = document.createElement('img')
        image.setAttribute('src', img)
        btn.appendChild(image)
    }

    btn.appendChild(p)

    return btn
}


