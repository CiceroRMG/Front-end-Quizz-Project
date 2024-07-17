



export function Header({title, subtitle = null, backBtn = null}){
    const div = document.createElement('div')
    div.classList.add("container")

    const head = document.createElement('div')
    head.classList.add("head")

    if(backBtn){
        const btn = document.createElement('button')
        const img = document.createElement('img')
        img.setAttribute('src', '../header/img/backBtn.svg')
        btn.classList.add('backBtn')
        btn.append(img)

        head.append(btn)
    }

    const h1 = document.createElement('h1')
    h1.innerText = title
    head.append(h1)
    div.append(head)

    if(subtitle){
        const p = document.createElement('p')
        p.classList.add('header-p')
        p.innerText = subtitle

        div.append(p)
        if(backBtn){
            p.style.paddingLeft = "2.3rem"
        }
    }


    return div
}