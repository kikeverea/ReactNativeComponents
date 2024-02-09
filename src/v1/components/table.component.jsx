import { StyleSheet, View, Text } from "react-native"

const styles = StyleSheet.create({
  table: {
    padding: 16,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-end',
    gap: 8,
    padding: 8
  },
  rowHeader: {
    fontWeight: 'bold',
    backgroundColor: 'green',
    paddingVertical: 16
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey'
  }
})

const generateKey = (pre) => {
  return `${ pre }_${ new Date().getTime() }`;
}

const Table = ({ values, header }) => {
  console.log('TABLE VALUES', values)
  return (
    <View style={ styles.table }>
      <Row values={ header } style={[styles.row, styles.rowHeader]}/>
        {
          values.map((row, ind) => (
            <Row key={ generateKey(ind) } values={ row } style={ styles.row }/>
        ))}
    </View>
  )
}

const Row = ({ values, style }) => {
  return (
    <View style={ style }>
      {
        values.map(value => <Text key={ generateKey(value) } style={ styles.cell }>{ value }</Text>)
      }
    </View>
  )
}

export default Table