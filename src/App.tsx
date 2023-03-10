import { Route, Routes } from "react-router-dom";
import { NewsCardList } from "./components/NewsCardList";
import { NewsItemPage } from "./components/NewsItemPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewsCardList />} />
      <Route path="/:id" element={<NewsItemPage />} />
    </Routes>
  );
}

export default App;
