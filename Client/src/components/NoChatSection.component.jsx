import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="bg-base-100/50 flex w-full flex-1 flex-col items-center justify-center p-16">
      <div className="max-w-md space-y-6 text-center">
        {/* Icon Display */}
        <div className="mb-4 flex justify-center gap-4">
          <div className="relative">
            <div className="bg-primary/10 flex h-16 w-16 animate-bounce items-center justify-center rounded-2xl">
              <MessageSquare className="text-primary h-8 w-8" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
