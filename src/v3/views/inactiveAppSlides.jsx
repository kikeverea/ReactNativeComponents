import React, {useEffect, useState} from 'react'
import { View, StyleSheet } from 'react-native'
import Carousel from 'pinar'
import { getSlides } from '../services/app.service'
import AppBar from '../components/appbar.component'
import WepickView from '../components/wepickView.component'
import colors from '../styles/colors'
import Text from '../components/text.component'

const InactiveAppSlides = () => {
  const [values, setValues] = useState(null)

    useEffect(() => {
      getSlides().then(res => {
        setValues(res)
      }).catch(err => {
        console.log('No se han podido recoger las slides')
      })
    }, [])

    return (
      <>
      <AppBar title='HORA CERO' goBack={ false }/>
      {values != null &&
      <WepickView style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <Carousel loop={true} showsControls={false} autoplay autoplayInterval={3000} dotStyle={{backgroundColor: colors.primary, width: 7, height: 7, marginRight: 7, borderRadius: 100}} activeDotStyle={{backgroundColor: colors.accent, width: 7, height: 7, marginRight: 7, borderRadius: 100}}>
              <View style={styles.slide}>
                <Text style={styles.text}>
                  La campaña publicitaria de mayor magnitud la ha contratado "{values.biggest_campaign_name}", con un total de {values.max_views} visualizaciones ({values.biggest_campaign_seconds}s)
                </Text>
              </View>
              <View style={styles.slide}>
                  <Text style={styles.text}>
                    Esta semana se han registrado un total de {values.active_users == null ? 0 : values.active_users} usuarios activos
                  </Text>
              </View>
              <View style={styles.slide}>
                  <Text style={styles.text}>
                    Actualmente hay {values.active_brands} macas con mínimo 1 campaña activa
                  </Text>
              </View>
              <View style={styles.slide}>
                  <Text style={styles.text}>
                    Hay un total de {values.pot} iCoals acumulados al BOTE
                  </Text>
              </View>
              <View style={styles.slide}>
                  <Text style={styles.text}>
                    La marca {values.biggest_chamber_brand == null ? 'XXX' : values.biggest_chamber_brand} es la que más ha usado la Recámara esta semana, con un total de {values.biggest_chamber_brand_views == null ? 0 : values.biggest_chamber_brand_views} visualizaciones no pagadas ({values.biggest_chamber_brand_seconds == null ? 0 : values.biggest_chamber_brand_seconds}s)
                  </Text>
              </View>
              {values.ranking_brands && <View style={styles.slide}>
                  <Text style={styles.text}>
                    Actuamente, las primeras marcas de ranking son: {JSON.parse(values.ranking_brands)[0]}, {JSON.parse(values.ranking_brands)[1]} y {JSON.parse(values.ranking_brands)[2]}
                  </Text>
              </View>}
              <View style={styles.slide}>
                  <Text style={styles.text}>
                    Hay un total de {values.total_elite_users} Elite Users para el reparto del Bote de este evnto de Hora Cero
                  </Text>
              </View>
              <View style={styles.slide}>
                  <Text style={styles.text}>
                    Hay un total de {values.lottery_participations} participaciones para el sorteo
                  </Text>
              </View>
              {values.top_10_users && <View style={styles.slide}>
                  <Text style={styles.text}>
                    Top 10 usuarios que más iCoals han aportado al Bote esta semana
                  </Text>
                  <Text style={{marginTop: 15}}></Text>
                  {JSON.parse(values.top_10_users).map((res, index) => {
                    return (
                      <Text style={styles.text}>
                        {index + 1}. {res}
                      </Text>
                    )
                  })
                  }
              </View>}
              {values.top_10_brands && <View style={styles.slide}>
                  <Text style={styles.text}>
                    Top 10 marcas que más iCoals han aportado al Bote de esta semana
                  </Text>
                  <Text style={{marginTop: 15}}></Text>
                  {JSON.parse(values.top_10_brands).map((res, index) => {
                    return (
                      <Text style={styles.text}>
                        {index + 1}. {res}
                      </Text>
                    )
                  })
                  }
              </View>}
              <View style={styles.slide}>
                  <Text style={styles.text}>
                    {values.creadit_deleted_users == null ? 0 : values.creadit_deleted_users} iCoals han sido aportados al Bote por cuentas de usuario eliminadas
                  </Text>
              </View>
          </Carousel>
        </WepickView>
        }
      </>
    )
}

export default InactiveAppSlides

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    maxWidth: '90%',
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 30,
    fontWeight: 'bold'
  }
})