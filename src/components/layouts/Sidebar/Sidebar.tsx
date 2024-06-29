import React from "react";
import styles from './Sidebar.module.css';
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Sidebar = () => {
    const { logout } = useAuth();
    return (
        <div className={styles.sidebar}>
            <nav className={styles.navigation}>
                <ul>
                <NavLink to="/">
                        <h3>Home</h3>
                        </NavLink>
                    <li>
                        <h3>Currículo</h3>
                        <ul>
                            <li>
                                <NavLink to="/curriculo/informacoes/cadastro">
                                    <h4>Cadastrar Informações</h4>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/curriculo/experiencia/cadastro">
                                    <h4>Cadastrar Experiência </h4>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/curriculo/experiencia/lista">
                                    <h4>Listagem de  Experiência </h4>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h3>Portifólio</h3>
                        <ul>
                            <li>
                                <NavLink to='/portifolio/cadastro'>
                                    <h4>Cadastrar Portifólio</h4>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/portifolio/lista'>
                                    <h4>Listagem de Portifólio</h4>
                                </NavLink>
                            </li>
                            <li>
                            <NavLink onClick={logout}to="/login">
                        <h3>Log out</h3>
                        </NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
