import '../../../css/components/containers/collapsable.scss';

var JSCollapsableUID = 0;

function elementsEqual(arr1, arr2) {
  if(!arr1 || !arr2) {
    return false;
  }

  if(Array.isArray(arr1) && Array.isArray(arr2)) {

    if(arr1.length !== arr2.length) {
      return false;
    }

    for(let i = 0; i < arr1.length; ++i) {
      if(arr1[i].key != arr2[i].key) {
        return false;
      }
    }

    return true;

  } else {
    return arr1.key == arr2.key;
  }
}

export default class Collapsable extends React.Component {

  static defaultProps = {
    open: true
  };

  constructor(props) {
    super(props);

    this.hasClickOff = props.hasClickOff ? props.hasClickOff : false;

    this.state = {
      open: props.open,
      renderChildren: true,
      lastOpen: props.open,
      title: props.title,
      titleHover: false,
      lastChildren: props.children
    };
    this.overflowTimeout = null;

    this.labelid = "jsw-collapsable-" + JSCollapsableUID;
    ++JSCollapsableUID;
  }

  static getDerivedStateFromProps = (props, state) => {
    let output = {};
    if (props.open !== state.lastOpen) {
      output.lastOpen = output.open = props.open;
    }
    if (props.children !== state.lastChildren && !elementsEqual(props.children, state.lastChildren)) {
      output.lastChildren = props.children;
      output.reqHeightUpdate = true;
      output.height = undefined;
    }
    return output;
  }

  buttonToggle = () => {
    if(this.state.open) {
      this.setState({
        open: false
      }, () => {
        if(this.renderTimeout) {
          clearTimeout(this.renderTimeout);
        }

        this.renderTimeout = setTimeout(() => {
          this.setState({
            renderChildren: false
          });
          this.renderTimeout = null;
        }, 280);
      });
    } else {
      this.setState({
        renderChildren: true
      }, () => {
        requestAnimationFrame(() => {
          this.setState({
            open: true
          }, () => {
            this.setState({
              reqHeightUpdate: true
            });

            if(this.renderTimeout) {
              clearTimeout(this.renderTimeout);
            }

            this.renderTimeout = setTimeout(() => {
              this.triggerUpdateInterval();
            }, 1000);
          });
        })
      });
    }
  }

  onMouseEnter = () => {
    this.setState({
      titleHover: true
    });
  }

  onMouseLeave = () => {
    this.setState({
      titleHover: false
    });
  }

  open = () => {
    this.setState({
      renderChildren: true
    }, () => {
      requestAnimationFrame(() => {
        this.setState({
          open: true
        }, () => {
          this.setState({
            reqHeightUpdate: true
          });
        });
      })
    });
  }

  close = () => {
    this.setState({
      open: false
    }, () => {
      if(this.renderTimeout) {
        clearTimeout(this.renderTimeout);
      }

      this.renderTimeout = setTimeout(() => {
        this.setState({
          renderChildren: false
        });
        this.renderTimeout = null;
      }, 280);
    });
  }

  onResize = () => {
    this.setState({
      height: $(this.subwrapper).outerHeight()
    });
  }

  triggerUpdateInterval = () => {
    this.updateInterval = setInterval(() => {
      if(this.state.open) {
        this.setState({
          height: $(this.subwrapper).outerHeight(),
          notransition: true
        });
      } else {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
        this.setState({
          notransition: false
        })
      }
    }, 16);

    if(this.updateInterval) {
      setTimeout(() => {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
        this.setState({
          notransition: false
        })
      }, 400);
    }
  }

  render() {

    const {
      open,
      height,
      titleHover,
      notransition,
      renderChildren
    } = this.state;

    const {
      className,
      style
    } = this.props;

    if (typeof height !== 'undefined') {
      var maxHeight = open ? height : 0;
    }

    return (
      <div
        className={`jsw-collapsable${className ? " " + className : ""}${open ? " open" : ""}${height && !notransition ? "" : " notransition"}`}
        style={style}
        onClick={() => {
          if(this.state.open) {
            this.setState({
              height: $(this.subwrapper).outerHeight()
            });
            this.triggerUpdateInterval();
          }
        }}>
        <div
          className={`jsw-collapsable-header${this.props.button ? " button" : ""}`}
          onClick={this.props.button ? this.buttonToggle : null}
          onMouseEnter={this.props.button ? this.onMouseEnter : null}
          onMouseLeave={this.props.button ? this.onMouseLeave : null}>
          <label htmlFor={this.labelid}>{this.state.title}</label>
          <button
            type="button"
            id={this.labelid}
            className={`jsw-collapsable-button${titleHover ? " hover" : ""}`} onClick={this.buttonToggle}>
            <div className="jsw-chevron"></div>
          </button>
        </div>
        <div
          className="jsw-child-container"
          ref={node => this.node = node}
          style={{
            maxHeight: maxHeight
          }}>
            <div 
              className="jsw-child-container-subwrapper"
              ref={node => this.subwrapper = node}>
              {renderChildren ? this.props.children : null}
            </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      height: $(this.subwrapper).outerHeight(),
      renderChildren: this.state.open
    });

    $(window).resize(this.onResize);
  }

  componentWillUnmount() {
    $(window).unbind('resize', this.onResize);

    if(this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }
    if(this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    if(this.overflowTimeout) {
      clearTimeout(this.overflowTimeout);
    }
  }

  componentDidUpdate() {

    if(this.state.reqHeightUpdate) {
      if(typeof this.state.height === 'undefined') {

        let initRenderChildren = this.state.renderChildren;

        this.setState({
          renderChildren: true
        }, () => {
          this.setState({
            height: $(this.subwrapper).outerHeight(),
            reqHeightUpdate: false
          }, () => {
            this.setState({
              renderChildren: initRenderChildren
            });
          })
        })
      } else {
        this.setState({
          height: $(this.subwrapper).outerHeight(),
          reqHeightUpdate: false
        });
      }
    }

    const { open } = this.state;
    if (open) {
      this.overflowTimeout = setTimeout(() => {
        $(this.node).css('overflow', null);
      }, 350);
    } else {
      if (this.overflowTimeout) {
        clearTimeout(this.overflowTimeout);
        this.overflowTimeout = null;
      }
      if(this.updateInterval) {
        clearTimeout(this.updateInterval);
        this.updateInterval = null;
        this.setState({
          notransition: false
        })
      }

      $(this.node)
        .css('overflow', 'hidden');
    }
  }

}

export { Collapsable };