/* Example app */

import {
    Collapsable,
    Form,
    Dropdown,
    Toggle,
    Radio,
    Navigation,
    NavigationButton,
    NavigationGroup,
    HamburgerMenu,
    SplashCenter,
    SplashCard
} from "./js/jswidgets";

import custom_styles from "./css/styles.css";
import splashImage from "./assets/images/jsw-logo.png";

require("./assets/images/favicon.ico");

class ExampleApp extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
            <SplashCard wait={2500} animLength={1800}>
                <SplashCenter image={splashImage} title="JSWidgets" message="An extensive component library for ReactJS.  Do more in less time with JSWidgets."></SplashCenter>
            </SplashCard>
            <Navigation shrink={180} hide={640} showOnScrollUp>
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
            <Collapsable title="Collapsable Section">
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

