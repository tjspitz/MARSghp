import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Employees from './components/Employees';
import EditEmployee from './components/EditEmployee';
import AddEmployee from './components/AddEmployee';

const Home = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/MARSghp"
            element={<Employees />}
          />
          <Route
            path="/MARSghp/edit"
            element={<EditEmployee />}
          />
          <Route
            path='/MARSghp/create'
            element={<AddEmployee />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Home;
