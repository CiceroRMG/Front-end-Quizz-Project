import { AppLayout } from "../../../../components/appLayout/appLayout.js"
import { buttom } from "../../../../components/button/buttom.js"
import { Empty } from "../../../../components/empty/empty.js"
import { Header } from "../../../../components/header/header.js"
import { MainLayout } from "../../../../components/mainLayout/mainLayout.js"
import { Table } from "../../../../components/table/table.js"
import { Toaster } from "../../../../components/toaster/toaster.js"
import { checkTypeUser } from "../../../../scripts/checkTypeUser.js"
import { loader } from "../../../../scripts/loader.js"
import { NavBarAdmin } from "../../navBarAdm.js"
import {allSubjects, subjectRegisterBtn, subjectsHeader,tableDataSubjects} from "./subjectsLogic.js"

const successToaster = {
    title: "Sucesso!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "Sucesso na edição da disciplina.",
}

async function subjectsPanelPage(){
    const div = AppLayout()

    const itemNavArray = NavBarAdmin.querySelectorAll('.nav-item')
    const itemNav = itemNavArray[1]
    itemNav.classList.add('selected')
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

    const table = Table(tableDataSubjects)
    main.append(table)

    const emptyDiv = document.createElement('div')
    emptyDiv.classList.add('animate-in-left')
    emptyDiv.style.height = "100dvh"
    emptyDiv.style.display = "none"
    if((allSubjects.disciplinas?.length ?? 0 )< 1){
        emptyDiv.classList.add('animate-in-login')
        emptyDiv.style.display = "flex"
        table.style.display = "none"
    }
    emptyDiv.classList.add('empty-subject-div')
    emptyDiv.append(Empty({title: "Nenhuma disciplina cadastrada"}))
    main.append(emptyDiv)

    if(localStorage.getItem('successToaster')){
        document.body.append(Toaster(successToaster))
        localStorage.removeItem('successToaster')
    }

    document.body.append(div)
    loader()
}

await subjectsPanelPage()
await checkTypeUser('admin')