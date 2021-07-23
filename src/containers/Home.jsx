import React, { useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux';

import { searchQuery } from '../actions';

import Header from '../components/Header';
import Search from '../components/Search';
import Categorias from '../components/Categorias';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';

import useInitialState from '../hooks/useInitialState';

// const API = 'http://localhost:3000/initalState';

const Home = (props) => {
    // const [videos, categories] = useInitialState(API);
    const { myList, trends, originals, searchResult } = props;
    useLayoutEffect(() => { 
        if (searchResult) {
            props.searchQuery('');
        }
      }, []);

    return (
        <React.Fragment>
            <Header />
            <Search isHome/>
            {searchResult.length > 0 &&
                <Categorias title="Resultados">
                    <Carousel>
                        {searchResult.map((item) => (
                            <CarouselItem key={item.id} {...item} isList={true}/>
                        ))}
                    </Carousel>
                </Categorias>            
            }
            {myList.length > 0 && (
                <Categorias title="Mi lista">
                    <Carousel>
                        {myList.map((item) => (
                            <CarouselItem key={item.id} {...item} isList={true}/>
                        ))}
                    </Carousel>
                </Categorias>
            )}
            <Categorias title="Tendencias">
                <Carousel>
                    {trends.map((item) => (
                        <CarouselItem 
                            key={item.id}
                            {...item}
                        />
                        )
                    )}
                </Carousel>
            </Categorias>
            <Categorias title="Originales de Platzi Video">
                <Carousel>
                    {originals.map((item) => (
                        <CarouselItem key={item.id} {...item} />
                        )
                    )}
                </Carousel>
            </Categorias>
        </React.Fragment>
    )
}

// ESTE METODO SOLO TRAE LAS PROPS QUE SE NECESITAN EN EL PRESENTE COMPONENTE, Y NO TODO EL STORE PARA TEMAS DE OPTIMIZACION
const mapStateToProps = (state) => {
    return {
        myList: state.myList,
        trends: state.trends,
        originals: state.originals,
        searchResult: state.searchResult,
    }
};
const mapDispatchToProps = {
    searchQuery
}
// export default Home;
export default connect(mapStateToProps , mapDispatchToProps)(Home);