
import { useEffect, useState } from "react"
import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"
import SidebarSkeleton from "./skeletons/SidebarSkeleton"
import { Search, Users, X, Filter, MessageCircle } from "lucide-react"

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
  const { onlineUsers } = useAuthStore()
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(false)

  useEffect(() => {
    getUsers()
  }, [getUsers])

  // Filter users based on online status and search query
  const filteredUsers = users.filter((user) => {
    const matchesOnlineFilter = showOnlineOnly ? onlineUsers.includes(user._id) : true
    const matchesSearch = user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesOnlineFilter && matchesSearch
  })

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-zinc-800/30 flex flex-col bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 relative">
      {/* Header */}
      <div className="border-b border-zinc-800/50 w-full p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center bg-indigo-500/10 text-indigo-400 p-2 rounded-lg">
              <MessageCircle className="size-5" />
            </div>
            <h2 className="font-semibold text-zinc-100 hidden lg:block">Messages</h2>
          </div>

          {/* Search toggle for mobile */}
          <button
            onClick={() => setIsSearchActive(!isSearchActive)}
            className="lg:hidden p-2 rounded-full hover:bg-zinc-800/50 transition-colors"
          >
            <Search className="size-5 text-zinc-400" />
          </button>
        </div>

        {/* Search and filter - desktop always visible, mobile conditional */}
        <div className={`mt-4 space-y-3 ${isSearchActive ? "block" : "hidden lg:block"}`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg py-2 pl-9 pr-4 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50"
            />
            <Search className="absolute left-3 top-2.5 size-4 text-zinc-500" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-zinc-500" />
              <span className="text-xs text-zinc-400 hidden lg:inline">Filters:</span>
            </div>

            <label className="cursor-pointer flex items-center gap-2 bg-zinc-800/30 px-3 py-1.5 rounded-lg hover:bg-zinc-800/50 transition-colors">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showOnlineOnly}
                  onChange={(e) => setShowOnlineOnly(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-zinc-700 rounded-full peer peer-checked:bg-indigo-600/50"></div>
                <div className="absolute left-1 top-1 bg-zinc-400 w-3 h-3 rounded-full transition peer-checked:bg-indigo-200 peer-checked:translate-x-4"></div>
              </div>
              <span className="text-xs text-zinc-300">Online only</span>
              <span className="text-xs text-zinc-500 ml-1">({onlineUsers.length - 1})</span>
            </label>
          </div>
        </div>
      </div>

      {/* User list */}
      <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
        <div className="py-2">
          <div className="px-4 py-2">
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider hidden lg:block">
              {showOnlineOnly ? "Online Contacts" : "All Contacts"}
            </h3>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="space-y-1 px-2">
              {filteredUsers.map((user) => (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`
                    w-full rounded-lg transition-all duration-200
                    ${
                      selectedUser?._id === user._id
                        ? "bg-indigo-500/10 hover:bg-indigo-500/20"
                        : "hover:bg-zinc-800/50"
                    }
                  `}
                >
                  <div className="p-2 flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={user.profilePic || "/avatar.png"}
                        alt={user.fullname}
                        className={`size-12 object-cover rounded-full border-2 ${
                          selectedUser?._id === user._id ? "border-indigo-500" : "border-transparent"
                        }`}
                      />
                      {onlineUsers.includes(user._id) && (
                        <span
                          className="absolute bottom-0 right-0 size-3.5 bg-emerald-500 
                          rounded-full ring-2 ring-zinc-900 animate-pulse"
                        />
                      )}
                    </div>

                    {/* User info - only visible on larger screens */}
                    <div className="hidden lg:flex flex-col text-left min-w-0 flex-1">
                      <div className="font-medium text-zinc-200 truncate flex items-center gap-1">{user.fullname}</div>
                      <div
                        className={`text-xs flex items-center gap-1.5 ${
                          onlineUsers.includes(user._id) ? "text-emerald-400" : "text-zinc-500"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            onlineUsers.includes(user._id) ? "bg-emerald-400" : "bg-zinc-500"
                          }`}
                        ></span>
                        {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
              <div className="bg-zinc-800/50 p-3 rounded-full mb-3">
                <Users className="size-6 text-zinc-500" />
              </div>
              <p className="text-zinc-400 text-sm">
                {searchQuery ? "No contacts match your search" : "No contacts available"}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setShowOnlineOnly(false)
                }}
                className="mt-2 text-xs text-indigo-400 hover:text-indigo-300"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer with user count */}
      <div className="border-t border-zinc-800/50 p-4 hidden lg:block">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            {filteredUsers.length} {filteredUsers.length === 1 ? "contact" : "contacts"}
          </span>
          <span className="text-xs text-zinc-500">{onlineUsers.length - 1} online</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
