import React from 'react';
import LOGO from '../logo.svg';

import {Link} from 'react-router-dom';


function Navbar() {

    return ( 
        <div className='border pl-12 flex space-x-8 items-center py-4'>
            <img className='w-[60px] md:w-[80px]' src={LOGO} alt="movie-logo" />
            <Link to='/' className='text-blue-400 font-bold text-xl md:text-3xl'>Movies</Link>
            <Link to='/favourites' className='text-blue-400 font-bold text-xl md:text-3xl'>Favourites</Link>
        </div>
    );
}

export default Navbar;