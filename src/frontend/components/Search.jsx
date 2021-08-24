import React, { useState } from 'react';

import { connect } from 'react-redux';
import classNames from 'classnames';
import { searchQuery } from '../actions';

import '../assets/styles/components/Search.scss';

const Search = (props) => {
  const [valueInput, setValueInput] = useState('');
  const { isHome } = props;
  const inputStyle = classNames('input', {
    isHome,
  });

  const handleInput = (e) => {
    setValueInput(e.target.value);
    console.log(valueInput);
  };
  // const handleSearchQuery = () => {
  // }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter pressed');
      props.searchQuery(valueInput);
      // handleSearchQuery();
    }
  };
  return (
    <section className='main'>
      <h2 className='main__title'>¿Qué quieres ver hoy?</h2>
      <input
        type='text'
        onKeyPress={handleKeyPress}
        className={inputStyle}
        placeholder='Buscar...'
        onChange={handleInput}
      />
    </section>
  );
};

const mapDispatchToProps = {
  searchQuery,
};

// export default Search
export default connect(null, mapDispatchToProps)(Search);
