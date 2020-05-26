import styles from "../../../css/components/containers/view.scss";

export default class View extends React.Component {

    static defaultProps = {
        visible: true,
        anim: "slide"
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: props.visible
        };

        this.name = props.name;
        this.anim = props.anim;
    }

    static getDerivedStateFromProps = (props, state) => {
        if(state.visible !== props.visible) {
            return({
                visible: props.visible
            });
        } else {
            return({});
        }
    }

    getName = () => {
        return this.name;
    }

    show = () => {
        this.setState({
            visible: true
        });
    }

    hide = () => {
        this.setState({
            visible: false
        });
    }

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {

        const { visible } = this.state;
        const { className } = this.props;

        return(
            <div className={`jsw-view${ visible ? "" : " hidden"}${className ? " " + className : ""}`}>
                {this.props.children}
            </div>
        );
    }
}