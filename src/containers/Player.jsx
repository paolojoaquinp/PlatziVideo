import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getVideoSource } from '../actions';

import NotFound from '../containers/NotFound';

import '../assets/styles/components/Player.scss';

const Player = (props) => {
    const { id } = props.match.params;
    const hasPlaying = Object.keys(props.playing).length > 0;

    const [ isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        props.getVideoSource(id);
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (<h2>Cargando....</h2>);
    }
    return hasPlaying ? (
        <div className="player">
            <video controls autoPlay>
                <source src={props.playing.source} type="video/mp4" />
            </video>
            <div className="Player-back">
                <button onClick={function () {
                        return props.history.goBack()
                    }
                } type="button">
                    Regresar
                </button>
            </div>
        </div>
    ) : (<NotFound />);
}

const mapStateToProps = (state) => {
    return {
        playing: state.playing,
    }
}

const mapDispatchToProps = {
    getVideoSource,
}

// export default Player;
export default connect( mapStateToProps, mapDispatchToProps)(Player);