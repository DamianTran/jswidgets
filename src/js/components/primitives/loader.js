import styles from "../../../css/components/primitives/loader.css";

export default class Loader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: props.loading ? props.loading : false
        };
    }

    render() {

        const { loading } = this.state;
        return(
            <div className={`jsw-loader${ loading ? " loading" : "" }`}></div>
        )
    }
}