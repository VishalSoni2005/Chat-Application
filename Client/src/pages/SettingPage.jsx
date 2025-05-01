import { useState } from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Moon, Sun, Bell, BellOff, Volume2, VolumeX, Eye, EyeOff, Palette, MessageSquare, User, Shield, HelpCircle, ChevronRight, Check, X } from 'lucide-react';

const PREVIEW_MESSAGES = [
  { id: 1, content: "I can do anything for you my Love!", isSent: false, time: "12:42 PM" },
  { id: 2, content: "Oh, First Get Fair ...", isSent: true, time: "12:45 PM" }
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState("appearance");
  const [notificationSound, setNotificationSound] = useState(true);
  const [messagePreview, setMessagePreview] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(2); // 1-4 scale
  
  // Mock settings data
  const settingsTabs = [
    { id: "appearance", label: "Appearance", icon: <Palette className="h-5 w-5" /> },
    
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-16 pb-12">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">Settings</h1>
          <p className="mt-2 text-base-content/70">Customize your chat experience</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="rounded-xl bg-base-200 p-1 shadow-md">
                <nav className="flex flex-col space-y-1">
                  {settingsTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-content"
                          : "text-base-content hover:bg-base-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {tab.icon}
                        <span>{tab.label}</span>
                      </div>
                      {activeTab === tab.id && (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="rounded-xl bg-base-200 p-6 shadow-md">
              {/* Appearance Settings */}
              {activeTab === "appearance" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-base-content">Theme</h2>
                    <p className="mt-1 text-sm text-base-content/70">
                      Choose a theme that matches your style
                    </p>
                  </div>

                  {/* Theme Grid */}
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                    {THEMES.map((t) => (
                      <button
                        key={t}
                        className={`group relative flex cursor-pointer flex-col items-center gap-2 rounded-lg p-3 transition-all ${
                          theme === t 
                            ? "bg-base-300 ring-2 ring-primary ring-offset-2 ring-offset-base-200" 
                            : "hover:bg-base-300"
                        }`}
                        onClick={() => setTheme(t)}
                      >
                        <div className="relative h-12 w-full overflow-hidden rounded-md shadow-sm" data-theme={t}>
                          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-px p-1">
                            <div className="bg-primary rounded"></div>
                            <div className="bg-secondary rounded"></div>
                            <div className="bg-accent rounded"></div>
                            <div className="bg-neutral rounded"></div>
                          </div>
                        </div>
                        <span className="w-full truncate text-center text-xs font-medium">
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </span>
                        {theme === t && (
                          <div className="absolute -right-1 -top-1 rounded-full bg-primary p-1 text-primary-content shadow-md">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                 
                  
                  
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === "notifications" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-base-content">Notifications</h2>
                    <p className="mt-1 text-sm text-base-content/70">
                      Manage how you receive notifications
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-base-content">Message Notifications</h3>
                        <p className="text-sm text-base-content/70">
                          Get notified when you receive new messages
                        </p>
                      </div>
                      <label className="swap">
                        <input type="checkbox" checked={true} readOnly />
                        <BellOff className="swap-off h-5 w-5 text-base-content" />
                        <Bell className="swap-on h-5 w-5 text-primary" />
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-base-content">Notification Sounds</h3>
                        <p className="text-sm text-base-content/70">
                          Play sounds for incoming messages
                        </p>
                      </div>
                      <label className="swap">
                        <input 
                          type="checkbox" 
                          checked={notificationSound} 
                          onChange={() => setNotificationSound(!notificationSound)} 
                        />
                        <VolumeX className="swap-off h-5 w-5 text-base-content" />
                        <Volume2 className="swap-on h-5 w-5 text-primary" />
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-base-content">Message Preview</h3>
                        <p className="text-sm text-base-content/70">
                          Show message content in notifications
                        </p>
                      </div>
                      <label className="swap">
                        <input 
                          type="checkbox" 
                          checked={messagePreview} 
                          onChange={() => setMessagePreview(!messagePreview)} 
                        />
                        <EyeOff className="swap-off h-5 w-5 text-base-content" />
                        <Eye className="swap-on h-5 w-5 text-primary" />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Chat Settings */}
              {activeTab === "chat" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-base-content">Chat Settings</h2>
                    <p className="mt-1 text-sm text-base-content/70">
                      Customize your messaging experience
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-base-content">Read Receipts</h3>
                        <p className="text-sm text-base-content/70">
                          Let others know when you've read their messages
                        </p>
                      </div>
                      <input type="checkbox" className="toggle toggle-primary" checked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-base-content">Typing Indicators</h3>
                        <p className="text-sm text-base-content/70">
                          Show when someone is typing a message
                        </p>
                      </div>
                      <input type="checkbox" className="toggle toggle-primary" checked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-base-content">Media Auto-Download</h3>
                        <p className="text-sm text-base-content/70">
                          Automatically download media in chats
                        </p>
                      </div>
                      <select className="select select-bordered select-sm w-40">
                        <option>Wi-Fi only</option>
                        <option>Always</option>
                        <option>Never</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs would be implemented similarly */}
              {(activeTab === "privacy" || activeTab === "profile" || activeTab === "help") && (
                <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-base-content/20">
                  <p className="text-base-content/70">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings would be implemented here
                  </p>
                </div>
              )}
            </div>

            {/* Preview Section - Only show for appearance tab */}
            {activeTab === "appearance" && (
              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-base-content">Preview</h2>
                  <div className="badge badge-primary">Live Preview</div>
                </div>
                
                <div className="overflow-hidden rounded-xl bg-base-300 p-6 shadow-lg">
                  <div className="mx-auto max-w-lg">
                    {/* Mock Chat UI */}
                    <div className="overflow-hidden rounded-xl bg-base-100 shadow-md">
                      {/* Chat Header */}
                      <div className="border-b border-base-300 bg-base-200 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-content font-medium">
                            P
                          </div>
                          <div>
                            <h3 className="font-medium">Paglu</h3>
                            <p className="text-xs text-base-content/70">
                              <span className="inline-flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-success"></span>
                                Online
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Chat Messages */}
                      <div className="min-h-[240px] space-y-6 overflow-y-auto bg-base-100 p-4">
                        <div className="flex justify-center">
                          <div className="rounded-full bg-base-200 px-3 py-1 text-xs text-base-content/70">
                            Today
                          </div>
                        </div>
                        
                        {PREVIEW_MESSAGES.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                          >
                            {!message.isSent && (
                              <div className="mr-2 mt-1 h-8 w-8 flex-shrink-0 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm">
                                P
                              </div>
                            )}
                            <div
                              className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                                message.isSent
                                  ? "bg-primary text-primary-content"
                                  : "bg-base-200 text-base-content"
                              }`}
                              style={{ fontSize: `${0.875 + (fontSize - 2) * 0.125}rem` }}
                            >
                              <p>{message.content}</p>
                              <p
                                className={`mt-1 text-right text-[10px] ${
                                  message.isSent
                                    ? "text-primary-content/70"
                                    : "text-base-content/70"
                                }`}
                              >
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chat Input */}
                      <div className="border-t border-base-300 bg-base-200 p-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            className="input input-bordered flex-1 text-sm"
                            placeholder="Type a message..."
                            value="This is a preview"
                            readOnly
                          />
                          <button className="btn btn-primary btn-square">
                            <Send className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;