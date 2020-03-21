/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

// TODO: Implement converters (now "rules") (if necessary).
// TODO: Delete the legacy lib/to-markdown directory.
// import converters from './lib/to-markdown/converters';

const turndownService = new TurndownService( {
	codeBlockStyle: 'fenced',
	hr: '---',
	headingStyle: 'atx'
} );
turndownService.use( [
	gfm,
	todoList
] );

export default function html2markdown( html ) {
	return turndownService.turndown( html );
}

// This is a copy of the original taskListItems rule from turdown-plugin-gfm, with minor changes.
function todoList( turndownService ) {
	turndownService.addRule( 'taskListItems', {
		filter: function( node ) {
			return node.type === 'checkbox' &&
				// Changes here as CKEditor outputs a deeper structure.
				( node.parentNode.nodeName === 'LI' || node.parentNode.parentNode.nodeName === 'LI' );
		},
		replacement: function( content, node ) {
			return ( node.checked ? '[x]' : '[ ]' ) + ' ';
		}
	} );
}
