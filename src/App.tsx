import { Outlet } from 'react-router';
import './App.css';
import CustomLayouts from './layouts/CustomLayouts';

function App() {

  return (
    <CustomLayouts>
      <Outlet />
    </CustomLayouts>
  );
}

export default App
