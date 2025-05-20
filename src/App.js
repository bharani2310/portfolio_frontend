import { HashRouter as Router, Routes, Route } from "react-router-dom";
// Use BrowserRouter if deploying to Netlify or backend handles routing
// import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/NavBar/navbar";
import Intro from "./components/Introduction/intro";
import Skills from "./components/Skills/skills";
import Tech from "./components/Technology/tech";
import Project from "./components/Projects/project";
import Contact from "./components/Contact/contact";
import Footer from "./components/Footer/footer";

import { AuthProvider } from "./components/Authentication/authContext";
import { PortfolioProvider } from "./Context/ZipContext";

import { lazy, Suspense } from "react";

// Lazy load route-specific component
const ProjectDescription = lazy(() =>
  import("./components/Projects/Page/projectDescription")
);

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Intro />
                  <Skills />
                  <Tech />
                  <Project />
                  <Contact />
                </>
              }
            />
            <Route
              path="/project/:id"
              element={
                <Suspense fallback={<div>Loading project...</div>}>
                  <ProjectDescription />
                </Suspense>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
