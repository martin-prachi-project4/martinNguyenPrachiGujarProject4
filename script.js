$.ajax({
    url: 'https://developers.zomato.com/api/v2.1/search',
    method: 'GET',
    dataType: 'json',
    data: {
        apikey: '51229140792268d47f96f56aabbde055',
    }
}).then(
    function(res){
        console.log(res);
    }    
);