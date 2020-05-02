import styles from "../../../css/components/widgets/toggle.scss";

var JSToggleUID = 0;

export default class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            on: this.props.on ? this.props.on : false,
            label: this.props.label ? this.props.label : "",
            uid: 'jstoggle-' + JSToggleUID
        }
        ++JSToggleUID;
    }

    buttonToggle = () => {
        this.setState({
            on: !this.state.on
        });
    }

    render = () => {
        const { on, label, uid } = this.state;

        if(label) {
            var labelDOM = <label htmlFor={uid}>{label}</label>
        } else {
            var labelDOM = null;
        }

        return (
            <div className={`jsw-toggle${ on ? " on" : "" }`}>
                {labelDOM}
                <button id={uid} type="button" className={`jsw-toggle-button${ on ? " on" : "" }`} onClick={this.buttonToggle}>
                    <div className='jsw-toggle-knob'></div>
                </button>
            </div>
        );
    }
}