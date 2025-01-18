# commodore-webchat
A sandbox environment to communicate between the Cognigy.AI webchat widget and a three.js instance that renders a custom avatar.


## Installation
Most components are already included in the package. The latest version of the Cognigy v3 webchat is being loaded through index.html, but a local build of webchat.js v3.8.1 is also included. The customization of the webchat simply builds on top of the Cognigy webchat by loading a custom stylesheet and js file that overwrites the default style and behavior.

There are no external dependencies that may cause CORS issues, so you can just run the included index.html in your browser of choice.

You may need a SASS compiler if you wish to work with the included webchat-styles.scss for webchat styling rather than the compiled webchat-styles.css.


## Setup and configuration

### Cognigy

#### Endpoint URL
You will need to bring your own Cogngiy endpoint URL, which can be obtained via the config URL in the webchat v3 endpoint settings. This needs to be added to the c64-webchat.js file.

#### Supported output types
The custom CSS only supports text and quick reply output. Other output types are unstyled and may look unacceptable.

### Styling
The avatar/visualization can be customized via three/ascii.js to change the character set, size and resolution as well as the colors. Additional configuration can be done directly in three/addons/effects/AsciiEffect.js 

The color of the talking state is defined by calling the changeColor() function in c64-webchat.js

Additional styling for the webchat side can be included in webchat-styles.scss or webchat-styles.css, depending on whether you wish to work with SASS.


## Credits

The Cognigy Webchat is developed and maintained by Cognigy GmbH:
https://github.com/Cognigy/Webchat

Three.js is a 3D library that tries to make it as easy as possible to get 3D content on a webpage:
https://threejs.org/

The ASCII effect is based on the example from threejs.org:
https://threejs.org/examples/#webgl_effects_ascii

The C64 TrueType font package was developed by style64:
https://style64.org/c64-truetype



