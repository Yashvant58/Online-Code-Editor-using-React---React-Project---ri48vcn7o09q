import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'
import { FontAwesomeIcon } from 
'@fortawesome/react-fontawesome';
import { faHtml5, faCss3Alt, faJs } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
    <h3>Online Code Editor</h3>
      <div className="pane top-pane">
        <Editor
          icon = <FontAwesomeIcon icon={faHtml5}/>
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
         icon = <FontAwesomeIcon icon={faCss3Alt}/>
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          icon = <FontAwesomeIcon icon={faJs}  />
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;