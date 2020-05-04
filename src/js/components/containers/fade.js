import styles from "../../../css/components/containers/fade.scss";

/**
 * ScrollFade: a wrapper component that fades the
 * contents in, out, or both based on the scroll 
 * distance to the object.
 * 
 * @component
 * @example
 * <ScrollFade threshold={0.4} distance={300} in>
 *      ...
 * </ScrollFade>
 */
class ScrollFade extends React.Component {

    static defaultProps = {
        in: true,
        out: false,
        threshold: 0.4,
        distance: 300
    };

    constructor(props) {
        super(props);

        this.state = {
            fadein: this.props.in,
            fadeout: this.props.out,
            threshold: this.props.threshold,
            distance: this.props.distance,
            lowerLimit: 0,
            upperLimit: 0,
            scrollOffset: $(window).scrollTop()
        };

        this.ref = React.createRef();
    }

    render() {
        const {
            fadein,
            fadeout,
            threshold,
            distance,
            lowerLimit,
            upperLimit,
            scrollOffset
        } = this.state;

        let windowHeight = $(window).height();
        let thresDist = windowHeight * threshold;
        let opacity = 1.0;

        if(fadein && scrollOffset - thresDist < lowerLimit) {
            opacity = 1.0 - (lowerLimit - scrollOffset) / distance;
        } else if(fadeout && scrollOffset + thresDist > upperLimit) {
            opacity = 1.0 - (scrollOffset - upperLimit) / distance;
        }

        if(opacity > 1.0) {
            opacity = 1.0;
        }

        return(
            <div className='sw-scroll-fade' ref={this.ref} style={{...this.props.style, ...{
                opacity: opacity
            }}}>
                {this.props.children}
            </div>
        );
    }

    handleScroll = () => {

        let $container = $(this.ref.current);

        this.setState({
            lowerLimit: $container.offset().top,
            upperLimit: $container.offset().top + $container.height(),
            scrollOffset: this.scrollView.scrollTop() + $(window).height()/2
        });

    }

    componentDidMount() {

        let $closest = $(this.ref.current)
                            .closest(".jsw-scroll-view");

        if($closest.length) {
            this.scrollView = $closest.eq(0);
        } else {
            this.scrollView = $(window);
        }

        this.scrollView
            .scroll(this.handleScroll);
    }

    componentWillUnmount() {
        this.scrollView
            .unbind('scroll', this.handleScroll);
    }
}

/**
 * TimedFade: a wrapper component that requires that
 * the contents appear on screen before starting a
 * timer to either fade the container in, or out.
 * 
 * @component
 * @example
 * <TimedFade delay={800} animSpeed={2200} in>
 *      ...
 * </TimedFade>
 */
class TimedFade extends React.Component {

    static defaultProps = {
        fadein: true,
        fadeout: false,
        delay: 800,
        animSpeed: 2200
    };

    constructor(props) {
        super(props);

        this.state = {
            trigger: false
        };

        this.ref = React.createRef();
    }

    render(){

        const { trigger } = this.state;

        return(
            <div className={`jsw-timed-fade${ ((this.props.fadein && !trigger) || (this.props.fadeout && trigger)) ? " fade" : ""}`} style={{...this.props.style, ...{
                transition: `opacity ${this.props.animSpeed}ms ease-in-out`
            }}} ref={this.ref}>
                {this.props.children}
            </div>
        )
    }

    componentDidMount = () => {

        let $closest = $(this.ref.current)
                            .closest(".jsw-scroll-view");

        if($closest.length) {
            this.scrollView = $closest.eq(0);
            var scrollWindow = false;
        } else {
            this.scrollView = $(window);
            var scrollWindow = true;
        }
        
        this.listener = setInterval(() => {
            
            let objOffset = $(this.ref.current).offset();
            objOffset.left += $(this.ref.current).width()/2;
            objOffset.top += $(this.ref.current).height()/2;
            
            let viewOffset = scrollWindow ?
            {
                left: $(window).scrollLeft(),
                top: $(window).scrollTop()
            } : this.scrollView.offset();

            let viewWidth = this.scrollView.width();
            let viewHeight = this.scrollView.height();

            if((objOffset.left > viewOffset.left) &&
                (objOffset.left < viewOffset.left +
                viewWidth) &&
                (objOffset.top > viewOffset.top) &&
                (objOffset.top < viewOffset.top + viewHeight)
                ) {
                
                setTimeout(() => {
                    this.setState({
                        trigger: true
                    });
                }, this.props.delay);

                clearInterval(this.listener);

            }

        }, 50);

    }

}

export { ScrollFade, TimedFade };