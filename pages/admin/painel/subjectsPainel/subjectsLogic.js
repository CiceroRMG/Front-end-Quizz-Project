import { deleteDisciplinaById, getAllDisciplinasIfProfessorName } from "../../../../scripts/fetchDbFunctions.js";


function noRegister(){
    const div = document.querySelector('.empty-subject-div')
    div.style.display = "flex"
    div.classList.add('animate-in-login')
}

export async function makeArrayRowsWithSubjectsData(){
    
    const allSubjects = await getAllDisciplinasIfProfessorName()
    
    if(!allSubjects.disciplinas){
        const array = []
       return array;
    }

    let rows = []
    allSubjects.disciplinas.forEach(disciplina => {
        let quizesName = []
        disciplina.quizes.forEach(quiz => {
            quizesName.push(quiz.nome)
        })
        const row = {
            content1: `${disciplina.nome} ${disciplina.ano} / ${disciplina.semestre}`,
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
                                const subtitle = document.querySelector('.header-p')
                                subtitle.innerText = `${await counterNumberOfSubjectRegisters()} Disciplinas Cadastradas`
                                if(await counterNumberOfSubjectRegisters() === 0){
                                    noRegister()
                                }
                        }
                    },
                ]
            },
            editAnchor: `/pages/admin/edit/subjectsEdit/subjectsEdit.html?id=${disciplina._id}`,
            id: disciplina._id
        }
        rows.push(row)
        
    });

    return rows

}

export async function counterNumberOfSubjectRegisters(){
    const allSubjects = await getAllDisciplinasIfProfessorName()
    const length = allSubjects.disciplinas ? allSubjects.disciplinas.length : 0

    return length
}

const subjectsHeader = {
    title: "Disciplinas",
    subtitle: `${await counterNumberOfSubjectRegisters()} Disciplinas Cadastradas`,
    backBtn: {
        onclick:()=>{
            window.location.href = "/pages/admin/dashboard/dashboard.html"
        }
    }

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
    onclick: ()=>{window.location.href = "/pages/admin/register/subjectsRegister/subjectsRegister.html"}
}

export {subjectRegisterBtn, subjectsHeader,tableDataSubjects}