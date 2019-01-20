import classnames from "classnames";
import { connect, FormikContext, getIn } from "formik";
import * as React from "react";
import "../../scss/modules/_control-group.scss";

export interface IControlGroupOuterProps {
    name: string;
    label: string | string[];
}

export interface IControlGroupProps extends IControlGroupOuterProps {
    formik: FormikContext<any>;
}

class ControlGroup extends React.PureComponent<IControlGroupProps, {}> {
    public render() {
        // Workaround for validating array of objects
        let errors: string = getIn(this.props.formik.errors, this.props.name) || "";

        if (typeof errors !== "string") {
            errors = "";
        }

        const groupClassname = classnames({
            "control-group": true,
            "control-group--error": errors && errors.length > 0,
        });
        return (
            <div className={groupClassname} >
                {this.generateLabel()}
                {this.props.children}
                {this.renderErrors(errors)}
            </div>
        );
    }
    private generateLabel = () => {
        if (!!this.props.label) {
            return (
                <label className="control-group__label" htmlFor={this.props.name}>
                    {this.props.label}
                </label>
            );
        } else {
            return null;
        }
    }
    private renderErrors = (error: string) => {
        if (error !== "") {
            return (
                <div className="control-group__errors">
                    {error}
                </div>
            );
        }
        return null;
    }
}

export default connect<IControlGroupOuterProps>(ControlGroup);
