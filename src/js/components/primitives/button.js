import styles from "../../../css/components/primitives/button.scss";

import Loader from "./loader";

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value ? props.value : "",
            active: props.active ? props.active : false,
            loading: props.loading ? props.loading : false
        };

        this.onClick = props.onClick ? props.onClick : () => { return false; };
    }

    static getDerivedStateFromProps = (props, state) => {
        return({
            value: props.value ? props.value : "",
            active: props.active ? props.active : false,
            loading: props.loading ? props.loading : false
        });
    }

    setLoading = (state) => {
        this.setState({
            loading: state
        });
    }

    render() {
        const { value, loading } = this.state;
        const { className, style } = this.props;
        return(
            <button 
                className={`jsw-button${ loading ? " loading" : "" }${className ? ' ' + className : ""}`} type="button" onClick={this.onClick}
                style={style}>
                <Loader loading={loading}></Loader>
                <div className="jsw-button-content">
                    {value}
                    {this.props.children}
                </div>
            </button>
        );
    }
}