import { Route, Routes } from "react-router-dom";
// import HomePage from "./pages/home/HomePage";
// import ChatPage from "./pages/chat/ChatPage";
// import AlbumPage from "./pages/album/AlbumPage";
// import AdminPage from "./pages/admin/AdminPage";
// import NotFoundPage from "./pages/404/NotFoundPage";
import MainLayout from "./layout/MainLayout";
import SpotifyAuth from "./pages/auth/SpotifyAuth";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/auth" element={<SpotifyAuth />} />

        {/* <Route path="/admin" element={<AdminPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route> */}
      </Routes>
    </>
  );
}
export default App;
