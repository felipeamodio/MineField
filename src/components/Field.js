import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import params from '../params';
import Mine from './Mine';


export default props => {

    //dentro de props espero receber 3 atributos
    const {mined, opened, nearMines, exploded } = props   

    const styleField = [styles.field]
    if(opened) styleField.push(styles.opened)
    if(exploded) styleField.push(styles.exploded)
    if(styleField.length === 1)styleField.push(styles.regular)

//passando as cores das minas quando estiverem abertas
    let color = null
    if(nearMines > 0){
        if(nearMines == 1) color = '#0000FF'
        if(nearMines == 2) color = '#00FF00'
        if(nearMines > 2 && nearMines < 6) color = '#FFFF00'
        if(nearMines >= 6) color = '#FF0000'
    }

   //criando expressões indicando como campo vai ficar caso esteja em tal estado 
    return(
        <View style={styleField}>
            {!mined && opened && nearMines > 0 ?
            <Text style={[styles.label, {color: color}]}>
                {nearMines}
            </Text> : false}
            {mined && opened ? <Mine /> : false}
        </View>
    )
}


const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth:params.borderSize
    },
    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333'
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: params.fontSize,
        fontWeight: 'bold'
    },
    exploded: {
        backgroundColor: '#FF4500',
        borderColor: '#FF4500'
    }
})