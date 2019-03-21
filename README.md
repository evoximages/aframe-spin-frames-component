## aframe-spin-frames-component

A Spin Frames component to load Evox Images exterior vehicle assets

For [A-Frame](https://aframe.io).

  - [API](#api)
  - [Installation](#installation)
    - [Browser](#browser)

### API

| Property    | Description                                                                       | Default Value |
| ----------- | --------------------------------------------------------------------------------- | ------------- |
| folder      | Path to local asset folder  (`required`)                                          | ' '           |
| urls        | An array of file paths to load as textures (`required`)                           |               |
| clickToSpin | Enable click to spin vehicle (**`clickable` class on parent `<a-image>` required) | false         |
| sensitivity | Spin velocity                                                                     | 3.2           |
| frameIndex  | Angle of starting image frame (out of 36)                                         | 24            |
| vifnum      | Vehicle ID                                                                        | ' '           |
| eye         | Left or right eye asset                                                           | left          |

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
  <a-scene id="a-scene" rotation="0 0 0" vr-mode-ui="enabled: true">
      <a-image
        class="clickable"
        scale="10 10 10"
        position="0 1.5 -4"
        material="shader:flat;"
        spin-frames="folder:./12957;
        urls:/12957_sp0640_001.png,/12957_sp0640_002.png,/12957_sp0640_003.png,/12957_sp0640_004.png,/12957_sp0640_005.png,/12957_sp0640_006.png,/12957_sp0640_007.png,/12957_sp0640_008.png,/12957_sp0640_009.png,/12957_sp0640_010.png,/12957_sp0640_011.png,/12957_sp0640_012.png,/12957_sp0640_013.png,/12957_sp0640_014.png,/12957_sp0640_015.png,/12957_sp0640_016.png,/12957_sp0640_017.png,/12957_sp0640_018.png,/12957_sp0640_019.png,/12957_sp0640_020.png,/12957_sp0640_021.png,/12957_sp0640_022.png,/12957_sp0640_023.png,/12957_sp0640_024.png,/12957_sp0640_025.png,/12957_sp0640_026.png,/12957_sp0640_027.png,/12957_sp0640_028.png,/12957_sp0640_029.png,/12957_sp0640_030.png,/12957_sp0640_031.png,/12957_sp0640_032.png,/12957_sp0640_033.png,/12957_sp0640_034.png,/12957_sp0640_035.png,/12957_sp0640_036.png;clickToSpin:true;vifnum:13225;">
      </a-image>
    <a-entity custom-cubemap="folder:showroom_ext;background:true"></a-entity> 
    <a-camera fov="80" look-controls="enabled:true" wasd-controls="enabled:false">
    </a-camera>
  </a-scene>
</body>
```
![screen1](public/screen1.png)
![screen2](public/screen2.png)
![screen3](public/screen3.png)

