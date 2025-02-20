import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Button, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, BankOutlined, UserOutlined, SettingOutlined, FileOutlined, FormOutlined, FileTextOutlined, KeyOutlined, LogoutOutlined, FileSearchOutlined, DatabaseOutlined, MoneyCollectFilled, DollarOutlined } from '@ant-design/icons';
import './Sidebar.css';
import Sider from 'antd/es/layout/Sider';

const { REACT_APP_API_ENDPOINT } = process.env;

const Sidebar = () => {
  const navigate = useNavigate();
  const sessionStorageUser = localStorage.getItem('user');
  const location = useLocation();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isOperator, setIsOperator] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState('');
  
  
  useEffect(() => {
    const normalizedPath = location.pathname.startsWith("/")
      ? location.pathname.substring(1) 
      : location.pathname;
    setSelectedKey(normalizedPath);
  }, [location.pathname]);

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

  useEffect(() => {
    if (sessionStorageUser) {
      const user = JSON.parse(sessionStorageUser);
      if (user.token) {
        fetch(`${REACT_APP_API_ENDPOINT}/auth/is-operator`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: user.token }),
        })
          .then((r) => r.json())
          .then((r) => {
            setIsOperator(r.isOperator);
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
        <Sider className="custom-sider"  width={300} collapsible collapsed={collapsed} collapsedWidth={80}>
          <Button type="primary" onClick={toggleCollapse} className="collapse-button" style={{ margin: '16px',marginTop: '70px' }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          <Menu className='custom-menu'
            mode="inline"
            selectedKeys={[selectedKey]}
          >
            <Menu.Item   key="home" icon={<HomeOutlined />}>
              <Link  to="/home">Inicio</Link>
            </Menu.Item>
            {isAdmin && (
              <Menu.Item key="companies" icon={<BankOutlined />}>
                <Link to="/companies">Empresas</Link>
              </Menu.Item>
            )}
            {(isAdmin || isOperator) && (
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
              <Link to="/my-forms">Registros</Link>
            </Menu.Item>
            {isAdmin && (
              <Menu.Item key="payments" icon={<DollarOutlined />}>
                <Link to="/payments">Pagos</Link>
              </Menu.Item>
            )}
            <Menu.Item key="change-password" icon={<KeyOutlined />} >
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

