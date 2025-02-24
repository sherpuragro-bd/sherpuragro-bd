export default function Layout({ children }) {
  return (
    <main className="bg-adminBg text-slate-300 h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-5">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-800 rounded cursor-pointer">
              Dashboard
            </li>
            <li className="p-2 bg-gray-800 rounded cursor-pointer">Users</li>
            <li className="p-2 bg-gray-800 rounded cursor-pointer">Settings</li>
            <li className="p-2 bg-red-600 rounded cursor-pointer">Logout</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 p-4 text-white text-lg font-bold">
          Admin Dashboard
        </header>

        {/* Content Area */}
        <section className="p-5 flex-1 overflow-auto">{children}</section>
      </div>
    </main>
  );
}
