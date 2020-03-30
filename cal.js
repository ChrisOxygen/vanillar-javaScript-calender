const yearDisplay = document.querySelector(".year");
const monthsList = Array.from(document.querySelectorAll(".months__month-name"));
const monthsForDisplay = document.querySelector(".available-months");
document.getElements;

const getCurrentDate = () => {
  let currentDate = new Date();
  return {
    currentDate,
    currentYear: currentDate.getFullYear(),
    currentMonth: currentDate.getMonth(),
    todaysDate: currentDate.getDate(),
    today: currentDate.getDay(),
    firstDayOfGivenMonth: (year, givenMonth) => {
      //get first day of month in numbers form, sun = 0 mon = 1 etc
      return new Date(year, givenMonth).getDay();
    },

    daysInGivenMonth: (givenMonth, year) => {
      // get number of days in a month in numbers eg: march = 31
      return 32 - new Date(year, givenMonth, 32).getDate();
    },
    daysOfTheWeek: () => {
      let weekDays = new Map();
      weekDays
        .set(0, "sun")
        .set(1, "mon")
        .set(2, "tue")
        .set(3, "wed")
        .set(4, "thu")
        .set(5, "fri")
        .set(6, "sat");
      return weekDays;
    },
    monthsInAYear: () => {
      let months = new Map();
      months
        .set(0, "January")
        .set(1, "February")
        .set(2, "March")
        .set(3, "April")
        .set(4, "May")
        .set(5, "June")
        .set(6, "July")
        .set(7, "August")
        .set(8, "September")
        .set(9, "October")
        .set(10, "November")
        .set(11, "December");
      return months;
    }
  };
};

const createDisplaySpaces = IDs => {
  let displayTemplate = "";
  for (let index = 0; index < IDs.length; index++) {
    let position = "";
    if (index === 0) {
      position = "prev-m";
    } else if (index === 1) {
      position = "present-m";
    } else if (index === 2) {
      position = "next-m";
    }
    displayTemplate += `<div class="month-days ${position}" id="${IDs[index]}"> <div class="spaces space1"></div> <div class="spaces space2"></div> <div class="spaces space3"></div> <div class="spaces space4"></div> <div class="spaces space5"></div> <div class="spaces space6"></div> <div class="spaces space7"></div> <div class="spaces space8"></div> <div class="spaces space9"></div> <div class="spaces space10"></div> <div class="spaces space11"></div> <div class="spaces space12"></div> <div class="spaces space13"></div> <div class="spaces space14"></div> <div class="spaces space15"></div> <div class="spaces space16"></div> <div class="spaces space17"></div> <div class="spaces space18"></div> <div class="spaces space19"></div> <div class="spaces space20"></div> <div class="spaces space21"></div> <div class="spaces space22"></div> <div class="spaces space23"></div> <div class="spaces space24"></div> <div class="spaces space25"></div> <div class="spaces space26"></div> <div class="spaces space27"></div> <div class="spaces space28"></div> <div class="spaces space29"></div> <div class="spaces space30"></div> <div class="spaces space31"></div> <div class="spaces space32"></div> <div class="spaces space33"></div> <div class="spaces space34"></div> <div class="spaces space35"></div> <div class="spaces space36"></div> <div class="spaces space37"></div> <div class="spaces space38"></div> <div class="spaces space39"></div> <div class="spaces space40"></div> <div class="spaces space41"></div> <div class="spaces space42"></div> </div>`;
  }
  return displayTemplate;
};

const displayCurrentYear = date => {
  yearDisplay.textContent = date.currentYear;
};

const getDisplayMonths = date => {
  let monthIDs = [];
  monthsList.forEach(m => {
    if (m.id === "prev") {
      m.textContent = date.monthsInAYear().get(date.currentMonth - 1);
      monthIDs.push(date.monthsInAYear().get(date.currentMonth - 1));
    } else if (m.id === "present") {
      m.textContent = date.monthsInAYear().get(date.currentMonth);
      monthIDs.push(date.monthsInAYear().get(date.currentMonth));
    } else if (m.id === "next") {
      m.textContent = date.monthsInAYear().get(date.currentMonth + 1);
      monthIDs.push(date.monthsInAYear().get(date.currentMonth + 1));
    }
  });

  return { monthIDs };
};

const IDsToString = IDs => {
  let idString = "";
  IDs.forEach(id => {
    if (IDs.indexOf(id) === IDs.length - 1) {
      idString += ` #${id}`;
    } else {
      idString += ` #${id},`;
    }
  });
  return idString.trim();
};

const inputCalenderDates = (date, mIDs) => {
  let spaces = Array.from(monthsForDisplay.querySelectorAll(IDsToString(mIDs)));
  for (let index = 0; index < spaces.length; index++) {
    let dd = 1;
    let firstDay = 0;
    let daysInMonth = 0;
    let cMonth = 0;
    for (let [k, v] of date.monthsInAYear().entries()) {
      if (v === spaces[index].id) {
        firstDay = date.firstDayOfGivenMonth(date.currentYear, k);
        daysInMonth = date.daysInGivenMonth(k, date.currentYear);
        cMonth = k;
        break;
      }
    }

    for (div of spaces[index].querySelectorAll(".spaces")) {
      if (
        Array.from(spaces[index].querySelectorAll(".spaces")).indexOf(div) >=
          firstDay &&
        dd <= daysInMonth
      ) {
        if (date.currentMonth === cMonth && date.todaysDate === dd) {
          div.innerHTML = `<span class="av-days  ${spaces[index].id}-day-${dd} today">${dd}</span>`;
          dd += 1;
        } else {
          div.innerHTML = `<span class="av-days  ${spaces[index].id}-day-${dd}">${dd}</span>`;
          dd += 1;
        }
      }
    }
  }
};

const UI = date => {
  displayCurrentYear(date);
  let mIDs = getDisplayMonths(date).monthIDs;
  monthsForDisplay.innerHTML = createDisplaySpaces(mIDs);
  inputCalenderDates(date, mIDs);
  for (const month of monthsList) {
    if (month.id === "present") {
      document.querySelector(".display-months").style.justifyContent = "center";
      for (i of monthsList) {
        if (i.classList.contains("active")) {
          i.classList.remove("active");
        }
      }
      month.classList.add("active");
    }
    month.addEventListener("click", e => {
      if (month.id === "prev") {
        document.querySelector(".display-months").classList.add("anim");
        setTimeout(() => {
          document.querySelector(".display-months").classList.remove("anim");
        }, 1000);
        document.querySelector(".display-months").style.justifyContent =
          "flex-start";
        for (i of monthsList) {
          if (i.classList.contains("active")) {
            i.classList.remove("active");
          }
        }
        month.classList.add("active");
      } else if (month.id === "present") {
        document.querySelector(".display-months").classList.add("anim");
        setTimeout(() => {
          document.querySelector(".display-months").classList.remove("anim");
        }, 1000);
        document.querySelector(".display-months").style.justifyContent =
          "center";
        for (i of monthsList) {
          if (i.classList.contains("active")) {
            i.classList.remove("active");
          }
        }
        month.classList.add("active");
      } else if (month.id === "next") {
        document.querySelector(".display-months").classList.add("anim");
        setTimeout(() => {
          document.querySelector(".display-months").classList.remove("anim");
        }, 1000);
        document.querySelector(".display-months").style.justifyContent =
          "flex-end";
        for (i of monthsList) {
          if (i.classList.contains("active")) {
            i.classList.remove("active");
          }
        }
        month.classList.add("active");
      }
    });
  }
};
UI(getCurrentDate());
