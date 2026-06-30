import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { FluentProvider, Switch, webLightTheme, webDarkTheme } from '@fluentui/react-components'
import { TaskPage } from './pages/example-page'

type ThemeToggleProps = {
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeToggle = ({ isDark, setIsDark }: ThemeToggleProps) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 16px' }}>
    <Switch
      checked={isDark}
      onChange={(_, data) => setIsDark(Boolean(data.checked))}
      label={isDark ? 'Dark theme' : 'Light theme'}
    />
  </div>
)

const App = () => {
  const [isDark, setIsDark] = React.useState(false)

  return (
    <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
      <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
      <TaskPage />
    </FluentProvider>
  )
}

const rootElement = document.querySelector<HTMLDivElement>('#app')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
