import React from 'react';

const Card = ({ number }) => {
 return (
    <div className={`flex bg-indigo-500 justify-center items-center rounded shadow-lg cursor-pointer`}>
      <h2>{number}</h2>
    </div>
 );
};

export default Card;