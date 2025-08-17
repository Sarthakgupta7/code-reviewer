import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import './App.css';
import axios from 'axios';
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";

function App() {
  useEffect(() => {
    prism.highlightAll();
  });

  const [review, setReview] = useState(`The Review of the code will be shown Here😇`);
  const [code, setCode] = useState(`Enter code you wanaa review🧐`);
  const [loading, setLoading] = useState(false); // <-- loading state

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      setReview(response.data);
    } catch (error) {
      setReview("❌ Error while fetching review.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <> 
      <h1 className='headin'>🤖AI Powered Code Reviewer</h1>
      <main>
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
            className='review'
            style={{ cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Reviewing..." : "Review"}
          </div>
        </div>

        <div className='right'>
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
              <p>Reviewing your code...</p>
            </div>
          ) : (
            <Markdown>{review}</Markdown>
          )}
        </div>
      </main>
      <h3 className='headin'>Made with 💛 by Sarthak@7</h3>
    </>
  );
}

export default App;
