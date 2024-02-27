// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import HomePage from "./pages/Home/HomePage";
import NoPage from "./pages/NoPage/NoPage";
import OldFilmsPage from "./pages/OldFilms/OldFilmsPage";
import Actors from "./pages/Actors/Actors";
import ActorsDetail from "./pages/ActorsDetail/ActorsDetail";
import FilmsDetail from "./pages/FilmsDetail/FilmsDetail";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import EditProfile from "./pages/EditProfile/EditProfile";
import Watchlist from "./pages/Watchlist/Watchlist";
import AdminMainLayout from "./layouts/AdminMainLayout/AdminMainLayout";
import Admin from "./pages/Admin/Admin";
import AdminFilms from "./pages/Admin/AdminFilms/AdminFilms";
import AdminActors from "./pages/Admin/AdminActors/AdminActors";
import AdminUsers from "./pages/Admin/AdminUsers/AdminUsers";
import AddFilm from "./pages/Admin/AdminFilms/AddFilm/AddFilm";
import EditFilm from "./pages/Admin/AdminFilms/EditFilm/EditFilm";
import AdminRoute from "./routes/AdminRoute";
import AddActors from "./pages/Admin/AdminActors/AddActors/AddActors";
import EditActors from "./pages/Admin/AdminActors/EditActors/EditActors";
import AdminComments from "./pages/Admin/AdminComments/AdminComments";
import AdminCommentsDetail from "./pages/Admin/AdminComments/AdminCommentsDetail/AdminCommentsDetail";
// import AdminRoute from "./routes/AdminRoute/AdminRoute"; // Import AdminRoute

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/films" element={<OldFilmsPage />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/actors/:id" element={<ActorsDetail />} />
          <Route path="/films/:id" element={<FilmsDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route element={<AdminRoute roles={["admin"]}></AdminRoute>}>
          <Route path="/admin" element={<AdminMainLayout />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/actors" element={<AdminActors />} />
            <Route path="/admin/actors/add" element={<AddActors />} />
            <Route path="/admin/actors/edit/:id" element={<EditActors />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/films" element={<AdminFilms />} />
            <Route path="/admin/films/add" element={<AddFilm />} />
            <Route path="/admin/films/edit/:id" element={<EditFilm />} />
            <Route path="/admin/comments/" element={<AdminComments />} />
            <Route path="/admin/comments/detail/:id" element={<AdminCommentsDetail />} />


          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
