import { NavBar } from "../../components/nav-bar/nav-bar.js"
import { based_url } from "../../scripts/config.js"
import { getOnBackDisciplinasOfProfessorByToken } from "../../scripts/fetchDbFunctions.js"

const arrayItensOfNav = {
    mainComponents: [
        {
            img: "/components/nav-bar/img/house.svg",
            text: "Dashboard",
            as: "a",
            link: "/pages/professor/dashboard/dashboard.html",
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
        {
            img: "/components/nav-bar/img/create.svg",
            text: "Criar Quizz",
            as: "a",
            link: "/pages/professor/quizzRegister/quizzRegister.html",
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

    const takeRelationUserSubject = await getOnBackDisciplinasOfProfessorByToken()
    const disciplinasDoUsuario = takeRelationUserSubject.disciplinas

    if(!disciplinasDoUsuario){
        return console.log("não possui disciplinas")
    }

    let array = []
    for (const disciplina of disciplinasDoUsuario) {
        const object = {
                
            text: disciplina.nome,
            href: `${based_url}/pages/professor/subject/subject.html?id=${disciplina._id}`
                   
        }
        
        array.push(object)
    }

    return array
}


const NavBarProfessor = NavBar(arrayItensOfNav)

export { NavBarProfessor }