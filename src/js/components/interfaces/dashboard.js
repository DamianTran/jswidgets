import styles from "../../../css/components/interfaces/dashboard.scss";

import View from "../containers/view";
import { HamburgerButton } from "../widgets/navigation";

class DashboardTop extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            logo: props.logo
        };
    }

    render() {

        const { logo } = this.state;
        
        return(
            <div className="jsw-navigation-top">
                <img src={logo} alt="Navigation logo" />
                {this.props.children}
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
            contents
        } = this.props;

        return(
            <div className={`jsw-navigation-button`} onClick={() => { this.onClick(name) }}>
                {icon || null}
                { label ? <h3>{label}</h3> : null }
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
        style: { }
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

        if(list) {
            for(const entry of list) {
                const {
                    name,
                    label,
                    icon,
                    contents
                } = entry;

                buttons.push(
                    <DashboardNavigationButton 
                        name={name}
                        label={label}
                        icon={icon}
                        contents={contents}
                        key={name}
                        onClick={this.onSelect}/>
                );
            }
        }

        return(
            <div className={`jsw-dashboard-navigation ${dock}${open ? " open" : "" }`} style={navigation}>
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
        navigation: [
            {
                name: "home",
                icon: ""
            }
        ],
        dock: "right",
        switchAnim: 'slide',
        buttonType: 'topwide',
        style: {}
    };

    constructor(props) {
        super(props);

        this.state = {
            selected: props.selected
        };

        this.navigation = React.createRef();
        this.navigationButton = React.createRef();
        this.childContainer = React.createRef();
    }

    toggleMenu = state => {
        this.navigation.current.toggle(state);
    }

    onSelect = panel => {
        this.setState({
            selected: panel
        });
    }

    closeMenu = state => {
        this.navigation.current.close();
        this.navigationButton.current.close();
    }

    openMenu = state => {
        this.navigation.current.open();
        this.navigationButton.current.open();
    }

    switchTo = panelName => {
        this.setState({
            selected: panelName
        });
    }

    render() {

        const {
            navigation,
            dock,
            style,
            logo,
            buttonType
        } = this.props;

        const { 
            top,
            menuButton,
            menuButtonLines
        } = style;

        const { selected } = this.state;

        const children = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
            visible: child.props.name === selected,
            switchView: this.switchTo
        }));

        return(
            <div className="jsw-dashboard">
                <DashboardTop 
                    style={top} 
                    logo={logo}/>
                <HamburgerButton 
                    buttonType={buttonType} 
                    open={false} 
                    className={dock}
                    onClick={state => { this.toggleMenu(!state); }}
                    style={{
                        background: menuButton,
                        lines: menuButtonLines
                    }}
                    ref={this.navigationButton}/>
                <div 
                    className="jsw-dashboard-main"
                    ref="children">
                    <DashboardNavigation 
                        list={navigation} 
                        dock={dock} 
                        open={false}
                        ref={this.navigation}
                        onSelect={this.onSelect}/>
                    <div className="jsw-dashboard-views" onClick={this.closeMenu}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }

}