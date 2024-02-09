import { act, renderHook, waitFor } from "@testing-library/react-native"
import useData from "../src/hooks/useData"

describe('useData tests', () => {

  let fetchEmptyData

  beforeEach(() => {
    jest.useFakeTimers()
    fetchEmptyData = jest.fn(() => ({}))
  })

  it('calls the fetching data function', async () => {
    renderHook(() => useData(fetchEmptyData))
    await waitFor(() => expect(fetchEmptyData).toBeCalledTimes(1))
  })

  it('has a loading initial state of true', async () => {
    const hook = renderHook(() => useData(fetchEmptyData))
    expect(hook.result.current.loading).toBe(true)
  })

  it('has a loading state of false after fetching data', async () => {
    const hook = renderHook(() => useData(fetchEmptyData))

    await act(() => jest.runAllTimers())
    
    expect(hook.result.current.loading).toBe(false)
  })

  it('calls the fetch function to initialize data', async () => {
    renderHook(() => useData(fetchEmptyData))

    expect(fetchEmptyData).toBeCalledTimes(1)
  })

  it('sets the fetched data as state', async () => {
    const data = {
      id: 1,
      name: 'test_data'
    }
    const fetchData = jest.fn(async () => ({ data }))

    const hook = renderHook(() => useData(fetchData))

    expect(hook.result.current.data).toBe(null)

    await act(() => jest.runAllTimers())
    
    expect(hook.result.current.data).toEqual(data)
  })

  it('sets received error as state', async () => {
    const error = { message: 'this is an error' }
  
    const fetchData = jest.fn(async () => ({ data: null, error }))

    const hook = renderHook(() => useData(fetchData))

    expect(hook.result.current.data).toBe(null)
    expect(hook.result.current.error).toBe(null)
    
    await act(() => jest.runAllTimers())
    
    expect(hook.result.current.data).toBe(null)
    expect(hook.result.current.error).toEqual(error)
  })
})