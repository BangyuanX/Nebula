import React from 'react';
// import { Link } from 'react-router-dom';

function RoomLi(props) {
    // use props.Number as UUID for testing.
    return <div>
        {/* <Link to={`/${props.Number}/spaceInfo`}>{props.Number} : {props.Name}</Link> */}
        <p>{props.roomNumber} : {props.buildingName}</p>
    </div>
}

export default RoomLi;