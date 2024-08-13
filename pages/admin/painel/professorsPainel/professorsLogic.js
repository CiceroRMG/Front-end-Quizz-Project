import { deleteUserById, getOnBackAllProfessor, getOnBackDisciplinasOfProfessorById } from "../../../../scripts/fetchDbFunctions.js";

function noRegister(){
    const div = document.querySelector('.empty-subject-div')
    div.style.display = "flex"
    div.classList.add('animate-in-login')
}

export async function makeArrayRowsWithProfessorsData(){
    
    const allProfessors = await getOnBackAllProfessor()
    if(!allProfessors.professores){
       return console.log("Não possui dados");
    }
    
    let rows = []
    for (const professor of allProfessors.professores) {
        const professorSubjects = await getOnBackDisciplinasOfProfessorById(professor._id)
        let subjects = []
        
        professorSubjects.disciplinas.forEach(subject => {
            subjects.push(`${subject.nome} ${subject.ano} / ${subject.semestre}`)
        })
        const row = {
            content1: `${professor.matricula}`,
            content2: professor.nome,
            action: {
                content: professorSubjects.disciplinas.length,
                as: "p",
                hoverItens: subjects.length > 0 ? subjects : null,
            },
            dialogData: {
                title: "Tem certeza?",
                paragraph: `Tem certeza que deseja excluir "${professor.nome}"? O processo não poderá ser revertido.`,
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
                                await deleteUserById(professor._id)
                                const element = document.getElementById(`${professor._id}`) 
                                element.classList.add('elemento-excluido')
                                setTimeout(()=>element.remove(), 500)
                                const subtitle = document.querySelector('.header-p')
                                subtitle.innerText = `${await counterNumberOfProfessorsRegisters()} Professores Cadastrados`
                                if(await counterNumberOfProfessorsRegisters() === 0){
                                    noRegister()
                                }
                        }
                    },
                ]
            },
            editAnchor: `/pages/admin/edit/professorsEdit/professorsEdit.html?id=${professor._id}`,
            id: professor._id
        }
        rows.push(row)
        
    };
    return rows
}

export async function counterNumberOfProfessorsRegisters(){
    const allProfessors = await getOnBackAllProfessor()
    const length = allProfessors.professores ? allProfessors.professores.length : 0

    return length
}

const professorsHeader = {
    title: "Professores",
    subtitle: `${await counterNumberOfProfessorsRegisters()} Professores Cadastrados`,
    backBtn: {
        onclick:()=>{
            window.location.href = "/pages/admin/dashboard/dashboard.html"
        }
    }

}

const tableDataProfessors = {
    columns: [
        {
            text: "Matrícula",
        },
        {
            text: "Nome",
        },
        {
            text: "Disciplinas",
        },
        {
            text: "Ações",
        }
    ],
    rows: await makeArrayRowsWithProfessorsData()
}

const professorsRegisterBtn = {
    type: "primary-md",
    img: "/imgs/createQuizz.svg",
    text: "Cadastrar",
    onclick: ()=>{window.location.href = "/pages/admin/register/professorsRegister/professorsRegister.html"}
}

export {professorsRegisterBtn, professorsHeader, tableDataProfessors}