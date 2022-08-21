将 youtube 上下载的歌曲合集分段 (使用 ffmpeg)

类似于这种：

- https://www.youtube.com/watch?v=WKnJMeMyuRc
- https://www.youtube.com/watch?v=MJW8eI8IDKw

只支持 windows 使用

核心命令：`ffmpeg -ss 132 -i input.mp3 -c copy output.mp3`

> https://stackoverflow.com/questions/46508055/using-ffmpeg-to-cut-audio-from-to-position

将 ffmpeg 下载后放在 vendor 文件夹
