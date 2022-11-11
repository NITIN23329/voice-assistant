import React from "react";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import RecipeInfo from "./pages/RecipeInfo";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Route, Link, Routes } 
       from "react-router-dom";

const App = () => {
  const recipeDBLogo = 'https://cosylab.iiitd.edu.in/recipedb/static/media/recipedb-logo.png'
  return (
      <Router>
          <Routes>
            <Route  path="/" element={<Home />} />
            <Route path = "/search_recipe" element = {<RecipeList />} />
            <Route path = "/recipe_info/:recipe_id" element = {<RecipeInfo  />} />
            <Route  path="/contact" element={<Contact />} />
          </Routes>
      </Router>
  );
};

export default App;
