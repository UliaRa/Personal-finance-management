function drawGoals(goalList) {
    let list = document.querySelector(".goal__list")

    list.innerHTML = ''

    if (goalList != null) { 
        for (let i = 0; i < goalList.length; i++) {
            let item = document.createElement('div');
            item.className = "goal__item";
            if (goalList[i].done) {
                item.classList.add("goal__item--done")
            }
            item.innerHTML = `
            <p class="goal__name">
                ${goalList[i].name}
            </p>

            <p class="goal__score">
                ${goalList[i].current}<span>/</span>${goalList[i].goal}<span>₽</span>
            </p>`

            list.append(item);
        }
    } else {
        let error = document.createElement('p')
        error.innerHTML = 'Нет записей'
        list.append(error)
    }
}

function setData() {
    let goalList = localStorage.getItem('goal')
    drawGoals(JSON.parse(goalList))
    
    let total = document.querySelector('.budget__num')
    total.innerHTML = localStorage.getItem('total') + '₽'
}

window.onload = setData();

function showNew() {
    let btn = document.querySelector('.goal__new')
    let block = document.querySelector('.new')

    btn.classList.add("goal__new--hidden")
    block.classList.remove("new--hidden")
}

function hideNew() {
    let btn = document.querySelector('.goal__new')
    let block = document.querySelector('.new')

    btn.classList.remove("goal__new--hidden")
    block.classList.add("new--hidden")
}

function addNew() {
    let json = localStorage.getItem('goal')
    json == null || json == '' ? json = [] : json = JSON.parse(json)

    let name = document.querySelector("#inputName").value;
    let goal = document.querySelector("#inputGoal").value;
    const test = json.find(goal => goal.name === goal)

    let error = document.querySelector('.new__error')
    error.innerHTML = " ";

    if (name == "") {
        error.innerHTML = "Заполните название"
    }
    else if (goal == "") {
        error.innerHTML = "Введите сумму"
    }
    else if (test == null) {
        let newGoal = {"id": json.length, "name": name, "goal": goal, "current": 0, "done": false};

        json.push(newGoal)
        localStorage.setItem('goal', JSON.stringify(json))
    
        hideNew()
        window.location.reload()
    } else {
        error.innerHTML = "Такая цель уже существует"
    }
}