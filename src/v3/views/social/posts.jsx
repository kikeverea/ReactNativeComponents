import { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

import PostCard from '../../components/postCard.component'
import { getPosts } from '../../services/socials.service'

import AsyncList from '../../components/asyncList.component'
import FilterButton from '../../components/filterButton.component'
import WepickView from '../../components/wepickView.component'
import FilterDialog from '../../components/filterDialog.component'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from '../../styles/colors'
import useRequireAuth from '../../hooks/useRequireAuth'

const Posts = ({ navigation }) => {
  
  const [posts, setPosts] = useState(null)
  const [filter, setFilter] = useState([])
  const [showFilterDialog, setShowFilterDialog] = useState(false)

  const requireAuth = useRequireAuth()

  useEffect(() => {
    getPosts(requireAuth)
      .then(posts => setPosts(posts))
  },
  [])

  const displayPosts = !posts || filter.length === 0
    ? posts
    : posts.filter(post => filter.includes(post.post_type))

  const renderClearFilter = () => {
    return (
      <TouchableOpacity
        activeOpacity={ 0.6 }
        onPress={ () => setFilter([]) }
      >
        <Icon name='close' style={ styles.clearFilter } size={ 24 } color={ colors.accent }/>
      </TouchableOpacity>
    )
  }

  return (
    <WepickView>
      <View style={ styles.contentContainer }>
        <View style={ styles.filterContainer }>
          <FilterButton onPress={ () => setShowFilterDialog(true) } />
          { filter.length > 0 && renderClearFilter() }
        </View>
        <AsyncList
          showsVerticalScrollIndicator={ false }
          data={ displayPosts }
          loading={ !posts }
          renderItem={({item}) => <PostCard post={ item } press={() => navigation.navigate('post', {post: item})} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={ <View style={{ height: 20 }}/> }
        />
      </View>
      <FilterDialog
        visible={ showFilterDialog }
        setVisible={ setShowFilterDialog }
        filterOptions={[
          { name: 'Sorteo Semanal', type: 'weekly_lottery'},
          { name: 'Elite Users', type: 'elite_users'},
          { name: 'Marcas', type: 'brand'},
          { name: 'Récords y Logros de usuarios', type: 'record'},
          { name: 'Sobre WePickApp', type: 'about_wepick'},
        ]}
        currentFilter={ filter }
        onClose={ setFilter }
      />
    </WepickView>
  )
}

export default Posts

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    gap: 16,
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: '8%'
  },
  clearFilter: {
    padding: 6
  }
})