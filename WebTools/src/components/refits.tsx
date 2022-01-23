﻿import * as React from 'react';
import {System} from '../helpers/systems';
import {SpaceframeHelper} from '../helpers/spaceframes';
import {character} from '../common/character';

interface IRefitImprovementProperties {
    controller: Refits;
    system: System;
    value: number;
    showIncrease: boolean;
    showDecrease: boolean;
}

export class Refit extends React.Component<IRefitImprovementProperties, {}> {
    render() {
        const {system, value, showDecrease, showIncrease} = this.props;

        const dec = showDecrease
            ? (<img style={{ float: "left" }} height="20" src="static/img/dec.png" onClick={ () => { this.onDecrease() } } alt="-"/>)
            : undefined;

        const inc = showIncrease
            ? (<img style={{ float: "right" }} height="20" src="static/img/inc.png" onClick={ () => { this.onIncrease() } } alt="+"/>)
            : undefined;

        return (
            <div>
                <div className="attribute-container">
                    {System[system]}
                </div>
                <div className="attribute-value">
                    {dec}
                    {value}
                    {inc}
                </div>
            </div>
        );
    }

    private onDecrease() {
        console.log("on decrease 1");
        this.props.controller.onDecrease(this.props.system);
    }

    private onIncrease() {
        this.props.controller.onIncrease(this.props.system);
    }
}

interface IRefitsProperties {
    points: number;
    refits: System[]
    onIncrease?: (system: System) => void;
    onDecrease?: (system: System) => void;
}

export class Refits extends React.Component<IRefitsProperties, {}> {
    private _absoluteMax: number = 12;

    constructor(props: IRefitsProperties) {
        super(props);

        let minimum = character.starship.spaceframeModel.systems;

        const missionPod = SpaceframeHelper.getMissionPod(character.starship.missionPod);
        if (missionPod) {
            missionPod.systems.forEach((s, i) => {
                minimum[i] += s;
            });
        }
    }

    render() {
        const systems: System[] = [ System.Comms, System.Computer, System.Engines, System.Sensors, System.Structure, System.Weapons ];
        const attributes = systems.map((a, i) => {
            return <Refit
                key={i}
                controller={this}
                system={a}
                value={this.currentValue(a)}
                showIncrease={this.showIncrease(a)}
                showDecrease={this.showDecrease(a)} />
        });

        return (
            <div>
                {attributes}
            </div>
        );
    }

    showDecrease(system: System) {
        return this.currentValue(system) > character.starship.getBaseSystem(system);
    }

    showIncrease(system: System) {
        return this.currentValue(system) < this._absoluteMax && this.props.refits.length < this.props.points;
    }

    currentValue(s: System) {
        return character.starship.getSystemValue(s);
    }

    onDecrease(attr: System) {
        console.log("on decrease 2");
        this.props.onDecrease(attr);
        this.forceUpdate();
    }

    onIncrease(attr: System) {
        this.props.onIncrease(attr);
        this.forceUpdate();
    }
}