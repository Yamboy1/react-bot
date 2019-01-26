import React, { Component } from 'react'
import util from 'util'

function InfoText(props) {
    console.log(util.inspect(props));
    const { strings, current } = props;
    if (strings[current]) {
        return strings[current];
    }

    throw Error(`Couldn't find string ${current}`);
}

export default InfoText