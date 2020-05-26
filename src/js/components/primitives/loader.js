import styles from "../../../css/components/primitives/loader.scss";

export default class Loader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: props.loading ? props.loading : false
        };

        this.lastLoading = props.loading;
    }

    static getDerivedStateFromProps = (props, state) => {
        if(props.loading != this.lastLoading) {
            this.lastLoading = props.lastLoading;
            return({
                loading: props.loading
            });
        } else if(state.loading != this.lastLoading) {
            this.lastLoading = state.lastLoading;
            return({
                loading: state.loading
            });
        } 
        else {
            return ({});
        }
    }

    setLoading = state => {
        this.setState({
            loading: state
        });
    }

    render() {

        const { loading } = this.state;

        return(
            <div className={`jsw-loader${ loading ? " loading" : "" }`}></div>
        )
    }
}