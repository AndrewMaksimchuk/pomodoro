import { HistoryAPI } from '../types'

declare global {
  interface Window {
    historyAPI: HistoryAPI
  }
}
