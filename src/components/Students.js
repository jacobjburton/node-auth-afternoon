import React from 'react';
import '../App.css';

export default function House (props)
{
    //console.log(props);
    return (
        <div className="student_box">
            <h5>Student Name: {props.name}</h5>
            <h5>Email: {props["email"]}</h5>
            <h5>Phone Number: {props.phone}</h5>
            <h5>Current Grade: {props['grade']}</h5>
        </div>
    )
}