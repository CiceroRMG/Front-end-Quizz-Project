
export function buttom({text = "Button", type = "primary-md", onclick = null, img = null, btnType = null}){

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
    
    if(img){
        const image = document.createElement('img')
        image.setAttribute('src', img)
        btn.appendChild(image)
    }

    btn.appendChild(p)

    return btn
}


