"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Input } from "@/src/components/ui/Input";
import { cn } from "@/lib/utils";
import Image from "next/image";

const contacts = [
  { 
    id: 1, 
    name: "Alexander Graham", 
    email: "alex@example.com", 
    phone: "+62 812-3456-7890",
    location: "Jakarta, Indonesia",
    status: "Active", 
    lastMsg: "I'll check the integration docs.", 
    time: "2m ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    unread: 2,
    labels: ["VIP", "Enterprise"],
    joined: "March 12, 2024"
  },
  { 
    id: 2, 
    name: "Sarah Jenkins", 
    email: "sarah.j@company.com", 
    phone: "+62 899-7766-5544",
    location: "Surabaya, Indonesia",
    status: "Active", 
    lastMsg: "The new design looks amazing!", 
    time: "1h ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    unread: 0,
    labels: ["Support"],
    joined: "Feb 05, 2024"
  },
  { 
    id: 3, 
    name: "Michael Chen", 
    email: "m.chen@tech.io", 
    phone: "+1 415-555-0132",
    location: "San Francisco, USA",
    status: "Offline", 
    lastMsg: "Can we schedule a call?", 
    time: "5h ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    unread: 0,
    labels: ["Enterprise", "Trial"],
    joined: "Jan 20, 2024"
  },
];

const mockMessages = [
  { id: 1, type: "received", text: "Hi there! How's the project going?", time: "10:00 AM" },
  { id: 2, type: "sent", text: "It's going great! Just finishing up the chat UI.", time: "10:05 AM" },
  { id: 3, type: "received", text: "That sounds excellent. Can't wait to see it.", time: "10:06 AM" },
  { id: 4, type: "sent", text: "I'll send you a preview in a bit.", time: "10:10 AM" },
];

