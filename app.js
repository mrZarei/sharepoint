function getIdFromUri(ff) {
    var scriptbase = hostweburl + "/_layouts/15/";
    // console.log(ff);
    // Load the js files and continue to the successHandler
    $.getScript(scriptbase + "SP.RequestExecutor.js", function () { execCrossDomainRequestIdFromUri(ff); });
}
function execCrossDomainRequestIdFromUri(ff) {
    for (index in ff) {
        var executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync(
           {
               
               url: ff[index].uri,
               method: "GET",
               headers: { "Accept": "application/json; odata=verbose" },
               success:  function (data) {
                   callback(data,index);
               },
               error: errorHandlerIdFromUri
           }
       );
    }
}
function callback(data,index){
	var jsonObject = JSON.parse(data.body);
                   var results = jsonObject.d; var item = 0; var i = 0;
                   console.log(results);
                   arrayOfId.push(results.Id,ff[index].Name);                  
                   console.log(arrayOfId);
                   if (arrayOfId.length == ff.length) {
                       if (index == ff.length - 1) {
                           console.log(arrayOfId);
                           getArraysOfIds.resolve(arrayOfId);
                       }
                   }
}
