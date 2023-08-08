import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Auth from './components/form/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Layout>
      <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path='/login'
            element={<Auth registration={false} />}
          />
          <Route
            path='/signup'
            element={<Auth registration={true} />}
          />
          <Route
            path="/logout"
            element={<Home />}
          />
        </Routes>
      </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
