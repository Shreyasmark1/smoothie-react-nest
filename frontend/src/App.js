import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Form from './components/form/Form';

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
            element={<Form registration={false} />}
          />
          <Route
            path='/signup'
            element={<Form registration={true} />}
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
