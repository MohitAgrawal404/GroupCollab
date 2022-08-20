import React, {useState, useLayoutEffect} from 'react'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import "../App.css"
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged} from "firebase/auth";

export const Preferences = () => {

  let temp = {
    Monday: ["10:00", "11:00"],
    Tuesday: ["10:00", "11:00"],
    Wednesday: ["10:00", "11:00"],
    Thursday: ["10:00", "11:00"],
    Friday: ["10:00", "11:00"],
    Saturday: ["10:00", "11:00"],
    Sunday: ["10:00", "11:00"],
  };
  let auth = getAuth();
  let user = auth.currentUser;
  let uid = user.uid;
  console.log(uid);
  const [fetchedData, setfetchedData] = useState(temp);

  useLayoutEffect(() => {
    firebase.database().ref('users').child(uid).once('value')
        .then((data) => {
            setfetchedData(data.val());
            console.log(temp);
        })
        .catch((error) => {
            console.log('Fetching Error', error)
        });    
  }, [])

  

  let onMondayChange = (e) => {
    setfetchedData((prevstate) => ({
      ...prevstate,
      Monday: e
    }));
    setData(fetchedData);
  }
  const onTuesdayChange = (e) => {
    setfetchedData(fetched => ({
      ...fetched,
      Tuesday: e
    }));
    setData(fetchedData);
  }
  const onWednesdayChange = (e) => {
    setfetchedData(fetched => ({
      ...fetched,
      Wednesday: e
    }));
    setData(fetchedData);
  }
  const onThursdayChange = (e) => {
    setfetchedData(fetched => ({
      ...fetched,
      Thursday: e
    }));
    setData(fetchedData);
  }
  const onFridayChange = (e) => {
    setfetchedData(fetched => ({
      ...fetched,
      Friday: e
    }));
    setData(fetchedData);
  }
  const onSaturdayChange = (e) => {
    setfetchedData(fetched => ({
      ...fetched,
      Saturday: e
    }));
    setData(fetchedData);
  }
  const onSundayChange = (e) => {
    setfetchedData(fetched => ({
      ...fetched,
      Sunday: e
    }));
    setData(fetchedData);
  }

  const setData = (fetched) => {
    firebase.database().ref('users').child(uid).set(fetched)
    .then((data) => {
        console.log('Saved Data', data)
    })
    .catch((error) => {
        console.log('Storing Error', error)
    })    
  }

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
