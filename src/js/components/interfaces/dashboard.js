import { HamburgerButton } from "../widgets/navigation";
import { Collapsable } from "../../..";

import "../../../css/components/interfaces/dashboard.scss";

const DashboardContext = React.createContext();

class DashboardTop extends React.Component {

  static contextType = DashboardContext;

  constructor(props) {
    super(props);

    this.state = {
      logo: props.logo,
      dock: props.dock,
      user: props.user
    };

    this.lastUser = props.user;
  }

  static getDerivedStateFromProps = (props, state) => {
    if (JSON.stringify(this.lastUser) !== JSON.stringify(props.user)) {
      return ({
        user: props.user
      });
    }

    return ({});
  }

  render() {

    const { logo, dock } = this.state;
    const { user } = this.props;

    if(user.icon) {
      var iconDOM = user.icon;
    } else if(user.thumbnail) {
      var iconDOM = <img src={user.thumbnail} alt={`${user.name || "User"} thumbnail`} />;
    } else if(user.name) {

      let spl = user.name.split(/\s+?/).filter(v => v);
      let initials;

      if(spl.length > 1) {
        initials = spl[0][0] + spl[spl.length-1][0];
      } else if(spl.length) {
        initials = spl[0][0];
      }

      var iconDOM = <div className="jsw-navigation-initial-bubble">
        <h3>{initials.toUpperCase()}</h3>
      </div>;
    }

    return (
      <div className="jsw-navigation-top">
        {this.props.children ?
          <div className={`jsw-child-container counter-${dock}`}>
            {this.props.children}
          </div> : null}
        <img src={logo} alt="Navigation logo" />
        {user ?
          <div 
            className={`jsw-navigation-user counter-${dock}`}
            onClick={e => {
              if(user.onClick) {
                user.onClick(e);
              }

              const {
                switchTo
              } = this.context;

              if(switchTo && user.accountPage) {
                switchTo(user.accountPage);
              }
            }}>
            <div className="jsw-user-desc">
              <h3>{user.name}</h3>
              <p>{user.type}</p>
            </div>
            <div className="jsw-user-icon">
              {iconDOM}
            </div>
          </div> : null}
      </div>
    );

  }
}

class DashboardNavigationButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = props.onClick;
  }

  render() {

    const {
      name,
      icon,
      label,
      contents,
      onClick
    } = this.props;

    let contentDOM = [];

    if (contents) {
      for (const content of contents) {

        const {
          name,
          label,
          contents,
          icon
        } = content;

        contentDOM.push(
          <DashboardNavigationButton
            name={name || label}
            label={label}
            key={name || label}
            icon={icon}
            contents={contents}
            onClick={onClick} />
        );
      }
    }

    return (
      contents && contents.length ?
        <Collapsable title={label || name} button>
          {contentDOM}
        </Collapsable>
        :
        <div className={`jsw-navigation-button`} onClick={() => { this.onClick(name) }}>
          {icon || null}
          {label ? <h3>{label}</h3> : null}
          {this.props.children}
        </div>
    )
  }
}

class DashboardNavigation extends React.Component {

  static defaultProps = {
    onSelect: () => { return false; },
    dock: 'left',
    open: true,
    style: {}
  }

  constructor(props) {
    super(props);

    this.state = {
      dock: props.dock,
      open: props.open
    };

    this.onSelect = props.onSelect;
  }

  toggle = state => {
    this.setState({
      open: state
    });
  }

  close = () => {
    this.setState({
      open: false
    });
  }

