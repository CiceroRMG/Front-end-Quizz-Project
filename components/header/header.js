



export function Header({title, subtitle = null, backBtn = null, image = null}){
    const div = document.createElement('div')
    div.classList.add("container")

    const head = document.createElement('div')
    head.classList.add("head")

    if(backBtn){
        const btn = document.createElement('button')
        const img = document.createElement('img')
        img.setAttribute('src', "./header/img/backBtn.svg")
        btn.classList.add('backBtn')
        btn.append(img)

        div.append(btn)
    }

    if(image){
        const divImg = document.createElement('div')
        const img = document.createElement('img')
        img.setAttribute('src', image)
        divImg.classList.add('header-image')
        divImg.append(img)

        div.append(divImg)
    }

    const h1 = document.createElement('h1')
    h1.innerText = title
    head.append(h1)
    div.append(head)

    if(subtitle){
        const p = document.createElement('p')
        p.classList.add('header-p')
        p.innerText = subtitle

        head.append(p)
    }


    return div
}