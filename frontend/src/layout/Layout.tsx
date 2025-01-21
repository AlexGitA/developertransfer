import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      {/* Navbar could go here */}
      <nav className="bg-white shadow">
        {/* Navigation content */}
      </nav>

      {/* This is where page content (Dashboard, LoginPage etc.) will render */}
      <main>
        <Outlet />
      </main>

      {/* Footer could go here */}
      <footer className="bg-gray-100">
        {/* Footer content */}
      </footer>
    </div>
  )
}

export default Layout