export default function KontakPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [message, setMessage] = useState("");
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="flex-1 h-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col md:flex-row">
      
      {/* 1. Contact List Pane (Left) */}
      <div className={cn(
        "w-full md:w-[350px] border-r border-gray-100 flex flex-col bg-gray-50/30 transition-all duration-300 shrink-0",
        // On very small screens we might want to hide this if a chat is selected, 
        // but for now keeping it simple as per request.
      )}>
        <div className="p-6 border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900 poppins-bold">Messages</h1>
            <button className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all">
              <Icon icon="lucide:edit" width={18} />
            </button>
          </div>
          <div className="relative group">
            <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" width={16} />
            <Input 
              placeholder="Search chats..." 
              variant="secondary"
              className="pl-10 h-10 bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl text-sm"
            />
          </div>
        </div>

        <div className="grow overflow-y-auto p-3 space-y-1 custom-scrollbar">
          {contacts.map((contact) => (
            <div 
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border border-transparent",
                selectedContact.id === contact.id 
                  ? "bg-white border-gray-100 shadow-sm" 
                  : "hover:bg-gray-100/50"
              )}
            >
              <div className="relative shrink-0">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-secondary/20">
                  <Image src={contact.avatar} alt={contact.name} fill className="object-cover" unoptimized />
                </div>
                {contact.status === "Active" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className={cn("text-sm font-bold truncate", selectedContact.id === contact.id ? "text-primary" : "text-gray-900")}>
                    {contact.name}
                  </h3>
                  <span className="text-[10px] text-muted-foreground font-medium">{contact.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate leading-relaxed">
                  {contact.lastMsg}
                </p>
              </div>
              {contact.unread > 0 && (
                <div className="shrink-0 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {contact.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Chat Pane (Middle) */}
      <div className="flex-1 flex flex-col bg-white min-w-0">
        {/* Chat Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-100 bg-secondary/10 shrink-0">
              <Image src={selectedContact.avatar} alt={selectedContact.name} fill className="object-cover" unoptimized />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-gray-900 poppins-semibold truncate">{selectedContact.name}</h2>
              <div className="flex items-center gap-1.5">
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  selectedContact.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
                )} />
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{selectedContact.status}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
              <Icon icon="lucide:phone" width={20} />
            </button>
            <button className="hidden sm:flex p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
              <Icon icon="lucide:video" width={20} />
            </button>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className={cn(
                "p-2.5 rounded-xl transition-all",
                showDetails ? "text-primary bg-primary/5" : "text-gray-400 hover:text-primary hover:bg-primary/5"
              )}
            >
              <Icon icon="lucide:info" width={20} />
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="grow overflow-y-auto p-8 space-y-6 bg-gray-50/20 custom-scrollbar">
          {mockMessages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex flex-col max-w-[85%]",
                msg.type === "sent" ? "ml-auto items-end" : "items-start"
              )}
            >
              <div className={cn(
                "p-4 rounded-2xl text-sm shadow-sm",
                msg.type === "sent" 
                  ? "bg-primary text-white rounded-br-none" 
                  : "bg-white text-gray-700 border border-gray-100 rounded-bl-none"
              )}>
                {msg.text}
              </div>
              <span className="text-[10px] text-muted-foreground mt-1.5 font-medium px-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-2xl border border-gray-100 focus-within:border-primary/20 focus-within:bg-white transition-all">
            <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <Icon icon="lucide:plus-circle" width={20} />
            </button>
            <input 
              type="text" 
              placeholder="Type your message..."
              className="grow bg-transparent border-none focus:ring-0 text-sm py-2 px-1 outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="hidden sm:flex p-2 text-muted-foreground hover:text-primary transition-colors">
              <Icon icon="lucide:smile" width={20} />
            </button>
            <button className={cn(
              "p-2.5 rounded-xl transition-all shadow-sm",
              message.trim() ? "bg-primary text-white shadow-primary/20 scale-100" : "bg-gray-200 text-gray-400 scale-95"
            )}>
              <Icon icon="lucide:send" width={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Customer Detail Pane (Right) */}
      {showDetails && (
        <div className="w-full md:w-[320px] lg:w-[380px] border-l border-gray-100 flex flex-col bg-white overflow-y-auto custom-scrollbar animate-in slide-in-from-right duration-300">
          <div className="p-8 flex flex-col items-center">
            {/* Profile Large */}
            <div className="relative mb-6 group">
              <div className="relative h-32 w-32 rounded-3xl overflow-hidden border-4 border-gray-50 shadow-xl ring-1 ring-gray-100 transform transition-transform group-hover:scale-105 duration-300">
                <Image src={selectedContact.avatar} alt={selectedContact.name} fill className="object-cover" unoptimized />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                <Icon icon="lucide:shield-check" width={20} />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 poppins-bold mb-1 text-center">{selectedContact.name}</h2>
            <p className="text-sm text-muted-foreground mb-6 text-center">{selectedContact.email}</p>

            <div className="flex items-center gap-2 w-full mb-8">
              <button className="flex-1 py-2.5 bg-gray-50 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-100 transition-all border border-gray-100">Profile</button>
              <button className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all shadow-lg shadow-primary/20">Manage</button>
            </div>

            {/* Information Slots */}
            <div className="w-full space-y-6">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Contact Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Icon icon="lucide:phone" width={14} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{selectedContact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                      <Icon icon="lucide:map-pin" width={14} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{selectedContact.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                      <Icon icon="lucide:calendar" width={14} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Joined {selectedContact.joined}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Labels</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedContact.labels.map((label, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-bold">
                      {label}
                    </span>
                  ))}
                  <button className="px-3 py-1 border border-gray-100 text-muted-foreground rounded-lg text-[10px] hover:bg-gray-50 transition-all">
                    + Add
                  </button>
                </div>
              </div>

              <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-gray-900">Total Spent</h3>
                  <Icon icon="lucide:trending-up" className="text-emerald-500" width={16} />
                </div>
                <p className="text-2xl font-bold text-gray-900 poppins-bold">$1,240.00</p>
                <p className="text-[10px] text-muted-foreground mt-1">12 Orders placed in 2024</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
