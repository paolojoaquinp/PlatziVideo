import React, { useState, useEffect } from 'react'

import Header from '../components/Header';
import Search from '../components/Search';
import Categorias from '../components/Categorias';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Footer from '../components/Footer';

import useInitialState from '../hooks/useInitialState';
import '../assets/styles/App.scss';

const API = 'http://localhost:3000/initalState';

const App = () => {
    const [videos, categories] = useInitialState(API);
    return videos.length === 0 ? <h1>Loading</h1> : (
        <div className="App">
            <Header />
            <Search />
            {categories.map((category) => (
                videos[category].length > 0 && (
                    <Categorias title={category} key={category}>
                        <Carousel>
                            {videos[category].map((item) => (
                                <CarouselItem key={item.id} {...item} />
                            ))}
                        </Carousel>
                    </Categorias>
                )))}
            <Footer />
        </div>
    )
}

export default App;
