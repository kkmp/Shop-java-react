import { Fragment } from "react";

const Error = (props) => {
    return (
        props.message.length !== 0 ?
            <div className="alert alert-danger text-center" role="alert">
                {props.message}
            </div> : <Fragment></Fragment>
    );
}
export default Error
