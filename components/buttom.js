
const botao = {
    text: 'Avançar',
    type: 'normal-medium',
    onclick(){
        console.log("oi")
    },
}

const botaoL = {
    text: 'Avançar',
    type: 'normal-large',
    onclick(){
        console.log("oi")
    },
}

const botaoDestructiveM = {
    text: 'Deletar',
    type: 'destructive-medium',
    onclick(){
        console.log("tchau")
    },
}


function buttom({text, type, onclick = null, img = null}){

    const btn = document.createElement('button')
    btn.innerText = text

    btn.classList.add(`${type}`)
    if(onclick){
        btn.onclick = onclick
    }

    if(img){
        btn.appendChild(img)
    }

    return btn
}


function page(element){
    document.body.appendChild(element)
}

page(buttom(botao))
page(buttom(botaoL))
page(buttom(botaoDestructiveM))