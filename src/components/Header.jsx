import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import gravatar from '../utils/gravatar';
import { logoutRequest } from '../actions';

import logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';
import '../assets/styles/components/Header.scss';

const Header = (props) => {
    const { user, isLogin, isRegister } = props;
    const hasUser = Object.keys(user).length > 0;

    const handleLogout = () => {
        props.logoutRequest({});
        
    }

    const headerClass = classnames('header',{
        isLogin: isLogin,
        isRegister: isRegister
    })

    return (
        <header className={headerClass}>
            <Link to="/">
                <img className="header__img" src={logo} alt="Platzi Video" />
            </Link>
            <div className="header__menu">
            <div className="header__menu--profile">
                {hasUser ?
                    <img src={gravatar(user.email)} alt={user.email} />
                    : <img src={userIcon} alt="Icono de Usuario" />
                }
                <p>Perfil</p>
            </div>
            <ul>
                {hasUser ?
                    <li><a href="/">{user.name}</a></li>
                    : null
                }
                {hasUser ?
                    <li><a onClick={handleLogout} href="#logout">Cerrar Sesión</a></li>
                 :  <li>
                        <Link to="/login">
                            Iniciar Sesión
                        </Link>
                    </li>
                }
            </ul>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

const mapDispatchToProps = {
    logoutRequest
}

Header.propTypes = {
    user: PropTypes.object,
    isLogin: PropTypes.bool,
    isRegister: PropTypes.bool
}

// export default Header;
export default connect(mapStateToProps, mapDispatchToProps)(Header);