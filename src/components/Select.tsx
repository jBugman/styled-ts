import * as React from "react";

export interface SelectProps {
    text: string;
}

export class Select extends React.Component<SelectProps, {}> {
    render() {
        return <p>Passed in props: {this.props.text}</p>;
    }
}
