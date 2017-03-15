$(document).ready(function(){
    $("#ajaxbtn").on("click", function(event){
        let urlStr = "http://localhost:3000/api/students";
        $.getJSON(urlStr, function(data){
            $.each(data, function(key, student){
                $('#students').append('<li>'+student.firstName+'</li>')
                console.log("First Name: ", student.firstName);
            })
            console.log("Data: ", data);
        })
        .error(function(error){
            console.log("Error: ", error);
        });
    })
});

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    var address = streetStr + ", " + cityStr;
    var urlStr = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location="+ address;
    var ny_api_url='http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+cityStr+'&sort=newest&api-key=0ad7431213b1430594d737d80a4447a3';
    var wiki_api_ulr='http://en.wikipaderedia.org/w/api.php?action=opensearch&search='+cityStr+'&format=json&callback=wikiCallback';
    
    $greeting.text("So, you want to live at " + address + "?");
    //$("body").html("")
    $body.append('<img class="bgimg" src=' + urlStr + '>');
    // YOUR CODE GOES HERE!
    //get NY Times Articles
    $.getJSON(ny_api_url, function(data){
        let articles = data.response.docs;
        $.each(articles, function(key, value) {
                $nytElem.append(
                '<li>'+
                    '<h6>'+value.headline.main+'</h6>'+
                    '<p><small>Document Type: '+value.document_type+
                    '<abstract>Abstract: '+value.abstract+'</abstract>&nbsp;'+
                    'Publication Date:&nbsp;'+value.pub_date+
                    '&nbsp;Source: '+'<a href="'+value.web_url+'" target="_blank">'+value.source+'<a/>'+
                    '</small></p>'+
                    '<p>'+value.snippet+
                    '<a href="'+value.web_url+'" target="_blank">Read more...</a>'+
                    '</p>'+
                '</li>'
                
                );
        //console.log("\nvalue: ", value);
        });
    })
    .error(function(error){
        alert("Error retrieving articles for " + cityStr + " city. Error details: " + error.toString());
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded!');
        //console.log("Error: ", error);
    });
    //GET WIKILINKS
    $.ajax({
        url: wiki_api_ulr,
        dataType: "jsonp",
        success: function(data, textStatus, jqXHR ){
            let wikiArticles = data[1];
            $.each(wikiArticles, function(key, value){
                let urlStr= value;
                $wikiElem.append('<li><a href="http://en.wikipedia.org/wiki/'+ urlStr +'" target="_blank">'+ urlStr+'</a></li>');
                console.log("key: ", key,"value: ", value);
            })
            //console.log("Wiki data",data);
        }
    })

    return false;
};

$('#form-container').submit(loadData);
