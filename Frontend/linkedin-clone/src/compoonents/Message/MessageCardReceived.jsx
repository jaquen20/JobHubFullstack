import React from "react";
import Styles from "./Message.module.css";

const MessageCardReceived = () => {
  return (
    <div>
      <div class="chat-message-left pb-4">
        <div>
          <img
            src="src/assets/images/profile.png"
            class="rounded-circle mr-1"
            alt="Sharon Lessman"
            width="40"
            height="40"
          />
          <div class="text-muted small text-nowrap mt-2">2:34 am</div>
        </div>
        <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
          <div class="font-weight-bold mb-1">Sharon Lessman</div>
          Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal
          commodo.
        </div>
      </div>
    </div>
  );
};

export default MessageCardReceived;
