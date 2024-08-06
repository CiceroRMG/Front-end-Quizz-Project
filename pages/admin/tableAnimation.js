export async function tableAnimation(){
    const tr = document.querySelectorAll('.tr-body')
    const table = document.querySelector('.table-container')
    tr.forEach((item, index)=>{
        table.style.overflow = "hidden"
        item.style.animationDelay = `${index * 0.025}s`;
        item.classList.add('animate-in-left-table')
    })
    table.classList.remove('hidden')

    const totalAnimationTime = tr.length * 0.025 * 1000 + 700;
    setTimeout(() => {
        table.style.removeProperty('overflow');
    }, totalAnimationTime)
}