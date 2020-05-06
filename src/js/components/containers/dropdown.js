import styles from "../../../css/components/containers/dropdown.scss";

import ClickZone from "../primitives/clickzone";

class DropdownItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: props.label,
            href: props.href
        };
    }

    render() {

        const { href, label } = this.state;

        return (
            <a href={href}>
                <button className="jsw-dropdown-item" style={this.props.style}>
                    <p>{label}</p>
                    {this.props.children}
                </button>
            </a>
        );
    }
}

export default class Dropdown extends React.Component {

    static defaultProps = {
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

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const { open } = this.state;

        return(
            <div className={`jsw-dropdown${ open ? " open" : "" }`} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}

export { DropdownItem, Dropdown };