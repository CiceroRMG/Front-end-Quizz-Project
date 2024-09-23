import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { Empty } from "../../../components/empty/empty.js"
import { Header } from "../../../components/header/header.js"
import { ListItens } from "../../../components/listItens/listItens.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { based_url } from "../../../scripts/config.js"
import { getOnBackDisciplinasOfProfessorById, getOnBackUserByToken } from "../../../scripts/fetchDbFunctions.js"
import { getTokenOnLocalStorage } from "../../../scripts/getTokenOnLocalStorage.js"
import { loader } from "../../../scripts/loader.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { NavBarProfessor } from "../navBarProfessor.js"


const headerContent = {
    title: "Dashboard",
    subtitle: ("Bem vindo, Prof. " + await createName())
}

const titles = [
    {
        as: "h1",
        text: "Disciplinas Ministradas"
    },
]

const itens = await createArrayObjectsOfStudentSubjects()

const contentAll = {
    elements: titles,
    itens: itens
}

async function createName(){
    const takeUserByToken = await getOnBackUserByToken(getTokenOnLocalStorage())
    return takeUserByToken.usuario.nome
}

export async function createArrayObjectsOfStudentSubjects(){

    const takeUserById = await getOnBackUserByToken(getTokenOnLocalStorage())

    const takeRelationUserSubject = await getOnBackDisciplinasOfProfessorById(takeUserById.usuario._id)
    const disciplinasDoUsuario = takeRelationUserSubject.disciplinas

    if(!disciplinasDoUsuario){
        document.body.append(Empty({title: "Não possui disciplinas"}))
        return console.log("não possui disciplinas")
    }

    let array = []
    for (const disciplina of disciplinasDoUsuario) {
        const object = {
            contents: [
                {
                    as: "h1",
                    text: `${disciplina.nome} | ${disciplina.ano} / ${disciplina.semestre} |`,
                },
            ],
            click: true,
            onclick: ()=> window.location.href = `${based_url}/pages/professor/subject/subject.html?id=${disciplina._id}`
        }
        
        array.push(object)
    }

    return array
}


await checkIfValidToken();
await checkTypeUser('professor')


function page(){
    const div = AppLayout()

    const itemNavArray = NavBarProfessor.querySelectorAll('.nav-item')
    const itemNav = itemNavArray[0]
    itemNav.classList.add('selected')
    div.append(NavBarProfessor)

    const main = MainLayout()
    div.append(main)
    main.append(Header(headerContent))
    main.append(ListItens(contentAll))

    if(itens.length < 1){
        main.append(Empty({title: "Não possui disciplinas cadastradas"}))
    }

    document.body.append(div)

    loader()
}

page()