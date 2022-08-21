将 youtube 上下载的歌曲合集分段 (使用 ffmpeg)

类似于这种：

- https://www.youtube.com/watch?v=WKnJMeMyuRc
- https://www.youtube.com/watch?v=MJW8eI8IDKw

只支持 windows 使用

### 使用说明

1. 将 ffmpeg 下载后放在 vendor 文件夹
2. 将待处理视频放在 source 文件夹
3. 将时间轴文件放在 preset 文件夹
4. 自己改代码吧
5. 运行 node ./index.js

### 视频下载

推荐 4k video downloader 工具，免费用户一天也可以下载 30 个视频

### 原理

核心命令：`ffmpeg -ss 132 -i input.mp3 -c copy output.mp3`

> https://stackoverflow.com/questions/46508055/using-ffmpeg-to-cut-audio-from-to-position
