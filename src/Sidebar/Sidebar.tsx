import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, BankOutlined, UserOutlined, SettingOutlined, FileOutlined, FormOutlined, FileTextOutlined, KeyOutlined, LogoutOutlined, ArrowLeftOutlined, ArrowRightOutlined, HomeFilled } from '@ant-design/icons';
import './Sidebar.css';
import Sider from 'antd/es/layout/Sider';

const { Header } = Layout;
const { REACT_APP_API_ENDPOINT } = process.env;

const Sidebar = () => {
  const navigate = useNavigate();
  const sessionStorageUser = localStorage.getItem('user');

  const [isAdmin, setIsAdmin] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (sessionStorageUser) {
      const user = JSON.parse(sessionStorageUser);
      if (user.token) {
        fetch(`${REACT_APP_API_ENDPOINT}/auth/is-admin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: user.token }),
        })
          .then((r) => r.json())
          .then((r) => {
            setIsAdmin(r.isAdmin);
          });
      }
    }
  }, [sessionStorageUser]);

  const onButtonClick = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  const goHome = () => {
    navigate('/home');
  };

  return (
    <div>
      {sessionStorageUser ? (
        <Layout>
          <Header className="header-bar">
            <Button icon={<ArrowLeftOutlined />} onClick={goBack} className="nav-button" />
            <Button icon={<ArrowRightOutlined />} onClick={goForward} className="nav-button" />
            <Button icon={<HomeFilled />} onClick={goHome} className="nav-button" />
            <Button icon={<LogoutOutlined />} onClick={onButtonClick} className="nav-button logout-button">Cerrar sesión</Button>
          </Header>
          <Sider width={200} collapsible collapsed={collapsed} collapsedWidth={collapsed ? 80 : 200}>
            <Button type="primary" onClick={toggleCollapse} className="collapse-button" style={{ margin: '16px' }}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
              mode="inline"
              defaultSelectedKeys={['home']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/home">Inicio</Link>
              </Menu.Item>
              {isAdmin && (
                <Menu.Item key="companies" icon={<BankOutlined />}>
                  <Link to="/companies">Empresas</Link>
                </Menu.Item>
              )}
              {isAdmin && (
                <Menu.Item key="users" icon={<UserOutlined />}>
                  <Link to="/users">Usuarios</Link>
                </Menu.Item>
              )}
              <Menu.Item key="options" icon={<SettingOutlined />}>
                <Link to="/options">Opciones</Link>
              </Menu.Item>
              <Menu.Item key="miscellaneous documents" icon={<FileOutlined />}>
                <Link to="/miscellaneous-documents">Documentos Varios</Link>
              </Menu.Item>
              <Menu.Item key="forms" icon={<FormOutlined />}>
                <Link to="/forms">Formularios</Link>
              </Menu.Item>
              <Menu.Item key="my-forms" icon={<FileTextOutlined />}>
                <Link to="/my-forms">Mis Documentos</Link>
              </Menu.Item>
              <Menu.Item key="changePassword" icon={<KeyOutlined />} className="changePassword">
                <Link to="/change-password">Cambiar contraseña</Link>
              </Menu.Item>
              <Menu.Item key="signout" icon={<LogoutOutlined />} className="signout">
                <Link to="/login" onClick={onButtonClick}>
                  Cerrar sesión
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
        </Layout>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Sidebar;