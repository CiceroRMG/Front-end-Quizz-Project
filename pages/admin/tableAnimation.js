export async function tableAnimation(){
    const tr = document.querySelectorAll('.tr-body')
    const table = document.querySelector('.table-container')
    tr.forEach((item, index)=>{
        item.style.animationDelay = `${index * 0.03}s`;
        item.classList.add('animate-in-table')
    })
    table.classList.remove('hidden')
}