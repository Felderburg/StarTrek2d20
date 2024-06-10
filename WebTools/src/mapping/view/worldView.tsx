import React from "react";
import { IPageProperties } from "../../pages/iPageProperties";
import { World } from "../table/world";
import { StarSystem } from "../table/starSystem";
import { DataValueRow } from "./dataValueRow";
import { WorldClass } from "../table/worldClass";


const WorldViewThumbnail: React.FC<IWorldViewProperties> = ({world}) => {

    switch (world.worldClass?.id) {
        case WorldClass.D:
            return (<div><img src="/static/img/planet-ClassD.webp" width="125px" height="125px" alt={world.worldClass.description} title={world.worldClass.description} /></div>);
        case WorldClass.H:
            return (<div><img src="/static/img/planet-ClassH.webp" width="125px" height="125px" alt={world.worldClass.description} title={world.worldClass.description} /></div>);
        case WorldClass.K:
            return (<div><img src="/static/img/planet-ClassK.webp" width="125px" height="125px" alt={world.worldClass.description} title={world.worldClass.description} /></div>);
        case WorldClass.M:
            return (<div><img src="/static/img/planet-ClassM.webp" width="125px" height="125px" alt={world.worldClass.description} title={world.worldClass.description} /></div>);
        case WorldClass.O:
            return (<div><img src="/static/img/planet-ClassO.webp" width="125px" height="125px" alt={world.worldClass.description} title={world.worldClass.description} /></div>);
        case WorldClass.P:
            return (<div><img src="/static/img/planet-ClassP.webp" width="125px" height="125px" alt={world.worldClass.description} title={world.worldClass.description} /></div>);
        case WorldClass.Y:
            return (<div><img src="/static/img/planet-ClassY.webp" width="125px" height="125px" alt={world.worldClass.description} title={world.worldClass.description} /></div>);
        default:
            return undefined;
    }
}


interface IWorldViewProperties extends IPageProperties {
    world: World;
    system: StarSystem;
}

class WorldView extends React.Component<IWorldViewProperties, {}> {

    render() {
        let { world } = this.props;
        let attributes = world.attributeList;
        return (<div>
            <WorldViewThumbnail world={world} system={this.props.system} />
            <div className="row mb-5 row-cols-1 row-cols-md-2">
                {attributes.map((a,i) => (<DataValueRow name={a.name + ":"} key={'attr-' + i}>{a.value}</DataValueRow>))}
            </div>
        </div>);
    }
}

export default WorldView;