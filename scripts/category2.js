let id
let json

function setData() {
    id = window.location.href.split("?")[1].split("=")[1];
    json = JSON.parse(localStorage.getItem('expense'))
    let item = json.find(expense => expense.id == id)

    let title = document.querySelector('h1')
    title.innerHTML = item.name

    let total = document.querySelector('#categorySum')
    total.innerHTML = '-' + item.sum + '₽'

    let allNotes = JSON.parse(localStorage.getItem('expense_notes'))
    let notes
    allNotes == null ? notes = [] : notes = allNotes.filter(function(note) {return note.expense == id})
    let list = document.querySelector(".note__list")

    if (notes != null) { 
        for (let i = 0; i < notes.length; i++) {
            let noteItem = document.createElement('div');
            noteItem.className = "note__item";
            noteItem.innerHTML = `<p class="note__date">${notes[i].date}</p>
                <p class="note__sum">
                    <span>-</span>${notes[i].sum}<span>₽</span>
                </p>`;

            list.append(noteItem);
        }
    } else {
        let error = document.createElement('p')
        error.innerHTML = 'Нет записей'
        list.append(error)
    }
}

function deleteCategory() {
    let newJson = json.filter(function(category){ return category.id != id })
    localStorage.setItem('expense', JSON.stringify(newJson))

    let newNotes = JSON.parse(localStorage.getItem('expense_notes')).filter(function(note) {return note.expense != id})
    localStorage.setItem('expense_notes', JSON.stringify(newNotes))
    
    window.location.href = 'index2.html';
}

window.onload = setData()

function addNote() {
    let sum = document.querySelector("#inputSum").value;
    let date = document.querySelector("#inputDate").value;

    let error = document.querySelector('.note__error')
    error.innerHTML = " ";

    if (sum == "") {
        error.innerHTML = "Пожалуйста, введите сумму"
    } else if (date == "") {
        error.innerHTML = "Пожалуйста, заполните дату"
    } else {
        let list = JSON.parse(localStorage.getItem('expense_notes'))
        let notes
        if (list == null) {
            list = []
            notes = []
        } else {
            notes = list.filter(function(note) {return note.expense == id})
        }
        let item
        notes == null ? item = {"id": 0, "sum": sum, "date": date, "expense": id} : item = {"id": notes.length, "sum": sum, "date": date, "expense": id}

        let total = Number(localStorage.getItem('total'))
        total -= Number(sum)
        let expense = json.find(item => item.id == id)
        expense.sum = Number(expense.sum) + Number(sum)
        let without = json.filter(function(item) {return item.id != id})

        without.push(expense)
        list.push(item)

        localStorage.setItem('expense_notes', JSON.stringify(list))
        localStorage.setItem('expense', JSON.stringify(without))
        localStorage.setItem('total', total)

        window.location.reload()
    }

}