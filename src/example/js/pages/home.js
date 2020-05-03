/* Example app */

import {
    Collapsable,
    Form,
    Dropdown,
    Parallax,
    Toggle,
    Radio,
    Navigation,
    NavigationButton,
    NavigationGroup,
    NavigationLogo,
    HamburgerMenu,
    SplashCenter,
    SplashCard,
    SplashSequence
} from "../../..";

import custom_styles from "../../css/styles.scss";

import mainLogo from "../../assets/images/jsw-logo.png";
import mainLogoWhite from "../../assets/images/jsw-logo-white.png";
import splashImage2 from "../../assets/images/jsw-bricks.png";
import landscapeImage from "../../assets/images/landscape.jpg";

import favicon from "../../assets/images/favicon.ico";

class ExampleApp extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
            <SplashSequence>
                <SplashCard wait={1800} animLength={2000} first>
                    <SplashCenter image={mainLogo} title="JSWidgets" message="An extensive component library for ReactJS.  Do more in less time with JSWidgets." />
                </SplashCard>
                <SplashCard wait={1500} animLength={1200} style={{
                    backgroundColor: 'rgb(255,170,0)'
                }} indicatorColor='white' first>
                    <SplashCenter image={splashImage2} title="A building block system with high level components." message="JSWidgets lets you repeat, nest, and copy modular widgets with ease.  It just works!"
                    style={{ color: 'white' }} />
                </SplashCard>
                <SplashCard wait={1500} animLength={1200} first>
                    <SplashCenter image={mainLogo} title="JSWidgets" message="An extensive component library for ReactJS.  Do more in less time with JSWidgets." />
                </SplashCard>
            </SplashSequence>
            <Navigation shrink={180} hide={640} showOnScrollUp>
                <NavigationLogo href="." image={mainLogoWhite} />
                <NavigationGroup>
                    <NavigationButton href="." label="Docs" />
                    <NavigationButton href="." label="Blog" />
                    <NavigationButton href="." label="Tutorial" />
                </NavigationGroup>
                <HamburgerMenu buttonType="topwide">
                    <NavigationGroup>
                        <NavigationButton href="." label="Docs" />
                        <NavigationButton href="." label="Blog" />
                        <NavigationButton href="." label="Tutorial" />
                    </NavigationGroup>
                    <NavigationGroup>
                        <NavigationButton href="." label="Contact" />
                        <NavigationButton href="." label="Privacy" />
                        <NavigationButton href="." label="Terms & Conditions" />
                    </NavigationGroup>
                </HamburgerMenu>
            </Navigation>
            <Parallax image={landscapeImage} style={{
                width: '100%',
                height: 'calc(100vh - 64px)'
            }}>
                <p className="example-parallax">This is an example parallax title.</p>
            </Parallax>
            <Collapsable title="Collapsable Section" style={{ padding: '24px' }}>
                <Collapsable title="Collapsable Form 1">
                    <Form>
                        <Collapsable title="Dropdown selectors">
                            <Dropdown label="Select a number" content={[1, 2, 3]} name="dropdown-number" />
                            <Dropdown label="Select a letter" content={['A', 'B', 'C']} name="dropdown-letter" />
                        </Collapsable>
                        <Collapsable title="Toggle switches">
                            <Toggle label="Test toggle 1" name="toggle1" on></Toggle>
                            <Toggle label="Test toggle 2" name="toggle2"></Toggle>
                        </Collapsable>
                        <Collapsable title="Radio buttons">
                            <Radio label="Select an option" name="radio-option" content={["Option 1", "Option 2", "Option 3"]} />
                        </Collapsable>
                    </Form>
                </Collapsable>
                <Collapsable title="Collapsable Form 2">
                    <Form>
                        <Collapsable title="Dropdown selectors">
                            <Dropdown content={[4, 5, 6]} name="dropdown-number" />
                            <Dropdown content={['D', 'E', 'F']} name="dropdown-letter" />
                        </Collapsable>
                        <Collapsable title="Toggle switches">
                            <Toggle label="Test toggle 3" name="toggle3" on></Toggle>
                            <Toggle label="Test toggle 4" name="toggle4"></Toggle>
                        </Collapsable>
                        <Collapsable title="Radio buttons">
                            <Radio label="Select a different option" name="radio-option" content={["Option A", "Option B", "Option C"]} />
                        </Collapsable>
                    </Form>
                </Collapsable>
            </Collapsable>
            </div>
        )
    }

}

let e = document.querySelector("#root");
ReactDOM.render(<ExampleApp />, e);

