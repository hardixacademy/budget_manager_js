let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    incomeVlaue = document.getElementsByClassName('income-value')[0],
    monthSavingsVlaue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsVlaue = document.getElementsByClassName('yearsavings-value')[0],
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

console.log(checkSavings);

startBtn.addEventListener('click', () => {
    time = prompt('дата YYYY-MM-DD', '');
    money = +prompt('бютжет на месяц', '');

    while (isNaN(money) || money == '' || money == null) {
        money = prompt('ваш бютжет', '');
    }

    appData.budget = money;
    appData.timeData = time;

    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', () => {
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = +expensesItem[i].value,
            b = +expensesItem[++i].value;
        if (typeof (a) != null && typeof (b) != null && a != '' && b != '') {
            appData.expenses[a] = b;
            sum += b;
        } else {
            i -= 1;
        }
    }
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', () => {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBtn.addEventListener('click', () => {
    if (appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'min level';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'middle level';
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = 'high level';
        } else {
            levelValue.textContent = 'error';
        }
    } else {
        dayBudgetValue.textContent = 'add month budget';
    }
});

incomeItem.addEventListener('input', () => {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeVlaue.textContent = appData.income;
});

checkSavings.addEventListener('change', (e) => {
    monthSavingsVlaue.textContent = 'add sum';
    yearSavingsVlaue.textContent = 'add percent';

    if (e.target.checked) {
        sumValue.addEventListener('input', () => {
            if (sumValue.value.match(/^[-\+]?\d+/) === null) {
                monthSavingsVlaue.textContent = 'NaN';
            } else {
                percentValue.addEventListener('input', () => {
                    if (percentValue.value.match(/^[-\+]?\d+/) === null) {
                        yearSavingsVlaue.textContent = 'NaN';
                    } else {
                        yearSavingsVlaue.textContent = sumValue.value * ((percentValue.value * 12) /100);
                        monthSavingsVlaue.textContent = sumValue.value * (percentValue.value / 100);
                    }
                });
            }
        });

    } else {
        monthSavingsVlaue.textContent = 'confirm checkbox';
        yearSavingsVlaue.textContent = 'confirm checkbox';
    }
});


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: []
};