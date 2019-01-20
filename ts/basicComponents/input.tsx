import { connect, FormikContext, getIn } from "formik";
import * as React from "react";
import ControlGroup from "./control-group";

export interface IInputOuterProps {
    label: string;
    name: string;
    placeholder?: string;
}

export interface IInputProps extends IInputOuterProps {
    formik: FormikContext<any>;
}

class Input extends React.Component<IInputProps, {}> {

    public render() {
        const value: string = getIn(this.props.formik.values, this.props.name) || "";
        return (
            <ControlGroup
                name={this.props.name}
                label={this.props.label}
            >
                <input
                    id={this.props.name}
                    name={this.props.name}
                    onChange={this.props.formik.handleChange}
                    defaultValue={value}
                    placeholder={this.props.placeholder}
                />
            </ControlGroup>
        );
    }
}

export default connect<IInputOuterProps>(Input);
