import React from 'react';
import { NavLink } from 'react-router-dom';
import { isUserLoggedIn, logout } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const logo = "/todo-logo.svg";

const HeaderComponent = () => {
    const isAuth = isUserLoggedIn();
    const navigator = useNavigate();

    function handleLogout() {
        logout();
        navigator("/login");
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid d-flex align-items-center">

                    {/* LEFT: Logo */}
                    <a href="/" className="navbar-brand d-flex align-items-center">
                        <img
                            src={logo}
                            alt="TaskFlow Logo"
                            style={{ width: "40px", height: "40px", marginRight: "10px" }}
                        />
                        <span className="fw-bold">TaskFlow</span>
                    </a>

                    <ul className="navbar-nav ms-3">
                        {
                            isAuth && (
                                <li className="nav-item">
                                    <NavLink to="/todos" className="nav-link">TODO'S</NavLink>
                                </li>
                            )
                        }
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {
                            !isAuth && (
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">Register</NavLink>
                                </li>
                            )
                        }
                        {
                            !isAuth && (
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                            )
                        }
                        {
                            isAuth && (
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
                                </li>
                            )
                        }

                    </ul>

                </div>
            </nav>

            <div style={{ marginTop: "70px" }}></div>
        </header>

    );
};

export default HeaderComponent;
