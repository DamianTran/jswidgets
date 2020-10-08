import styles from "../../../css/components/primitives/input.scss";
import Regex from "../../utils/regex";
import { getStateCode } from "../../utils/places";
import { mod10 } from "../../utils/string";

var JSWLabelUID = 0;

export default class Input extends React.Component {

  static defaultProps = {
    animation: 'static',
    placeholder: "",
    label: "",
    type: 'text',
    value: "",
    tag: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value || "",
      lastValue: props.value || "",
      focus: false,
      placeholder: props.placeholder,
      animation: props.animation,
      hidden: props.hidden,
      lastHidden: props.hidden
    };

    this.labelID = "jsw-input-" + JSWLabelUID;
    ++JSWLabelUID;

    this.parentOnChange = props.onChange;
    this.parentOnTrigger = props.onTrigger;
    this.icon = props.icon;
  }

  static getDerivedStateFromProps = (props, state) => {
    let output = {};

    if (state.lastValue !== props.value) {
      output.value = output.lastValue = props.value;
    }
    if (state.lastHidden !== props.hidden) {
      output.hidden = output.lastHidden = props.hidden;
    }

    return output;
  }

  handleChange = event => {

    let newVal = event.target.value;

    const {
      capitalize,
      proper,
      nowhitespace
    } = this.props;

    if (nowhitespace) {
      newVal = newVal.replace(/\s+/g, "");
    }

    if (proper) {
      newVal = newVal.toLowerCase().replace(/\b[a-zA-Z]/g, x => x.toUpperCase());
    }

    if (capitalize) {
      newVal = newVal.toUpperCase();
    }

    this.setState({
      value: newVal
    }, () => {

      const {
        name,
        onChange
      } = this.props;

      if (onChange) {
        onChange(newVal, name);
      }
    });
  }

  onTrigger = () => {
    if (this.parentOnTrigger) {
      this.parentOnTrigger(this.state.value, this.props.name);
    }

    if (this.props.clearOnEnter) {
      this.setState({
        value: ""
      });
    }
  }

  onFocus = () => {
    this.setState({
      focus: true
    }, () => {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
      }

      this.closeTimeout = setTimeout(() => {
        this.setState({
          canClose: true
        });
        this.closeTimeout = null;
      }, 250);
    });
  }

  onBlur = () => {
    this.setState({
      focus: false
    }, () => {

      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
      }

      this.closeTimeout = setTimeout(() => {
        this.setState({
          canClose: false
        });
        this.closeTimeout = null;
      }, 250);

      if (this.props.onBlur) {
        this.props.onBlur(this.state.value, this.props.name);
      }
    });
  }

  focus = () => {
    this.input.focus();
    this.onFocus();
  }

  clear = () => {
    this.setState({
      value: ""
    }, () => {

      const {
        name,
        onChange,
        onClear
      } = this.props;

      if (onChange) {
        onChange("", name);
      }

      if (onClear) {
        onClear();
      }

    });
  }

  show = () => {
    this.setState({
      hidden: false
    });
  }

  hide = () => {
    this.setState({
      hidden: true
    });
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.onTrigger();
    }
  }

  getValue = () => {
    return this.state.value;
  }

  setValue = value => {
    this.setState({
      value: value || ""
    });
  }

  validate = () => {

    const {
      type,
      required
    } = this.props;

    if (!required) {
      return true;
    }

    const {
      value
    } = this.state;

    switch (type) {
      case 'postalCA':
      case 'postalUS':
      case 'postal':

        switch (type) {
          case 'postalCA':
            var country = "Canada";
            break;
          default:
            var country = "US";
        }

        if (Regex.postal[country].test(value)) {
          return true;
        } else {

          switch (country) {
            case 'Canada':
              var codeType = 'postal code';
              break;
            case 'US':
              var codeType = 'zip code';
            default:
              var codeType = 'zip/postal code';
          }

          this.input.setCustomValidity(`Please enter a valid ${codeType}.`);
          this.input.reportValidity();
          return false;
        }
      case 'email':
        if (Regex.email.test(value)) {
          return true;
        } else {
          this.input.setCustomValidity("Please enter a valid email address.");
          this.input.reportValidity();
          return false;
        }
      case 'credit':
        if (Regex.credit.general.test(value) && mod10(value)) {
          return true;
        } else {
          this.input.setCustomValidity("Please enter a valid credit card.");
          this.input.reportValidity();
          return false;
        }
      case 'cvv':
        if (Regex.credit.cvv.test(value)) {
          return true;
        } else {
          this.input.setCustomValidity("Please enter a valid credit security code (CVV).");
          this.input.reportValidity();
          return false;
        }
      case 'expiry':
        if (Regex.credit.expiry.test(value)) {
          let match = Regex.credit.expiry.exec(value);
          let month = parseInt(match[1]);

          if (month < 1 || month > 12) {
            this.input.setCustomValidity('Invalid month (must be 1-12)');
          } else {

            let year = parseInt(match[2]) + 2000;

            let now = new Date();
            let exp = new Date(year, month - 1);

            if (exp < now) {
              this.input.setCustomValidity('The expiry date has already passed');
            } else {
              return true;
            }
          }
        } else {
          this.input.setCustomValidity('Please enter a valid expiry date (mm/yy)');
        }

        this.input.reportValidity();
        return false;

      default:
        if (this.input.checkValidity()) {
          return true;
        } else {
          this.input.reportValidity();
          return false;
        }
    }
  }

  onMouseEnter = () => {
    if (!this.state.focus) {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
      }

      this.closeTimeout = setTimeout(() => {
        this.setState({
          canClose: true
        });
        this.closeTimeout = null;
      }, 450);
    }
  }

  onMouseLeave = () => {
    if (!this.state.focus) {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
      }

      this.closeTimeout = setTimeout(() => {
        this.setState({
          canClose: false
        });
        this.closeTimeout = null;
      }, 250);
    }
  }

  render() {

    const {
      value,
      focus,
      placeholder,
      hidden,
      canClose
    } = this.state;

    const {
      className,
      style,
      type,
      label,
      readOnly,
      concealed,
      paragraph,
      required,
      autoComplete
    } = this.props;

    let {
      maxLength
    } = this.props;

    if (label) {
      var labelDOM = <label
        style={style ? {
          fontWeight: style.fontWeight,
          fontFamily: style.fontFamily,
          lineHeight: style.lineHeight,
          fontSize: style.fontSize,
          letterSpacing: style.letterSpacing,
          color: style.color
        } : null}
        htmlFor={this.labelID}>{label}</label>
    } else {
      var labelDOM = null;
    }

    if (concealed) {
      if (Regex.credit.visa.test(value)) {
        var newValue = `VISA ending in ${value.substr(value.length - 4, value.length)}`;
      } else if (Regex.credit.mastercard.test(value)) {
        var newValue = `MASTERCARD ending in ${value.substr(value.length - 4, value.length)}`;
      } else if (Regex.credit.amex.test(value)) {
        var newValue = `AMEX ending in ${value.substr(value.length - 4, value.length)}`;
      } else if (Regex.credit.visamastercard.test(value)) {
        var newValue = `VISA MASTERCARD ending in ${value.substr(value.length - 4, value.length)}`;
      }
    }

    switch (type) {
      case 'credit':
        maxLength = 16;
        break;
      case 'expiry':
        maxLength = 5;
        break;
      case 'cvv':
        maxLength = 4;
        break;
    }

    if (paragraph) {
      var inputDOM =
        <textarea
          id={this.labelID}
          type={type}
          style={this.props.style}
          placeholder={placeholder}
          autoComplete={autoComplete}
          readOnly={readOnly || concealed}
          value={newValue || value || ""}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          ref={node => this.input = node}
          required={required}
          maxLength={maxLength} ></textarea>
    } else {
      var inputDOM =
        <input
          id={this.labelID}
          type={type}
          style={this.props.style}
          placeholder={placeholder}
          autoComplete={autoComplete}
          readOnly={readOnly || concealed}
          value={newValue || value || ""}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          ref={node => this.input = node}
          required={required}
          maxLength={maxLength} />
    }

    return (
      <div
        className={`jsw-input${focus ? " focus" : ""}${hidden ? " jsw-hidden" : ""}${className ? " " + className : ""}`}
        ref={node => this.frame = node}
        style={style}>
        {this.icon ? <div className='jsw-icon'>{this.icon}</div> : null}
        {labelDOM}
        <div
          className="jsw-input-wrapper"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}>
          {inputDOM}
          {readOnly || !value ? null : <div className={`jsw-close${canClose ? " jsw-close-visible" : ""}`} onClick={this.clear}></div>}
        </div>
      </div>
    );

  }

  componentWillUnmount = () => {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }

}

export { Input };