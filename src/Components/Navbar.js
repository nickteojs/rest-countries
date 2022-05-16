import { useState, useEffect } from "react"

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const body = document.getElementsByTagName("body")

  // Check if localStorage exists, if not, then create with true as default
  const checkTheme = () => {
    if (localStorage.getItem('darkMode') === null ) {
      localStorage.setItem('darkMode', "true")
    } else if (localStorage.getItem('darkMode')) {
      if (localStorage.getItem('darkMode') === "false") {
        body[0].classList.add("light-mode")
        setDarkMode(false)
      } else if (localStorage.getItem('darkMode') === "true") {
        body[0].classList.remove("light-mode")
      }
    }
  }
  
  const themeToggle = () => {
    if (localStorage.getItem('darkMode') === "true") {
      body[0].classList.add("light-mode")
      localStorage.setItem('darkMode', "false")
      setDarkMode(false)
    } else if (localStorage.getItem('darkMode') === "false") {
      body[0].classList.remove("light-mode")
      localStorage.setItem('darkMode', "true")
      setDarkMode(true)
    }
  }

  useEffect(() => {
    checkTheme()
  }, [])

  return (
    <nav>
      <ul>
        <li><h3>Countries Wiki</h3></li>
        <li><button onClick={themeToggle}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button></li>
      </ul>
    </nav>
  )
}

export default Navbar