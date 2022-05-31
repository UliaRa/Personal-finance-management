let id
let json

function setData() {
    id = window.location.href.split("?")[1].split("=")[1];
    json = JSON.parse(localStorage.getItem('income'))
    let item = json.find(income => income.id == id)

    let title = document.querySelector('h1')
    title.innerHTML = item.name

    //localStorage.setItem('goal', [])

    let total = document.querySelector('#categorySum')
    total.innerHTML = '+' + item.sum + '₽'

    let allNotes = JSON.parse(localStorage.getItem('income_notes'))
    let notes
    allNotes == null ? notes = [] : notes = allNotes.filter(function(note) {return note.income == id})
    let list = document.querySelector(".note__list")

    if (notes != null) { 
        for (let i = 0; i < notes.length; i++) {
            let noteItem = document.createElement('div');
            noteItem.className = "note__item";
            noteItem.innerHTML = `<p class="note__date">${notes[i].date}</p>
                <p class="note__sum">
                    <span>+</span>${notes[i].sum}<span>₽</span>
                </p>`;

            list.append(noteItem);
        }
    } else {
        let error = document.createElement('p')
        error.innerHTML = 'Нет записей'
        list.append(error)
    }

    let goal = JSON.parse(localStorage.getItem('goal'))
    let select = document.querySelector('#selectGoal')
    
    if (goal != null) {
        for (let i = 0; i < goal.length; i++) {
            let option = document.createElement('option')
            
            option.innerHTML = goal[i].name
            select.append(option)
        }
    }
}

function deleteCategory() {
    let newJson = json.filter(function(category){ return category.id != id })
    localStorage.setItem('income', JSON.stringify(newJson))

    let newNotes = JSON.parse(localStorage.getItem('income_notes')).filter(function(note) {return note.income != id})
    localStorage.setItem('income_notes', JSON.stringify(newNotes))
    
    window.location.href = 'index.html';
}

window.onload = setData()

function addNote() {
    let sum = document.querySelector("#inputSum").value;
    let date = document.querySelector("#inputDate").value;
    let goal = document.querySelector('#selectGoal')

    let error = document.querySelector('.note__error')
    error.innerHTML = " ";
    let goalName = goal.options[goal.selectedIndex].text

    if (sum == "") {
        error.innerHTML = "Пожалуйста, введите сумму"
    } else if (date == "") {
        error.innerHTML = "Пожалуйста, заполните дату"
    } else {
        if (goal.value != "none") {
            let goalList = JSON.parse(localStorage.getItem('goal'))
            let goalItem = goalList.filter(function(item) {return item.name == goalName})[0]
            goalItem.current = Number(goalItem.current) + Number(sum)
            goalItem.current >= goalItem.goal ? goalItem.done = true : goalItem.done = false

            let goalWithout = goalList.filter(function(item) {return item.name != goalName})
            goalWithout.push(goalItem)

            localStorage.setItem('goal', JSON.stringify(goalWithout))
        }

        let list = JSON.parse(localStorage.getItem('income_notes'))
        let notes
        if (list == null) {
            list = []
            notes = []
        } else {
            notes = list.filter(function(note) {return note.income == id})
        }
        let item
        notes == null ? item = {"id": 0, "sum": sum, "date": date, "income": id} : item = {"id": notes.length, "sum": sum, "date": date, "income": id}

        let total = Number(localStorage.getItem('total'))
        total += Number(sum)
        let income = json.find(item => item.id == id)
        income.sum = Number(income.sum) + Number(sum)
        let without = json.filter(function(item) {return item.id != id})

        without.push(income)
        list.push(item)

        localStorage.setItem('income_notes', JSON.stringify(list))
        localStorage.setItem('income', JSON.stringify(without))
        localStorage.setItem('total', total)

        window.location.reload()
    }

}