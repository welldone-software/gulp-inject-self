# gulp-inject-self

> A [Gulp](http://gulpjs.com/) that injects self stream to a destination file.

> for stream.txt:
>```
>my own file
>```
>and for dest.txt:
>```
>dest
>insert here
>dest
>```
> the code
>```js
>var injectSelf = require('gulp-inject-self');
>gulp.task('inject', function(){
>    return gulp.src('stream.txt')
>       .pipe(injectSelf('dest.txt', /insert here/))
>       .pipe(gulp.dest('.'));
>}
>```
>outputs stream.txt with the content:
>```
>dest
>my own file
>dest
>```
> and the code
>```js
>var injectSelf = require('gulp-inject-self');
>gulp.task('inject', function(){
>    return gulp.src('stream.txt')
>       .pipe(injectSelf('dest.txt', /insert here/, {
>            replaceWith: function(fileContent){
>                return '$&\n' + fileContent; //the string being replaced, new line, file content from the stream
>            }
>       }))
>       .pipe(gulp.dest('.'));
>}
>```
>outputs stream.txt with the content:
>```
>dest
>insert here
>my own file
>dest
>```

## Getting Started
This plugin requires Gulp `~3.5.5`

If you haven't used [Gulp](http://gulpjs.com/) before, be sure to check out the [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) guide, as it explains how to create a [Gulpfile](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#3-create-a-gulpfilejs-at-the-root-of-your-project) as well as install and use Gulp plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install gulp-inject-self --save-dev
```

Once the plugin has been installed, it should be required inside your Gulpfile:

```js
var injectSelf = require('gulp-inject-self');
```

### Options

#### options.replaceWith
Type: `Function`
Default value: `function(contents){ return contents; };`

Preprocessing the contents of file from the gulp stream when replace is applied on the target file.

#### options.skipBinary
Type: `Boolean`
Default value: `false`

Should binary files be skipped.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Gulp](http://gulpjs.com/).

## Release History
 - 0.0.1 - initial release.

## License
[MIT](https://github.com/welldone-software/gulp-inject-self/blob/master/LICENSE)

