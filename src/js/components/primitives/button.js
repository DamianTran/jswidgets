import styles from "../../../css/components/primitives/button.css";

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

    render() {
        const { value, loading } = this.state;
        return(
            <button className="jsw-button" type="button" onClick={this.onClick}>
                <Loader loading={loading}></Loader>
                {value}
            </button>
        );
    }
}