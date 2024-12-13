/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/Error';
import Home from './pages/Home';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME ROUTE */}
        <Route path='/' element={<Home />} />

        {/* DASHBOARD ROUTE */}
        <Route path='/main/:tab' element={<Main />} />

        {/* ERROR ROUTE */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
