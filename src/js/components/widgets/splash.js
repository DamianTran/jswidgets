import styles from "../../../css/components/widgets/splash.scss"

import Indicator from "../primitives/indicator";

import {
    jswFirstVisit,
    jswNumVisits
} from "../../utils/localStorage";

import {
    css
} from '@emotion/core';


class SplashCenter extends React.Component {

    static defaultProps = {
        image: "",
        title: "",
        message: "",
        indicator: "chevron"
    };

    constructor(props) {
        super(props);

        this.state = {
            image: props.image,
            title: props.title,
            message: props.message,
            indicator: props.indicator
        };
    }

    render() {
        const { image, title, message } = this.state;

        return(
            <div className="jsw-splash-main">
                <img src={image} alt="Splash image"/>
                <h1 className="jsw-splash-header" style={this.props.style}>{title}</h1>
                <h3 className="jsw-splash-message" style={this.props.style}>{message}</h3>
            </div>
        );
    }
}

/**
 * Controls a flow of sequential splash cards.
 * 
 * @component
 * @example
 * const index = 0
 * return(
 *  <SplashSequence>
 *      <SplashCard>
            <SplashCenter image="./assets/images/example.png" title="My web page" message="This is the first splash section for my web page" />
        </SplashCard>
        <SplashCard>
            <SplashCenter image="./assets/images/example.png" title="My web page is awesome" message="This is the second splash section for my web page" />
 *  </SplashSequence>
 * )
 */
class SplashSequence extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0
        }

        this.animWaiting = false;
        this.waitingTimeout = null;
        this.ref = React.createRef();

        // Length of rendered elements
        this.validL = this.props.children.length;
    }

    render() {

        const { index, length } = this.state;

        // Clone elements to assign props

        const elements = React.Children.toArray(this.props.children);

        let cloned = [];
        let lasti = 0; // Index of last rendered element
        this.validL = 0; 

        // Get the last viable index

        for(let i = 0; i < elements.length; ++i) {
            if(this.props.children[i].props.first && !jswFirstVisit) {
                continue;
            }

            ++this.validL;
            lasti = i;
        }

        if(this.validL) {

            for(let i = 0; i < elements.length; ++i) {

                if(this.props.children[i].props.first && !jswFirstVisit) {
                    continue;
                }

                let $$newElem = React.cloneElement(elements[i], { 
                    controlReady: !this.animWaiting && i <= index,
                    lastCard: i == lasti,
                    key: i 
                });

                cloned.push($$newElem);
            }

            return(
                <div className="jsw-splash-sequence" ref={this.ref}>
                    {cloned}
                </div>
            );

        } else {

            $('html, body')
                .removeClass("jsw-scroll-controlled");

            return(null);
        }

    }

    onWheelScroll = () => {

        const { index } = this.state;

        if(index == this.validL) {
            // Maximum index
            return;
        }

        // Check if the last card is animating
        if(!this.animWaiting) {

            const $$child = this.props.children[index];
            const $child = $(this.ref.current)
                                .find(".jsw-splash-card").eq(index);

            if($child.hasClass("scrolled")) {

                this.setState({
                    index: index + 1
                });

                this.animWaiting = true;

                let timeoutLength = $$child.props.animSpeed;

                if(!this.waitingTimeout) {
                    this.waitingTimeout = setTimeout(() => {
                        this.animWaiting = false;
                    }, timeoutLength);
                }

            }
        }
    }

    componentDidMount() {
        document.addEventListener('wheel', this.onWheelScroll, false);
    }

    componentWillUnmount() {
        document.removeEventListener('wheel', this.onWheelScroll, false);
    }
}

export default class SplashCard extends React.Component {

    static defaultProps = {
        controlReady: true,
        scrolled: false,
        animSpeed: 1500,
        anim: 'fade',
        wait: 2000,
        lastCard: true
    };

    constructor(props) {
        super(props);

        this.state = {
            scrolled: props.scrolled,
            ready: false,
            waitComplete: false,
            controlReady: props.controlReady,
            lastCard: props.lastCard
        };

        this.animSpeed = props.animSpeed;
        this.anim = props.anim;
        this.wait = props.wait;

        this.indicatorStyle = {...props.indicatorStyle, ...{ color: props.indicatorColor }};
        this.arrowStyle = props.indicatorColor ? css` 
            &::after, &::before {
                background-color: ${props.indicatorColor + " !important"}
            }
        ` : "";
        
        $('html, body')
            .addClass("jsw-scroll-controlled");

        $(window)
            .on('load', () => {
                this.setState({
                    ready: true
                });
            });
    }

    static getDerivedStateFromProps = (props, state) => {
        return ({
            controlReady: props.controlReady,
            lastCard: props.lastCard
        });
    }

    render() {

        const { 
            scrolled, 
            ready,
            indicator,
            waitComplete,
            controlReady
        } = this.state;

        return(
            [
                <div className={`jsw-splash-card-placeholder${ scrolled ? " scrolled" : ""}`} key={0}></div>,
                <div className={`jsw-splash-card${controlReady ? "" : " pending"}${ scrolled ? " scrolled" : "" }`} key={1} ref={ref => this.ref = ref} style={this.props.style}> 
                    <div className="jsw-splash-card-container" ref={container => this.container = container}>
                        {this.props.children}
                        <Indicator 
                            type={indicator} 
                            active={waitComplete}
                            style={this.indicatorStyle}
                            arrowStyle={this.arrowStyle}
                            label="Scroll"/>
                    </div>
                </div>
            ]
        )
    }

    onWheelScroll = event => {

        const {
            ready,
            waitComplete,
            controlReady,
            lastCard
        } = this.state;

        if(ready && waitComplete && controlReady) {

            this.setState({
                scrolled: true
            });

            $("html, body")
                .stop()
                .animate({scrollTop: 0}, 1200);

            if(lastCard) {
                $(this.ref)
                    .one('transitionend', function() {
                        $('html, body')
                            .removeClass("jsw-scroll-controlled")
                    });
            }

            $(this.container)
                .stop()
                .animate({opacity: 0}, 1000);

            document.removeEventListener('wheel', this.onWheelScroll, false);

        }
    }

    componentDidMount() {
        document.addEventListener('wheel', this.onWheelScroll, false);
    }

    componentDidUpdate() {

        const { controlReady, waitComplete } = this.state;

        if(controlReady && !waitComplete) {

            setTimeout(() => {
                this.setState({
                    waitComplete: true
                });
            }, this.wait);

            $(this.container)
                .animate({opacity: 1}, this.animSpeed);

        }

    }

    componentWillUnmount() {
        document.removeEventListener('wheel', this.onWheelScroll, false);
    }
}

export { 
    SplashCenter,
    SplashCard,
    SplashSequence
};