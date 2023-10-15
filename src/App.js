
import './App.css';
import { useCallback, useEffect, useState, useRef } from 'react';
import showToast from 'crunchy-toast';


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassWord] = useState('')

  const passwordRef = useRef(null)


  const generatePassoword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%&*^?/()+-_"

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassWord(pass)
  }, [length, numberAllowed, charAllowed])


  const copyPasswordGenerator = () => {
    window.navigator.clipboard.writeText(Password)
    passwordRef.current?.select()
    showToast('successfully copied ', 'success', 3000);
  }



  useEffect(() => {
    generatePassoword()

  }, [length, numberAllowed, charAllowed])

  return (
    <div><h1 className='text-center mt-4 heading text-light '>PASSWORD GENERATOR</h1>
    <div className=' container main-container'>
      
      <div className='div'>
      

      <div className=' p-2' >
        <div class="input-group mb-3">

          <div className='d-block mx-auto'>

            <input type="text" className="inputfield p-2 mt-5 fs-4" placeholder="pasword" aria-label="Recipient's username" aria-describedby="basic-addon2" value={Password} readOnly ref={passwordRef} />

            <button className="copy-button fs-4" id="basic-addon2" onClick={copyPasswordGenerator} >copy</button>
          </div>
        </div>

        <div className=''>
          <div className='container d-flex justify-content-center'>
            <input type="range" name='' id='' min={8} max={100} value={length} onChange={(e) => {
              setLength(e.target.value)
            }} />

            <label className="ms-5 fs-3"> Length : {length}</label>
            <input
              type="checkbox" name='' id=''
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }} 
              className="ms-5 fs-4 check-input" />

              <label className="ms-2 fs-3">Number</label>

            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
              className="ms-5 check-input" />

            <label className="text-center ms-2 fs-3">Character</label>
          </div>
        </div>

      </div>
</div>
    </div>
    </div>




  )
}
export default App;
