import React from 'react';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarButton = () => {
  const [isStarred, setIsStarred] = useState(false);

  const handleStarClick = () => {
    setIsStarred(!isStarred);
  };

  return (
    <button id="btn_star_delete" onClick={handleStarClick}>
<FaStar color={isStarred ? 'gold' : 'gray'} />    </button>
  );
};

export default StarButton;