export function changeTitlePage(length, nome){
    const h1 = document.querySelector('.h1-title')
    h1.innerText = nome

    const arrayLenght = length
    const p = document.querySelector('.bemvindo')
    p.innerText = `${arrayLenght} ${nome} cadastrados(as)`

}
