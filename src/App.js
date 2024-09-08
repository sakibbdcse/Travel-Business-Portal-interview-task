import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedComponent from './components/ProtectedComponent';
import CreateProduct from './components/CreateProduct';
import ManageProducts from './components/ManageProducts';
import UpdateProduct from './components/UpdateProduct';
import DeleteProduct from './components/DeleteProduct';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedComponent>
              <Home />
            </ProtectedComponent>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedComponent>
              <CreateProduct />
            </ProtectedComponent>
          }
        />
        <Route
          path="/manage"
          element={
            <ProtectedComponent>
              <ManageProducts />
            </ProtectedComponent>
          }
        />
        <Route
          path="/update"
          element={
            <ProtectedComponent>
              <UpdateProduct />
            </ProtectedComponent>
          }
        />
        <Route
          path="/delete"
          element={
            <ProtectedComponent>
              <DeleteProduct />
            </ProtectedComponent>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
