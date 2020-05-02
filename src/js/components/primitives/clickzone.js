import ExtendableComponent from "./extendable";

export default class ClickZone extends ExtendableComponent {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        };
    }

    handleClick = event => {
        let clickState = this.node && this.node.contains(event.target);

        this.setState({
            open: clickState ? this.state.open : clickState,
            clicked: clickState
        });
    }

    componentDidMount = () => {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

}