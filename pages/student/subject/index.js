import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { Empty } from "../../../components/empty/empty.js"
import { Header } from "../../../components/header/header.js"
import { ListItens } from "../../../components/listItens/listItens.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { based_url } from "../../../scripts/config.js"
import { getOnBackDisciplinaById, getOnBackQuizzesById } from "../../../scripts/fetchDbFunctions.js"
import { loader } from "../../../scripts/loader.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { takeIdByParams } from "../../../scripts/takeIdByParams.js"
import { NavBarStudents } from "../navBarStudents.js"


const headerContent = await createName()

const titles = [
    {
        as: "p",
        text: "Nome"
    },
    {
        as: "p",
        text: "Data de Entrega"
    },
    {
        as: "p",
        text: "Tipo"
    },
]

const itens = await createArrayObjectsOfSubjectQuizzes()

const contentAll = {
    elements: titles,
    itens: itens
}

async function createName(){
    const takeSubject = await getOnBackDisciplinaById(takeIdByParams())
    const object = {
        title: takeSubject.disciplina.nome,
        subtitle: "Quizzes",
        backBtn: {
            onclick: ()=>{
                window.location.href = `/pages/student/dashboard/dashboard.html`
            }
        }
    }
    return object
}

function formatDate(date){
    const [ano, mes, dia] = date.split('-');

    const dataFormatada = `${dia}/${mes}/${ano}`;

    return dataFormatada
}


export async function createArrayObjectsOfSubjectQuizzes(){

    const takeSubjectQuizzesById = await getOnBackQuizzesById(takeIdByParams())

    const quizzes = takeSubjectQuizzesById.quizz

    if(!takeSubjectQuizzesById){
        return console.log("Disciplina não possui quizzes")
    }


    let array = []
    for (const quiz of quizzes) {
        if(!quiz.rascunho){
            const object = {
                contents: [
                    {
                        as: "h1",
                        text: `${quiz.titulo}`,
                    },
                    {
                        as: "p",
                        text:  formatDate(quiz.data_fim)
                    },
                    {
                        as: "span",
                        text: quiz.tipo
                    }
                ],
                click: true,
                onclick: ()=> window.location.href = `${based_url}/pages/student/quiz/quiz.html?id=${quiz._id}`
            }
            
            array.push(object)
        }
        
    }

    return array
}


await checkIfValidToken();
await checkTypeUser('aluno')


function page(){
    const div = AppLayout()

    const itemNavArray = NavBarStudents.querySelectorAll('.nav-item')
    const itemNav = itemNavArray[1]
    itemNav.classList.add('selected')
    div.append(NavBarStudents)

    const main = MainLayout()
    div.append(main)
    main.append(Header(headerContent))
    const list = ListItens(contentAll)
    main.append(list)
    if(itens.length < 1){
        list.style.display = "none"
        const empty = document.createElement('div')
        empty.classList.add('animate-in-login')
        empty.style.height = "100%"
        empty.style.display = "flex"
        empty.style.alignItems = "center"
        empty.append(Empty({title: "Não possui Quizzes cadastrados"}))
        main.append(empty)
    }

    document.body.append(div)

    loader()
}

page()