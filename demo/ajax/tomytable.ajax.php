<?php
//=> Arrays
	$r = array('ok'=>0);
	$noms = array('Lawrence Scott', 'Jane Medina', 'Billy Mitchell', 'Beverly Reid', 'Tiffany Wade', 'Sean Adams', 'Rachel Simpson', 'Mark Salazar', 'Lawrence Scott');
	$valu = array('--', '8:00 AM', '5:00 PM', '2:00 PM', '9:00 PM', '12:00 AM', '--', '5:00 PM', '2:00 PM');
	$nbrs = array(5, 8, 9, 21, 64, 25, 13, 99, 52);
	$colors = array('', 'success', '', 'warning', '', 'info', '', 'danger', '');

	$r = array('ok' => 1, 'data' => array());

	for ($i=0; $i < 15; $i++) {
		$nom = rand(0,8);
		$sunday = rand(0,8);
		$monday = rand(0,8);
		$tuesday = rand(0,8);
		$wednesday = rand(0,8);
		$thursday = rand(0,8);
		$friday = rand(0,8);
		$saturday = rand(0,8);
		$color = rand(0,8);
		$nbr = rand(0,8);
		$r['data'][] = array(
			'Nom' => $noms[$nom], 
			'Sunday' => $valu[$sunday], 
			'Monday' => $valu[$monday], 
			'Tuesday' => $valu[$tuesday], 
			'Wednesday' => $valu[$wednesday], 
			'Thursday' => $valu[$thursday], 
			'Friday' => $valu[$friday], 
			'Saturday' => array(
				array(
					'id' => 'btn-'.$nbrs[$nbr], 
					'content' => $nbrs[$nbr], 
					'click' => 'alert(\''.$nbrs[$nbr].'\');', 
					'color' => $colors[$color]
				)
			), 
			'Someday' => array('aaaaa', 'bbbbb', 'cccccc'), 
			'Tomyday' => array('src'=>'images/sort_asc.png', 'id'=>'image-'.$i), 
			'color' => $colors[$color], 
			'ID' => $i + 1
		);
	}

echo json_encode($r);