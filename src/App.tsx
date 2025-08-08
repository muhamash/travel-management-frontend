import { Outlet } from 'react-router';
import './App.css';
import CustomLayouts from './layouts/CustomLayouts';
import { ThemeProvider } from './providers/ThemeProvider';

function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <CustomLayouts>
        <Outlet />
      </CustomLayouts>
    </ThemeProvider>
  );
}

export default App
