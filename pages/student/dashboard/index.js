import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { Empty } from "../../../components/empty/empty.js"
import { Header } from "../../../components/header/header.js"
import { ListItens } from "../../../components/listItens/listItens.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { based_url } from "../../../scripts/config.js"
import { getOnBackDisciplinasUsersTable, getOnBackUserByToken } from "../../../scripts/fetchDbFunctions.js"
import { getTokenOnLocalStorage } from "../../../scripts/getTokenOnLocalStorage.js"
import { loader } from "../../../scripts/loader.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { NavBarStudents } from "../navBarStudents.js"

const takeUserByToken = await getOnBackUserByToken(getTokenOnLocalStorage())

const headerContent = {
    title: "Dashboard",
    subtitle: ("Bem vindo, " + takeUserByToken.usuario.nome)
}

const titles = [
    {
        as: "h1",
        text: "Suas Disciplinas"
    },
]

const itens = await createArrayObjectsOfStudentSubjects()

const contentAll = {
    elements: titles,
    itens: itens
}

export async function createArrayObjectsOfStudentSubjects(){

    const takeRelationUserSubject = await getOnBackDisciplinasUsersTable(takeUserByToken.usuario._id)
    const disciplinasDoUsuario = takeRelationUserSubject.disciplinasComAlunos

    if(!disciplinasDoUsuario){
        return console.log("não possui disciplinas")
    }


    let array = []
    for (const disciplina of disciplinasDoUsuario) {
        if(disciplina.disciplina_id){

            const object = {
                contents: [
                    {
                        as: "h1",
                        text: `${disciplina.disciplina_id.nome} | ${disciplina.disciplina_id.ano} / ${disciplina.disciplina_id.semestre} |`,
                    },
                ],
                click: true,
                onclick: ()=> window.location.href = `${based_url}/pages/student/subject/subject.html?id=${disciplina.disciplina_id._id}`
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

    const itemNav = NavBarStudents.querySelector('.nav-item')
    itemNav.classList.add('selected')
    div.append(NavBarStudents)

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