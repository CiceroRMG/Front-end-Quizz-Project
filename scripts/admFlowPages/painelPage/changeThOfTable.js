export function changeThOfPage(text1, text2, text3, text4){
    const th1 = document.querySelector('.th-1')
    const th2 = document.querySelector('.th-2')
    const th3 = document.querySelector('.th-3')
    const th4 = document.querySelector('.th-4')

    th1.innerText = text1
    th2.innerText = text2
    th3.innerText = text3
    th4.innerText = text4
}