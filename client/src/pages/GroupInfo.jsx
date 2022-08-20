import React, {useState, useLayoutEffect} from "react";
import firebase from "firebase/compat/app";

export const GroupInfo = () => {
    const [data,setData] = useState({"Mohit Agrawal": {
        "Friday": [
          "10:00",
          "12:00"
        ],
        "Monday": [
          "09:00",
          "11:00"
        ],
        "Saturday": [
          "10:00",
          "11:00"
        ],
        "Sunday": [
          "10:00",
          "11:00"
        ],
        "Thursday": [
          "10:00",
          "11:00"
        ],
        "Tuesday": [
          "10:00",
          "11:00"
        ],
        "Wednesday": [
          "10:00",
          "11:00"
        ]
      }})
    // firebase.database().ref("users").on("value", snapshot => {
    // let fetchData = [];
    // fetchData.push(snapshot.val());
    // setData({fetchData});
    // });
    useLayoutEffect(() => {
        const leadsRef = firebase.database().ref('users');
        leadsRef.on('value', function(snapshot) {
            if (snapshot.val() != null) {
                setData(snapshot.val());
            console.log(data);
            }
            
        });    
      }, [])

    const listItems = Object.keys(data).map((name) =>
        <div key={name}> 
            {name}
            <div>
                Monday: {data[name].Monday[0]} - {data[name].Monday[1]}  Tuesday: {data[name].Tuesday[0]} - {data[name].Tuesday[1]}  Wednesday: {data[name].Wednesday[0]} - {data[name].Tuesday[1]}  Thursday: {data[name].Thursday[0]} - {data[name].Thursday[1]}  Friday: {data[name].Friday[0]} - {data[name].Friday[1]}  Saturday: {data[name].Saturday[0]} - {data[name].Saturday[1]}  Sunday: {data[name].Sunday[0]} - {data[name].Sunday[1]}
            </div>
        </div>
    );

    return (
      <div className="events">
        {listItems}
      </div>
    );
};
  