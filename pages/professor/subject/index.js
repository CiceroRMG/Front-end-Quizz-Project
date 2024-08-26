import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { Empty } from "../../../components/empty/empty.js"
import { Header } from "../../../components/header/header.js"
import { ListItens } from "../../../components/listItens/listItens.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { based_url } from "../../../scripts/config.js"
import { getOnBackDisciplinaById, getOnBackQuizzesById } from "../../../scripts/fetchDbFunctions.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { NavBarProfessor } from "../navBarProfessor.js"
import { takeIdByParams } from "../../../scripts/takeIdByParams.js"
import { buttom } from "../../../components/button/buttom.js"
import { Toaster } from "../../../components/toaster/toaster.js"


const headerContent =  await createHeadObject()

const arrays = await createArrayOfPostedQuizzes()

const titlesPosted = [
    {
        as: "h1",
        text: "Postados"
    },
]

const itensPosted = arrays.arrayPosted

const contentAllPosted = {
    elements: titlesPosted,
    itens: itensPosted
}

const titlesArchived = [
    {
        as: "h1",
        text: "Arquivados"
    },
]

const itensArchived = arrays.arrayArchived

const contentAllArchived = {
    elements: titlesArchived,
    itens: itensArchived
}

const successToaster = {
    title: "Sucesso!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "Sucesso no cadastro do quiz.",
    timeout: 6000,
}

const rascunhoToaster = {
    title: "Sucesso!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "Seu quiz foi guardado no rascunho",
    timeout: 6000,
}

const deleteToaster = {
    title: "Sucesso ao deletar!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "O quizz foi deletado com sucesso",
    timeout: 6000,
}

const quizRegisterBtn = {
    type: "primary-md",
    img: "/imgs/createQuizz.svg",
    text: "Criar Quiz",
    onclick: ()=>{window.location.href = "/pages/professor/quizzRegister/quizzRegister.html"}
}

async function createHeadObject(){
    const takeSubjectByToken = await getOnBackDisciplinaById(takeIdByParams())
    const object = {
        title: takeSubjectByToken.disciplina.nome,
        subtitle: "Quizzes",
        backBtn: {
            onclick: ()=>{
                window.location.href = `/pages/professor/dashboard/dashboard.html`
            }
        }
    }
    return object
}

export async function createArrayOfPostedQuizzes(){

    const quizzesOfSubject = await getOnBackQuizzesById(takeIdByParams())

    const arrayQuizzes = quizzesOfSubject.quizz    

    if(arrayQuizzes.length < 1){
        document.body.append(Empty({title: "Não possui quizzes"}))
        return console.log("não possui quizzes")
    }

    let arrayPosted = []
    let arrayArchived = []
    
    for (const quiz of arrayQuizzes) {
        const object = {
            contents: [
                {
                    as: "h1",
                    text: `${quiz.titulo}`,
                },
            ],
            click: true,
            onclick: ()=> window.location.href = `${based_url}/pages/professor/quiz/quiz.html?id=${quiz._id}`
        }

        if(quiz.rascunho){
            arrayArchived.push(object)

        } else{
            arrayPosted.push(object)
        }
        
    }
    
    return {arrayArchived, arrayPosted}
}

function createDivQuizzes(){

    const div = document.createElement('div')
    div.classList.add('quizzes-div')
    return (div)
}


document.addEventListener('DOMContentLoaded', async () => {
    await checkIfValidToken();
    await checkTypeUser('professor')
});



function page(){
    const div = AppLayout()

    div.append(NavBarProfessor)

    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    headDiv.append(Header(headerContent))
    headDiv.append(buttom(quizRegisterBtn))
    headDiv.style.display = "flex"
    headDiv.style.justifyContent = "space-between"
    headDiv.style.alignItems = "center"
    headDiv.style.gap = "2rem"
    main.append(headDiv)

    const divQuizzes = createDivQuizzes()

    if(localStorage.getItem('saveToaster')){
        document.body.append(Toaster(rascunhoToaster))
        localStorage.removeItem('saveToaster')
    }
    if(localStorage.getItem('registerToaster')){
        document.body.append(Toaster(successToaster))
        localStorage.removeItem('registerToaster')
    }
    if(localStorage.getItem('deleteToaster')){
        document.body.append(Toaster(deleteToaster))
        localStorage.removeItem('deleteToaster')
    }
    const posteds = ListItens(contentAllPosted)
    if(arrays.arrayPosted.length < 1){
        posteds.append(Empty({title: "Não possui quizzes Postados"}))
    } 
    const archiveds = ListItens(contentAllArchived)
    if(arrays.arrayArchived.length < 1){
        archiveds.append(Empty({title: "Não possui quizzes Arquivados"}))
    } 
    divQuizzes.append(posteds)
    divQuizzes.append(archiveds)

    main.append(divQuizzes)

    document.body.append(div)
}

page()