  render() {

    let buttons = [];

    let {
      list
    } = this.props;
    let { navigation, button, buttonlines } = this.props.style;
    let { dock, open } = this.state;

    if (list) {
      for (const entry of list) {
        const {
          name,
          label,
          icon,
          contents
        } = entry;

        buttons.push(
          <DashboardNavigationButton
            name={name || label}
            label={label}
            icon={icon}
            contents={contents}
            key={name || label}
            onClick={this.onSelect} />
        );
      }
    }

    return (
      <div className={`jsw-dashboard-navigation ${dock}${open ? " open" : ""}`} style={navigation}>
        <div className={`jsw-navigation-list`}>
          {buttons}
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default class Dashboard extends React.Component {

  static defaultProps = {
    selected: "home",
    navigation: {
      pages: [
        {
          name: "home",
          icon: ""
        }
      ]
    },
    dock: "right",
    switchAnim: 'fade',
    animRate: 400,
    buttonType: 'topwide',
    style: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: localStorage.getItem('jsw-dashboard-selected') || props.selected,
      user: props.user,
      switching: false
    };

    this.navigation = React.createRef();
    this.navigationButton = React.createRef();
    this.childContainer = React.createRef();

    this.lastUser = {};
  }

  static getDerivedStateFromProps = (props, state) => {
    if (JSON.stringify(this.lastUser) !== JSON.stringify(props.user)) {
      return ({
        user: props.user
      });
    }

    return ({});
  }

  toggleMenu = state => {
    this.navigation.current.toggle(state);
  }

  onSelect = panel => {
    localStorage.setItem('jsw-dashboard-selected', panel);

    this.setState({
      switching: true
    }, () => {

      this.setState({
        selected: panel
      }, () => {

        if(this.switchTimeout) {
          clearTimeout(this.switchTimeout);
        }

        this.switchTimeout = setTimeout(() => {
          this.setState({
            switching: false
          });
          this.switchTimeout = null;
        }, this.props.animRate);

        const { onSwitch } = this.props;
        if (onSwitch) {
          onSwitch(panel);
        }
      });

    });

    history.pushState({
      panel
    }, panel, window.location);
  }

  switchTo = panel => {

    localStorage.setItem('jsw-dashboard-selected', panel);

    this.setState({
      switching: true
    }, () => {

      this.setState({
        selected: panel,
      }, () => {
        if(this.switchTimeout) {
          clearTimeout(this.switchTimeout);
        }

        this.switchTimeout = setTimeout(() => {
          this.setState({
            switching: false
          });
          this.switchTimeout = null;
        }, this.props.animRate);
      });

    });

    history.pushState({
      panel
    }, panel, window.location);
  }

  closeMenu = state => {
    this.navigation.current.close();
    this.navigationButton.current.close();
  }

  openMenu = state => {
    this.navigation.current.open();
    this.navigationButton.current.open();
  }

  onWindowPopState = e => {
    const {
      panel
    } = e.state;

    localStorage.setItem('jsw-dashboard-selected', panel);
    this.setState({
      selected: panel
    }, () => {
      const { onSwitch } = this.props;
      if (onSwitch) {
        onSwitch(panel);
      }
    });
  }

  render() {

    const {
      navigation,
      dock,
      style,
      logo,
      buttonType,
      user,
      switchAnim,
      animRate
    } = this.props;

    const {
      top,
      menuButton,
      menuButtonLines
    } = style;

    const { 
      selected,
      switching 
    } = this.state;

    let selectedIndex = 0;
    let valid_children = React.Children.toArray(this.props.children).filter(o => o);
    for (let i = 0; i < valid_children.length; ++i) {
      if (valid_children[i].props.name === selected) {
        selectedIndex = i;
        break;
      }
    }

    const children = React.Children.map(valid_children, (child, i) => React.cloneElement(child, {
      visible: child.props.name === selected,
      index: i - selectedIndex,
      switchView: this.onSelect,
      animRate: animRate,
      switching: switching,
      anim: switchAnim
    }));

    if(navigation.top.widgets) {
      var widgetDOM = React.Children.toArray(navigation.top.widgets).map((e, i) => React.cloneElement(e, {
        key: i
      }));
    }

    return (
      <DashboardContext.Provider
        value={{
          switchTo: this.switchTo
        }} >
        <div className="jsw-dashboard">
          <DashboardTop
            style={top}
            logo={logo}
            user={user}
            dock={dock} >
              {widgetDOM}
          </DashboardTop>
          <HamburgerButton
            buttonType={buttonType}
            open={false}
            className={dock}
            onClick={state => { this.toggleMenu(!state); }}
            style={{
              background: menuButton,
              lines: menuButtonLines
            }}
            ref={this.navigationButton} />
          <div
            className="jsw-dashboard-main"
            ref="children">
            <DashboardNavigation
              list={navigation.pages}
              dock={dock}
              open={false}
              ref={this.navigation}
              onSelect={this.onSelect} />
            <div className="jsw-dashboard-views" onClick={this.closeMenu}>
              {children}
            </div>
          </div>
        </div>
      </DashboardContext.Provider>
    )
  }

  componentDidMount = () => {

    const {
      onSwitch
    } = this.props;

    if(onSwitch) {
      onSwitch(this.state.selected);
    }

    history.pushState({
      panel: this.state.selected
    }, this.state.selected, window.location);

    window.addEventListener('popstate', this.onWindowPopState, false);
    
  }

  componentWillUnmount = () => {
    window.removeEventListener('popstate', this.onWindowPopState, false);
  }

}

export { Dashboard };