import styles from "../../../css/components/primitives/indicator.scss";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default class Indicator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: props.active,
            type: props.type ? props.type : "chevron",
            label: props.label
        };
    }

    static getDerivedStateFromProps = (props, state) => {
        return({
            active: props.active ? props.active : false,
            type: props.type ? props.type : "chevron"
        });
    }

    render () {

        const { active, label } = this.state;

        if(label) {
            var labelDOM = <label style={this.props.style}>{label}</label>;
        } else {
            var labelDOM = null;
        }

        return(
            <button className={`jsw-indicator${ active ? " active" : ""}`}>
                {labelDOM}
                <div className="jsw-chevron" css={this.props.arrowStyle}></div>
            </button>
        );

    }

}