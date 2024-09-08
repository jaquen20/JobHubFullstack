import React from "react";
import Styles from "./Message.module.css";

const MessageCardSend = () => {
  return (
    <div>
      <div class="chat-message-right pb-4">
        <div>
          <img
            src="src/assets/images/profile.png"
            class="rounded-circle mr-1"
            alt="Chris Wood"
            width="40"
            height="40"
          />
          <div class="text-muted small text-nowrap mt-2">2:33 am</div>
        </div>
        <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
          <div class="font-weight-bold mb-1">You</div>
          Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te
          vix.
        </div>
      </div>
    </div>
  );
};

export default MessageCardSend;
