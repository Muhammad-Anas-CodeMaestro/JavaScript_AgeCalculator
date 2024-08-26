const ageCalculate = () => {
  let today = new Date();
  const currentDetail = {
    currentYear: today.getFullYear(),
    currentMonth: today.getMonth() + 1,
    currentDate: today.getDate()
  }

  let birthInput = new Date(document.getElementById('get_birth_input').value)
  const birthDetail = {
    birthYear: birthInput.getFullYear(),
    birthMonth: birthInput.getMonth() + 1,
    birhtDate: birthInput.getDate()
  }

  if (isFutureDate(birthDetail, currentDetail)) {
    alert("Invalid birthdate! The birth year cannot be in the future.")
    displayResult('-', '-', '-')
    return
  }

  const { years, months, days } = ageCalculator( birthDetail, currentDetail )

  displayResult(years, months, days);
}

const isFutureDate = (birthDetail, currentDetail) => {
  return (
    birthDetail.birthYear > currentDetail.currentYear ||
    (birthDetail.birthYear === currentDetail.currentYear &&
      (birthDetail.birthMonth > currentDetail.currentMonth ||
        (birthDetail.birthMonth === currentDetail.currentMonth &&
          birthDetail.birhtDate > currentDetail.currentDate)))
  )
}

const ageCalculator = (birthDetail, currentDetail) => {
  let years = currentDetail.currentYear - birthDetail.birthYear
  let months, days

  if (currentDetail.currentMonth < birthDetail.birthMonth) {
    years--
    months = 12 - (birthDetail.birthMonth - currentDetail.currentMonth)
  } else {
    months = currentDetail.currentMonth - birthDetail.birthMonth;
  }

  if (currentDetail.currentDate < birthDetail.birhtDate) {
    months--;
    const lastMonth = currentDetail.currentMonth === 1 ? 12 : currentDetail.currentMonth - 1;
    const daysInLastMonth = getDaysInMonth(lastMonth, currentDetail.currentYear);
    days = daysInLastMonth - (birthDetail.birhtDate - currentDetail.currentDate);
  } else {
    days = currentDetail.currentDate - birthDetail.birhtDate;
  }
  return { years, months, days }
}

const getDaysInMonth = (month, year) => {
  const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
  const getDaysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return getDaysInMonth[month - 1];
};

const displayResult = (dyear, dmonth, ddate) => {
  document.getElementById('year').textContent = dyear
  document.getElementById('month').textContent = dmonth
  document.getElementById('day').innerHTML = ddate
}

document.querySelector('.btn_age_calc').addEventListener('click', ageCalculate);