const botaoP = {
    text: 'Avançar',
    type: 'primary-sm',
    onclick(){
        console.log("oi")
    },
}

const botaoM = {
    text: 'Avançar',
    type: 'primary-md',
    onclick(){
        console.log("oi")
    },
    img: "../../imgs/createQuizz.svg",
}

const botaoL = {
    text: 'Avançar',
    type: 'primary-l',
    onclick(){
        console.log("oi")
    },
}

const botaoOutlineP = {
    text: 'Button',
    type: 'outline-sm',
    onclick(){
        console.log("tchau")
    },
}

const botaoOutlineM = {
    text: 'Button',
    type: 'outline-md',
    onclick(){
        console.log("tchau")
    },
}
const botaoOutlineG = {
    text: 'Button',
    type: 'outline-l',
    onclick(){
        console.log("tchau")
    },
}

const botaoOutlineDestructiveP = {
    text: 'Button',
    type: 'outline-destructive-sm',
    onclick(){
        console.log("tchau")
    },
}

const botaoOutlineDestructiveM = {
    text: 'Button',
    type: 'outline-destructive-md',
    onclick(){
        console.log("tchau")
    },
}

const botaoOutlineDestructiveG = {
    text: 'Button',
    type: 'outline-destructive-l',
    onclick(){
        console.log("tchau")
    },
}

const botaoDestructiveP = {
    text: 'Button',
    type: 'destructive-sm',
    onclick(){
        console.log("tchau")
    },
}

const botaoDestructiveM = {
    text: 'Button',
    type: 'destructive-md',
    onclick(){
        console.log("tchau")
    },
}

const botaoDestructiveG = {
    text: 'Button',
    type: 'destructive-l',
    onclick(){
        console.log("tchau")
    },
}


function buttom({text = "Button", type = "primary-md", onclick = null, img = null}){

    const btn = document.createElement('button')

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


function page(element){
    document.body.appendChild(element)
}

page(buttom(botaoL))
page(buttom(botaoM))
page(buttom(botaoP))
page(buttom(botaoOutlineG))
page(buttom(botaoOutlineM))
page(buttom(botaoOutlineP))
page(buttom(botaoOutlineDestructiveG))
page(buttom(botaoOutlineDestructiveM))
page(buttom(botaoOutlineDestructiveP))
page(buttom(botaoDestructiveG))
page(buttom(botaoDestructiveM))
page(buttom(botaoDestructiveP))

