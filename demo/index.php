<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr">
    <head>
		<title>TomyTable Demo - Krône Apps Corporation</title>

		<!-- Meta -->
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<meta name="description" content="Best advanced interaction controls for your HTML tables For Software Startups">
		<meta name="author" content="Krône Apps Corporation">    
		<link rel="shortcut icon" href="../assets/krone/icon.png"> 
        <link rel="stylesheet" type="text/css" href="../dist/tomytable.css" />
    </head>
    <body>


	<div class="limiter">
		<div class="container-table100">
			<div class="wrap-table100">
				<div class="table100 m-b-110">
					<table id="tomytable" class="table-sm">
						<thead>
							<tr class="row100 head">
								<th class="column100 column1" data-column="column1" scope="col">Nom</th>
								<th class="column100 column2" data-column="column2" scope="col">Sunday</th>
								<th class="column100 column3" data-column="column3" scope="col">Monday</th>
								<th class="column100 column4" data-column="column4" scope="col">Tuesday</th>
								<th class="column100 column5" data-column="column5" scope="col">Wednesday</th>
								<th class="column100 column6" data-column="column6" scope="col">Thursday</th>
								<th class="column100 column7" data-column="column7" scope="col">Friday</th>
								<th class="column100 column8" data-column="column8" scope="col">Saturday</th>
								<th class="column100 column9" data-column="column9" scope="col">Someday</th>
								<th class="column100 column10" data-column="column10" scope="col">Tomyday</th>
							</tr>
						</thead>
						<tfoot>
							<tr class="row100 foot">
								<th class="column100 column1" data-column="column1" scope="col">Nom</th>
								<th class="column100 column2" data-column="column2" scope="col">Sunday</th>
								<th class="column100 column3" data-column="column3" scope="col">Monday</th>
								<th class="column100 column4" data-column="column4" scope="col">Tuesday</th>
								<th class="column100 column5" data-column="column5" scope="col">Wednesday</th>
								<th class="column100 column6" data-column="column6" scope="col">Thursday</th>
								<th class="column100 column7" data-column="column7" scope="col">Friday</th>
								<th class="column100 column8" data-column="column8" scope="col">Saturday</th>
								<th class="column100 column9" data-column="column9" scope="col">Someday</th>
								<th class="column100 column10" data-column="column10" scope="col">Tomyday</th>
							</tr>
						</tfoot>
						<tbody><!--
							This is an example for the HTML load
							<tr class="row100">
								<td class="column100 column1" data-column="column1" data-label="Nom" data-color="success">Lawrence Scott</td>
								<td class="column100 column2" data-column="column2" data-label="Sunday">8:00 AM</td>
								<td class="column100 column3" data-column="column3" data-label="Monday">--</td>
								<td class="column100 column4" data-column="column4" data-label="Tuesday">--</td>
								<td class="column100 column5" data-column="column5" data-label="Wednesday">8:00 AM</td>
								<td class="column100 column6" data-column="column6" data-label="Thursday">--</td>
								<td class="column100 column7" data-column="column7" data-label="Friday">5:00 PM</td>
								<td class="column100 column8" data-column="column8" data-label="Saturday"><a id="btn-15" href="javascript:alert(15);" class="tomybtn btn-danger">15</a></td>
							</tr>-->
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

		<script src="jquery.min.js"></script>
    	<script type="text/javascript" src="../dist/tomytable.js"></script>
    	<!--<script type="text/javascript" src="tomytable.min.js"></script>-->
    	<script type="text/javascript">
