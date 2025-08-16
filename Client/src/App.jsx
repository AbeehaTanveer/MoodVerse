import React from "react";
import MoodVerseLanding from "./components/MoodVerseLanding";
import MoodSelectionPage from "./components/SelectionPage";
import AyahDisplayPage from "./components/AyatDisplayPage";
import { BrowserRouter, Routes, Route } from "react-router";
import DuaSuggestionPage from "./components/DuaDisplayPage";
import MyReflectionsPage from "./pages/ReflectionPage";
import Signup from "./pages/Signup";
import SignInPage from "./pages/Signin";
import QuranQuotePage from "./pages/QuranQuotePage";

const App = () => {
  return (
    <div>
   


       <BrowserRouter>
    <Routes>
      <Route path="/" element={<MoodVerseLanding />} />
      <Route path="/selection" element={<MoodSelectionPage />} />
      <Route path="/ayat" element={<AyahDisplayPage />} />
      <Route path="/dua" element={<DuaSuggestionPage />} />
      <Route path="/journal/list" element={<MyReflectionsPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/qoute" element={<QuranQuotePage />} />
    </Routes>
  </BrowserRouter>
    </div>
  );
};

export default App;
