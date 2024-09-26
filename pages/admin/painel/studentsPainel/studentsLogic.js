import { deleteUserById, getAllStudents, getOnBackDisciplinasUsersTable } from "../../../../scripts/fetchDbFunctions.js";

function noRegister(){
    const div = document.querySelector('.empty-subject-div')
    div.style.display = "flex"
    div.classList.add('animate-in-login')
}

export const allStudents = await getAllStudents()

export async function makeArrayRowsWithStudentsData(){
    
    if(!allStudents.alunos){
       return console.log("Não possui dados");
    }

    let rows = []
    for (const aluno of allStudents.alunos) {
        const studentSubjects = await getOnBackDisciplinasUsersTable(aluno._id)
        let subjects = []
        studentSubjects.disciplinasComAlunos.forEach(subject => {
            subjects.push(subject.disciplina_id?.nome)
        })
        const row = {
            content1: `${aluno.matricula}`,
            content2: aluno.nome,
            action: {
                content: studentSubjects.disciplinasComAlunos.length,
                as: "p",
                hoverItens: subjects.length > 0 ? subjects : null,
            },
            dialogData: {
                title: "Tem certeza?",
                paragraph: `Tem certeza que deseja excluir "${aluno.nome}"? O processo não poderá ser revertido.`,
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
                                await deleteUserById(aluno._id)
                                const element = document.getElementById(`${aluno._id}`) 
                                element.classList.add('elemento-excluido')
                                setTimeout(()=>element.remove(), 500)
                                const subtitle = document.querySelector('.header-p')
                                subtitle.innerText = `${await counterNumberOfStudentsRegisters()} Alunos Cadastrados`
                                if(await counterNumberOfStudentsRegisters() === 0){
                                    noRegister()
                                }
                        }
                    },
                ]
            },
            editAnchor: `/pages/admin/edit/studentsEdit/studentsEdit.html?id=${aluno._id}`,
            id: aluno._id
        }
        rows.push(row)
        
    };
    return rows
}

export async function counterNumberOfStudentsRegisters(){
    const length = allStudents.alunos ? allStudents.alunos.length : 0

    return length
}

const studentsHeader = {
    title: "Alunos",
    subtitle: `${await counterNumberOfStudentsRegisters()} Alunos Cadastrados`,
    backBtn: {
        onclick:()=>{
            window.location.href = "/pages/admin/dashboard/dashboard.html"
        }
    }

}

const tableDataStudents = {
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
    rows: await makeArrayRowsWithStudentsData()
}

const studentRegisterBtn = {
    type: "primary-md",
    img: "/imgs/createQuizz.svg",
    text: "Cadastrar",
    onclick: ()=>{window.location.href = "/pages/admin/register/studentsRegister/studentsRegister.html"}
}

export {studentRegisterBtn, studentsHeader, tableDataStudents}