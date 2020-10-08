import styles from "../../../css/components/containers/form.css";

import Button from "../primitives/button";

export class FormType extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data ? props.data : {},
            pending: false
        };

        this.onSuccess = props.onSuccess ? props.onSuccess : () => {
            return false;
        }
        this.onFail = props.onFail ? props.onFail : () => {
            return false;
        }

        this.postURL = props.postURL;
    }

    getFormData() {
        data = {};

        $(this).find(".jsw-radio[name] .jsw-radio-item.selected")
            .each(function() {

                let attr = $(this).closest(".jsw-radio").attr("name");
                data[attr] = $(this).attr('value');

            });

        return data;
    }

    onSubmit = () => {
        this.setState({
            pending: true
        });

        if(this.postURL) {

            $.post(this.postURL, this.getFormData(), res => {
                this.onSuccess();
                this.setState({
                    pending: false
                });
            }).fail(xhr => {
                this.onFail();
            });

        }
    }

}

export default class Form extends FormType {

    constructor(props) {
        super(props);
    }

    render() {

        const { pending } = this.state;

        return(
            <form className="jsw-form" onSubmit={this.onSubmit} method="post">
                <div className="jsw-child-container">
                    {this.props.children}
                </div>
                <div className="jsw-form-buttons">
                    <Button value="Submit" loading={pending} onClick={() => { console.log("Test"); this.onSubmit() }}></Button>
                </div>
            </form>
        )

    }
}

export { Form };