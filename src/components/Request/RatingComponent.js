import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ColoredStar from '../../../assets/Images/svg/colored';
import EmptyStar from '../../../assets/Images/svg/empty';
const RatingComponent = ({ maxRating, value, setValue,svgStyle,starsStyle,rated }) => {
   
    const getRating = () => {
        console.log(value,setValue)
        let svgStylee=svgStyle?svgStyle:styles.svg
        let ret = [];
        for (let i = 0; i < value; i++) {
            ret.push(
                
                <TouchableOpacity  key={i.toString()} onPress={() => setValue(i)}>
                    <ColoredStar height={svgStylee.height} width={svgStylee.width} />
                </TouchableOpacity>
            )
        }
        for (let i = value; i < maxRating; i++) {
            ret.push(
              
                <TouchableOpacity key={i.toString()} onPress={() => setValue(i + 1)}>
                    <EmptyStar height={svgStylee.height} width={svgStylee.width} />
                </TouchableOpacity>
            )
        }
        return ret;
    }
    return (
        <View style={starsStyle?starsStyle:styles.container}>
            {
                getRating()
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    svg: {
        width: 25,
        height: 28,
    },
});
export default RatingComponent;