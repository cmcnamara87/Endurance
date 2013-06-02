
var scaleFactor = 0.5;
var snapshot = null;
var server_addr = 'http://ceeqapi.com';
var ceeq_key = 'Basic dGVzdGVyOnRlc3Rlcg==';

/* Convert base64 to raw binary data held in a string in order to POST via ajax */
function dataURItoBlob(dataURI) {
    // doesn't handle URLEncoded DataURIs
    var binary = atob(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    // write the bytes of the string to an array
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    // write the array to a blob
    return new Blob([new Uint8Array(array)], {type: mimeString});
}

/* Post photo to CeeQAPI (http://ceeqapi.com) for face detection */
function upload(photo_url)
{
    //$('#loader_image').show();
    /*var blob = dataURItoBlob(upload_image);
    console.info(blob);
    var formData = new FormData();
    formData.append("fileupload",blob);
    console.info(formData);*/
    $.ajax( {
           url: server_addr + '/api/photos/',
           type: 'POST',
           data: {'photo_source_url':photo_url},
           headers: {'Authorization':ceeq_key},
           dataType: 'json',
           success: function( data )
           {
            console.info('success');
            console.info(data);
            for(var i=0;i<data.faces.length;i++){
                //draw face (optional; element may have to be passed in)
                var top = data.height*data.faces[i].face_tly;
                var left = data.width*data.faces[i].face_tlx;
                var width = data.width*data.faces[i].face_width;
                var height = data.height*data.faces[i].face_height;
                var stylestr = "height:"+height+"px;width:"+width+"px;top:"+top+"px;left:"+left+"px"
                $( ".PhotoCell--photoWrapper" ).append('<div class="PhotoCell--tag" style="'+stylestr+';" data-face="'+data.faces[i].id+'"></div>');
            }
            //$('#loader_image').hide();
           },
           error: function(data)
           {
            console.info('error');
            console.info(data);
            //$('#loader_image').hide();
           },
    } );
}


/* Hooks into html (assumes button called 'send_button') */
send_button = document.getElementById('send_button');
send_button.addEventListener("click", upload, true);