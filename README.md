# grunt-peaches

> grunt task for [peaches](http://peaches.io).

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-peaches --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-peaches');
```

## The "peaches" task

### Overview
In your project's Gruntfile, add a section named `peaches` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  peaches: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Usage Examples

```js
grunt.initConfig({
  peaches: {
    sprite: {
      options: {
        "beautify": true , // 是否需要格式化输出，默认为 false
        "model":"alipay", // 指定上传图片到哪台服务器，默认支持 'alipay', 'tfsdaily', 默认为 alipay
        "retina":true, // 是否支持高清显示, 默认为 false
        "format":"png8", // 输出图片的格式,支持 png8 和 png24, 默认为 png8
        "sort":"h" // 输出图片的排列规则, h 为竖排, v 为横排 默认为 h
      },
      files: [{
        cwd: '.build/dist',
        src: '**/*.css',
        dest: '.build/dist'
      }]
    }
  }
})
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### 0.2.0

Support customize options.
