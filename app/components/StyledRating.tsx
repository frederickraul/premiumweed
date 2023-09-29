import styled from '@emotion/styled';
import { Rating } from '@mui/material';
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';




interface ReviewsProps {
  size?: number;
}

const StyledRating: React.FC<ReviewsProps> = ({
  size,
}) => {

const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#000',
          fontSize: size ? size : 13,
        },
        '& .MuiRating-iconEmpty': {
          fontSize: size ? size : 13,
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