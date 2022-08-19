import React, {useState, useEffect} from 'react'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import "../App.css"
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { auth } from "../backend/firebase";

export const Preferences = () => {
  // let user = auth.currentUser;
  // let uid = user.uid
  let temp = {}
  // useEffect ( () => {
  // firebase.database().ref('users').child(uid).once('value')
  //     .then((data) => {
  //         temp = data.val()
  //         console.log('Fetched Data', fetchedData)
  //     })
  //     .catch((error) => {
  //         console.log('Fetching Error', error)
  //     })    
  // }, [])

  const [fetchedData, setfetchedData] = useState(temp)
  

  
  const onMondayChange = (e) => {
    setfetchedData(fetched => ({
      ...fetched,
      Monday: e
    }));
  }
  const onTuesdayChange = (e) => {
    setfetchedData(fetched => ({
      ...fetched,
      Tuesday: e
    }));
  }
  const onWednesdayChange = (e) => {
    setfetchedData(fetched => ({
      ...fetched,
      Wednesday: e
    }));
  }
  const onThursdayChange = (e) => {
    setfetchedData(fetched => ({
      ...fetched,
      Thursday: e
    }));
  }
  const onFridayChange = (e) => {
    setfetchedData(fetched => ({
      ...fetched,
      Friday: e
    }));
  }
  const onSaturdayChange = (e) => {
    setfetchedData(fetched => ({
      ...fetched,
      Saturday: e
    }));
  }
  const onSundayChange = (e) => {
    setfetchedData(fetched => ({
      ...fetched,
      Sunday: e
    }));
  }

  // useEffect( () => {
  //   firebase.database().ref('users').child(uid).push(fetchedData)
  //   .then((data) => {
  //       console.log('Saved Data', data)
  //   })
  //   .catch((error) => {
  //       console.log('Storing Error', error)
  //   })    
  // }, [fetchedData])

  return (
    <div class='container'>
      <table id = "table1">
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
          <TimeRangePicker onChange={onMondayChange} value={fetchedData.Monday} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
        <tr>
          <td>
            Tuesday
          </td>
          <td>
          <TimeRangePicker onChange={onTuesdayChange} value={fetchedData.Tuesday} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
        <tr>
          <td>
            Wednesday
          </td>
          <td>
          <TimeRangePicker onChange={onWednesdayChange} value={fetchedData.Wednesday} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
        <tr>
          <td>
            Thursday
          </td>
          <td>
          <TimeRangePicker onChange={onThursdayChange} value={fetchedData.Thursday} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
        <tr>
          <td>
            Friday
          </td>
          <td>
          <TimeRangePicker onChange={onFridayChange} value={fetchedData.Friday} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
        <tr>
          <td>
            Saturday
          </td>
          <td>
          <TimeRangePicker onChange={onSaturdayChange} value={fetchedData.Saturday} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
        <tr>
          <td>
            Sunday
          </td>
          <td>
          <TimeRangePicker onChange={onSundayChange} value={fetchedData.Sunday} clockIcon = {null} disableClock = {true}/>
          </td>
        </tr>
      </table>
    </div>
  )
}
