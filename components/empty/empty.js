

export function Empty({title}){

    const div = document.createElement('div')
    div.classList.add('empty-div')

    const img = document.createElement('img')
    img.setAttribute('src', "/components/empty/img/no-data.svg")
    div.append(img)

    const content = document.createElement('h1')
    content.innerText = title
    div.append(content)

    return div
}