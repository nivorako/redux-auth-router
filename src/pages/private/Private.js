
import { useSelector } from "react-redux"
import { Outlet, useLocation, Navigate } from 'react-router-dom'

const Private = () => {
   
  const { currentUser, loading } = useSelector((store) => store.auth)
  const location = useLocation();
  if (loading) {
    // Afficher un spinner ou un message de chargement ici
    return <div>Loading...</div>;
  }

  return currentUser ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}

export default Private


