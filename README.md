## aframe-spin-frames-component

A Spin Frames component to load Evox Images exterior vehicle assets

For [A-Frame](https://aframe.io).

  - [API](#api)
  - [Installation](#installation)
    - [Browser](#browser)

### API

| Property    | Description                                                                                                           | Default Value |
| ----------- | --------------------------------------------------------------------------------------------------------------------- | ------------- |
| folder      | Path to local asset folder  (`required`)                                                                              | ' '           |
| stereo      | `left`, `right`, or `both`. Sets rendering layer when VR mode is on                                                   | both          |  |
| clickToSpin | Enable click to spin vehicle (**`clickable` class on parent `<a-image>` required). If false, defaults to drag to spin | false         |
| sensitivity | Spin velocity                                                                                                         | 3.2           |
| frameIndex  | Angle of starting image frame (out of 36)                                                                             | 24            |
| vifnum      | Vehicle ID (required)                                                                                                 | ' '           |
| eye         | Left or right eye asset                                                                                               | left          |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

### Usage

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
  <script src="aframe-spin-frames-component.min.js"></script>
</head>

<body>
  <a-scene id="a-scene" rotation="0 0 0" vr-mode-ui="enabled:false" >
    
    <a-camera id="camera" position="0 1.6 0" fov="70" look-controls="enabled:false" wasd-controls="enabled:false">
    </a-camera>
    
    <!-- Left eye -->
    <a-image
      class="clickable"
      position="0 1.6 -0.5"
      scale="1 1 1"
      height="0.56"
      width="1"
      spin-frames="folder:AIL13614_1024;clickToSpin:false;vifnum:13614;stereo:both;eye:left">
    </a-image>

    <!-- Right eye (optional)-->
    <a-image
      class="clickable"
      position="0 1.6 -0.5"
      scale="1 1 1"
      height="0.56"
      width="1"
      spin-frames="folder:AIL13614_1024;clickToSpin:false;vifnum:13614;stereo:right;eye:right">
    </a-image>
    
    <!-- Showroom -->
    <!-- Requires aframe-custom-cubemap-component & folder of showroom cubemap images -->
    <a-entity custom-cubemap="folder:showroom_ext;background:true"></a-entity> 
  </a-scene>
</body>
```
![screen1](public/screen1.png)
![screen2](public/screen2.png)
![screen3](public/screen3.png)

