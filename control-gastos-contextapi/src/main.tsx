import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BudgetProvider } from './context/BudgetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BudgetProvider> {/* para que la contextApi abrace toda la app */}
      <App />
    </BudgetProvider>
  </StrictMode>,
)
