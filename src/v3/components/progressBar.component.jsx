import React from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import * as Progress from 'react-native-progress'
import colors from '../styles/colors'
import Text from './text.component'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ProgressBar = ({
  current,
  max,
  label,
  textColor=colors.accent,
  color=colors.primaryDark,
  unfilledColor=colors.primary,
  onFilledMessage,
  width,
  height=50,
  press
}) => {

    const barWidth = width ? width : Dimensions.get('window').width * 0.8

    return (
        current !== null && max !== null
          ? <View style={{ width: barWidth }}>
              { label &&
                <TouchableOpacity
                  style={ styles.header }
                  activeOpacity={0.7}
                  onPress={ press }
                >
                  <View style={ styles.labelContainer }>
                    { press
                        ? <Icon
                            style={[ styles.icon, { color: textColor } ]}
                            name={'information-outline'}
                            color={colors.primaryLight}
                            size={20}
                          />
                        : <View style={{ padding: 4 }} />   // padding view
                    }
                    <Text style={{ color: textColor, ...styles.label }}>{ label }</Text>
                  </View>
                  <View style={{ width: 'auto', backgroundColor: 'pink '}}>
                    <Text style={{ color: textColor }}>({current}/{max})</Text>
                  </View>
                </TouchableOpacity>
              }
              <Progress.Bar
                  borderWidth={ 0 }
                  progress={ current / max } 
                  width={ barWidth } 
                  height={ height }
                  borderRadius={ 9 }
                  color={ color }
                  unfilledColor={ unfilledColor }
              />

              { current == max && onFilledMessage &&
                  <Text style={styles.textTimeCompleted}>{ onFilledMessage }</Text>
              }
            </View>
          : <ActivityIndicator size='small' color={ colors.accent } />
    )
}

export default ProgressBar

const styles = StyleSheet.create({
    container: {
      width: '90%'
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    labelContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
    },
    icon: {
      paddingHorizontal: 5
    },
    label: {
      flex: 1
    },
    textTimeCompleted: {
        maxWidth: '80%',
        marginTop: 7,
        color: colors.primaryLight
    }
})