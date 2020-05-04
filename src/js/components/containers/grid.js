import styles from "../../../css/components/containers/grid.scss";

const Column = props => {

    return(
        <div className="jsw-cell jsw-column" style={props.style}>
            {props.children}
        </div>
    );

}

const Row = props => {

    return(
        <div className="jsw-cell jsw-column" style={props.style}>
            {props.children}
        </div>
    );

}

export default class Grid extends React.Component {

    static defaultProps = {
        rows: 1,
        columns: 1
    };

    constructor(props) {
        super(props);

        this.state = {
            rows: props.rows,
            columns: props.columns
        };
    }

    render() {

        return(
            <div className="jsw-grid" style={this.props.style}></div>
        );
    }

}

export {
    Row,
    Column,
    Grid
};