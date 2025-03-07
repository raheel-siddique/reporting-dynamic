import { useSelector } from "react-redux";


const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <>
     <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <p>Please sign in.</p>
      )}
    </div>
    </>
  );
};

export default Home;
