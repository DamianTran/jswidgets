import styles from "../../../css/components/primitives/loader.scss";

export default class Loader extends React.Component {

    static defaultProps = {
        loading: false
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: props.loading,
            lastLoading: props.loading
        };
    }

    static getDerivedStateFromProps = (props, state) => {
        if(props.loading !== state.lastLoading) {
            return({
                loading: props.loading,
                lastLoading: props.loading
            });
        }

        return null;
    }

    setLoading = state => {
        this.setState({
            loading: state
        });
    }

    render() {

        const { loading } = this.state;
        const {
            style,
            theme,
            size
        } = this.props;

        let custStyles = {};
        if(size) {
            custStyles.width = custStyles.minWidth = custStyles.height = custStyles.minHeight = `${size}px`;
        }

        return(
            <div 
                className={`jsw-loader${ loading ? " loading" : "" }${ theme ? " " + theme : "" }`}
                style={{...custStyles, ...style}}></div>
        );
    }
}

export { Loader }