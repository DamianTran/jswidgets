import styles from "../../../css/components/widgets/dropdown";

class DropdownItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text,
            href: props.href
        };
    }

    render() {

        const { href, text } = this.state;

        return (
            <button className="jsw-dropdown-item" style={this.props.style}>
                <a href={href}>{text}</a>
                {this.props.children}
            </button>
        );
    }
}

export default class Dropdown extends ClickZone {

    static defaultProps = {
        open: false
    };

    constructor(props) {
        super(props);

        this.extendState({
            open: props.open
        });
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
        const { open, clicked } = this.state;

        <div className={`jsw-dropdown${ open && clicked ? " open" : "" }`} style={this.props.style}>
            {this.props.children}
        </div>
    }
}

export { DropdownItem, Dropdown };