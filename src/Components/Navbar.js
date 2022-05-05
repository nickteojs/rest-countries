const Navbar = () => {
  const body = document.getElementsByTagName("body")

  // Check if localStorage exists, if not, then create with true as default
  if (localStorage.getItem('darkMode') === null ) {
    localStorage.setItem('darkMode', "true")
  } else if (localStorage.getItem('darkMode')) {
    if (localStorage.getItem('darkMode') === "false") {
      body[0].classList.add("light-mode")
    } else if (localStorage.getItem('darkMode') === "true") {
      body[0].classList.remove("light-mode")
    }
  }

  const themeToggle = () => {
    if (localStorage.getItem('darkMode') === "true") {
      body[0].classList.add("light-mode")
      localStorage.setItem('darkMode', "false")
    } else if (localStorage.getItem('darkMode') === "false") {
      body[0].classList.remove("light-mode")
      localStorage.setItem('darkMode', "true")
    }
  }

  return (
    <nav>
      <ul>
        <li><h3>Countries Wiki</h3></li>
        <li><button onClick={themeToggle}>X</button></li>
      </ul>
    </nav>
  )
}

export default Navbar