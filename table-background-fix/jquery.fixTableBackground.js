/**
 * Summary:
 * jQuery plugin to fix THEAD and TFOOT background images in Chrome and Safari.
 * 
 * Usage:
 *	$("tfoot").fixTableBackground();
 *  or if the image is bottom aligned the image height must be provided:
 *  $("tfoot").fixTableBackground(200);
 *
 * Author: Tim Booker
 * Date: 28/08/2012
 **/
(function($) {

    $.fn.fixTableBackground = function(imageHeight) {

        this.each(function() {
				
			// Find the URL of the existing background image.
			var rowBg = $(this).css("background-image");
			if(rowBg != "none")
			{
				// Remove the background.
				$(this).css("background-image", "none");
				
				// Find the position of the row relative to the table.
				var rowOffset = $(this).offset();
				
				// Find the difference in height of the background image and height of the row, used for bottom alignment of image.
				var heightDifference = 0;
				if(imageHeight)
					heightDifference = imageHeight - $(this).height();
			
				// Modify every cell in the row.
				$("td, th", $(this)).each(function() {
			
					// Find the position of the cell relative to the row.
					var cellOffset = $(this).offset();
					
					// Calculate new position of background image relative to the cell.
					var bgLeft = Math.round(rowOffset.left - cellOffset.left);
					var bgTop = Math.round(rowOffset.top - cellOffset.top) - heightDifference;
					var bgPosition = bgLeft + "px " + bgTop + "px";
					
					// Reapply background image to the cell with positioning.
					$(this).css("background-image", rowBg);
					$(this).css("background-position", bgPosition);
				});
			}
		});
        return this;
    }	
})(jQuery);
