( function( QUnit ) {
'use strict';

define(
	['jquery', 'app/InputHandler', 'app/Api', 'app/LicenceStore', 'app/LICENCES', 'app/ImageInfo'],
	function( $, InputHandler, Api, LicenceStore, LICENCES, ImageInfo ) {

	QUnit.module( 'InputHandler' );

	var api = new Api( '//commons.wikimedia.org/', new LicenceStore( LICENCES ) );

	var testCases = [
		{
			input: [
				'http://commons.wikimedia.org/wiki/File:Helene_Fischer_2010.jpg',
				'commons.wikimedia.org/wiki/File:Helene_Fischer_2010.jpg',
				'http://commons.wikimedia.org/w/index.php?title=File:Helene_Fischer_2010.jpg',
				'http://upload.wikimedia.org/wikipedia/commons/8/84/Helene_Fischer_2010.jpg',
				'http://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Helene_Fischer_2010.jpg/171px-Helene_Fischer_2010.jpg',
				'upload.wikimedia.org/wikipedia/commons/thumb/8/84/Helene_Fischer_2010.jpg/171px-Helene_Fischer_2010.jpg'
			],
			expected: {
				file: 'File:Helene_Fischer_2010.jpg'
			}
		}, {
			input: [
				'http://commons.wikimedia.org/wiki/File:JapaneseToiletControlPanel.jpg',
				'http://commons.wikimedia.org/w/index.php?title=File:JapaneseToiletControlPanel.jpg',
				'http://upload.wikimedia.org/wikipedia/commons/e/e4/JapaneseToiletControlPanel.jpg',
				'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/JapaneseToiletControlPanel.jpg/320px-JapaneseToiletControlPanel.jpg'
			],
			expected: {
				file: 'File:JapaneseToiletControlPanel.jpg'
			}
		}, {
			input: [
				'http://commons.wikimedia.org/wiki/File:Gerardus_t%27_Hooft_at_Harvard.jpg',
				'http://commons.wikimedia.org/w/index.php?title=File:Gerardus_t%27_Hooft_at_Harvard.jpg',
				'http://upload.wikimedia.org/wikipedia/commons/f/f4/Gerardus_t%27_Hooft_at_Harvard.jpg',
				'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Gerardus_t%27_Hooft_at_Harvard.jpg/180px-Gerardus_t%27_Hooft_at_Harvard.jpg'
			],
			expected: {
				file: 'File:Gerardus_t\'_Hooft_at_Harvard.jpg'
			}
		}, {
			input: [
				'http://commons.wikimedia.org/wiki/File:%22%D0%93%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%B0%D1%80%22_-_%D0%A2%D1%83%D1%85%D0%BE%D0%B2%D0%B8%D1%89%D0%B0.JPG',
				'http://commons.wikimedia.org/w/index.php?title=File:%22%D0%93%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%B0%D1%80%22_-_%D0%A2%D1%83%D1%85%D0%BE%D0%B2%D0%B8%D1%89%D0%B0.JPG',
				'http://upload.wikimedia.org/wikipedia/commons/9/9c/%22%D0%93%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%B0%D1%80%22_-_%D0%A2%D1%83%D1%85%D0%BE%D0%B2%D0%B8%D1%89%D0%B0.JPG',
				'http://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/%22%D0%93%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%B0%D1%80%22_-_%D0%A2%D1%83%D1%85%D0%BE%D0%B2%D0%B8%D1%89%D0%B0.JPG/640px-%22%D0%93%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%B0%D1%80%22_-_%D0%A2%D1%83%D1%85%D0%BE%D0%B2%D0%B8%D1%89%D0%B0.JPG'
			],
			expected: {
				file: 'File:"Граничар"_-_Туховища.JPG'
			}
		}, {
			input: [
				'http://de.wikipedia.org/wiki/File:1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg',
				'de.wikipedia.org/wiki/File:1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg',
				'http://de.wikipedia.org/w/index.php?title=File:1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg',
				'http://upload.wikimedia.org/wikipedia/de/f/fb/1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg',
				'http://upload.wikimedia.org/wikipedia/de/thumb/f/fb/1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg/320px-1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg',
				'upload.wikimedia.org/wikipedia/de/thumb/f/fb/1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg/320px-1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg',
				'http://upload.wikimedia.org/wikipedia/de/thumb/f/fb/1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg/320px-1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg'
			],
			expected: {
				file: 'File:1_FC_Bamberg_-_1_FC_Nürnberg_1901.jpg',
				wikiUrl: '//de.wikipedia.org/'
			}
		}, {
			input: [
				'http://de.wikipedia.org/wiki/Datei:1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg',
				'de.wikipedia.org/wiki/Datei:1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg',
				'http://de.wikipedia.org/w/index.php?title=Datei:1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg',
				'de.wikipedia.org/w/index.php?title=Datei:1_FC_Bamberg_-_1_FC_N%C3%BCrnberg_1901.jpg'
			],
			expected: {
				file: 'Datei:1_FC_Bamberg_-_1_FC_Nürnberg_1901.jpg',
				wikiUrl: '//de.wikipedia.org/'
			}
		}
	];

	QUnit.test( 'getFilename()', function( assert ) {
		var inputHandler = new InputHandler( api );

		/**
		 * @param {Object} testCase
		 * @param {string} currentInput
		 */
		function testGetFilename( testCase, currentInput ) {
			QUnit.stop();

			inputHandler.getFilename( currentInput )
			.done( function( prefixedFilenameOrImageInfos, wikiUrl ) {
				assert.equal(
					prefixedFilenameOrImageInfos,
					testCase.expected.file,
					'Detected correct filename "' + testCase.expected.file + '" on input "'
						+ currentInput + '".'
				);

				assert.strictEqual(
					wikiUrl,
					testCase.expected.wikiUrl,
					'Detected correct wiki URL "' + testCase.expected.wikiUrl + '" on '
						+ 'input "' + currentInput + '".'
				);
			} )
			.fail( function( message ) {
				assert.ok(
					false,
					'Parsing input "' + currentInput + '" failed with message "' + message
						+ '".'
				);
			} )
			.always( function() {
				QUnit.start();
			} );
		}

		for( var i = 0; i < testCases.length; i++ ) {
			var testCase = testCases[i];

			for( var j = 0; j < testCase.input.length; j++ ) {
				testGetFilename( testCase, testCase.input[j] );
			}
		}
	} );

	QUnit.test( 'getFilename() returning ImageInfo objects', function( assert ) {
		var inputHandler = new InputHandler( api );

		var testCases = [
			{
				input: [
					'http://en.wikipedia.org/wiki/K%C3%B6nigsberg,_Bavaria',
					'http://en.wikipedia.org/w/index.php?title=K%C3%B6nigsberg,_Bavaria',
					'http://en.wikipedia.org/wiki/%3F_(film)'
				],
				expected: {
					wikiUrl: '//en.wikipedia.org/'
				}
			},{
				input: [
					'http://de.wikipedia.org/wiki/K%C3%B6nigsberg_in_Bayern',
					'http://de.wikipedia.org/wiki/K%C3%B6nigsberg_in_Bayern?uselang=en',
					'de.wikipedia.org/wiki/K%C3%B6nigsberg_in_Bayern',
					'de.wikipedia.org/wiki/K%C3%B6nigsberg_in_Bayern?uselang=de',
					'http://de.wikipedia.org/w/index.php?title=K%C3%B6nigsberg_in_Bayern',
					'http://de.wikipedia.org/w/index.php?title=K%C3%B6nigsberg_in_Bayern&uselang=de',
					'de.wikipedia.org/w/index.php?title=K%C3%B6nigsberg_in_Bayern',
					'de.wikipedia.org/w/index.php?title=K%C3%B6nigsberg_in_Bayern&uselang=de'
				],
				expected: {
					wikiUrl: '//de.wikipedia.org/'
				}
			}
		];

		/**
		 * @param {Object} testCase
		 * @param {string} currentInput
		 */
		function assertReturnedImageObjects( testCase, currentInput ) {
			QUnit.stop();

			inputHandler.getFilename( currentInput )
			.done( function( prefixedFilenameOrImageInfos, wikiUrl ) {
				assert.ok(
					$.isArray( prefixedFilenameOrImageInfos )
					&& prefixedFilenameOrImageInfos[0] instanceof ImageInfo,
					'Received ImageInfo objects for input "' + currentInput + '".'
				);

				assert.strictEqual(
					wikiUrl,
					testCase.expected.wikiUrl,
					'Detected correct wiki URL "' + testCase.expected.wikiUrl + '" on '
						+ 'input "' + currentInput + '".'
				);
			} )
			.fail( function( message ) {
				assert.ok(
					false,
					'Parsing input "' + currentInput + '" failed with message "' + message
						+ '".'
				);
			} )
			.always( function() {
				QUnit.start();
			} );
		}

		for( var i = 0; i < testCases.length; i++ ) {
			var testCase = testCases[i];

			for( var j = 0; j < testCase.input.length; j++ ) {
				assertReturnedImageObjects( testCase, testCase.input[j] );
			}

		}
	} );

} );

}( QUnit ) );
