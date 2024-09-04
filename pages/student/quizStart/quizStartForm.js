import { Dialog } from "../../../components/dialog/dialog.js";
import { Toaster } from "../../../components/toaster/toaster.js";
import { getOnBackQuizzesById, registerStudentAwnsers } from "../../../scripts/fetchDbFunctions.js";
import { takeIdByParams } from "../../../scripts/takeIdByParams.js";

const errorToaster = {
    title: "Erro!",
    image: "/components/toaster/img/errorCircle.svg",
    subtitle: "Ocorreu algum erro ao enviar as repostas.",
    style: "error"
}

export async function formEventStudentQuiz(){

    const form = document.querySelector(".main-content")
    
    form.addEventListener('submit', async (event)=>{
        event.preventDefault()
        
        const quiz = await getOnBackQuizzesById(takeIdByParams())

        let req = {}
        let awnsersArray = []

        for(const question of quiz.quizz.perguntas){
            const questionSelect = document.getElementById(question._id)

            const selectedRadio = questionSelect.querySelector(`input[name="awnsers${question._id}"]:checked`);
    
            let awnserSelected = ""
            if(selectedRadio){
                awnserSelected = selectedRadio.value
            }

            const object = {
                pergunta_id: question._id,
                alternativa_id: awnserSelected ? awnserSelected : null
            }

            awnsersArray.push(object)
            
        }

        console.log(awnsersArray);
        
        
        req = {
            quiz_id: quiz.quizz._id,
            respostas: awnsersArray
        }
        
        const registerAwnsersStudent = await registerStudentAwnsers(req)
        
        if(!registerAwnsersStudent){
            console.log('Algo deu errado no envio das peguntas do aluno')
            return false
        }        

        if (registerAwnsersStudent.status === 201){
                localStorage.removeItem(quiz.quizz._id)
                await successSubmit()
                return
                
        } else {
            document.body.append(Toaster(errorToaster))
            return false
        }
    
    })

}

export async function successSubmit() {
    const req = await getOnBackQuizzesById(takeIdByParams())
    let dialogData = {}
    const main = document.querySelector('.main-content')

    dialogData = {
        title: "Entregue",
        paragraph: `O quiz "${req.quizz.titulo}" foi entregue com sucesso`,
        a: {
            text: "Ver gabarito",
            link: `/pages/student/quiz/quiz.html?id=${req.quizz._id}`
        },
        closeBtn: true,
        img: "/components/dialog/img/checkCircle.svg"
    }
    main.append(Dialog(dialogData))
    const dialog = main.querySelector('.dialog')
    const header = dialog.querySelector('.dialog-header')
    header.style.justifyContent = "center"
    const btn = dialog.querySelector('.dialogCloseBtn')
    btn.onclick = ()=>{
        window.location.href = `/pages/student/quiz/quiz.html?id=${req.quizz._id}`
    }
    dialog.showModal()
}