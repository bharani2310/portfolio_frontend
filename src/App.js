// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact/contact";
import Footer from "./components/Footer/footer";
import Intro from "./components/Introduction/intro";
import Navbar from "./components/NavBar/navbar";
import Project from "./components/Projects/project";
import Skills from "./components/Skills/skills";
import Tech from "./components/Technology/tech.js";
import { AuthProvider } from "./components/Authentication/authContext.js";
import ProjectDescription from "./components/Projects/Page/projectDescription.js";

function App() {
  return (
    <AuthProvider>
      <Router>
      <Navbar /> {/* Keep Navbar outside Routes to display on all pages */}
        <Routes>
          <Route path="/" element={<>
            <Intro />
            <Skills />
            <Tech/>
            <Project />
            <Contact />
          </>} />
          <Route path="/project/:id" element={<ProjectDescription />} />
        </Routes>
        <Footer /> {/* Keep Footer outside Routes to display on all pages */}
      </Router>
    </AuthProvider>
  );
}

export default App;
