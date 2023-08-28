import React from "react";
import { Attribute, AttributesHelper } from "../helpers/attributes";
import { IAttributeController } from "./attributeController";
import AttributeImprovement from "./attributeImprovement";

interface IAttributeComponentsProperties {
    controller: IAttributeController
}

class AttributeComponent extends React.Component<IAttributeComponentsProperties, {}> {

    render() {
        return AttributesHelper.getAllAttributes().filter(a => this.props.controller.isShown(a)).map(a => this.renderSpeciesAttribute(a));
    }

    renderSpeciesAttribute(attribute: Attribute) {
        if (this.props.controller.isEditable(attribute)) {
            return <AttributeImprovement attribute={attribute}
                onIncrease={() => { this.props.controller.onIncrease(attribute)}}
                onDecrease={() => { this.props.controller.onDecrease(attribute)}}
                value={this.props.controller.getValue(attribute)}
                showIncrease={this.props.controller.canIncrease(attribute)}
                showDecrease={this.props.controller.canDecrease(attribute)}
                key={'attribute-' + attribute} />
        } else {
            return (<AttributeImprovement attribute={attribute}
                onIncrease={() => { }} onDecrease={() => { }}
                value={this.props.controller.getValue(attribute)}
                showIncrease={false}  showDecrease={false} key={'attribute-' + attribute} />);
        }
    }
}

export default AttributeComponent;