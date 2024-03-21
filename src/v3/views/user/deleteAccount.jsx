import Text from "../../components/text.component"
import WepickView from "../../components/wepickView.component"

const DeleteAccount = () => {
  return (
    <WepickView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: '8%'}}>
      <Text style={{ fontSize: 32, textAlign: 'center' }}>
        Vista para eliminar cuenta ...
      </Text>
    </WepickView>
  )
}

export default DeleteAccount