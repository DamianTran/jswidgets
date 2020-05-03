import styles from "../../../css/components/widgets/navigation.scss";

import ClickZone from "../primitives/clickzone";

import {
    jswFirstVisit,
    jswNumVisits
} from "../../utils/localStorage";

class HamburgerMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonType: props.buttonType ? props.buttonType : "square",
            open: props.open ? props.open : false
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

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {

        const { buttonType, open } = this.state;

        let lines = [];

        switch(buttonType) {
            case 'midwide':
            case 'topwide':
            case 'bottomwide':
                lines = [
                    <div className="line" key={1}></div>,
                    <div className="line" key={2}></div>,
                    <div className="line" key={3}></div>
                ];
                break;
            case 'topwide2':
            case 'bottomwide2':
                lines = [
                    <div className="line" key={1}></div>,
                    <div className="line" key={2}></div>
                ];
                break;
            default:
                lines = [
                    <div className="line" key={1}></div>,
                    <div className="line" key={2}></div>,
                    <div className="line" key={3}></div>
                ];
        }
        
        return(
            [ 
                <div type="button" className={`jsw-hamburger-button${ open ? " open " : "" } ${buttonType}`} onClick={this.toggle} key={1}>
                    {lines}
                </div>,
                <div className={`jsw-hamburger-menu${ open ? " open" : "" }`} key={2}>
                    {this.props.children}
                </div>
            ]
        );

    }
}

class NavigationButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            href: props.href,
            label: props.label
        };
    }

    render() {
        const { href, label } = this.state;
        return(
            <a className="jsw-navigation-link" href={href}>
                <button className="jsw-navigation-button" type="button">{label}</button>
            </a>
        )
    }
}

class NavigationLogo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            href: props.href ? props.href : ".",
            image: props.image ? props.image : ""
        };
    }

    render() {

        const { href, image } = this.state;

        return(
            <a className="jsw-navigation-logo" href={href}>
                <img src={image} alt="Navigation logo" />
            </a>
        );
    }
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

    constructor(props) {
        super(props);

        this.extendState({
            open: props.open ? props.open : false,
            grow: props.grow,
            shrink: props.shrink,
            hide: props.hide,
            showOnScrollUp: props.showOnScrollUp,
            isStatic: props.static,
            scrollTop: $(window).scrollTop(),
            lastScrollTop: $(window).scrollTop()
        });
    }

    render() {

        const {
            open,
            grow,
            shrink,
            hide,
            isStatic,
            scrollTop,
            lastScrollTop,
            showOnScrollUp
        } = this.state;

        const scrollUpTrigger = showOnScrollUp && scrollTop < lastScrollTop;
        const shrinkTrigger = shrink && (scrollTop >= shrink) && !scrollUpTrigger;
        const hideTrigger = (hide && (scrollTop >= hide) && !scrollUpTrigger);

        return(
            <div 
                className={`jsw-navigation${ isStatic ? " static" : ""}`}>
                <div 
                    className={`jsw-navigation-bar${ hideTrigger ? " hidden" : ""}${ shrinkTrigger ? " shrink" : ""}`}>
                    {this.props.children}
                </div>
            </div>
        );

    }

    componentDidMount = () => {

        $(window)
            .scroll(() => {
                const lastScrollTop = this.state.scrollTop;
                this.setState({
                    lastScrollTop: lastScrollTop,
                    scrollTop: $(window).scrollTop()
                });
            });

    }

}

export { 
    Navigation, 
    NavigationButton,
    NavigationLogo,
    NavigationGroup,
    HamburgerMenu
};