$( '.odc-select-list' ).each( function () {
	$( this ).val( null );
	$( this ).wrap( '<div class="odc-select-list_container"></div>' );
	$( this ).before(
		$( '<div/>', {
			'class': 'odc-select-list_label',
			text: $( this ).attr( 'rel' ),
			click: function ( e ) {
				e.stopPropagation();
				$( '.odc-select-list_decoy' ).hide();
				$( this ).siblings( '.odc-select-list_decoy' ).show();
				if ( !$( this ).closest( '.odc-select-list_container' ).hasClass( '.active' ) ) {
					$( this ).closest( '.odc-select-list_container' ).addClass( 'active' );
				}
			}
		} )
	);

	$( this ).after( '<ul class="odc-select-list_decoy"></ul>' );
	$( this ).after( '<div class="odc-select-list_icon"></div>' );
	$( this ).siblings( '.odc-select-list_decoy' ).hide();
	$( this ).after(
		$( '<div/>', {
			'class': 'odc-select-list_value',
			text: $( this ).val(),
			click: function ( e ) {
				e.stopPropagation();
				$( this ).siblings( '.odc-select-list_decoy' ).show();
				if ( !$( this ).closest( '.odc-select-list_container' ).hasClass( '.active' ) ) {
					$( this ).closest( '.odc-select-list_container' ).addClass( 'active' );
				}
			}
		} )
	);

	for ( i = 0; i <= $( this ).children( "option" ).length; i++ ) {
		if ( i == 0 ) {
			$( '<li/>', {
				'class': 'odc-select-list_option odc-select-list_option--none',
				text: 'None',
				rel: '',
				click: function ( e ) {
					e.stopPropagation();
					$( this ).closest( '.odc-select-list_decoy' ).siblings( '.odc-select-list' ).val( null );
					$( this ).closest( '.odc-select-list_decoy' ).siblings( '.odc-select-list_value' ).text( null );
					if ( $( this ).closest( '.odc-select-list_decoy' ).siblings( '.odc-select-list_label' ).hasClass( 'odc-select-list_label--selected' ) ) {
						$( this ).closest( '.odc-select-list_decoy' ).siblings( '.odc-select-list_label' ).removeClass( 'odc-select-list_label--selected' );
					}
					$( this ).closest( '.odc-select-list_decoy' ).hide();
					$( this ).closest( '.odc-select-list_container' ).removeClass( 'active' );
				}
			} ).appendTo( $( this ).siblings( '.odc-select-list_decoy' ) );
		}

		$( '<li/>', {
			'class': 'odc-select-list_option',
			text: $( this ).children( 'option' ).eq( i ).text(),
			rel: $( this ).children( 'option' ).eq( i ).val(),
			click: function ( e ) {
				e.stopPropagation();
				$( this ).closest( '.odc-select-list_decoy' ).siblings( '.odc-select-list' ).val( $( this ).attr( 'rel' ) );
				$( this ).closest( '.odc-select-list_decoy' ).siblings( '.odc-select-list_value' ).text( $( this ).text() );
				if ( !$( this ).closest( '.odc-select-list_decoy' ).siblings( '.odc-select-list_label' ).hasClass( 'odc-select-list_label--selected' ) ) {
					$( this ).closest( '.odc-select-list_decoy' ).siblings( '.odc-select-list_label' ).addClass( 'odc-select-list_label--selected' );
				} else {
					if ( $( this ).attr( 'rel' ) == '' ) {
						$( this ).closest( '.odc-select-list_decoy' ).siblings( '.odc-select-list_label' ).removeClass( 'odc-select-list_label--selected' );
					}
				}

				$( this ).closest( '.odc-select-list_decoy' ).hide();
				$( this ).closest( '.odc-select-list_container' ).removeClass( 'active' );
			}
		} ).appendTo( $( this ).siblings( '.odc-select-list_decoy' ) );
	}
	$( this ).hide();
	$( 'body' ).click( function () {
		$( '.odc-select-list_decoy' ).hide();
		$( '.odc-select-list_container' ).removeClass( 'active' );
	} );
} );