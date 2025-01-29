import Contact from "./components/Contact/contact";
import Footer from "./components/Footer/footer";
import Intro from "./components/Introduction/intro";
import  Navbar  from "./components/NavBar/navbar";
import Project from "./components/Projects/project";
import Skills from "./components/Skills/skills";
import { AuthProvider } from './components/Authentication/authContext.js';



function App() {
  
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Intro />
        <Skills />
        <Project />
        <Contact />
        <Footer />
      </div>
    </AuthProvider>
      
  );
}


export default App;
