import { NavBar } from "../../components/nav-bar/nav-bar.js"
import { based_url } from "../../scripts/config.js"
import { getOnBackDisciplinasUsersTable, getOnBackUserByToken } from "../../scripts/fetchDbFunctions.js"
import { getTokenOnLocalStorage } from "../../scripts/getTokenOnLocalStorage.js"


const arrayItensOfNav = {
    mainComponents: [
        {
            img: "/components/nav-bar/img/house.svg",
            text: "Dashboard",
            as: "a",
            link: "/pages/student/dashboard/dashboard.html",
        },
        {
            img: "/components/nav-bar/img/book.svg",
            text: "Disciplinas",
            as: "button",
            link: "#",
            type: "ul",
            listItens: {
                itens: await createArrayObjectsOfStudentSubjectsNav()
            }
        },
    ],
    footerComponents: [
        {
            img: "/components/nav-bar/img/password.svg",
            text: "Trocar a senha",
            as: "a",
            link: "#"
        }, 
        {
            img: "/components/nav-bar/img/logout.svg",
            text: "Encerrar sessão",
            as: "button",
            type: "normal",
            onclick(){
                const dialog = document.querySelector('.dialog')
                dialog.showModal()
                dialog.classList.add('animate-in')
            }
        }
    ],
}

export async function createArrayObjectsOfStudentSubjectsNav(){

    const takeUserByToken = await getOnBackUserByToken(getTokenOnLocalStorage())

    const takeRelationUserSubject = await getOnBackDisciplinasUsersTable(takeUserByToken.usuario._id)
    const disciplinasDoUsuario = takeRelationUserSubject.disciplinasComAlunos

    if(!disciplinasDoUsuario){
        return console.log("não possui disciplinas")
    }

    let array = []
    for (const disciplina of disciplinasDoUsuario) {
        const object = {
                
            text: disciplina.disciplina_id.nome,
            href: `${based_url}/pages/student/subject/subject.html?id=${disciplina.disciplina_id._id}`
                   
        }
        
        array.push(object)
    }

    return array
}


const NavBarStudents = NavBar(arrayItensOfNav)

export { NavBarStudents }