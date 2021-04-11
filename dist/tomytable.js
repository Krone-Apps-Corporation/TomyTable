/*
 *  Document   : tomytable.css
 *  Author     : Tomy Vinciguera By Krône Apps Corporation
 *  Description: The javascript file of TomyTable
 *  Version    : v1.0.0
 *
*/
 
 $.fn.tomytable=function(b){
	var a = $.extend({
		datahtml: false,
		theme: 'ver1',
		ajaxload: false,
		ajaxurl: '',
		data: {},
		hide_md: [],
		hide_sm: [],
		specialsort: [],
		tolist: [],
		toimg: [],
		sortnbr: [],
		action: [],
		gif: 'images/',
		callback: function(){},
		callbackAjax: function(){},
		french: {
			'nodata':'Aucune ligne à afficher !', 
			'loading':'Chargement...', 
			'show_1':'Afficher', 
			'line_1':'lignes', 
			'search':'Recherche', 
			'show_2':'Afficher', 
			'tooo_1':'jusqu\'a', 
			'ooof_1':'de', 
			'line_2':'lignes'
		},
		english: {
			'nodata':'No data to show !', 
			'loading':'Loading...', 
			'show_1':'Show', 
			'line_1':'entries', 
			'search':'Search', 
			'show_2':'Showing', 
			'tooo_1':'to', 
			'ooof_1':'of', 
			'line_2':'entries'
		},
		spanish: {
			'nodata':'No hay líneas para mostrar !', 
			'loading':'Cargando...', 
			'show_1':'Exhibición', 
			'line_1':'líneas', 
			'search':'Buscar', 
			'show_2':'Exhibición', 
			'tooo_1':'hasta', 
			'ooof_1':'de', 
			'line_2':'líneas'
		},
		deutsch: {
			'nodata':'Keine Zeilen zum Anzeigen !', 
			'loading':'Beladung...', 
			'show_1':'Anzeige', 
			'line_1':'linien', 
			'search':'Suche', 
			'show_2':'Anzeige', 
			'tooo_1':'zu', 
			'ooof_1':'von', 
			'line_2':'linien'
		},
		italian: {
			'nodata':'Nessuna riga da visualizzare !', 
			'loading':'Caricamento...', 
			'show_1':'Visualizzare', 
			'line_1':'linee', 
			'search':'Ricerca', 
			'show_2':'Visualizzare', 
			'tooo_1':'su', 
			'ooof_1':'di', 
			'line_2':'linee'
		}, 
		lng: 'french'
	}, b);
 
    return this.each(function() {
    	var lng = (typeof lang != 'undefined') ? lang['cnt'] : a.french, 
    		_this		= $(this).attr('id'), 
    		alltomy 	= [], 
    		tomy 		= [], 
	    	tomyhead 	= [], 
	    	allpages 	= 0, 
	    	pageact 	= 1, 
	    	nbrperpage  = 10, 
	    	allitems 	= 0, 
	    	firstitem 	= 0, 
	    	toitem		= 0, 
	    	sortcol		= 0, 
	    	coldirect	= 0, 
	    	searchval	= '', 
	    	cls, 
			predicateBy = function(prop, dirkt) {
				var sortnbr = a.sortnbr, specialsort = a.specialsort, xx, yy, tsts = prop.replace('sort_', '');
				if (a.sortnbr!="Bon") {
					return function(b,c) {
						xx = b[prop];
						yy = c[prop];
						if (typeof xx !=='number' && typeof yy !=='number') {
							if ( sortnbr.indexOf(prop)>=0 || specialsort.indexOf(tsts)>=0 ) {
								xx = xx.replace(' ', '');
								yy = yy.replace(' ', '');
								xx = parseInt(xx);
								yy = parseInt(yy);
							}
						}
						if (dirkt==1) {
							if (xx > yy) return 1;
							else if(xx < yy) return -1;
					    	return 0;
						} else {
							if (xx < yy) return 1;
							else if(xx > yy) return -1;
					    	return 0;
						}
					}
				} else {
					return function(b,c) {
						xx = b[prop];
						yy = c[prop];
						if (dirkt==1) {
							if (xx > yy) return 1;
							else if(xx < yy) return -1;
					    	return 0;
						} else {
							if (xx < yy) return 1;
							else if(xx > yy) return -1;
					    	return 0;
						}
					}
				}
			}, 
			datesort = function() {
				tomy.sort( predicateBy('dateint', 0) );
	    		create(_this);
	    	}, 
			specialsort = function(colo) {
				tomy.sort( predicateBy(colo, 0) );
	    		create(_this);
	    	}, 
    		events = function(_this) {
				$('.column100').unbind('mouseover').on('mouseover',function(){
					var table1 = $(this).parent().parent().parent();
					var table2 = $(this).parent().parent();
					var verTable = $(table1).data('vertable')+"";
					var column = $(this).data('column') + ""; 

					$(table2).find("."+column).addClass('hov-column-'+ verTable);
					$(table1).find(".row100.head ."+column).addClass('hov-column-head-'+ verTable);
					$(table1).find(".row100.foot ."+column).addClass('hov-column-head-'+ verTable);
				});
				$('.column100').unbind('mouseout').on('mouseout',function(){
					var table1 = $(this).parent().parent().parent();
					var table2 = $(this).parent().parent();
					var verTable = $(table1).data('vertable')+"";
					var column = $(this).data('column') + ""; 

					$(table2).find("."+column).removeClass('hov-column-'+ verTable);
					$(table1).find(".row100.head ."+column).removeClass('hov-column-head-'+ verTable);
					$(table1).find(".row100.foot ."+column).removeClass('hov-column-head-'+ verTable);
				});
	    		$('#'+_this+'-txt1').unbind('change').change(function(){
	    			nbrperpage = parseInt($(this).val());
	    			allpages=Math.ceil(allitems/nbrperpage);
	    			pageact=1;
	    			firstitem=0;
	    			toitem = (nbrperpage<allitems) ? nbrperpage : allitems;
	    			$('#'+_this+'-txt4 .pagination').html('');
	    			var allpagex = (allpages<5) ? allpages : 5;
		    		for (var i = 1; i <= allpagex; i++) {
		    			$('#'+_this+'-txt4 .pagination').append('<li><a'+((i==1)?' class="w3-red"':'')+' href="javascript:void(0)" name="'+i+'">'+i+'</a></li>');
		    		}
		    		events(_this);
	    			create(_this);
	    		});
	    		$('#'+_this+' .head th, #'+_this+' .foot th').unbind('click').click(function(){
		    		sortcol = $(this).html();
					var specialsort = a.specialsort;
					coldirect = 1 - coldirect;
					if (specialsort.indexOf(sortcol)>=0) {
						sortcol = 'sort_'+sortcol;
					} else if (sortcol=='Date') sortcol='dateint';
					tomy.sort( predicateBy(sortcol, coldirect) );
		    		create(_this);
	    		});
	    		$('#'+_this+'-txt2 input').unbind('keyup').keyup(function(){
	    			searchval = $(this).val();
	    			tomy = [];
	    			allitems = alltomy.length;
	    			var nbr_found = 0;
	    			for (var i = 0; i < allitems; i++) {
	    				var tbl = alltomy[i], line = '';
	    				for (var j = 0; j < tomyhead.length; j++) {
	    					var val = tbl[tomyhead[j]];
	    					line = line + val + '-';
	    				}
						var searchvalreg = new RegExp(searchval, "gi");
							result = line.match(searchvalreg);
							result = (line.match(searchvalreg)||[]).length;

						if (result > 0) {
							tomy.push(alltomy[i]);
							nbr_found++;
						}
	    			}
	    			if (searchval.length==0) {
	    				tomy = alltomy;
	    				allitems = alltomy.length;
	    				pageact = 1;
	    				allpages = Math.ceil(allitems/nbrperpage);
	    				firstitem = 0;
	    				toitem = (allitems>nbrperpage) ? nbrperpage : allitems ;
	    			} else {
	    				allitems = nbr_found;
	    				allpages = Math.ceil(allitems/nbrperpage);
	    				pageact = 1;
	    				firstitem = 0;
	    				toitem = (allitems>nbrperpage) ? nbrperpage : allitems ;
	    			}
	    			$('#'+_this+'-txt4 .pagination').html('');
		    		for (var i = 0; i <= allpages; i++) {
		    			$('#'+_this+'-txt4 .pagination').append('<li><a'+((i==1)?' class="w3-red"':'')+' href="javascript:void(0)" name="'+i+'">'+i+'</a></li>');
		    		}
	    			create(_this);
	    			setTimeout(function() {$('#'+_this+'-txt4 .pagination a[name="'+pageact+'"]').click()}, 1000);
	    		});
	    		paginationEvent(_this);
    		}, 
    		create = function(_this) {
    			var cod = '<thead><tr class="row100 head">', nbr=0, col_a = a.hide_sm, col_b = a.hide_md;
    			for (var i = 0; i < tomyhead.length; i++) {
    				nbr=i+1;
    				var cls = '';
    				if (tomyhead[i]==sortcol) {if (coldirect==0) cls = ' tobot'; else cls = ' totop'}
	       			hide_cls = '';
		    		if ( col_a.indexOf(tomyhead[j])>=0 ) hide_cls+=' hidden-sm';
		    		if ( col_b.indexOf(tomyhead[j])>=0 ) hide_cls+=' hidden-md';
    				cod += '<th class="column100 column'+nbr+cls+hide_cls+'" data-column="column'+nbr+'" scope="col">'+tomyhead[i]+'</th>';
    			}
    			cod += '</tr></thead><tfoot><tr class="row100 foot">';
    			for (var i = 0; i < tomyhead.length; i++) {
    				nbr=i+1;
    				var cls = '';
    				if (tomyhead[i]==sortcol) {if (coldirect==0) cls = ' tobot'; else cls = ' totop'}
	       			hide_cls = '';
		    		if ( col_a.indexOf(tomyhead[j])>=0 ) hide_cls+=' hidden-sm';
		    		if ( col_b.indexOf(tomyhead[j])>=0 ) hide_cls+=' hidden-md';
    				cod += '<th class="column100 column'+nbr+cls+hide_cls+'" data-column="column'+nbr+'" scope="col">'+tomyhead[i]+'</th>';
    			}
    			cod += '</tr></tfoot><tbody></tbody>';
    			$('#'+_this).html(cod);
				$('#'+_this+' tbody').html('');
				if (tomy.length > 0) {
	    			cod = '';
	    			nbr=0;
	    			var lastitem = (toitem<allitems) ? toitem : allitems, 
	    				tolist = a.tolist, 
	    				toimg = a.toimg, 
	    				action = a.action;
	    			for (var i = firstitem; i < lastitem; i++) {
	    				var tbl = tomy[i];
	    				cod += '<tr class="row100"'+((typeof tbl['color'] != 'undefined')?' data-color="'+tbl['color']+'"':'')+'>';
	    				for (var j = 0; j < tomyhead.length; j++) {
	    					nbr=j+1;
	    					var val = tbl[tomyhead[j]];
			       			hide_cls = '';
				    		if ( col_a.indexOf(tomyhead[j])>=0 ) hide_cls+=' hidden-sm';
				    		if ( col_b.indexOf(tomyhead[j])>=0 ) hide_cls+=' hidden-md';

	    					cod += '<td class="column100 column'+nbr+hide_cls+'" data-column="column'+nbr+'" data-label="'+tomyhead[j]+'">';
				    		if ( action.indexOf(tomyhead[j])>=0 ) {

	    						for (var n=0;n<val.length;n++) {
	    							var x=val[n];
		    						cod += '<a id="'+x['id']+'" href="javascript:'+x['click']+';" class="tomybtn btn-'+x['color']+'">'+x['content']+'</a>';
	    						}

				    		} else if (tolist.indexOf(tomyhead[j])>=0) {

				    			cod += '<ul class="tomytable-list">';
	    						for (var n=0;n<val.length;n++) {
	    							var x=val[n];
		    						cod += '<li>'+x+'</li>';
	    						}
				    			cod += '</ul>';

				    		} else if (toimg.indexOf(tomyhead[j])>=0) {

				    			var img_src = (typeof val['src'] !== 'undefined') ? ' src="'+val['src']+'"' : '', 
				    				img_alt = (typeof val['alt'] !== 'undefined') ? ' alt="'+val['alt']+'"' : '', 
				    				img_idd = (typeof val['id'] !== 'undefined') ? ' id="'+val['id']+'"' : '', 
				    				img_cls = (typeof val['class'] !== 'undefined') ? ' class="'+val['class']+' tomytable-image"' : ' class="tomytable-image"';

	    						cod += '<img'+img_src+img_alt+img_idd+img_cls+' />';

				    		}/* else if (action.indexOf(tomyhead[j])>=0) {
				    		}*/ else  {

	    						if (searchval.length>0) {
	    							var searchvalreg = new RegExp(searchval, "gi");
									if (val !== null) {
										try {
										   throw "replace";
										   val=val.replace(searchvalreg, "<b class=\"searchword\">"+searchval.toUpperCase()+"</b>");
										} catch (e) {console.log(e);}
	    							} else val = '';
	    						}
								cod += val;

	    					}
	    					cod += '</td>';
	    				}
	    				cod += '</tr>';
	    			}
	    			$('#'+_this+' tbody').html(cod);
	    			$('#'+_this+'-txt3').html(lng['show_2']+' '+firstitem+' '+lng['tooo_1']+' '+lastitem+' '+lng['ooof_1']+' '+allitems+' '+lng['line_2']);
    			} else {
    				var colnbr = $('#'+_this+' thead tr th').length;
    				cod = '\
    					<tr class="row100">\
    						<td class="column100 column1" data-column="column1" colspan="'+colnbr+'">'+lng['nodata']+'</td>\
    					</td>\
    				';
    				$('#'+_this+'-txt3').html(lng['nodata']);
    				$('#'+_this+' tbody').html(cod);
    			}
    			events(_this);
    		}, 
    		addAccessoir = function(_this) {
	    		$('#'+_this).parent().prepend('\
					<div class="table-details row">\
						<div class="col-md-6 col-sm-12">\
							<label>\
								'+lng['show_1']+' \
								<select class="custom-select custom-select-sm form-control form-control-sm" id="'+_this+'-txt1">\
									<option value="10">10</option>\
									<option value="25">25</option>\
									<option value="50">50</option>\
									<option value="100">100</option>\
									<option value="500">500</option>\
								</select> \
								'+lng['line_1']+'\
							</label>\
						</div>\
						<div class="col-md-6 col-sm-12 text-right">\
							<div id="'+_this+'-txt2">\
								<label>\
									Recherche:\
									<input type="search" class="form-control form-control-sm" placeholder="'+lng['search']+'">\
								</label>\
							</div>\
						</div>\
					</div>\
	    		');
	    		$('#'+_this).parent().append('\
					<div class="table-details row">\
						<div class="col-md-6 col-sm-12" id="'+_this+'-txt3"></div>\
						<div class="col-md-6 col-sm-12 text-right">\
							<div class="dataTables_paginate paging_simple_numbers" id="'+_this+'-txt4">\
								<ul class="pagination"></ul>\
							</div>\
						</div>\
					</div>\
	    		');
    		}, 
    		paginationEvent = function(_this) {
	    		$('#'+_this+'-txt4 .pagination a').unbind('click').click(function(){
	    			pageact = parseInt($(this).attr('name'));
	    			firstitem=(pageact-1) * nbrperpage;
	    			toitem=firstitem + nbrperpage;
	    			toitem=(toitem<allitems) ? toitem : allitems;
	    			$('#'+_this+'-txt4 .pagination a').removeClass('w3-red');
	    			$('#'+_this+'-txt4 .pagination a[name="'+pageact+'"]').addClass('w3-red');
	    			setPagination(_this, pageact);
	    			create(_this);
	    		});
    		}, 
    		setPagination = function(_this, act) {
    			var pa = 0, pb = 0;
    			if (act<4) {
    				pa = 1;
    				pb = (allpages<6) ? allpages : 5 ;
    			} else {
    				var dif = allpages-act;
    				if (dif<4) {pa = allpages-4;pb = allpages;}
    					else {pa = act-2;pb = act+2;}
    			}
    			$('#'+_this+'-txt4 .pagination').html('');
	    		for (var i = pa; i <= pb; i++) {
	    			$('#'+_this+'-txt4 .pagination').append('<li><a'+((i==act)?' class="w3-red"':'')+' href="javascript:void(0)" name="'+i+'">'+i+'</a></li>');
	    		}
	    		paginationEvent(_this);
    		}, 
    		ajaxload = function(_this) {
				$.post(a.ajaxurl, a.data, function(r) {
					if (/^{.*}$/.test(r)) {
						r = JSON.parse(r);
	                    if (typeof(r)=="object") {
	                    	data = r.data;
	                    	if (data==100) {
	                    		for (var i=0; i < data.length; i++) {
	                    			var x = data[i];
	                    			for (var j=0; j < x.length; j++) {
	                    				alltomy.push(x[j]);
	                    			}
	                    		}
	                    	} else alltomy = r.data;
	                    	tomy = alltomy;
				    		var th = $(this).find('thead tr th');
				    		for (var i = 0; i < th.length; i++) tomyhead.push($(th[i]).html());
					    	allitems = alltomy.length;
				    		if (allitems<nbrperpage) {
				    			allpages=1;
				    			toitem=allitems;
				    		} else {
				    			allpages = Math.ceil(allitems/nbrperpage);
				    			toitem=nbrperpage;
				    		}
				    		addAccessoir(_this);
				    		setPagination(_this, 1);
				    		create( _this );
				    		callbackAjax = a.callbackAjax;
				    		callbackAjax(r);
					    }
					}
				});
    		};

    	$(this).attr('data-vertable', a.theme);
    	$(this).parent().addClass(a.theme);
    	if (a.datahtml) {
    		var th = $(this).find('thead tr th');
    		for (var i = 0; i < th.length; i++) tomyhead.push($(th[i]).html());

    		var tr = $(this).find('tbody tr');
    		for (var i = 0; i < tr.length; i++) {
    			var col = $(tr[i]).find('td'), 
    				lin = {};
    			for (var j = 0; j < col.length; j++) {
    				lin[tomyhead[j]] = $(col[j]).html();
    			}
    			tomy.push(lin);
    			alltomy.push(lin);
    			allitems++;
    		}
    		if (allitems<nbrperpage) {
    			allpages=1;
    			toitem=allitems;
    		} else {
    			allpages = Math.ceil(allitems/nbrperpage);
    			toitem=nbrperpage;
    		}
    		addAccessoir(_this);
    		setPagination(_this, 1);
    		create( _this );
    		callback = a.callback;
    		callback();
    	} else if (a.ajaxload) {
    		var th = $(this).find('thead tr th');
    		for (var i = 0; i < th.length; i++) tomyhead.push($(th[i]).html());
    		var cod = '<thead><tr class="row100 head"><th class="column100 column1" data-column="column1" scope="col">'+lng['loading']+'</th></tr></thead><tfoot><tr class="row100 foot"><th class="column100 column1" data-column="column1" scope="col">Chargement...</th></tr></tfoot><tbody><tr><td><img src="'+a.gif+'load.gif" alt="loading..."></td></tr></tbody>';
    		$('#'+_this).html(cod);
	    	ajaxload(_this);
		} else if (a.data.length>0) {
    		alltomy = a.data;
    		tomy = a.data;
    		var th = $(this).find('thead tr th');
    		for (var i = 0; i < th.length; i++) tomyhead.push($(th[i]).html());
	    	allitems = alltomy.length;
    		if (allitems<nbrperpage) {
    			allpages=1;
    			toitem=allitems;
    		} else {
    			allpages = Math.ceil(allitems/nbrperpage);
    			toitem=nbrperpage;
    		}
    		addAccessoir(_this);
    		setPagination(_this, 1);
    		create( _this );
    		callback = a.callback;
    		callback();
    	} else {
    		alltomy = [];
    		tomy = [];
	    	tomyhead = [];
	    	allpages = 0;
	    	pageact = 1;
	    	nbrperpage = 10;
	    	allitems = 0;
	    	firstitem = 0;
	    	toitem = 0;
	    	sortcol = 0;
	    	coldirect = 0;
	    	searchval = '';
    	}
    	this.removeLine = function(id) {
    		var newtomy=[], newalltomy=[];
			for (var i = 0; i < allitems; i++) {
				var tbl = alltomy[i];
				if (typeof tbl['ID'] != 'undefined') {
					if (tbl['ID']!=id) {
						newalltomy.push(tbl);
					}
				}
			}
			alltomy=newalltomy;
			for (var i = 0; i < tomy.length; i++) {
				var tbl = tomy[i];
				if (typeof tbl['ID'] != 'undefined') {
					if (tbl['ID']!=id) {
						newtomy.push(tbl);
					}
				}
			}
			tomy=newtomy;
			allitems--;
    		if (allitems<nbrperpage) {
    			allpages=1;
    			toitem=allitems;
    		} else {
    			allpages = Math.ceil(allitems/nbrperpage);
    			toitem=nbrperpage;
    		}
			setPagination(_this, 1);
			create(_this);
    	};
    	this.editLine = function(id) {
   			$.post(a.ajaxurl, a.data, function(r) {
				if (/^{.*}$/.test(r)) {
					r = JSON.parse(r);
                    if (typeof(r)=="object") {
                    	data = r.data;
                    	if (data==100) {
                    		for (var i=0; i < data.length; i++) {
                    			var x = data[i];
                    			for (var j=0; j < x.length; j++) {
                    				alltomy.push(x[j]);
                    			}
                    		}
                    	} else alltomy = r.data;
                    	tomy = alltomy;
			    		create( _this );
						setPagination(_this, 1);
				    }
				}
			});
    	};
    	this.getLine = function(id) {
    		var newtomy={};
			for (var i = 0; i < allitems; i++) {
				var tbl = alltomy[i];
				if (typeof tbl['ID'] != 'undefined') {
					if (tbl['ID']!=id) newtomy=tbl;
				}
			}
			return newtomy;
    	};
    	this.getColumn = function(id, col) {
    		var newtomy;
			for (var i = 0; i < allitems; i++) {
				var tbl = alltomy[i];
				if (typeof tbl['ID'] != 'undefined') {
					if (tbl['ID']!=id) newtomy=tbl[col];
				}
			}
			return newtomy;
    	};
    	this.datesort = function() {
    		datesort();
    	};
    	this.specialsort = function(colo) {
    		specialsort(colo);
    	};
    	this.refresh = function(id, col) {
    		setPagination(_this, 1);
    		create( _this );
    	};
    });
};