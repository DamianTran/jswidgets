import styles from "../../../css/components/widgets/navigation.scss";

import ClickZone from "../primitives/clickzone";
import Dropdown from "../containers/dropdown";

import {
    jswFirstVisit,
    jswNumVisits
} from "../../utils/localStorage";

class HamburgerButton extends React.Component {

    static defaultProps = {
        buttonType : "square",
        open: false,
        style: {},
        widgets: []
    };

    constructor(props) {
        super(props);

        this.state = {
            open: props.open
        }

        this.onClick = props.onClick;
    }

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
        this.onClick(this.state.open);
    }

    close = () => {
        this.setState({
            open: false
        });
    }

    render() {

        const { open } = this.state;
        const { lines, body } = this.props.style;
        const { 
            className,
            buttonType,
            widgets
        } = this.props;

        let lineDOM = [];

        let lineStyle = open ? {...lines, ...this.props.style.openLines} : lines;

        switch(buttonType) {
            case 'midwide':
            case 'topwide':
            case 'bottomwide':
            case 'topwide-left':
            case 'midwide-left':
            case 'bottomwide-left':
                lineDOM = [
                    <div className="line" style={lineStyle} key={1}></div>,
                    <div className="line" style={lineStyle} key={2}></div>,
                    <div className="line" style={lineStyle} key={3}></div>
                ];
                break;
            case 'topwide2':
            case 'bottomwide2':
            case 'topwide2-left':
            case 'bottomwide2-left':
                lineDOM = [
                    <div className="line" style={lineStyle} key={1}></div>,
                    <div className="line" style={lineStyle} key={2}></div>
                ];
                break;
            default:
                lineDOM = [
                    <div className="line" style={lineStyle} key={1}></div>,
                    <div className="line" style={lineStyle} key={2}></div>,
                    <div className="line" style={lineStyle} key={3}></div>
                ];
        }

        return(
            <div 
                type="button" 
                className={`jsw-hamburger-button${ open ? " open " : "" } ${buttonType}${ className ? " " + className : ""}`}
                onClick={this.toggle}
                style={open ? {...body, ...this.props.style.openBody} : body}>
                    {lineDOM}
            </div>
        )

    }
}

class HamburgerMenu extends React.Component {

    static defaultProps = {
        buttonType: "square",
        open: false
    };

    constructor(props) {
        super(props);

        this.state = {
            open: props.open
        };
    }

    open = () => {
        this.setState({
            open: true
        });
    }

    close = () => {
        this.setState({
            open: false
        });
    }

    toggle = state => {
        this.setState({
            open: state
        });
    }

    render() {

        const { open } = this.state;
        const {
            buttonStyle,
            buttonType,
            style
        } = this.props;
        
        return(
            [ 
                <HamburgerButton 
                    buttonType={buttonType} 
                    open={open} 
                    key={0} 
                    style={buttonStyle}
                    onClick={state => { this.toggle(!state); }}/>,
                <div 
                    className={`jsw-hamburger-menu${ open ? " open" : "" }`} 
                    key={1}
                    style={style}>
                        {this.props.children}
                </div>
            ]
        );

    }
}

class NavigationButton extends React.Component {
    constructor(props) {
        super(props);

        this.dropdown = React.createRef();

        this.state = {
            hover: false
        };
    }

    hoverOn = () => {
        if(this.props.children) {
            this.dropdown.current.open();
        }
        this.setState({
            hovering: true
        });
    }

    hoverOff = () => {
        if(this.props.children) {
            this.dropdown.current.close();
        }
        this.setState({
            hovering: false
        });
    }

