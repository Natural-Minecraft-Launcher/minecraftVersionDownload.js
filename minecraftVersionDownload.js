//copyright 2025 sungbly1tsstt
jQuery.support.cors = true;
function getVersionList(){
    return($.ajax({
        async: false,
        cache: false,
        type: "GET",
        url: "https://launchermeta.mojang.com/mc/game/version_manifest.json"
    }).responseJSON)
}
function getDownloadList(name,list,gameName){
    console.log('list',list)
    var index = -1;
    for(var i = 0;i < list["versions"].length;i++){
        if(list.versions[i].id == name){
            index = i;
        }
    }
    if(index == -1){
        return("{}")
    }
    var downloadList = $.ajax({
        async: false,
        cache: false,
        type: "GET",
        url: list.versions[index].url
    }).responseJSON
    var downloadJSON = '['
    var asset = $.ajax({
        async: false,
        cache: false,
        type: "GET",
        url: downloadList["assetIndex"].url
    }).responseJSON
    downloadJSON += '{"url":"'+list.versions[index].url+'","path":"versions/'+gameName+'/'+gameName+'.json"}'
    console.log('asset',asset)
    downloadJSON += ',{"url":"'+downloadList["assetIndex"].url+'","path":"assets/indexes/'+downloadList.assetIndex.id+'.json"}'
    for (var i = 0;i<Object.keys(asset.objects).length;i++){
        downloadJSON += ',{"url":"https://resources.download.minecraft.net/'+asset["objects"][Object.keys(asset.objects)[i]].hash.substring(0,2)+"/"+asset["objects"][Object.keys(asset.objects)[i]].hash+'","path":"assets/objects/'+asset["objects"][Object.keys(asset.objects)[i]].hash.substring(0,2)+"/"+asset["objects"][Object.keys(asset.objects)[i]].hash+'"}'
    }
    console.log("client")
    downloadJSON += ',{"url":"'+downloadList.downloads.client.url+'","path":"versions/'+gameName+'/'+gameName+'.jar"}'
    console.log("lib")
    for (var i = 0;i<downloadList.libraries.length;i++){
        downloadJSON += ',{"url":"'+downloadList.libraries[i].downloads.artifact.url+'","path":"libraries/'+downloadList.libraries[i].downloads.artifact.path+'"}'
    }
    if(typeof downloadList.logging.client.file.url != 'undefined'){
        downloadJSON += '{"url":"'+downloadList.logging.client.file.url+'","path":"versions/'+gameName+'/'+downloadList.logging.client.file.id+'"}'
    }
    downloadJSON += "]"
    return(downloadJSON)
}
function getVersionJavaVersion(list){
    return(list.javaVersion.majorVersion)
}
function getDownloadZipList(list){
    var zipList = ""
    for (var i = 0;i<list.libraries.length;i++){
        if(typeof list.libraries[i].rules != 'undefined'){
            if(list.libraries[i].rules[0].os.name == "windows"){
                if(zipList.length != 0 ){
                    zipList += ","
                }
                zipList += 'libraries/'+list.libraries[i].downloads.artifact.path
            }
        }
    }
    return(zipList)
}
function getVersionManifest(name,list){
    console.log('list',list)
    var index = -1;
    for(var i = 0;i < list["versions"].length;i++){
        if(list.versions[i].id == name){
            index = i;
        }
    }
    if(index == -1){
        return("{}")
    }
    var downloadList = $.ajax({
        async: false,
        cache: false,
        type: "GET",
        url: list.versions[index].url
    }).responseJSON
    return(downloadList)
}