import { View, StyleSheet } from "react-native"
import WepickView from "./wepickView.component"

import Text from './text.component'
import text from "../styles/text"

const Ranking = ({
  data,
  columnsGrowth=[0, 1, 0],
  dataHeader
}) => {
  
  const columnCount = data[0].length

  const tableColumns = data.reduce((columns, row) => {

    for (let i = 0; i < row.length; i++) {
      const column = row[i]
      columns[i].push(column)
    }
    return columns

  },
  Array.from({length: columnCount}, () => [])) // initializes an array of n arrays, where n = column count

  return (
    <WepickView style={ styles.container }>
      <View style={ styles.table }>
        { tableColumns.map((column, colIndex) => 
          <View
            key={ colIndex }
            style={{ flex: columnsGrowth[colIndex] }}
          >
            { column.map((cell, cellIndex) => 
              <Text
                key={ cellIndex + colIndex }
                style={ styles.cell }
              >
                { cell }
              </Text>
            )}
        </View>
        )}
      </View>
    </WepickView>
  )
}

export default Ranking

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '8%',
    gap: 16
  },
  table: {
    flexDirection: 'row',
    width: '100%',
    gap: 8
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    gap: 8
  },
  cell: {
    padding: 4,
    fontSize: text.size.header,
    textAlign: 'center'
  }
})