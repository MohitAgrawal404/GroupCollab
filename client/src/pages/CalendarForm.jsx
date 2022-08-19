import React from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { FiTrash2 } from "react-icons/fi";
import { BiAddToQueue } from "react-icons/bi";
import { AiOutlineFileDone } from "react-icons/ai";

export const CalendarForm = ({
  newEvent,
  setNewEvent,
  handleAddEvent,
  handleChange,
  checked,
  startTimeValue,
  endTimeValue,
  onChangeStartTime,
  onChangeEndTime,
  scheduler,
  edit,
  handleEditEvent,
  handleDeleteEvent,
  startTime,
  endTime,
  checkedEdit,
}) => {
  function addButtonName() {
    if (!edit) {
      return scheduler ? "Add Activity" : "Add Event";
    }
    return "";
  }

  function addFormName() {
    if (!edit) {
      return scheduler ? "Add New Activity" : "Add New Event";
    }
    return scheduler ? "Edit Activity" : "Edit Event";
  }

  return (
    <form className="EventForm">
      <h2 className="addEvent-title">{addFormName()}</h2>
      <div>
        <table>
          <tbody>
            {scheduler ? null : (
              <tr>
                <td>
                  <label>All Day:</label>
                </td>
                <td>
                  <input
                    id="allday-checkbox"
                    className="allday-checkbox"
                    type="checkbox"
                    checked={edit ? checkedEdit : checked}
                    onChange={handleChange}
                    name="allDay-checkbox"
                  />
                </td>
              </tr>
            )}
            <tr>
              <td>
                <label>Title: </label>
              </td>
              <td>
                <input
                  id="event-activity-title"
                  name="event-activity-title"
                  type="text"
                  placeholder={scheduler ? "Activity Title" : "Add Event Title"}
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="event-iput"
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>{scheduler ? "Date" : "Start Date:"} </label>
              </td>
              <td>
                <DatePicker
                  id="event-activity-start-date"
                  placeholderText={
                    scheduler ? "Select Date" : "Select Start Date"
                  }
                  selected={newEvent.start}
                  onChange={(start) =>
                    setNewEvent({ ...newEvent, start: start })
                  }
                  className="event-iput day"
                />
              </td>
            </tr>
            {scheduler ? null : (
              <tr>
                <td>
                  <label>End Date: </label>
                </td>
                <td>
                  <DatePicker
                    id="event-end-date"
                    placeholderText="Select End Date"
                    selected={newEvent.end}
                    onChange={(end) => setNewEvent({ ...newEvent, end: end })}
                    className={
                      (edit ? checkedEdit : checked)
                        ? "event-iput day end allday"
                        : "event-iput day"
                    }
                    disabled={edit ? checkedEdit : checked}
                  />
                </td>
              </tr>
            )}
            <tr>
              <td>
                <label>Start Time: </label>
              </td>
              <td>
                <TimePicker
                  id="event-activity-start-time"
                  className="event-iput time start"
                  clockIcon={null}
                  clearIcon={null}
                  disableClock={true}
                  format={"HH:mm"}
                  hourPlaceholder={"HH"}
                  minutePlaceholder={"mm"}
                  value={edit ? startTime : startTimeValue}
                  onChange={onChangeStartTime}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>End Time: </label>
              </td>
              <td>
                <TimePicker
                  id="event-activity-end-time"
                  className={
                    (edit ? checkedEdit : checked)
                      ? "event-iput time end allday"
                      : "event-iput time end"
                  }
                  clockIcon={null}
                  clearIcon={null}
                  disableClock={true}
                  format={"HH:mm"}
                  hourPlaceholder={"HH"}
                  minutePlaceholder={"mm"}
                  disabled={edit ? checkedEdit : checked}
                  value={edit ? endTime : endTimeValue}
                  onChange={onChangeEndTime}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button
                  type="reset"
                  className="addEvent-onForm"
                  onClick={edit ? handleEditEvent : handleAddEvent}
                >
                  {edit ? (
                    <AiOutlineFileDone size={40} />
                  ) : (
                    <BiAddToQueue className="addEvent-icon" size={25} />
                  )}
                  {addButtonName()}
                </button>

                {edit ? (
                  <button
                    type="reset"
                    className="deleteEvent-onForm"
                    onClick={handleDeleteEvent}
                  >
                    <FiTrash2 size={40} />
                  </button>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
};
