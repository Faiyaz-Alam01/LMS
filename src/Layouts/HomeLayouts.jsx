import React from 'react'
import { IoMenu } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Slices/AuthSlice';

const HomeLayouts = ({children}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, data } = useSelector((state) => state?.auth || {});
  const role = data?.role;

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  async function handleLogout(e) {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res.payload?.success) {
      navigate('/');
    }
  }

  return (
    <div className="min-h-[90vh] bg-gray-900 text-gray-100">
      <div className="drawer absolute left-0 z-10 w-fit">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-2" className="cursor-pointer relative">
            <IoMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu bg-gray-800 text-gray-200 h-[100vh] w-56 sm:w-72 p-4 relative shadow-lg">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer} className="text-red-400 hover:text-red-500">
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <li>
              <Link to="/" className="hover:text-blue-400">Home</Link>
            </li>

            {isLoggedIn && role === 'ADMIN' && (
              <li>
                <Link to="/admin/dashboard" className="hover:text-blue-400">Admin Dashboard</Link>
              </li>
            )}

            <li>
              <Link to="/courses" className="hover:text-blue-400">All Courses</Link>
            </li>

            {isLoggedIn && role === 'ADMIN' && (
              <li>
                <Link to="/course/create" className="hover:text-blue-400">Create Course</Link>
              </li>
            )}

            <li>
              <Link to="/contact" className="hover:text-blue-400">Contact Us</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400">About Us</Link>
            </li>

            {!isLoggedIn && (
              <li className="my-2 w-[90%]">
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-center font-semibold rounded-md w-full"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 text-center font-semibold rounded-md w-full"
                  >
                    Signup
                  </Link>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className="my-2 w-[90%]">
                <div className="flex flex-col gap-2">
                  <Link
                    to="/user/profile"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-center font-semibold rounded-md w-full"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 font-semibold rounded-md w-full"
                  >
                    Logout
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
};

export default HomeLayouts;
