import React, { useEffect, ChangeEvent, useState } from "react";
import calendarTemplate from "./calendarTemplate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import userLogo from "../../assets/user-profile.svg";

// Define the types
type EventInfo = { name: string, date: string, color: string };
type MonthDays = { [day: number]: EventInfo | string };
type CalendarTemplate = { [month: string]: MonthDays };

const Calendar: React.FC = () => {

  const [currentCalendarState, setCurrentCalendarState] = useState<CalendarTemplate>(calendarTemplate);
  const [calendarUpdated, setCalendarUpdated] = useState<boolean>(false);
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState<string>("");
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

  useEffect(() => {
    const storedCalendar = localStorage.getItem("storedCalendar");
    const initialCalendarState: CalendarTemplate = storedCalendar ? JSON.parse(storedCalendar) : calendarTemplate;
    setCurrentCalendarState(initialCalendarState);
  }, [])


  if (calendarUpdated) {
    localStorage.setItem("storedCalendar", JSON.stringify(currentCalendarState));
  }

  const updateMonthDisplay = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentDisplayMonth(event.target.value);
  };

  const addEventToDay = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const getFormInput = new FormData(event.currentTarget);
    const eventName = getFormInput.get("event") as string;
    const eventDate = getFormInput.get("date") as string;
    const eventColor = getFormInput.get("color") as string;

    if (!dateRegex.test(eventDate)) {
      console.log("invalid date");
      return;
    }

    const [inputMonth, inputDay] = eventDate.split("/");
    const month = parseInt(inputMonth, 10);
    const day = parseInt(inputDay, 10);
    const monthName = new Date(0, month - 1).toLocaleString('default', { month: 'long' });

    setCurrentCalendarState(prevCalendar => ({
      ...prevCalendar,
      [monthName]: {
        ...prevCalendar[monthName],
        [day]: { name: eventName, date: eventDate, color: eventColor },
      }
    }));

    setCalendarUpdated(true);
    event.currentTarget.reset();
  };

  // Generate JSX for days in the selected month
  const daysJSX = Object.entries(currentCalendarState)
    .filter(([month]) => month === currentDisplayMonth)
    .flatMap(([, days]) =>
      Object.entries(days).map(([day, value]) => (
        <div className="day" key={`${currentDisplayMonth}-${day}`}>
          <p className="day-number">{day}</p>
          {typeof value === 'object' && value !== null && 'name' in value && 'color' in value ? (
            <div className="event" style={{ backgroundColor: value.color }}>
              <p>{value.name}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      ))
    );

  return (
    <div className="calendar-layout">
      <div className="top-row">
        <h1 className="page-title">Users Calendar</h1>
        <div className="options-tab">
          <div className="theme-select">
            <button className="faq">?</button>
            <FontAwesomeIcon icon={faSun} size="2xl" />
            <FontAwesomeIcon icon={faMoon} size="2xl" />
          </div>
        </div>
        <div className="user-profile">
          <img src={userLogo} alt="User Profile" />
        </div>
      </div>

      <div className="main-content">
        <div className="calendar">
          <div className="sidebar">
            <h1 className="months-title">Month</h1>
            <select className="months" onChange={updateMonthDisplay}>
              <option value="">Select...</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <div className="add-event">
              <h1 className="add-event-title">Add Event</h1>
              <form onSubmit={addEventToDay}>
                <input type="text" name="event" placeholder="Event Name" />
                <input type="text" name="date" placeholder="Date: MM/DD" />
                <label htmlFor="color">Color</label>
                <input type="color" id="color" name="color" />
                <button type="submit">Add</button>
              </form>
            </div>
          </div>

          <div className="calendar-display">
            {daysJSX}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Calendar;