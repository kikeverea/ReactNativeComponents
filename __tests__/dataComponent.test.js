import { render, screen } from '@testing-library/react-native'
import DataComponent from '../src/components/data.component'
import '@testing-library/react-native/extend-expect'
import { act } from 'react-test-renderer'


describe('data component tests', () => {

  let fetchData

  beforeEach(() => {
    jest.useFakeTimers()
    fetchData = jest.fn(() => {
      return ({
        id: 1,
        name: 'test_data'
      })
    })
  })

  it('shows loading indicator when data is loading', () => {
    render(<DataComponent fetchData={ fetchData } />)

    const indicator = screen.getByAccessibilityHint('loading')

    expect(fetchData).toBeCalledTimes(0)
    expect(indicator).toBeOnTheScreen()
  })

  it('hides loading indicator when data is loaded', async () => {
    render(<DataComponent fetchData={ fetchData } />)

    const indicatorBefore = screen.getByAccessibilityHint('loading')
    expect(indicatorBefore).toBeOnTheScreen()
    expect(fetchData).toBeCalledTimes(1)
  
    await act(() => jest.runAllTimers())
    const indicatorNow = screen.queryByAccessibilityHint('loading')

    expect(fetchData).toBeCalledTimes(1)
    expect(indicatorNow).not.toBeOnTheScreen()
  })

})