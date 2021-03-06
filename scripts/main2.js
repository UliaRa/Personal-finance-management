function drawCategories(expenseList, sums) {
    let list = document.querySelector(".category__list")

    list.innerHTML = ''
    
    if (expenseList != null) { 
        for (let i = 0; i < expenseList.length; i++) {
            let item = document.createElement('div');
            item.className = "category__item";
            item.innerHTML = `<a href="category2.html?id=${expenseList[i].id}">

            <p class="category__name">
                ${expenseList[i].name}
            </p>

            <p class="category__sum">
                <span>-</span>${sums[i].sum}<span>₽</span>
            </p> </a>`

            list.append(item);
        }
    } else {
        let error = document.createElement('p')
        error.innerHTML = 'Нет записей'
        list.append(error)
    }
}

function setData() {
    let expenseList = localStorage.getItem('expense')
    drawCategories(JSON.parse(expenseList), JSON.parse(expenseList))
    
    let total = document.querySelector('.budget__num')
    let totalSum = localStorage.getItem('total')
    if (totalSum == null) {
        totalSum = 0
    }
    total.innerHTML = totalSum + '₽'
}

window.onload = setData();

function sortDate() {
    let error = document.querySelector('.filter__error')
    let begin = document.querySelector('#beginDate').value
    let end = document.querySelector('#endDate').value

    error.innerHTML = " ";
    let beginDate = Date.parse(begin)
    let endDate = Date.parse(end)

    let expenseList = JSON.parse(localStorage.getItem('expense'))
    let list = []

    if (begin == "") {
        error.innerHTML = "Заполните дату начала"
    } else if (end == "") {
        error.innerHTML = "Заполните дату конца"
    } else if (endDate >= beginDate) {
        for (let i = 0; i < expenseList.length; i++) {
            let allNotes = JSON.parse(localStorage.getItem('expense_notes'))
            let notes
            allNotes == null ? notes = [] : notes = allNotes.filter(function(note) {return note.expense == expenseList[i].id})

            let final = notes.filter(function(note) {return Date.parse(note.date) >= beginDate && Date.parse(note.date) <= endDate})
            let sum = final.reduce((acc, note) => {
                acc = Number(acc) + Number(note.sum)
                return acc
            }, 0)

            let item = {"id": expenseList[i].id, "sum": sum}
            list.push(item)
        }

        drawCategories(expenseList, list)
    } else {
        error.innerHTML = "Пожалуйста, введите даты по порядку"
    }
}

function clearDate() {
    let begin = document.querySelector('#beginDate')
    let end = document.querySelector('#endDate')

    begin.value = " "
    end.value = " "
}

function showNew() {
    let btn = document.querySelector('.category__new')
    let block = document.querySelector('.new')

    btn.classList.add("category__new--hidden")
    block.classList.remove("new--hidden")
}

function hideNew() {
    let btn = document.querySelector('.category__new')
    let block = document.querySelector('.new')

    btn.classList.remove("category__new--hidden")
    block.classList.add("new--hidden")
}

function addNew() {
    let json = localStorage.getItem('expense')
    json == null || json == '' ? json = [] : json = JSON.parse(json)

    let name = document.querySelector("#inputName").value;
    const test = json.find(expense => expense.name === name)

    let error = document.querySelector('.new__error')
    error.innerHTML = " ";

    if (name == "") {
        error.innerHTML = "Заполните название"
    }
    else if (test == null) {
        let newCategory = {"id": json.length, "name": name, "sum": 0};

        json.push(newCategory)
        localStorage.setItem('expense', JSON.stringify(json))
    
        hideNew()
        window.location.reload()
    } else {
        error.innerHTML = "Такая категория уже существует"
    }
}
