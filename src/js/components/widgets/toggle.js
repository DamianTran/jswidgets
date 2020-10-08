import styles from "../../../css/components/widgets/toggle.scss";

var JSToggleUID = 0;

export default class Toggle extends React.Component {

  static defaultProps = {
    on: false
  }

  constructor(props) {
    super(props);
    this.state = {
      on: props.on,
      laston: props.on,
      label: props.label,
      uid: 'jstoggle-' + JSToggleUID
    }
    ++JSToggleUID;
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.on !== state.laston) {
      return ({
        on: props.on,
        laston: props.on
      });
    }

    return null;
  }

  buttonToggle = () => {
    this.setState({
      on: !this.state.on
    }, () => {
      const {
        name,
        onChange,
        options
      } = this.props;

      if (onChange) {
        if (options) {
          onChange(this.state.on ? options.on : options.off);
        } else {
          onChange(this.state.on, name);
        }
      }
    });
  }

  getValue = () => {
    const {
      options
    } = this.props;

    if (options) {
      return this.state.on ? options.on : options.off;
    }
    return this.state.on;
  }

  setValue = state => {
    const {
      options
    } = this.props;

    if (options) {
      this.setState({
        on: options.on === state
      });
    } else {
      this.setState({
        on: state
      });
    }
  }

  render = () => {
    let { on, label, uid } = this.state;
    const {
      value,
      options
    } = this.props;

    if (value && options) {
      on = options.on === value;
    } else if(value) {
      on = (typeof value === 'string' && value.toLowerCase() === 'true') || (value === true);
    }

    if (label) {
      var labelDOM = <label htmlFor={uid}>{label}</label>
    } else {
      var labelDOM = null;
    }

    return (
      <div className={`jsw-toggle${on ? " on" : ""}`}>
        {labelDOM}
        <button id={uid} type="button" className={`jsw-toggle-button${on ? " on" : ""}`} onClick={this.buttonToggle}>
          <div className='jsw-toggle-knob'></div>
        </button>
      </div>
    );
  }
}

export { Toggle };