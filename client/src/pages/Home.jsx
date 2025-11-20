import React, { useContext} from "react";
import { ChatContent, Sidebar, RightSidebar } from "../components/index.js";
import { ChatContext } from "../../context/ChatContext.jsx";

const Home = () => {
  const {selectedUser} = useContext(ChatContext)
  return (
    <div className="border w-full h-screen sm:px-[15%] sm:py-[5%]">
      <div
        className={`backdrop-blur-sm border-2 border-[#B9061A]/50 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${
          selectedUser
            ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
            : "md:grid-cols-2"
        }`}
      >
        <Sidebar />
        <ChatContent
        />
        <RightSidebar
        />
      </div>
    </div>
  );
};

export default Home;