(function ($) {
	"use strict";

	// just for JSON load test
	var tomy = [
		{Friday: "5:00 PM", Monday: "--", Nom: "Lawrence Scott", Saturday: "8:00 AM", Sunday: {id:'btn-15', click:'alert(15);', content:'15', color:'danger'}, Thursday: "--", Tuesday: "--", Wednesday: "8:00 AM"}, 
		{Friday: "--", Monday: "5:00 PM", Nom: "Jane Medina", Saturday: {id:'btn-15', click:'alert(15);', content:'15', color:'danger'}, Sunday: "--", Thursday: "9:00 AM", Tuesday: "5:00 PM", Wednesday: "--"}, 
		{Friday: "2:00 PM", Monday: "--", Nom: "Billy Mitchell", Saturday: {id:'btn-15', click:'alert(15);', content:'15', color:'danger'}, Sunday: "9:00 AM", Thursday: "--", Tuesday: "--", Wednesday: "--"}, 
		{Friday: "--", Monday: "5:00 PM", Nom: "Beverly Reid", Saturday: {id:'btn-15', click:'alert(15);', content:'15', color:'danger'}, Sunday: "--", Thursday: "9:00 AM", Tuesday: "5:00 PM", Wednesday: "--"}, 
		{Friday: "5:00 PM", Monday: "--", Nom: "Tiffany Wade", Saturday: {id:'btn-15', click:'alert(15);', content:'15', color:'danger'}, Sunday: "8:00 AM", Thursday: "--", Tuesday: "--", Wednesday: "8:00 AM"}, 
		{Friday: "--", Monday: "5:00 PM", Nom: "Sean Adams", Saturday: {id:'btn-15', click:'alert(15);', content:'15', color:'danger'}, Sunday: "--", Thursday: "9:00 AM", Tuesday: "5:00 PM", Wednesday: "--"}, 
		{Friday: "2:00 PM", Monday: "--", Nom: "Rachel Simpson", Saturday: {id:'btn-15', click:'alert(15);', content:'15', color:'danger'}, Sunday: "9:00 AM", Thursday: "--", Tuesday: "--", Wednesday: "--"}, 
		{Friday: "5:00 PM", Monday: "--", Nom: "Mark Salazar", Saturday: {id:'btn-15', click:'alert(15);', content:'15', color:'danger'}, Sunday: "8:00 AM", Thursday: "--", Tuesday: "--", Wednesday: "8:00 AM"}, 
		{Friday: "5:00 PM", Monday: "--", Nom: "Lawrence Scott", Saturday: {id:'btn-15', click:'alert(15);', content:'15', color:'danger'}, Sunday: "8:00 AM", Thursday: "--", Tuesday: "--", Wednesday: "8:00 AM"}, 
		{Friday: "--", Monday: "5:00 PM", Nom: "Jane Medina", Saturday: {id:'btn-15', click:'alert(15);', content:'15', color:'danger'}, Sunday: "--", Thursday: "9:00 AM", Tuesday: "5:00 PM", Wednesday: "--"}, 
		{Friday: "2:00 PM", Monday: "--", Nom: "Billy Mitchell", Saturday: {id:'btn-15', click:'alert(15);', content:'15', color:'danger'}, Sunday: "9:00 AM", Thursday: "--", Tuesday: "--", Wednesday: "--"}, 
		{Friday: "--", Monday: "5:00 PM", Nom: "Beverly Reid", Saturday: {id:'btn-15', click:'alert(15);', content:'15', color:'danger'}, Sunday: "--", Thursday: "9:00 AM", Tuesday: "5:00 PM", Wednesday: "--"}, 
		{Friday: "--", Monday: "5:00 PM", Nom: "Beverly Reid", Saturday: {id:'btn-15', click:'alert(15);', content:'15', color:'danger'}, Sunday: "--", Thursday: "9:00 AM", Tuesday: ['aaaaa', 'zzzzzzz'], Wednesday: {src:'image.jpg', alt:'rien'}}, 
	];

	// Ajax load test
	$('#tomytable').tomytable({
		'ajaxload'		: true, 
		'ajaxurl'		: 'ajax/tomytable.ajax.php', 
		'action'		: ['Saturday'], 
		'tolist'		: ['Someday'], 
		'toimg'			: ['Tomyday'], 
		'data'			: {test:1}
	});

})(jQuery);
    	</script>
    </body>
</html>