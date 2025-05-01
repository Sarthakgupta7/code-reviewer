import { useState ,useEffect} from 'react'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import './App.css'
import axios from 'axios';
import Editor from "react-simple-code-editor"
import Markdown from "react-markdown"

function App() {
  useEffect(()=>{
    prism.highlightAll()
  })
  const [ review, setReview ] = useState(`The Review of the code will be shown Here😇`)

  const [code, setCode] = useState(`Enter code you wanaa review🧐`)

async function reviewCode() {
  const response = await axios.post('http://localhost:3000/ai/get-review', { code })
  setReview(response.data)
}
  return (
    <> 
     <h1 className='headin'>🤖AI Powered Code Reviewer</h1><main>
     
      <div className='left'>
        <div className='code'>
        <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
        </div>
        <div 
        onClick={reviewCode}
        className='review'>Review</div>
      </div>
      <div className='right'><Markdown>{review}</Markdown></div>
      </main>
      <h3 className='headin'>Made with 💛 by Sarthak@7</h3>
      </>
  )
}


export default App
