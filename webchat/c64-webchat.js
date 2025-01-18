import { changeColor } from '../three/ascii.js';
import { talkingState } from '../three/ascii.js';

const cognigyEndpointURL = "https://endpoint-app.cognigy.ai/xxxxxx" // You can find this in your Cognigy.AI webchat endpoint settings

// Initializes the webchat
initWebchat(
    cognigyEndpointURL,
    {
        settings: {},
    }
).then((webchat) => {
    window.webchat = webchat;

    // Automatically start the webchat
    webchat.open();

    // Establish event listener
    webchat.registerAnalyticsService(event => {

        // Check all outgoing messages
        if (event.type === "webchat/outgoing-message") {
            const { payload } = event;
            const { text, data } = payload;

            // Change values when first message goes out
            changeColor("red");
            talkingState(true);
        }

        // Check all incoming messages
        if (event.type === "webchat/incoming-message") {
            const { payload } = event;
            const { text, data } = payload;
            if (data?.avatarTalking === false) {
                // Change values back to normal after 1 second
                setTimeout(() => {
                    changeColor("white");
                    talkingState(false);
                  }, 1000);
            }
        }
    });
});

// Check for webchat mutations
let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (!mutation.addedNodes) return;
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
});