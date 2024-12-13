/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoute from './components/middleware/PublicRoute';
import PrivateRoute from './components/middleware/PrivateRoute';
import NotFound from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Main from './pages/Main';
import Test from './pages/test';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME ROUTE */}
        <Route path='/' element={<Home />} />

        <Route path='/test' element={<Test />} />

        {/* DASHBOARD ROUTE */}
        <Route path='/main/:tab' element={(<PrivateRoute><Main /></PrivateRoute>)} />
        <Route path='/auth/verify-email/:id' element={(<PublicRoute><VerifyEmail /></PublicRoute>)} />
        {/* <Route path='/main/:tab' element={<Main />} /> */}

        {/* AUTH ROUTE */}
        <Route path='/auth/login' element={(<PublicRoute><Login /></PublicRoute>)} />
        <Route path='/auth/signup' element={(<PublicRoute><Signup /></PublicRoute>)} />

        {/* ERROR ROUTE */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
