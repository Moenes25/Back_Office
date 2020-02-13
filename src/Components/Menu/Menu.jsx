/* eslint-disable no-undef */
import React from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import Sidebar from 'react-sidebar';
import { NavLink } from 'react-router-dom';


class CustomMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      activeItem: 'home',
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  onSetSidebarOpen= (open) => {
    this.setState({ sidebarOpen: open });
  }

  render() {
    const { sidebarOpen, activeItem } = this.state;
    return (
      sidebarOpen
        ? (
          <Sidebar
            sidebar={(
              <Menu pointing secondary inverted vertical>
                <NavLink to="/app/user-list">
                  <Menu.Item link={false} name="Users" active={activeItem === 'Users'} onClick={this.handleItemClick}>
                    Users
                      <Icon name="users" style={{ marginRight: '1.6%' }} />
                  </Menu.Item>
                </NavLink>
                <NavLink className="Menu-Item" to="/app/planetes-list">
                  <Menu.Item
                    className="Menu-Item"
                    name="Planètes"
                    active={activeItem === 'Planètes'}
                    onClick={this.handleItemClick}
                  >
                  Planètes
                  <Icon name="react" size="large" />
                  </Menu.Item>
                </NavLink>
                <Dropdown item text="Candidate">
                  <Dropdown.Menu style={{ left: '0px', top: '50px' }}>
                    <Dropdown.Item><NavLink style={{ color: 'inherit' }} to="/app/candidateList"> Candidate Spontané</NavLink></Dropdown.Item>
                    <Dropdown.Item><NavLink style={{ color: 'inherit' }} to="/app/CandidateListNormal"> Candidate Normale </NavLink></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu>
            )}
            open={sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            shadow={false}
            styles={{
              sidebar: {
                background: 'black', top: '74px', width: '213px', transition: '0.6s',
              },
            }}
          >
            &nbsp;
          </Sidebar>
        )
        : (
          <Icon name="bars" color="black" size="big" onClick={() => this.onSetSidebarOpen(true)} style={{ marginLeft: '20px' }} />
        )
    );
  }
}


export default CustomMenu;

