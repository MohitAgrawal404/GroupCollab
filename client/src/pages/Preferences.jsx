import React, {useState} from 'react'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';


export const Preferences = () => {
  const [value, onChange] = useState(['10:00', '11:00']);
  return (
    <div>
      <table>
        <tr>
          <th>
            Day
          </th>
          <th>
            Available Time
          </th>
        </tr>
        <tr>
          <td>
            Monday
          </td>
          <td>
          <TimeRangePicker onChange={onChange} value={value} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
        <tr>
          <td>
            Tuesday
          </td>
          <td>
          <TimeRangePicker onChange={onChange} value={value} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
        <tr>
          <td>
            Wednesday
          </td>
          <td>
          <TimeRangePicker onChange={onChange} value={value} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
        <tr>
          <td>
            Thursday
          </td>
          <td>
          <TimeRangePicker onChange={onChange} value={value} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
        <tr>
          <td>
            Friday
          </td>
          <td>
          <TimeRangePicker onChange={onChange} value={value} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
        <tr>
          <td>
            Saturday
          </td>
          <td>
          <TimeRangePicker onChange={onChange} value={value} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
        <tr>
          <td>
            Sunday
          </td>
          <td>
          <TimeRangePicker onChange={onChange} value={value} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
      </table>
    </div>
  )
}
