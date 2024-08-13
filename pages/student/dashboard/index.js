import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { Empty } from "../../../components/empty/empty.js"
import { Header } from "../../../components/header/header.js"
import { ListItens } from "../../../components/listItens/listItens.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { based_url } from "../../../scripts/config.js"
import { getOnBackDisciplinasUsersTable, getOnBackUserByToken } from "../../../scripts/fetchDbFunctions.js"
import { getTokenOnLocalStorage } from "../../../scripts/getTokenOnLocalStorage.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { NavBarStudents } from "../navBarStudents.js"


const headerContent = {
    title: "Dashboard",
    subtitle: ("Bem vindo, " + await createNameOfStudent())
}

const titles = [
    {
        as: "h1",
        text: "Disciplinas"
    },
]

const itens = await createArrayObjectsOfStudentSubjects()

const contentAll = {
    elements: titles,
    itens: itens
}

async function createNameOfStudent(){
    const takeUserByToken = await getOnBackUserByToken(getTokenOnLocalStorage())
    return takeUserByToken.usuario.nome
}

export async function createArrayObjectsOfStudentSubjects(){

    const takeUserById = await getOnBackUserByToken(getTokenOnLocalStorage())
    console.log(takeUserById)

    const takeRelationUserSubject = await getOnBackDisciplinasUsersTable(takeUserById.usuario._id)
    const disciplinasDoUsuario = takeRelationUserSubject.disciplinasComAlunos

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
                    text: `${disciplina.disciplina_id.nome} | ${disciplina.disciplina_id.ano} / ${disciplina.disciplina_id.semestre} |`,
                },
            ],
            click: true,
            onclick: ()=> window.location.href = `${based_url}/pages/student/subject/subject.html?id=${disciplina.disciplina_id._id}`
        }
        
        array.push(object)
    }

    return array
}


document.addEventListener('DOMContentLoaded', async () => {
    await checkIfValidToken();
    await checkTypeUser('aluno')
});



function page(){
    const div = AppLayout()

    div.append(NavBarStudents)

    const main = MainLayout()
    div.append(main)
    main.append(Header(headerContent))
    main.append(ListItens(contentAll))

    document.body.append(div)
}

page()