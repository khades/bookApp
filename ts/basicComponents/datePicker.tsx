import { connect, FormikContext } from "formik";
import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/src/stylesheets/datepicker";
import "../../scss/modules/_datepicker.scss";
import ControlGroup from "./control-group";

export interface IDatePickerOuterProps {
    label: string;
    name: string;
}

export interface IDatePickerProps extends IDatePickerOuterProps {
    formik: FormikContext<any>;

}

class DayPickerComponent extends React.Component<IDatePickerProps, {}> {
    public render() {
        let value: Date | string = this.props.formik.values[this.props.name];
        if (typeof value === "string") {
            value = new Date(Date.parse(value));
        }
        return (
            <ControlGroup
                name={this.props.name}
                label={this.props.label}
            >
                <DatePicker
                    selected={value}
                    onChange={this.handleChange}
                />
            </ControlGroup>
        );
    }
    private handleChange = (date: Date) => {
        this.props.formik.setFieldValue(this.props.name, date);
    }
}

export default connect<IDatePickerOuterProps>(DayPickerComponent);
