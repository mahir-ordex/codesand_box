import { useState } from 'react'

import './App.css'
import { Editor } from '@monaco-editor/react'

function App() {
  const [output, setOutput] = useState('')
  const [code, setCode] = useState("console.log('coding')")

  // const run = () =>{
  //   const log: string[] = []

  //   let originalLog = console.log

  //   console.log = (...args) => {
  //     log.push(args.join(' '))
  //   }
  //   try {
  //     eval(code)
  //     setOutput(log.join('\n'))
  //     console.log = originalLog
  //   } catch (error: any) {
  //     log.push('⚠ ' + error.message)
  //   }
  //   console.log = originalLog
  // }
  const run = () => {
    setOutput('')
    const logs: string[] = []
    const originalLog = console.log

    console.log = (...args) => {
      const line = args.join(' ')
      logs.push(line)
      setOutput((prev) => prev + line + '\n')
    }

    try {
      eval(code)
    } catch (err: any) {
      setOutput(err.message)
    }

    setTimeout(() => {
      console.log = originalLog
    }, 2000)
  }

  return (
    <main className='playground'>
      <div className='playground__backdrop' aria-hidden='true' />

      <header className='playground__header'>
        <p className='playground__eyebrow'>JavaScript Console Lab</p>
        <h1 className='playground__title'>Test snippets, see logs instantly</h1>
      </header>

      <section className='playground__panel playground__panel--editor'>
        <div className='playground__panelTop'>
          <h2>Editor</h2>
          <button className='runButton' onClick={run}>Run Code</button>
        </div>

        <div className='editorWrap'>
          <Editor
            height='100%'
            defaultLanguage='javascript'
            defaultValue="console.log('coding')"
            theme='vs-dark'
            onChange={(value) => setCode(value || '')}
          />
        </div>
      </section>

      <section className='playground__panel playground__panel--output'>
        <div className='playground__panelTop'>
          <h2>Output</h2>
          <span className='logCount'>{output ? `${output.trim().split('\n').length} line(s)` : 'No logs yet'}</span>
        </div>

        <pre className='outputView'>{output || 'Run code to see console output...'}</pre>
      </section>
    </main>
  )
}

export default App
