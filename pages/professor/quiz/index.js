import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { buttom } from "../../../components/button/buttom.js"
import { Header } from "../../../components/header/header.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { takeIdByParams } from "../../../scripts/takeIdByParams.js"
import { ListItens } from "../../../components/listItens/listItens.js"
import { Dialog } from "../../../components/dialog/dialog.js"
import { Empty } from "../../../components/empty/empty.js"
import { NavBarProfessor } from "../navBarProfessor.js"
import { InformationsBox } from "../../../components/informations/informations.js"
import { deleteQuizzById, getAllStudentsRespondedQuiz, getOnBackQuizzesById } from "../../../scripts/fetchDbFunctions.js"


const header = await createHeaderObject()

const deleteBtn = {
    text: "Eliminar Quizz",
    type: "outline-destructive-md",
    btnType: "button",
    onclick: async()=>{await dialogDelete()}
    
}

const quizzesListItens = {
    elements: [
        {
            as: "h1",
            text: "Alunos que responderam"
        },
    ],
    itens: await createQuizzesItensAndDialog()
}

const informations = await createObjectInformations()


async function createHeaderObject(){
    const quizReq = await getOnBackQuizzesById(takeIdByParams())
    let titleContent = ""
    if(quizReq.quizz.rascunho){
        titleContent = `${quizReq.quizz.titulo} (Rascunho)`
    } else{
        titleContent = `${quizReq.quizz.titulo}`
    }

    const object = {
        title: titleContent,
        backBtn: {
            onclick:()=>{
                window.location.href = `/pages/professor/subject/subject.html?id=${quizReq.quizz.disciplina_id._id}`
            }
        },
        subtitle: quizReq.quizz.disciplina_id.nome
    }

    return object
}

async function createObjectInformations(){
    
    const quizReq = await getOnBackQuizzesById(takeIdByParams())

    let array = [
        {
            title: "Tentativas",
            content: quizReq.quizz.tentativas
        },
        {
            title: "Tempo máximo",
            content: (quizReq.quizz.tempo + " minutos"),
        },
        {
            title: "Data de entrega",
            content: formatDate(quizReq.quizz.data_fim)
        },
        {
            title: "Modalidade do Quiz",
            content: quizReq.quizz.tipo
        },
    ]

    

    const object = {
        header: {
            title: "Orientações do Professor",
            subtitle: quizReq.quizz.mensagem ? quizReq.quizz.mensagem : "Não possui orientações"
        }, 
        informations: array
    }

    return object
}

function formatDate(date){
    const [ano, mes, dia] = date.split('-');

    const dataFormatada = `${dia}/${mes}/${ano}`;

    return dataFormatada
}

function createContentLayout(){
    const form = document.createElement('div')
    form.classList.add('main-content')
    form.style.width = "100%"
    form.style.height = "100%"
    form.style.maxHeight = "100vh"
    form.style.display = "flex"
    form.style.flexDirection = "column"
    form.style.gap = "3rem"
    form.style.paddingLeft = "2.3rem"
    form.style.paddingRight = "2.3rem"
    
    return form
}

async function dialogDelete() {
    let dialogData = {}
    const quizzz = await getOnBackQuizzesById(takeIdByParams())
    dialogData = {
        title: "Tem certeza?",
        paragraph: `Tem certeza que deseja excluir "${quizzz.quizz.titulo}"? O processo não poderá ser revertido.`,
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
                    console.log(quizzz.quizz._id);
                    console.log(await deleteQuizzById(quizzz.quizz._id));
                    dialog.remove()
                    localStorage.setItem('deleteToaster', 'true')
                    window.location.href = `/pages/professor/subject/subject.html?id=${quizzz.quizz.disciplina_id._id}`
                }
            },
        ]
    }
    const main = document.querySelector('.main')
    main.append(Dialog(dialogData))
    const dialog = main.querySelector('.dialog')
    dialog.classList.add('animate-in')
    dialog.showModal()
    
}

async function createQuizzesItensAndDialog() {
    let array = []

    const studentsResponses = await getAllStudentsRespondedQuiz(takeIdByParams())
    
    if(studentsResponses.data.allStudentsResponses.length > 0){
        for(const response of studentsResponses.data.allStudentsResponses) {
            
            const object = {
                contents: [
                    {
                        as: "h1",
                        text: response.aluno_id.nome,
                    },
                    {
                        as: "a",
                        text: "Ver Respostas",
                        link: `/pages/professor/quizStudent/quizStudent.html?id=${response.quizz_id}`,
                    },
                    {
                        as: "p",
                        text: "Nota : " + response.nota + " / 10",
                    }
                ], 
                id: response.aluno_id._id,
                style: "space",
                click: false,
            }
            
            array.push(object)

        }
    }
    
    return array
}


await checkIfValidToken();
await checkTypeUser('professor')

function quizPage(){
    const div = AppLayout()

    div.append(NavBarProfessor)
    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    headDiv.append(Header(header))
    main.append(headDiv)

    const mainContent = createContentLayout()

    const infos = InformationsBox(informations)

    const submitBtnDiv = document.createElement('div')
    submitBtnDiv.classList.add("buttonsDiv")
    submitBtnDiv.append(buttom(deleteBtn))


    mainContent.append(infos)
    const studentsTable = ListItens(quizzesListItens)
    studentsTable.classList.add('studentsReponses')
    if(quizzesListItens.itens.length < 1){
        studentsTable.append(Empty({title: "Nenhum aluno respondeu o quiz"}))
    }
    mainContent.append(studentsTable)
    mainContent.append(submitBtnDiv)
    main.append(mainContent)

    document.body.append(div)
}

quizPage()
