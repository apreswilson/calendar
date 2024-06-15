import React, { useEffect, ChangeEvent, useState } from "react";
import calendarTemplate from "./calendarTemplate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faCircleUser,
  faCircleQuestion,
  faRightFromBracket,
  faGear,
  faBarsStaggered,
  faX
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import './calendar.css';

// Define the types
type EventInfo = { name: string, date: string, color: string };
type MonthDays = { [day: number]: EventInfo | string };
type CalendarTemplate = { [month: string]: MonthDays };

const Calendar: React.FC = () => {

  const [currentCalendarState, setCurrentCalendarState] = useState<CalendarTemplate>(calendarTemplate);
  const [calendarUpdated, setCalendarUpdated] = useState<boolean>(false);
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState<string>("");
  const [themeColor, setThemeColor] = useState("dark-theme");
  const [toggleMenu, setToggleMenu] = useState("");
  const currentUser = localStorage.getItem("User")?.split(",") || [];

  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCalendar = localStorage.getItem("storedCalendar");
    const initialCalendarState: CalendarTemplate = storedCalendar ? JSON.parse(storedCalendar) : calendarTemplate;
    setCurrentCalendarState(initialCalendarState);
  }, [])

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    storedTheme === "dark-theme" ? setThemeColor("dark-theme") : setThemeColor("light-theme")
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
  const conductLogout = () => {
    logout();
    navigate("/calendar/");
  }

  const changeTheme = () => {
    themeColor === "dark-theme" ? localStorage.setItem("theme", "light-theme") : localStorage.setItem("theme", "dark-theme");
    themeColor === "dark-theme" ? setThemeColor("light-theme") : setThemeColor("dark-theme");
  }

  const menuFunctionality = () => {
    toggleMenu === "" ? setToggleMenu("menu-open") : setToggleMenu("");
  }

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
    <div className={`calendar-layout ${themeColor}`}>
      <div className={`sidebar ${toggleMenu}`}>
        <h1>{`Welcome, ${currentUser[0]}`}</h1>
        <div className="account">
          <FontAwesomeIcon icon={faCircleUser} />
          <p className="hide">Account</p>
        </div>
        <div className="theme" onClick={changeTheme}>
          {themeColor === "dark-theme" ?
            <FontAwesomeIcon icon={faMoon} />
            :
            <FontAwesomeIcon icon={faSun} />
          }
          <p className="hide">Theme</p>
        </div>
        <div className="help">
          <FontAwesomeIcon icon={faCircleQuestion} />
          <p className="hide">Help</p>
        </div>
        <div className="settings">
          <FontAwesomeIcon icon={faGear} />
          <p className="hide">Settings</p>
        </div>
        <div className="logout" onClick={conductLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <p className="hide">Logout</p>
        </div>
      </div>

      <div className="calendar">
        <div className="new-event">
          <div className="menu">
            {toggleMenu === "menu-open" ?
              <FontAwesomeIcon icon={faX} onClick={menuFunctionality} color="white" />
              :
              <FontAwesomeIcon icon={faBarsStaggered} onClick={menuFunctionality} />
            }

          </div>
          <div className="month">
            <h1 className="month-title">Month</h1>
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
          </div>
          <div className="add-event">
            <h1 className="add-event-title">Add Event</h1>
            <form onSubmit={addEventToDay} className="new-event-form">
              <input type="text" name="event" maxLength={30} placeholder="Event Name" />
              <input type="text" name="date" placeholder="Date: MM/DD" />
              <div className="color-input">
                <label htmlFor="color">Color</label>
                <input type="color" id="color" name="color" />
              </div>
              <button type="submit" className="submit-new-event">Add</button>
            </form>
          </div>
        </div>

        <div className="calendar-display">
          {daysJSX}
        </div>
      </div>
    </div>
  );
};


export default Calendar;