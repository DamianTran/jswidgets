import styles from "../../../css/components/widgets/select.scss";

import ClickZone from "../primitives/clickzone";

class SelectorItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {
      value,
      label,
      icon,
      button,
      onClick,
      applyStyle
    } = this.props;

    if(applyStyle) {
      const style = {
        [applyStyle]: value
      };

      var {
        fontWeight,
        letterSpacing,
        fontFamily,
        lineHeight,
        color,
        fontStyle,
        fontSize,
        ...ostyle
      } = style;

      var fontStyle = {
        fontWeight,
        letterSpacing,
        fontFamily,
        lineHeight,
        color,
        fontStyle,
        fontSize
      };

    }

    return (
      <div
        className='jsw-selector-item'
        value={value}
        ref={this.ref}
        style={ostyle}
        onClick={() => {
          if(onClick) {
            onClick();
            if(this.props.onClose) {
              this.props.onClose();
            }
          } else {
            if(this.props.onSelect) {
              this.props.onSelect(value, label);
            }
          }
        }} >
        {icon ? 
        <div 
          className="jsw-selector-item-icon"
          onClick={e => {
            e.stopPropagation();
            if(icons.props && icon.props.onClick) {
              icon.props.onClick();
            }
          }}>{icon}</div> : null}
        <p style={fontStyle}>{label}</p>
        {button ? 
        <div 
          className="jsw-selector-item-button"
          onClick={e => {
            e.stopPropagation();
            if(button.props && button.props.onClick) {
              button.props.onClick();
            }
          }}>{button}</div> : null}
      </div>
    )
  }
}

var JSDropdownUID = 0;

export default class Selector extends ClickZone {

  static defaultProps = {
    value: "",
    open: false,
    showAll: true,
    strict: true
  }

  constructor(props) {
    super(props);
    this.extendState({
      open: props.open,
      value: props.value,
      showAll: props.showAll,
      options: props.options,
      lastOptions: props.options,
      content: props.content,
      label: props.label,
      lastValue: props.value,
      lastLabel: props.label
    });
    this.buttonType = props.buttonType ? props.buttonType : "chevron";
    this.labelid = "jsw-selector-" + JSDropdownUID;
    ++JSDropdownUID;
  }

  static getDerivedStateFromProps = (props, state) => {
    let output = {};

    if (props.label !== state.lastLabel) {
      output.label = output.lastLabel = props.label;
    }
    if (props.value !== state.lastValue) {
      output.value = output.lastValue = props.value;
    }
    if (props.options !== state.lastOptions) {
      output.options = output.lastOptions = props.options;
    }

    return output;
  }

  buttonToggle = () => {

    this.setState({
      open: !this.state.open,
      showAll: this.state.open && this.clicked ? this.state.showAll : true
    });

    if (!this.state.open) {
      this.input.focus();
    }
  }

  validate = () => {
    if (this.input.checkValidity()) {
      return true;
    } else {
      this.input.reportValidity();
      return false;
    }
  }

  open = () => {
    this.setState({
      open: true,
      clicked: true
    });
  }

  close = () => {
    this.setState({
      open: false
    });
  }

  onBlur = e => {
    if(e.target.value && this.props.strict) {
      let valRg = new RegExp(e.target.value, 'i');
      let names = this.state.options.filter(v => {
        let labelRg = new RegExp(v.label || v.name || v, 'i');
        return valRg.test(v.label || v.name || v) || labelRg.test(e.target.value);
      }).map(v => v.name || v);
      if(names.length) {
        if(names[0] !== this.state.value) {
          this.setState({
            value: names[0]
          }, () => {
            const {
              onChange
            } = this.props;

            if(onChange) {
              onChange(this.state.value);
            }
          });
        }
      } else {
        this.setState({
          value: null
        }, () => {
          const {
            onChange
          } = this.props;

          if(onChange) {
            onChange(this.state.value);
          }
        })
      }
    }
  }

  selectItem = (value, label) => {
    if(value !== this.state.value) {
      this.setState({
        value: value,
        open: false
      }, () => {
        const {
          onChange,
          name
        } = this.props;

        if (onChange) {
          onChange(value, name);
        }
      });
    } else {
      this.setState({
        open: false
      });
    }
  }

  getValue = () => {
    return this.state.value;
  }

  setValue = value => {
    this.setState({
      value: value
    });
  }

  clear = () => {
    this.setValue(null);
  }

  setOptions = options => {
    this.setState({
      options: options
    });
  }

  fill = content => {

    let items = [];
    let regex = new RegExp(`(${this.state.value})`, 'i');
    const { showAll, value } = this.state;

    if (content) {
      let i = 0;

      const {
        order,
        applyStyle
      } = this.props;

      if(order) {
        switch(order) {
          case 'ascending':
            content = content.sort((a, b) => {
              if(a.label < b.label) {
                return -1;
              } else if(a.label > b.label) {
                return 1;
              }
              return 0;
            });
            break;
          case 'descending':
            content = content.sort((a, b) => {
              if(a.label > b.label) {
                return -1;
              } else if(a.label < b.label) {
                return 1;
              }
              return 0;
            });
        }
      }

      for (const item of content) {

        let itRegex = new RegExp(item.label || item.name || item, 'i');

        if (showAll || !value || regex.test(item.label || item.name || item) || itRegex.test(value)) {

          items.push(
            <SelectorItem
              key={i}
              applyStyle={applyStyle}
              label={item.label || (typeof item === 'string' ? item : null)}
              value={item.name || item.label || (typeof item === 'string' ? item : null)}
              button={item.button}
              icon={item.icon}
              onClick={item.onClick}
              onSelect={this.selectItem}
              onClose={this.close} />
          );
        }

        ++i;
      }
    }
    return items;
  }

  onType = (e) => {
    this.setState({
      showAll: false,
      value: e.target.value
    }, () => {
      if(!this.props.strict) {
        const {
          strict,
          onChange
        } = this.props;

        if(!strict && onChange) {
          onChange(this.state.value);
        }
      }
    });
  }

  render = () => {

    const {
      open,
      clicked,
      content,
      value,
      label,
      options
    } = this.state;

    const { 
      className,
      autoComplete,
      required,
      placeholder
    } = this.props;

    switch (this.buttonType) {
      case 'triangle':
        var buttonDOM = <div className="jsw-triangle"></div>
        break;
      default:
        var buttonDOM = <div className="jsw-chevron"></div>
    }

    if (label) {
      var labelDOM = <label htmlFor={this.labelid}>{label}</label>
    } else {
      var labelDOM = null;
    }

    if (options) {
      let names = options.map(x => x.name);
      var adjValue = value;

      if (names.includes(value)) {
        adjValue = options[names.indexOf(value)].label;
        var icon = options[names.indexOf(value)].icon;
      }
    }

    return (
      <div
        className={`jsw-selector${open && clicked ? " open" : ""}${className ? " " + className : ""}`}>
        {labelDOM}
        { icon ? <div className="jsw-selector-icon">{icon}</div> : null }
        <div
          className="jsw-selector-main"
          ref={node => this.node = node}>
          <input
            type="text"
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={this.onType}
            onFocus={this.open}
            onBlur={this.onBlur}
            value={adjValue || ""}
            required={required}
            ref={input => this.input = input}></input>
          <button
            type="button" className="jsw-selector-button" onClick={this.buttonToggle}
            id={this.labelid}>
            {buttonDOM}
          </button>
          <div className="jsw-selector-list">
            {this.fill(options || content)}
          </div>
        </div>
      </div>
    );
  }


};

export { Selector };