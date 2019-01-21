import { connect, FormikContext } from "formik";
import * as React from "react";
import "../../scss/modules/_image-uploader.scss";
import uniqueID from "../utils/uniqueID";
import ControlGroup from "./control-group";
export interface IImageUploaderContainerOuterProps {
    label: string;
    name: string;
}

export interface IImageUploaderContainerProps extends IImageUploaderContainerOuterProps {
    formik: FormikContext<any>;
}

interface IImageUploaderProps {
    link?: string;
    name: string;
    setFieldValue: (name: string, data: string) => void;
}

const ImageUploader = React.memo((props: IImageUploaderProps) => {
    let data: string = null;

    if (!!props.link && props.link !== "") {
        data = localStorage.getItem(props.link);
    }
    // Since render will be called only if props.link change, it is save to create function like that
    // Thanks to React.memo
    const uploadFile = function uploadFileFunc(event: React.FormEvent<HTMLInputElement>) {
        if (!!props.link && props.link !== "") {
            localStorage.removeItem(props.link);
        }
        const reader = new FileReader();
        reader.readAsDataURL(event.currentTarget.files[0]);
        reader.onload = () => {
            const id = "image-" + uniqueID();
            localStorage.setItem(id, reader.result.toString());
            props.setFieldValue(props.name, id);

        };
    };

    if (!!data) {
        const remove = function removeFunc() {
            localStorage.removeItem(props.link);
            props.setFieldValue(props.name, null);
        };
        return (
            <div className="image-uploader">
                <div className="image-uploader__image" style={{backgroundImage: "url(" + data + ")"}} />
                <input onChange={uploadFile} type="file" accept=".jpg, .jpeg, .png" />
                <button
                    className="button"
                    type="button"
                    onClick={remove}
                >
                    Удалить
                </button>
            </div>
        );
    } else {
        return (
            <div className="image-uploader">
                <input onChange={uploadFile} type="file" accept=".jpg, .jpeg, .png" />
            </div>
        );
    }
});

const ImageUploaderContainer = React.memo((props: IImageUploaderContainerProps) => {
    const imageLink: string = props.formik.values[props.name];
    return (
        <ControlGroup
            name={props.name}
            label={props.label}
        >
            <ImageUploader link={imageLink} name={props.name} setFieldValue={props.formik.setFieldValue} />
        </ControlGroup>
    );
});

export default connect<IImageUploaderContainerOuterProps>(ImageUploaderContainer);
