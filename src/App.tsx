import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RouteScrollToTop from './components/RouteScrollToTop';
import Home from './pages/Home';
import Study from './pages/Study';
import Week1 from './pages/Week1';
import Week2 from './pages/Week2';
import Week3 from './pages/Week3';
import Week4 from './pages/Week4';
import Week5 from './pages/Week5';

function App() {
  return (
    <Router>
      <RouteScrollToTop />
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout>
              <Home />
            </Layout>
          } 
        />
        <Route 
          path="/study" 
          element={
            <Layout>
              <Study />
            </Layout>
          } 
        />
        <Route 
          path="/study/week1" 
          element={
            <Layout>
              <Week1 />
            </Layout>
          } 
        />
        <Route 
          path="/study/week2" 
          element={
            <Layout>
              <Week2 />
            </Layout>
          } 
        />
        <Route 
          path="/study/week3" 
          element={
            <Layout>
              <Week3 />
            </Layout>
          } 
        />
        <Route 
          path="/study/week4" 
          element={
            <Layout>
              <Week4 />
            </Layout>
          } 
        />
        <Route 
          path="/study/week5" 
          element={
            <Layout>
              <Week5 />
            </Layout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
