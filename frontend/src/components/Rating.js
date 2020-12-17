import React from 'react'
import PropTypes from 'prop-types'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { BsStarHalf } from 'react-icons/bs'

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        {value >= 1 ? (
          <AiFillStar style={{ color: color }} />
        ) : value >= 0.5 ? (
          <BsStarHalf style={{ color: color }} />
        ) : (
          <AiOutlineStar />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <AiFillStar style={{ color: color }} />
        ) : value >= 1.5 ? (
          <BsStarHalf style={{ color: color }} />
        ) : (
          <AiOutlineStar />
        )}{' '}
      </span>
      <span>
        {value >= 3 ? (
          <AiFillStar style={{ color: color }} />
        ) : value >= 2.5 ? (
          <BsStarHalf style={{ color: color }} />
        ) : (
          <AiOutlineStar />
        )}{' '}
      </span>
      <span>
        {value >= 4 ? (
          <AiFillStar style={{ color: color }} />
        ) : value >= 3.5 ? (
          <BsStarHalf style={{ color: color }} />
        ) : (
          <AiOutlineStar />
        )}{' '}
      </span>
      <span>
        {' '}
        {value >= 5 ? (
          <AiFillStar style={{ color: color }} />
        ) : value >= 4.5 ? (
          <BsStarHalf style={{ color: color }} />
        ) : (
          <AiOutlineStar />
        )}{' '}
      </span>
      <span>{text && text} </span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825'
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string
}

export default Rating
