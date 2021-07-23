import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFavorite, deleteFavorite } from '../actions';


import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

const CarouselItem = (props) => {
    const { id, cover, title, year, contentRating, duration, isList } = props;

    const handleSetFavorite = () => {
        props.setFavorite({
            id: id,
            cover:cover,
            title:title,
            year:year,
            contentRating:contentRating,
            duration:duration
        })
    }
    const handleDeleteFavorite = (itemId) => {
        props.deleteFavorite(itemId)
    }
    return (
        <div className="carousel-item">
            <img className="carousel-item__img" src={cover} alt={title}  />
            <div className="carousel-item__details">
            <div>
                <Link to={`/player/${id}`}>
                    <img 
                        className="carousel-item__details--img"
                        src={playIcon} 
                        alt="Play Icon"
                    /> 
                </Link>
                
                {isList ? 
                    <img 
                        className="carousel-item__details--img" 
                        src={removeIcon} 
                        alt="Remove Icon" 
                        onClick={() => handleDeleteFavorite(id)}
                    /> :
                    <img 
                        className="carousel-item__details--img" 
                        src={plusIcon} 
                        alt="Plus Icon" 
                        onClick={handleSetFavorite}
                    /> 
                }
            </div>
            <p className="carousel-item__details--title">{title}</p>
            <p className="carousel-item__details--subtitle">
                {`${year} ${contentRating} ${duration}`}
            </p>
            </div>
        </div>
    )
}

CarouselItem.propTypes = {
    cover: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    contentRating: PropTypes.string,
    duration: PropTypes.number,
}

const mapDispatchToProps = {
    setFavorite,
    deleteFavorite: deleteFavorite,
}

                    //( props , actions ) que utilizaremos dentro del componente(suscribiendose)(Componente)
                    //(En otras palabras, nos lo traemos del store del provider y de nuestro actions/index.js)
export default connect(null, mapDispatchToProps)(CarouselItem);