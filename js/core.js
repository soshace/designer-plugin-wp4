function delElement(id){
  jQuery("#"+id).remove();
}
     
     function editArea(id,idx){
            var img_src=jQuery("#print_area_image-"+idx).attr("src");
            var content='<img src="'+img_src+'" id="print-img-'+id+'" />';
            var coord;
            var jcrop;
            jQuery("#printing-area").html(content);
            jQuery( "#printing-area" ).dialog({
              height:'auto',
              width:'auto',
              modal: true,
              open: function( event, ui ) {
                   jQuery(function($) {
                        jQuery('#print-img-'+id).Jcrop({                        
                        },function(){
                          jcrop=this;
                        });
                    }); 

                   if(jQuery("#wcla_location_editable_area-"+idx).val()!=''){
                     var str=jQuery("#wcla_location_editable_area-"+idx).val();
                     var coord=str.split(',');
                     //console.log(coord);
                     jcrop.setSelect(coord);
                     //console.log(jcrop);
                   }
              },
              buttons: {
                "Save": function() {
                
                  coord=jcrop.tellSelect();
                    console.log(coord);
                  jQuery("#wcla_location_editable_area-"+idx).val(coord.x+','+coord.y+','+coord.x2+','+coord.y2);
                  jQuery( this ).dialog( "close" );
                },
                Cancel: function() {
                  jQuery( this ).dialog( "close" );
                }
              }
            });                 
          }