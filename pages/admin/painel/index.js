import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { buttom } from "../../../components/button/buttom.js"
import { Header } from "../../../components/header/header.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { Table } from "../../../components/table/table.js"
import { deleteDisciplinaById, getAllDisciplinasIfProfessorName } from "../../../scripts/fetchDbFunctions.js"
import { NavBarAdmin } from "../navBarAdm.js"


const subjectsHeader = {
    title: "Disciplinas",
    subtitle: `${await counterNumberOfSubjectRegisters()} Disciplinas Cadastradas`
}

const tableDataSubjects = {
    columns: [
        {
            text: "Nome",
        },
        {
            text: "Professor",
        },
        {
            text: "Quiz",
        },
        {
            text: "Ações",
        }
    ],
    rows: await makeArrayRowsWithSubjectsData()
}

const subjectRegisterBtn = {
    type: "primary-md",
    img: "/imgs/createQuizz.svg",
    text: "Cadastrar",
    onclick: ()=>{window.location.href = "/pages/admin/register/subjectRegister.html"}
}

async function makeArrayRowsWithSubjectsData(){
        
    const allSubjects = await getAllDisciplinasIfProfessorName()

    if(!allSubjects.disciplinas){
        return console.log('Lista vazia')
    }

    let rows = []
    allSubjects.disciplinas.forEach(disciplina => {
        let quizesName = []
        disciplina.quizes.forEach(quiz => {
            quizesName.push(quiz.nome)
        })
        const row = {
            content1: disciplina.nome,
            content2: disciplina.prof_id ? disciplina.prof_id.nome : "Não possui professor",
            action: {
                content: disciplina.quizes.length,
                as: "p",
                hoverItens: quizesName.length > 0 ? quizesName : null,
            },
            dialogData: {
                title: "Tem certeza?",
                paragraph: `Tem certeza que deseja excluir "${disciplina.nome}"? O processo não poderá ser revertido.`,
                dialogButtons: [
                    {
                        text: "Cancelar",
                        type: "outline-sm",
                        onclick(){
                            const tbody = document.querySelector('.tbody')
                            const dialog = tbody.querySelector('.dialog')
                            dialog.remove()
                            dialog.close()
                        }
                    },
                    {
                        text: "Eliminar",
                        type: "destructive-sm",
                        onclick: async () => {
                                await deleteDisciplinaById(disciplina._id)
                                const element = document.getElementById(`${disciplina._id}`) 
                                element.classList.add('elemento-excluido')
                                setTimeout(()=>element.remove(), 500)

                        }
                    },
                ]
            },
            editAnchor: "/pages/admin/dashboard/edit",
            id: disciplina._id
        }
        rows.push(row)
        
    });

    return rows

}

async function counterNumberOfSubjectRegisters(){
    const allSubjects = await getAllDisciplinasIfProfessorName()
    const length = allSubjects.disciplinas.length

    return length
}


function page(){
    const div = AppLayout()

    div.append(NavBarAdmin)
    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    headDiv.append(Header(subjectsHeader))
    headDiv.append(buttom(subjectRegisterBtn))
    headDiv.style.display = "flex"
    headDiv.style.justifyContent = "space-between"
    headDiv.style.alignItems = "center"
    headDiv.style.gap = "2rem"
    main.append(headDiv)

    main.append(Table(tableDataSubjects))

    document.body.append(div)
}

page()