import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {useAuthStore} from "./useAuthStore";

export const useChatStore = create((set,get) =>({
    messages:[],
    botMessages: [], 
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    isBotChat:false,
    setMessages: (msgs) => set({ botMessages: msgs }),
    addMessage: (msg) => set((state) => ({ botMessages: [...state.messages, msg] })),
    

    getUsers:async()=>{
        set({isUsersLoading:true});
        try{
            const res=await axiosInstance.get("/messages/users");
            const users = res.data;
            users.sort((a, b) => (b.isBot ? 1 : 0) - (a.isBot ? 1 : 0));
            set({ users });
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading:false});
        }
    },

    getMessages:async (userId)=>{
        set({isMessagesLoading:true});
        try{
            const res=await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isMessagesLoading:false});
        }
    },

    sendMessage: async (messageData)=>{
        const {selectedUser,messages}=get();
        try{
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}` , messageData);
            set({messages: [...messages,res.data]});
        }catch(error){
            toast.error(error.response.data.message);
        }
    },
    subscribeToMessages:()=>{
        const {selectedUser}=get();
        if(!selectedUser) return;

        const socket=useAuthStore.getState().socket;

        socket.on("newMessage",(newMessage)=>{
            const isMessageSentFromSelectedUser=newMessage.senderId === selectedUser._id;
            if(!isMessageSentFromSelectedUser) return;
            set({
                messages: [...get().messages,newMessage],
            });
        });
        
    },

    unsubscribeFromMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    fetchBotMessages: async () => {
    try {
      const res = await axiosInstance.get("/groq/bot-history");
      const botMsgs = res.data; 
      set({ botMessages: botMsgs });
    } catch (error) {
      console.error("Error fetching bot messages:", error);
    }
  },

  sendBotMessage: async (text) => {
    const { authUser } = get(); 
    const userId = authUser?._id;

    
    const promptMessage = {
      _id: Date.now(), // temp ID
      text,
      senderId: userId,
      createdAt: new Date().toISOString(),
      isBot: false,
    };
    get().addMessage(promptMessage);

    try {
      const res = await axiosInstance.post("/groq/ask-bot", {
        prompt: text,
        history: [], 
      });

      const replyText = res.data.reply;

      // Add bot reply to UI
      const botMessage = {
        _id: Date.now() + 1,
        text: replyText,
        senderId: "bot",
        createdAt: new Date().toISOString(),
        isBot: true,
      };
      get().addMessage(botMessage);
    } catch (error) {
      console.error("Bot error:", error);
      get().addMessage({
        _id: Date.now() + 2,
        text: "⚠️ Failed to get response from AI assistant.",
        senderId: "bot",
        createdAt: new Date().toISOString(),
        isBot: true,
      });
    }
  },
    setSelectedUser: (selectedUser) =>
  set({
    selectedUser,
    isBotChat: selectedUser?.isBot || false,
  }),

}))