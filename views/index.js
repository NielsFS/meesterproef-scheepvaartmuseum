import header from './components/header/header.js'
import uploadForm from './components/uploadForm/uploadForm.js'
import setUpMap from './components/map/map.js'
import toggleToolButton from './components/storyAddItemButton/storyAddItemButton.js'
import animateStoryOverview from './components/storyGrid/storyGrid.js'
import autocompleteFromApiInit from './components/lib/autocomplete.js'
import colorThief from './components/storyHighlight/storyHighlight.js'
import { selectComponents } from './components/enhancedDetail/enhancedDetail.js'
import EnhancedReport from './components/reportComponent/reportComponent.js'
import {optimizedResize} from './components/lib/helpers.js'


( function IIFE () {

	if( !( document.documentElement.classList && document.querySelectorAll ) ) return
	animateStoryOverview()
	selectComponents()
	header()
	uploadForm()
	toggleToolButton()
	optimizedResize()
	setUpMap()
	autocompleteFromApiInit()
	colorThief()
	EnhancedReport()

} )()
