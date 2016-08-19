
/**
 * Created by mohammadReza on 8/19/2016.
 */

for (var i=0;i<header.length;) {
    var parameter=header[i];
    var pramob=new myobjec  (splitArray[0], splitArray[1],parameter);
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

/////////////////////
function execCrossDomainRequestToRetreiveItemFromList(site, list, paramet) {
    var execut = new SP.RequestExecutor(appweburl);
    execut.executeAsync(
        {
            url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('testing')/items?$select=" + paramet + "&@target='" + hostweburl + "'",
            MyParameter1: site,
            MyParameter2: list,
            THTable: paramet,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: successHandleToRetreiveItems,
            error: errorHandleToRetreiveItems
        }
    );
}

function successHandleToRetreiveItems(data) {
    console.log(data);
    jsonObject = JSON.parse(data.body);
    console.log(jsonObject.d)
    var result = jsonObject.d.results;
    console.log(result);

}


