const weightSpan = document.getElementById('weightSpan')
const btn = document.getElementById('addWeight')

let weight = 200
weightSpan.innerHTML = String(weight)

btn.addEventListener('click', () => {
    weightSpan.innerHTML = String(++weight)
    console.log(weight)
})