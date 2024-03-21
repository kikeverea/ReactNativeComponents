import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

import Text from './text.component'
import text from '../styles/text'
import colors from '../styles/colors'

const USER_INDEX = -1
const ELITE_INDEX = 4

const Ranking = ({ data, dataHeader, dataFooter, columnsData, columnsRatio=[2, 5, 3], onItemPressed }) => {

  const columnCount = columnsData.length
  const columns = data.reduce((columns, item) => {

    for (let i = 0; i < columnCount; i++) {
      const column = columns[i]
      const cell = {
        item,
        content: columnsData[i](item)   // executes the provided data extraction function to the item
      }

      column.push(cell)
    }
    return columns
  },
  Array.from({ length: columnCount }, () => [])) // initializes an array of n arrays, where n = column count

  const renderHeader = () => {
    return (
      <View style={ styles.header }>
        { dataHeader.map((title, colIndex) =>
          <View
            key={ colIndex }
            style={[ styles.cell, { flex: columnsRatio[colIndex] }]}
          >
            <Text style={ styles.cellContent }>{ title }</Text>
          </View>
        )}
      </View>
    )
  }

  const renderFooter = data => {
    return (
      <View style={[ styles.table, styles.footer ]}>
        { Array(columnsData.length)
          .fill()
          .map((_empty, ind) =>
            <View
              key={ ind }
              style={{ flex: columnsRatio[ind],
              gap: 4 }}
            >
              { renderCell({ item: data, content: columnsData[ind](data)}, ind, USER_INDEX) }
            </View>
          )
        }
      </View>
    )
  }

  const renderColumn = (column, colIndex) => {
    return (
      <View
        key={ colIndex }
        style={{ flex: columnsRatio[colIndex], gap: 4 }}
      >
        { column.map((cell, rowIndex) => renderCell(cell, colIndex, rowIndex)) }
      </View>
    )
  }

  const renderCell = (cell, colIndex, rowIndex) => {
    return (
      <TouchableOpacity
        key={ rowIndex + colIndex }
        activeOpacity={ 0.6 }
        style={[
          styles.cell,
          { backgroundColor: 
            rowIndex === USER_INDEX
              ? colors.primary
              : rowIndex > ELITE_INDEX
                ? colors.primaryDark
                : colors.primaryLight
          }
        ]}
        onPress={ () => onItemPressed(cell.item) }
      >
        <Text style={ styles.cellContent }>{ cell.content }</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={ styles.container }>
      { renderHeader() }
      <ScrollView>
        <View>
          <View style={ styles.table }>
            { columns.map((column, colIndex) => renderColumn(column, colIndex) )}
          </View>
          { dataFooter && renderFooter(dataFooter) }
        </View>
      </ScrollView>
    </View>
  )
}

export default Ranking

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4          // adds to the space between header and table body
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.primaryLight
  },
  footer: {
    marginTop: 16
  },
  table: {
    gap: 4,
    paddingTop: 8,  // adds to the space between header and table body
    flexDirection: 'row',
  },
  cell: {
    height: 35,
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.primaryLight
  },
  cellContent: {
    textAlign: 'center',
    fontSize: text.size.button
  }
})