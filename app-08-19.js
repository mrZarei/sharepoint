
/**
 * Created by mohammadReza on 8/19/2016.
 */

for (var i=0;i<header.length;) {
    var parameter=header[i];
    var site = splitArray[0];
    var list = splitArray[1];
    var execut = new SP.RequestExecutor(appweburl);
    execut.executeAsync(
        {
            url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('testing')/items?$select=" + paramet + "&@target='" + hostweburl + "'",
            MyParameter1: site,
            MyParameter2: list,
            THTable: parameter,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function(data){
                console.log(this.MyParameter1);
                console.log(data);
                jsonObject = JSON.parse(data.body);
                console.log(jsonObject.d)
                var result = jsonObject.d.results;
                console.log(result);
            },
            error: errorHandleToRetreiveItems
        }
    );
    pramob.excute();
    i++;
}

///////////////////////////
var myobjec = function (site, list, paramet) {

    this.site = site;
    this.list = list;
    this.paramet = paramet;
    var scriptbas = hostweburl + "/_layouts/15/";
    // Load the js files and continue to the successHandler
    // $.getScript(scriptbas + "SP.RequestExecutor.js", function () { execCrossDomainRequestToRetreiveItemFromList(site, list, paramet) });
    this.excute = $.getScript(scriptbas + "SP.RequestExecutor.js", function () {
        execCrossDomainRequestToRetreiveItemFromList(this.site, this.list, this.paramet)
            .done(function (data) {
                console.log(data);
            });
    })

}





