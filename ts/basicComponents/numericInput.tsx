import { connect, FormikContext, getIn } from "formik";
import * as React from "react";
import ControlGroup from "./control-group";

export interface INumericInputOuterProps {
    name: string;
    label: string;
}

export interface INumericInputProps extends INumericInputOuterProps {
    formik: FormikContext<any>;
}

class NumericInput extends React.PureComponent<INumericInputProps, {}> {

    public render() {
        const value: string = getIn(this.props.formik.values, this.props.name) || "0";
        return (
            <ControlGroup
                name={this.props.name}
                label={this.props.label}
            >
                <input
                    id={this.props.name}
                    name={this.props.name}
                    onChange={this.setValue}
                    value={value.toString()}
                />
            </ControlGroup>
        );
    }

    private setValue = (event: React.FormEvent<HTMLInputElement>) => {
        const value = parseInt(event.currentTarget.value, 10) || 0;
        this.props.formik.setFieldValue(this.props.name, value);
    }

}

export default connect<INumericInputOuterProps>(NumericInput);
