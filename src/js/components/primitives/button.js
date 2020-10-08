import "../../../css/components/primitives/button.scss";

import Loader from "./loader";

export default class Button extends React.Component {

    static defaultProps = {
        active: true,
        loading: false,
        value: ""
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: props.loading,
            lastLoading: props.loading
        };
    }

    onClick = e => {
      const {
        href,
        target,
        onClick
      } = this.props;

      if(href) {
        if(target) {
          window.open(href, target);
        } else {
          window.location = href;
        }
      }

      if(onClick) {
        onClick(e);
      }
    }

    static getDerivedStateFromProps = (props, state) => {
        let output = {};
        if(props.loading !== state.lastLoading) {
            output.loading = output.lastLoading = props.loading;
        }

        return output;
    }

    setLoading = (state) => {
        this.setState({
            loading: state
        });
    }

    render() {
        const { 
          loading 
        } = this.state;
        const { 
          className, 
          style,
          value,
          active,
          href,
          tooltip
        } = this.props;

        if(style) {

          var {
            fontFamily,
            fontWeight,
            letterSpacing,
            fontSize,
            lineHeight,
            color,
            ...ostyles
          } = style;

          var textStyles = {
            fontFamily,
            fontWeight,
            letterSpacing,
            fontSize,
            lineHeight,
            color
          };

        }


        return(
            <button 
                className={`jsw-button${ loading ? " loading" : "" }${className ? ' ' + className : ""}${ active ? "" : " jsw-inactive"}`} type="button" 
                onClick={this.onClick}
                style={ostyles}
                tooltip={tooltip}>
                <Loader loading={loading}></Loader>
                <div 
                  className="jsw-button-content"
                  style={textStyles}>
                    {value}
                    {this.props.children}
                </div>
            </button>
        );
    }
}

export { Button };