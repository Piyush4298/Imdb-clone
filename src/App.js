import './App.css';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Navbar from './components/Navbar';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favourites from './components/Favourites';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<>
            <Banner />
            <Movies />
          </>} />
          <Route path='favourites' element={<Favourites />}/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
