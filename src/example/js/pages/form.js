/* Example app */

import ExampleNavigation from "../components/navigation";
import ExampleForm from "../components/form";

import custom_styles from "../../css/styles.scss";

import favicon from "../../assets/images/favicon.ico";

class ExampleApp extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <ExampleNavigation />
                <ExampleForm />
            </div>
        )
    }

}

let e = document.querySelector("#root");
ReactDOM.render(<ExampleApp />, e);

