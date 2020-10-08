import "../../../css/components/widgets/radio.scss";

const RadioItem = props => {

    const {
      selected,
      id,
      value,
      label,
      onSelect
    } = props;

    return (
      <div 
        className={`jsw-radio-item${selected ? " selected" : ""}`}
        onClick={() => { onSelect(value) }}>
          <label 
            htmlFor={id}>{label || value}</label>
          <button 
            type="button" id={id} 
            className="jsw-radio-button"></button>
      </div>
    );
  
}

export default class Radio extends React.Component {

  static defaultProps = {
    toggle: false,
    content: []
  };

  static __guid = 0;

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      lastValue: props.value
    };

    this.id = `jsw-radio-${Radio.__guid++}`;
  }

  static getDerivedStateFromProps = (props, state) => {
    const output = {};
    if(state.lastValue !== props.value) {
      output.lastValue = output.value = props.value;
    }
    return output;
  }

  selectItem = (value) => {

    const {
      toggle,
      name,
      onChange
    } = this.props;

    if(toggle && this.state.value === value) {
        this.setState({
          value: null
        }, () => {
          if (onChange) {
            onChange(this.state.value, name);
          }
        });
    } else {
      this.setState({
        value: value
      }, () => {
        if (onChange) {
          onChange(this.state.value, name);
        }
      });
    }

  }

  getValue = () => {
    return this.state.value;
  }

  setValue = (newValue) => {
    this.setState({
      value: newValue
    });
  }

  render() {

    const {
      options,
      label
    } = this.props;

    const {
      value
    } = this.state;

    let optionsDOM = options.map((v, i) => {

      let itemIsObject = typeof v === 'object' && v;
      let itemValue = itemIsObject ? v.name || v.label : v;
      
      return <RadioItem
                key={name}
                id={this.id}
                value={itemValue}
                label={itemIsObject ? v.label || v.name : v}
                selected={itemValue === value}
                onSelect={this.selectItem} />

    });

    return (
      <div className="jsw-radio">
        { label ? <h3>{label}</h3> : null }
        {optionsDOM}
      </div>
    );
  }
}

export { Radio };