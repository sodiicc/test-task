import React from 'react';

const LeaderBoard = props => {
  return <div className='winner'>
    <div>{props.winnerName}</div> <div>{props.winnerDate}</div>
  </div>
}

export default LeaderBoard