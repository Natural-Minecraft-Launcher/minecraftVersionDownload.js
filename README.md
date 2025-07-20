# minecraftVersionDownload.js
使用说明：
先引用jquery再引用这个
getVersionList：获取版本列表
getDownloadList（版本号，版本列表，版本名称（启动器自定义名称））获取下载列表 结构类似[{"url":"https://xxx","path":"xxx"},{"url":"https://xxx","path":"xxx"}] url为资源下载地址 path为本地地址（须本地路径\.minecraft\+path）
getVersionJavaVersion（版本号，版本列表）获取官方java版本要求
getDownloadZipList（该版本manifest文件 也就是versions/版本名称/版本名称.json）获取须解压的文件路径 类似xxx.xx,xxx.xx 须本地路径\.minecraft\+path 解压里面的dll到versions/版本名称/版本名称-natives文件夹里
getVersionManifest（版本号，版本列表）获取指定版本号的manifest（在前面获取的下载列表里已包含该文件 无需重复获取（除非想剩事直接套到“获取须解压的文件”函数里）

其中的mvdTest.html用来测试这个文件 打开控制台看调试信息
