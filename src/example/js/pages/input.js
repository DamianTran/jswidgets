/* Example app */

import ExampleNavigation from "../components/navigation";

import {
    Input
} from "../../../";

import custom_styles from "../../css/styles.scss";

import favicon from "../../assets/images/favicon.ico";

const ExampleInput = () => {
    return(
        <div class="jsw-example-input">
            <Input label="Try entering something here:" />
        </div>
    )
}

class ExampleApp extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <ExampleNavigation />
                <ExampleInput />
            </div>
        )
    }

}

let e = document.querySelector("#root");
ReactDOM.render(<ExampleApp />, e);

