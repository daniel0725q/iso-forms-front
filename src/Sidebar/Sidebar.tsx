import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, BankOutlined, UserOutlined, SettingOutlined, FileOutlined, FormOutlined, FileTextOutlined, KeyOutlined, LogoutOutlined, FileSearchOutlined, DatabaseOutlined } from '@ant-design/icons';
import './Sidebar.css';
import Sider from 'antd/es/layout/Sider';

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

  return (
    <div>
      {sessionStorageUser ? (
        <Sider width={300} collapsible collapsed={collapsed} collapsedWidth={80}>
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
            <Menu.Item key="forms" icon={<FormOutlined />}>
              <Link to="/forms">Formatos</Link>
            </Menu.Item>
            <Menu.Item key="my-forms" icon={<FileTextOutlined />}>
              <Link to="/my-forms">Documentos Históricos</Link>
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Sidebar;
