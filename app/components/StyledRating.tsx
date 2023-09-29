import styled from '@emotion/styled';
import { Rating } from '@mui/material';
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const StyledRating = () => {
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#000',
          fontSize: 13
        },
        '& .MuiRating-iconEmpty': {
          fontSize: 13
        },
        '& .MuiRating-iconHover': {
          color: '#444',
        },
      });

  return (
    <div>
         <StyledRating
                  readOnly
                  defaultValue={5}
                  getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                  precision={0.5}
                  icon={<AiFillStar fontSize="inherit" />}
                  emptyIcon={<AiOutlineStar fontSize="inherit" />}
                  />
    </div>
  )
}

export default StyledRating