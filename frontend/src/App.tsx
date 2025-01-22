import './App.css'
import {MENTButton} from "@/components/button/MENT-button.tsx";

function App() {
  return (
      <>
          <div>
              <MENTButton
                  className="bg-white shadow"
                  href="https://example.com"
                  target="_blank"
                  variant="secondary"
                  theme="dark"
              >
                  Link
              </MENTButton>
          </div>
          <div>
              <MENTButton href="" target="_blank" variant="Primary" theme="dark">
                  Button
              </MENTButton>
          </div>
          <div>
              <MENTButton href="" target="_blank" variant="special" theme="light">
                  Button is really
              </MENTButton>
          </div>
      </>
  )
}

export default App