    render() {

        const {
            style,
            href,
            label,
            icon,
            hover,
            anim,
            onClick
        } = this.props;

        const {
            hovering
        } = this.state;

        const newStyle = {...style, ...(hovering ? hover : null)};

        if(this.props.children) {
            var dropdown = <Dropdown ref={this.dropdown}>
                {this.props.children}
            </Dropdown>;

            switch(this.props.arrow) {
                case 'chevron':
                    var arrowClass = "jsw-chevron";
                    break;
                default:
                    var arrowClass = "jsw-arrow";
            }

            var labelDOM = [
                <p 
                    key={label}
                    style={newStyle}>{label}</p>, 
                <div 
                    className={arrowClass} 
                    key={2}></div>
            ];

        } else {

            if(newStyle) {

                var {
                    fontWeight,
                    fontFamily,
                    fontSize,
                    letterSpacing,
                    lineHeight,
                    color,
                    iconFilter
                } = newStyle;

            }

            var dropdown = null;

            if(icon) {
                var labelDOM = [
                    <img 
                        className="jsw-navigation-button-icon"
                        key={0}
                        style={{
                            filter: iconFilter
                        }}
                        src={icon} 
                        alt={`${label} icon`} />,
                    <p 
                        key={1}
                        style={{
                            fontWeight,
                            fontFamily,
                            fontSize,
                            letterSpacing,
                            lineHeight,
                            color
                        }}>{label}</p>
                ]
            } else {
                var labelDOM = <p style={{
                    fontWeight,
                    fontFamily,
                    fontSize,
                    letterSpacing,
                    lineHeight,
                    color
                }}>{label}</p>
            }
        }

        const {
          margin,
          ...ostyles
        } = newStyle;

        return(
            <div 
                className="jsw-navigation-item"
                onClick={e => onClick(e, href)}
                style={{
                  margin: margin
                }}>
                <a 
                    className={`jsw-navigation-link${ anim ? " " + anim : "" }`} 
                    href={href}>
                    <button 
                        className={`jsw-navigation-button`} type="button"
                        style={ostyles}
                        onMouseEnter={this.hoverOn} 
                        onMouseLeave={this.hoverOff}>{labelDOM}</button>
                </a>
                {dropdown}
            </div>
        )
    }
}

class NavigationDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            href: props.href,
            label: props.label
        };

        this.dropdown = React.createRef();
    }

    hoverOn = () => {
        if(this.props.children) {
            this.dropdown.current.open();
        }
    }

    hoverOff = () => {
        if(this.props.children) {
            this.dropdown.current.close();
        }
    }

    render() {

        const { label, href } = this.state;

        switch(this.props.arrow) {
            case 'chevron':
                var arrowClass = "jsw-chevron";
                break;
            default:
                var arrowClass = "jsw-arrow";
        }

        return(
            <div className="jsw-navigation-item" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}>
                <a className="jsw-navigation-link" href={href}>
                    <button className="jsw-navigation-button" type="button">
                        <p>{label}</p>
                        <div className={arrowClass}></div>
                    </button>
                </a>
                <Dropdown ref={this.dropdown} style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    width: `${this.props.children.length * 100}%`,
                    borderRadius: '0 0 4px 4px',
                    backgroundColor: 'var(--themeNavigationAlpha)'
                }}>
                    {this.props.children}
                </Dropdown>
            </div>
        )

    }
}

const NavigationLogo = props => {

    const { 
        href, 
        image,
        style,
        onClick 
    } = props;

    return(
        <a 
            className="jsw-navigation-logo" 
            onClick={onClick ? e => {
              e.preventDefault();
              e.stopPropagation();
              onClick(href);
            } : null}
            href={href}>
            <img 
                src={image} 
                style={style}
                alt="Navigation logo" />
        </a>
    );
}

class NavigationGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="jsw-navigation-group">
                {this.props.children}
            </div>
        );
    }
}

export default class Navigation extends ClickZone {

    static defaultProps = {
        open: false,
        scrollParent: window
    }

    constructor(props) {
        super(props);

        this.extendState({
            isStatic: props.static,
            scrollTop: $(window).scrollTop(),
            lastScrollTop: $(window).scrollTop()
        });
    }

    render() {

        const {
            isStatic,
            scrollTop,
            lastScrollTop
        } = this.state;

        const {
            open,
            style,
            align,
            shrink,
            hide,
            grow,
            scrollParent,
            showOnScrollUp,
            ...oprops
        } = this.props;

        const scrollUpTrigger = showOnScrollUp && scrollTop < lastScrollTop;
        const shrinkTrigger = shrink && (scrollTop >= shrink) && !scrollUpTrigger;
        const hideTrigger = (hide && (scrollTop >= hide) && !scrollUpTrigger);

        return(
            <div 
                className={`jsw-navigation${ isStatic ? " static" : ""}`}
                {...oprops}>
                <div 
                    className={`jsw-navigation-bar${ hideTrigger ? " hidden" : ""}${ shrinkTrigger ? " shrink" : ""}${ align ? " " + align : "" }`}
                    style={style}>
                    {this.props.children}
                </div>
            </div>
        );

    }

    componentDidMount = () => {

        const {
            scrollParent
        } = this.props;

        $(scrollParent)
            .scroll(() => {
                const lastScrollTop = this.state.scrollTop;
                this.setState({
                    lastScrollTop: lastScrollTop,
                    scrollTop: $(scrollParent).scrollTop()
                });
            });

    }

}

export { 
    Navigation, 
    NavigationButton,
    NavigationLogo,
    NavigationGroup,
    NavigationDropdown,
    HamburgerMenu,
    HamburgerButton
};