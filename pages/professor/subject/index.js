import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { Empty } from "../../../components/empty/empty.js"
import { Header } from "../../../components/header/header.js"
import { ListItens } from "../../../components/listItens/listItens.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { based_url } from "../../../scripts/config.js"
import { deleteQuizzById, getOnBackDisciplinaById, getOnBackQuizzesById } from "../../../scripts/fetchDbFunctions.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { NavBarProfessor } from "../navBarProfessor.js"
import { takeIdByParams } from "../../../scripts/takeIdByParams.js"
import { buttom } from "../../../components/button/buttom.js"
import { Toaster } from "../../../components/toaster/toaster.js"
import { Dialog } from "../../../components/dialog/dialog.js"
import { loader } from "../../../scripts/loader.js"


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
    onclick: ()=>{ window.location.href = `/pages/professor/quizzRegister/quizzRegister.html?id=${id}`}
}

const id = takeIdByParams()

async function createHeadObject(){
    const takeSubjectByToken = await getOnBackDisciplinaById(takeIdByParams())
    const object = {
        title: `${takeSubjectByToken.disciplina.nome} ${takeSubjectByToken.disciplina.ano} / ${takeSubjectByToken.disciplina.semestre}`,
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
    
    let arrayPosted = []
    let arrayArchived = []

    if(arrayQuizzes.length < 1){
        return {arrayArchived, arrayPosted}
    }

    
    for (const quiz of arrayQuizzes) {
        
        if(!quiz.rascunho){
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
            arrayPosted.push(object)
            
        } else{
            const object = {
                contents: [
                    {
                        as: "h1",
                        text: `${quiz.titulo}`,
                    },
                    {
                        as: "button",
                        onclick: (event)=>{
                            event.stopPropagation()
                            let dialogDataTrash = {}
                            dialogDataTrash = {
                                title: "Tem certeza?",
                                paragraph: `Tem certeza que deseja excluir o rascunho de "${quiz.titulo}"? O processo não poderá ser revertido.`,
                                dialogButtons: [
                                    {
                                        text: "Cancelar",
                                        type: "outline-sm",
                                        onclick(){
                                            const main = document.querySelector('.main')
                                            const dialog = main.querySelector('.dialog')
                                            dialog.remove()
                                            dialog.close()
                                        }
                                    },
                                    {
                                        text: "Eliminar",
                                        type: "destructive-sm",
                                        onclick: async () => {
                                            console.log(await deleteQuizzById(quiz._id));
                                            dialog.remove()
                                            document.body.append(Toaster(deleteToaster))
                                            const theQuiz = document.getElementById(`${quiz._id}`)
                                            theQuiz.classList.add('elemento-excluido')
                                            setTimeout(()=>theQuiz.remove(), 500)
                                        }
                                    },
                                ]
                            }
                            const main = document.querySelector('.main')
                            main.append(Dialog(dialogDataTrash))
                            const dialog = main.querySelector('.dialog')
                            dialog.classList.add('animate-in')
                            dialog.showModal()         
                        },
                        img: "/imgs/trash.svg",
                    }
                ],
                click: true,
                onclick: () => window.location.href = `${based_url}/pages/professor/quizEdit/quizEdit.html?id=${quiz._id}`,
                id: quiz._id
            }
            arrayArchived.push(object)
        }
        
    }
    
    return {arrayArchived, arrayPosted}
}

function createDivQuizzes(){

    const div = document.createElement('div')
    div.classList.add('quizzes-div')
    return (div)
}



await checkIfValidToken();
await checkTypeUser('professor')




function page(){
    const div = AppLayout()

    const itemNavArray = NavBarProfessor.querySelectorAll('.nav-item')
    const itemNav = itemNavArray[1]
    itemNav.classList.add('selected')
    div.append(NavBarProfessor)

    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    headDiv.classList.add('headDiv')
    headDiv.append(Header(headerContent))
    headDiv.append(buttom(quizRegisterBtn))
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

    loader()
}

page()