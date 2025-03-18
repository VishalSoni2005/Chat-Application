import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar.component";
import NoChatSelected from "../components/NoChatSection.component";
import ChatContainer from "../components/ChatContainer.component";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="bg-base-200 h-screen">

      <div className="flex items-center justify-center px-4 pt-20">

        {/* above is the container that contain sidebar and chat */}
        <div className="bg-base-100 shadow-xl h-[calc(100vh-6rem)] w-full max-w-7xl rounded-lg"> 

          {/* sidebar and chat container */}
          <div className="flex h-full overflow-hidden rounded-lg">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default HomePage;
