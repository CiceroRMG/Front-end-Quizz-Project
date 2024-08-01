import { AppLayout } from "../../../../components/appLayout/appLayout.js"
import { buttom } from "../../../../components/button/buttom.js"
import { Empty } from "../../../../components/empty/empty.js"
import { Header } from "../../../../components/header/header.js"
import { MainLayout } from "../../../../components/mainLayout/mainLayout.js"
import { Table } from "../../../../components/table/table.js"
import { getAllDisciplinasIfProfessorName } from "../../../../scripts/fetchDbFunctions.js"
import { NavBarAdmin } from "../../navBarAdm.js"
import {subjectRegisterBtn, subjectsHeader,tableDataSubjects} from "./subjectsLogic.js"



async function subjectsPanelPage(){
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

    const allSubjects = await getAllDisciplinasIfProfessorName()
    const emptyDiv = document.createElement('div')
    emptyDiv.style.height = "100dvh"
    emptyDiv.style.display = "none"
    if(!allSubjects.disciplinas){
        emptyDiv.classList.add('animate-in-login')
        emptyDiv.style.display = "flex"
    }
    emptyDiv.classList.add('empty-subject-div')
    emptyDiv.append(Empty({title: "Nenhuma disciplina cadastrada"}))
    main.append(emptyDiv)

    document.body.append(div)
}

subjectsPanelPage()