// recebe o objeto dos quizzes e criar as li de cada quizz com o link passando o ID
export function createQuizzesOnPage(Quizz){
    const ul = document.querySelector(".main-list")

    const li = document.createElement('li')
    li.classList.add("main-list-content")
    li.innerHTML = 
        `
        <button class="main-list-btn">
            <div class="quizz-name-content">
                <p>${Quizz.nome}</p>
                <span class="tag-quizz"><p>${Quizz.tipo}</p></span>
            </div>
            <p class="date">${Quizz.date}</p>
        </button>
        `
    
    const btn = document.querySelector(".main-list-btn")
    btn.addEventListener('click', ()=>{
        window.location.href = `http://127.0.0.1:5500/quizz.html?id=${Quizz._id}`
    })

    ul.append(li)
}





