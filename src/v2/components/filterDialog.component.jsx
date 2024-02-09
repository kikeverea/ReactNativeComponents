import { View } from 'react-native'
import FilterItem from './filterItem.component'
import WepickDialog from './wepickDialog.component'

const FilterDialog = ({
  visible,
  setVisible,
  filterOptions,
  currentFilter,
  onClose
}) => {
  
  let filter = currentFilter
  
  const closeDialog = () => {
    onClose(filter)
    setVisible(false)
  }

  const addToFilter = type => {
    filter.push(type)
  }

  const removeFromFilter = type => {
    const ind = filter.indexOf(type)
    filter.splice(ind, 1)
  }

  const handlePressed = (selected, type) => {
    if (selected)
      addToFilter(type)
    else
      removeFromFilter(type)
  }

  const renderContent = () =>
    <View>
      { filterOptions.map((option, index) => (
        <FilterItem
          key={ option.name+index }
          name={ option.name }
          selected={ filter.includes(option.type) } press={ () => addToFilter(option.type)}
          onPressed={ selected => handlePressed(selected, option.type) }/>)
      )}
    </View>

  return (
    <WepickDialog
      visible={visible}
      title='FILTROS'
      content={ renderContent() }
      buttons={[ {label: 'FILTRAR', action: closeDialog} ]}
      onClose={ closeDialog }
    />
  )
}

export default FilterDialog