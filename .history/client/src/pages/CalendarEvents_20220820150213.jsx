import loc from "date-fns/locale/en-US";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import './PagesContent.css';
import { MdLibraryAdd } from "react-icons/md";
import { GrUndo } from "react-icons/gr";
import { CalendarForm } from "./CalendarForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/compat/app";
import { GroupInfo } from "./GroupInfo";

const iconSize = 30;
const events = [];
const activities = [];
var startTime;
var endTime;
const handleSuccessNotification = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const handleWarningNotification = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const customEvent = function (event, start, end, isSelected) {
  var backgroundColor = "#8E03FB"; //+ event.hexColor;
  var style = {
    backgroundColor: backgroundColor,
    borderRadius: "5px",
    opacity: 1,
    color: "White",
    border: "0px",
    display: "block",
  };
  return {
    style: style,
  };
};

const locales = {
  "en-US": loc,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

let formats = {
  weekdayFormat: "EEE",
  timeGutterFormat: "HH:mm",
};

export const CalendarEvents = ({ scheduler }) => {
  const [newEvent, setNewEvent] = useState({
    id: 0,
    title: "",
    start: "",
    end: "",
    allDay: false,
  });

  const [allEvents, setAllEvents] = useState(events);
  const [allActivities, setAllActivities] = useState(activities);

  const [eventForm, setShowForm] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedEdit, setCheckedEdit] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formIsOpening, setFormIsOpening] = useState(true);

  const [startTimeValue, onChangeStartTime] = useState("");
  const [endTimeValue, onChangeEndTime] = useState("");
  //const [details, setDetails] = useState([]);
  var EventActivityArray = allActivities.concat(allEvents);

  const idExist = (id, array) => {
    var found = -1;
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        found = i;
        break;
      }
    }
    return found;
  };

  const generateEventId = () => {
    var id = Math.floor(Math.random() * 10000);
    while (idExist(id, EventActivityArray) >= 0) {
      id = Math.floor(Math.random() * 10000);
    }
    return id;
  };

  const handleChange = () => {
    if (edit) {
      setChecked(!checkedEdit);
    } else {
      setChecked(!checked);
    }
  };

  const showForm = () => {
    setShowForm(!eventForm);
    setChecked(false);
    setFormIsOpening(false);
  };

  const closeForm = () => {
    setShowForm(!eventForm);
    setChecked(false);
    setEdit(false);
    setFormIsOpening(true);
    setCheckedEdit(false);
    clearForm();
  };

  function createStartDate() {
    if (
      newEvent.start !== "" &&
      startTimeValue !== "" &&
      startTimeValue !== null
    ) {
      var currentStartDate = newEvent.start;
      var startDate = currentStartDate.getDate();
      var startMonth = currentStartDate.getMonth();
      var startYear = currentStartDate.getFullYear();
      var startTime = startTimeValue.toString().split(":");

      return new Date(
        startYear,
        startMonth,
        startDate,
        startTime[0],
        startTime[1]
      );
    }
    return null;
  }

  function createEndDate() {
    if (
      (!checked || scheduler) &&
      (newEvent.end !== "" || scheduler) &&
      endTimeValue !== "" &&
      endTimeValue !== null
    ) {
      var currentEndDate;
      if (scheduler) {
        currentEndDate = createStartDate();
      } else {
        currentEndDate = edit
          ? checkedEdit
            ? createStartDate()
            : newEvent.end
          : newEvent.end;
      }
      var endDate = currentEndDate.getDate();
      var endMonth = currentEndDate.getMonth();
      var endYear = currentEndDate.getFullYear();
      var endTime = endTimeValue.toString().split(":");

      return new Date(endYear, endMonth, endDate, endTime[0], endTime[1]);
    }
    return null;
  }

  function createEvent() {
    if (
      !checked &&
      newEvent.title !== "" &&
      (createStartDate() !== null) & (createEndDate() !== null)
    ) {
      newEvent.start = createStartDate();
      newEvent.end = createEndDate();
      if (scheduler) {
        newEvent.allDay = false;
      } else {
        newEvent.allDay = checked;
      }
      newEvent.id = generateEventId();
      console.log(
        newEvent.id,
        newEvent.title,
        newEvent.start,
        newEvent.end,
        newEvent.allDay
      );
      //setDetails([newEvent.start, newEvent.end]);
      // const date = new Date(newEvent.start);
      // const hoursAndMinutes = date.getHours() + ':' + date.getMinutes();
      // let details = hoursAndMinutes.toString();
      const details =
        newEvent.start.toString() + " - " + newEvent.end.toString();
      console.log("detail", details);
      firebase
        .database()
        .ref("details")
        .child(newEvent.title)
        .set(details)
        .then((data) => {
          console.log("Saved Data", data);
        })
        .catch((error) => {
          console.log("Storing Error", error);
        });
      return true;
    } else if (
      !scheduler &&
      checked &&
      newEvent.title !== "" &&
      createStartDate() !== null
    ) {
      newEvent.start = createStartDate();
      newEvent.end = createEndDate();
      newEvent.allDay = checked;
      newEvent.id = generateEventId();
      // console.log(
      //   newEvent.id,
      //   newEvent.title,
      //   newEvent.start,
      //   newEvent.end,
      //   newEvent.allDay
      // );
      // setDetails([newEvent.start, newEvent.end]);
      // console.log('detail', details);
      // firebase
      //   .database()
      //   .ref('details')
      //   .child(newEvent.title)
      //   .set(details)
      //   .then((data) => {
      //     console.log('Saved Data', data);
      //   })
      //   .catch((error) => {
      //     console.log('Storing Error', error);
      //   });
      return true;
    }
    return false;
  }

  function deepCopy(EventObj) {
    return {
      id: EventObj.id,
      title: EventObj.title,
      start: EventObj.start,
      end: EventObj.end,
      allDay: EventObj.allDay,
    };
  }

  function handleDeleteEvent(event) {
    event.preventDefault();
    if (!scheduler) {
      var eventIndex = idExist(newEvent.id, allEvents);
      if (eventIndex >= 0) {
        allEvents[eventIndex] = {};
        handleSuccessNotification("Deleted Successfully");
      }
    } else {
      var index = idExist(newEvent.id, allActivities);
      if (index >= 0) {
        allActivities[index] = {};
        handleSuccessNotification("Deleted Successfully");
      }
    }
    closeForm();
  }

  function handleEditEvent(event) {
    event.preventDefault();
    if (!scheduler) {
      if (checkedEdit || createStartDate() <= createEndDate()) {
        var eventIndex = idExist(newEvent.id, allEvents);
        if (eventIndex >= 0) {
          var currEvent = allEvents[eventIndex];
          currEvent.title = newEvent.title;
          currEvent.start = createStartDate();
          currEvent.end = createEndDate();
          currEvent.allDay = checkedEdit;
          handleSuccessNotification("Edited Successfully");
          clearForm();
        }
      } else {
        handleWarningNotification(
          "Start Date-Date Cannot Be Greater Than End Date-Time!"
        );
      }
    } else {
      if (createStartDate() <= createEndDate()) {
        var index = idExist(newEvent.id, allActivities);
        if (index >= 0) {
          var currActivity = allActivities[index];
          currActivity.title = newEvent.title;
          currActivity.start = createStartDate();
          currActivity.end = createEndDate();
          handleSuccessNotification("Edited Successfully");
          closeForm();
        }
      } else {
        handleWarningNotification(
          "Start Time Cannot be Greater Than End Time!"
        );
      }
    }
  }

  function handleAddEvent(event) {
    event.preventDefault();
    if (createEvent()) {
      if (new Date(newEvent.start) <= new Date(newEvent.end)) {
        var currentEvent = deepCopy(newEvent);
        if (scheduler) {
          setAllActivities([...allActivities, currentEvent]);
          handleSuccessNotification("Added Successfully!");
        } else {
          setAllEvents([...allEvents, currentEvent]);
          handleSuccessNotification("Added Successfully!");
        }
        closeForm();
      } else {
        if (scheduler) {
          handleWarningNotification(
            "Start Time Cannot Be Greater Than End Time!"
          );
        } else {
          handleWarningNotification(
            "Start Date-Time Cannot Be Greater Than End Date-Time!"
          );
        }
      }
    } else {
      handleWarningNotification("Some Fields Are Incomplete.");
    }
  }

  function clearForm() {
    newEvent.id = 0;
    newEvent.title = "";
    newEvent.start = "";
    newEvent.end = "";
    // startTime = "00:00:00";
    // endTime = "00:00:00";
    // onChangeStartTime("00:00:00");
    // onChangeEndTime("00:00:00");
  }

  function selectedEventActivity(event) {
    if (!edit) {
      setEdit(!edit);
      newEvent.id = event.id;
      newEvent.title = event.title;
      newEvent.start = event.start;
      newEvent.end = event.end;
      startTime = event.start;
      endTime = event.end;
      newEvent.allDay = event.allDay;
      if (event.allDay) {
        setCheckedEdit(event.allDay);
      }
      showForm();
    }
  }

  function addButtonName() {
    if (!eventForm) {
      return scheduler ? "Add Activity" : "Add Availability";
    }
    return "Cancel";
  }

  return (
    <div className="Event ">
      <div className="bg-white dark:bg-slate-600">
        <h1 className="text-gray-900 dark:text-white">{scheduler ? "Scheduler" : "Calendar"}</h1>
        <button
          className="addEvent-button"
          onClick={formIsOpening ? showForm : closeForm}
        >
          {eventForm ? (
            <GrUndo size={iconSize} className="addEvent-icon" />
          ) : (
            <MdLibraryAdd className="addEvent-icon" size={iconSize} />
          )}
          {addButtonName()}
        </button>
        <ToastContainer />
        {eventForm ? (
          <div className="eventForm-container text-gray-900 dark:text-white">
            <CalendarForm
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              handleAddEvent={handleAddEvent}
              handleChange={handleChange}
              checked={checked}
              startTimeValue={startTimeValue}
              endTimeValue={endTimeValue}
              onChangeEndTime={onChangeEndTime}
              onChangeStartTime={onChangeStartTime}
              scheduler={scheduler}
              edit={edit}
              handleEditEvent={handleEditEvent}
              handleDeleteEvent={handleDeleteEvent}
              startTime={startTime}
              endTime={endTime}
              checkedEdit={checkedEdit}
            />
          </div>
        ) : null}

        {scheduler ? (
          <Calendar
            selectable
            localizer={localizer}
            events={allActivities}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 1050, color: "white" }}
            scrollToTime={new Date()}
            className="calendar"
            formats={formats}
            views={["week", "day"]}
            defaultView={"week"}
            dayLayoutAlgorithm="no-overlap"
            onDoubleClickEvent={selectedEventActivity}
            eventPropGetter={customEvent}
          />
        ) : (
          <Calendar
            selectable
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 1050, color: "white"}}
            scrollToTime={new Date()}
            className="calendar"
            formats={formats}
            dayLayoutAlgorithm="no-overlap"
            onDoubleClickEvent={selectedEventActivity}
            eventPropGetter={customEvent}
          />
        )}
        <GroupInfo />
      </div>
    </div>
  );
};
