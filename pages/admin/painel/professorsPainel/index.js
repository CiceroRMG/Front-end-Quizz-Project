import { AppLayout } from "../../../../components/appLayout/appLayout.js"
import { buttom } from "../../../../components/button/buttom.js"
import { Empty } from "../../../../components/empty/empty.js"
import { Header } from "../../../../components/header/header.js"
import { MainLayout } from "../../../../components/mainLayout/mainLayout.js"
import { Table } from "../../../../components/table/table.js"
import { checkTypeUser } from "../../../../scripts/checkTypeUser.js"
import { getAllStudents, getOnBackAllProfessor } from "../../../../scripts/fetchDbFunctions.js"
import { checkIfValidToken } from "../../../../scripts/pushToLoginPage.js"
import { NavBarAdmin } from "../../navBarAdm.js"
import { tableAnimation } from "../../tableAnimation.js"
import { professorsHeader, tableDataProfessors, professorsRegisterBtn } from "./professorsLogic.js"


await checkIfValidToken();
await checkTypeUser('admin')

async function professorPanelPage(){
    const div = AppLayout()

    div.append(NavBarAdmin)
    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    headDiv.append(Header(professorsHeader))
    headDiv.append(buttom(professorsRegisterBtn))
    headDiv.style.display = "flex"
    headDiv.style.justifyContent = "space-between"
    headDiv.style.alignItems = "center"
    headDiv.style.gap = "2rem"
    main.append(headDiv)

    const table = Table(tableDataProfessors)
    main.append(table)

    const allProfessors = await getOnBackAllProfessor()
    const emptyDiv = document.createElement('div')
    emptyDiv.style.height = "100dvh"
    emptyDiv.style.display = "none"
    if(allProfessors.professores.length < 1){
        emptyDiv.classList.add('animate-in-login')
        emptyDiv.style.display = "flex"
        table.style.display = "none"
    }
    emptyDiv.classList.add('empty-subject-div')
    emptyDiv.append(Empty({title: "Nenhum professor cadastrado"}))
    main.append(emptyDiv)

    document.body.append(div)
}


await professorPanelPage()