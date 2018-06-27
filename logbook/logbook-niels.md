# Proces van Niels Schopman tijdens de meesterproef

#### Table of contents

+ [Leerdoelen](#leerdoelen)
+ [Gemaakte & gestijlde componenten](#gemaakte-&-gestijlde-componenten)
+ [De aangetoonde competenties](#de-aangetoonde-competenties)
+ [Het eindproduct](#het-eindproduct)
+ [Samenwerking](#samenwerking)
+ [Conclusie](#conclusie)

## Leerdoelen

Vooraf aan deze meesterproef heb ik 3 leerdoelen opgesteld die ik tijdens deze minor wil leren: 

+ ES6 Javascript
+ Gestructureerdere CSS en meer het DRY principe toepassen.
+ De webdesignprincipes van Joshua porter toepassen voor een duidelijke en gestructureerde UI

De ES6 Javascript vond ik erg belangrijk om te leren omdat ik tot nu toe alleen maar ES5 Javascript had toegepast. Ook begreep ik modulair Javascript voorgaand aan de meesterproef nog niet. Dit is ook iets wat ik wilde toepassen. 

In CSS ben ik de afgelopen paar maanden enorm in gegroeid. Ik ben echter al een paar keer tegen het probleem aangeloipen dat ik té veel CSS schreef voor bepaalde componenten. Ik gebruikte styles om andere styles weer te overriden. Ik wilde in deze meesterproef dus erg goed vooraf kijken naar hoe een component het bedste gebouwd kon worden en mijn CSS vervolgens op een logische en leesbare manier op te bouwen. 

Ik ben tijdens het vak webdesign erg geinspireerd geraakt door de design principes van Joshua Porter. Natuurlijk zijn zijn principes een soort leidraad en niet een soort heilig geschrift die nageleefd moet worden. Toch wilde ik naar zijn principes kijken tijdens deze meesterproef. Ik wilde dat mijn componenten clean, makkelijk te begrijpen en logisch gestructureerd zijn. Aangezien ik nog vrij "nieuw" ben in coderen en ook designen vind ik het heel belangrijk om een sterke design fundering toe te eigenen.

## Gemaakte & gestijlde componenten

#### Gemaakte componenten:

+ Admin login pagina
+ Header + navigatie (met laatste aanpassing van mees)
+ Preview foto en audio elementen op de "maak verhaal" pagina
+ De banner met afbeelding en titel op de "detail" pagina
+ Styleguide en basis buttons (in samenwerking met de groepsgenoten)

#### gestylede componenten:

+ Maak verhaal formulier (Gezorgd voor uitlijning, marges en iets overzichtelijker gemaakt)
+ input type="file" button gestyled met label er omheen
+ verhalen "cards" met afbeelding & titel 
+ Intro tekst op de homepage
+ gewerkt aan pagina's mobiel responsive maken (alle pagina's)
+ De componenten die ik zelf heb gemaakt.

## De aangetoonde competenties

Ik ben erg blij dat ondanks dat we in een groot team hebben gewerkt ik een goeie bijdrage heb kunnen leveren aan het project. Ik heb aantal dingen gemaakt en gestyled waarmee ik aan mijn leerdoelen ben toegekomen. 

### Voor een overzicht van all mijn pull requests kan je [hier](https://github.com/moniac/meesterproef-scheepvaartmuseum/pulls?q=is%3Apr+author%3ANielsFS+is%3Aclosed) klikken. Verder zie je hieronder een aantal belangrijke leermomenten van mij:


## ES6 Javascript + modulair Javascript (gericht op WAFS):

Dit was een van de grotere uitdagingen. Javascript is momenteel niet een van mijn sterke kanten. Toch wil ik heel graag mij hier in verbeteren. Een belangrijk leerdoel was dat ik ES6 Javascript zou kunnen toepassen. Ik wilde arrow functions leren, forEach loops toepassen ipv de for loop, ik wilde de nieuwe variabelen const en let toepassen, en als aller belangrijkste wilde ik leren om niet een brij aan code te schrijven maar om modulair javascript te schrijven.

Mo heeft tijdens het project een soort supertooling geschreven die als een soort docter frankenstijn automatisch ES5 code aanpast naar ES6, althans de basis dingen zoals var naar const veranderen en functies automatisch naar arrow functies veranderen. Toch heb ik nu weldegelijk geleerd wat deze ES6 code betekent en hoe ik het nu kan toepassen. 

Een voorbeeld is de foto en audio preview die ik heb gemaak op de formulier pagina. Hier zijn uiteindelijk een aantal code reviews en iteraties overheen gegaan. 

Mijn eerste versie hiervan was dit:

``` javascript
 input.addEventListener( 'change', event => {
	const files = event.target.files 
	for ( const file in files ) {
		if ( files.hasOwnProperty( file ) ) {
			const fileNum = files[file]
			const image = document.createElement( 'img' )

			image.classList.add( 'preview' )
						
			const reader  = new FileReader()
		
			reader.onloadend = function () {
				image.src = reader.result //converts this to a long data string for the image preview
			}
		
			if ( fileNum ) {
				reader.readAsDataURL( fileNum )//reads the data as a URL 
			}
			const fileInput = event.target
			fileInput.insertAdjacentElement( 'afterEnd', image )
		}
	}
} ) 
``` 

Toegegeven, mees heeft op mijn computer enigszins meegwerkt aan deze code. Maar de basis hiervan komt mijn hackaton code voor het previewen van images. Ik snap ook wat hij heeft gedaan. Hij loopt door de "file uploads" heen en creëert een image element per file. Vervolgens wordt er met mijn stukje code een data url gemaakt. dit is een manier om de upload als een image op de pagina weergegeven kan worden.

Alleen was er het probleem dat een file zowel een image als audio file kan zijn. Hier moest ik twee verschillende functies voor schrijven die met een andere functie aangeroepen zouden worden. Ik weet niet of je dit modulair kan noemen, maar in ieder geval is het een herbruikbare functie structuur: 

``` javascript 	
if ( window.formData !== undefined ) return
	input.addEventListener( 'change', addFiles )

	function addFiles( event ) {
		console.log( event )
		const files = event.target.files 
		for ( const file in files ) {
			if ( files.hasOwnProperty( file ) ) {
				const fileNum = files[file]
				const type = fileNum.type
				console.log( type )

				switch( type ) {
					case 'image/png':
						addImage( fileNum, event.target )
						break
					case 'image/gif':
						addImage( fileNum, event.target )
						break
					case 'image/jpg':
						addImage( fileNum, event.target )
						break
					case 'audio/mp3':
						addAudio( fileNum, event.target )
						break
					default:
				}
		
			}
		}
	
	}

	function addImage( file, target ) {
		const image = document.createElement( 'img' )
	
		image.classList.add( 'previewImage' )

		image.src = URL.createObjectURL( file )
				
		const fileInput = target
		fileInput.insertAdjacentElement( 'afterEnd', image )

	}

	function addAudio( file, target ) {
		const audio = document.createElement( 'audio' )
		const source = document.createElement( 'source' )
		audio.appendChild( source )

		audio.setAttribute( 'controls', '' )
	
		audio.classList.add( 'previewAudio' )
						
		source.src = URL.createObjectURL( file )

		const fileInput = target
		fileInput.insertAdjacentElement( 'afterEnd', audio )

	}
	
}
```

Ik heb van mees de "switch statement" geleerd. Hierbij kijk de switch naar het type file die in de input zit. Er wordt door de files geloopt en hij kijkt per case naar de juiste fyle type. Vervolgens roept hij de juiste functie aan. Ook ben ik achter een veel makkelijkere manier gekomen om een geuploade afbeelding of audio file weer te geven. Namelijk met de createObjectURL methode.

Ik maak hier wel nog een foutje door allemaal verschillende fyle types te declareren. Door een code review kwam aan het licht dat dit makkelijker gedaan kon worden met een if else statement:

``` javascript 
if ( files.hasOwnProperty( file ) ) {
	const fileNum = files[file]
	const type = fileNum.type

	if ( type.includes( 'image' ) ) {
		addImage( fileNum, event.target )

	} else if ( type.includes( 'audio' ) ) {

		addAudio( fileNum, event.target )

	}

}
```

Zodoende is er een nieuw component afgemaakt en heb ik enorm veel geleerd over het aanroepen van een functie wanneer er aan een bepaald vereisde voldaan wordt. Ook snap ik nu het nut van aanroepbare functies schrijven. Ook snap ik nu hoe je parameters kan meegeven en dat je die kan hernoemen voor nieuwe situaties. 

Nog een aantal andere componenten waar ik Javascript voor heb geschreven zijn:

-  kleur gradient van de story banner verander gebasseerd op de dominante kleur van de foto (met ColorThief script) (niet in eindproduct gekomen door CORS restrictie vanuit de database die niet optijd gefixt kon worden) - https://github.com/NielsFS/meesterproef-scheepvaartmuseum/commit/6aca44fc51a9ef75002e81b794c4ffdaa759604a

- Eerste versie van header + Nav -  https://github.com/NielsFS/meesterproef-scheepvaartmuseum/blob/f0d741e3bb46776c09324deda38efeebf4f7fb6f/views/components/header/header.js

Er zijn later mogelijk nog veranderingen toegepast op deze componenten

## Gestructureerde CSS en meer DRY principe toepassen (Gericht op CSSTTR)

Aan het begin van het project is er bepaald dat we met SCSS gaan werken. Voor mij was SCSS compleet nieuw, maar Mo, Servin en Mees hadden al veel (werk) ervaring met SCSS. Ik vond het enorm interessant om dit te leren, omdat het in het huidige webdevelopment werkklimaat volgensmij veel gebruikt wordt. Ook hebben we een variant van de BEM class notatie gebruikt om zo makkelijk in SCSS te werk te kunnen. 

Tot mijn verrassing was ik al vrij snel gewend geraakt aan SCSS. Ik vond de snelle mediaquery notatie en de indenting erg prettig. Het zorgde er in ieder geval dat mijn CSS voor mijn gevoel erg leesbaar was geworden. Ook heeft het er denk ik voor gezorgd dat ik heel veel minder dubbele styles heb toegevoegd. Ik was namelijk verplicht om die alleen binnen een bepaalde structuur toe te voegen en daar hou je je dan ook wel snel aan.

Een belangrijke les hieruit is dat scss over het algemeen vooral leesbaarheid beter maakt. Echter kan ik bij het schrijven van mijn CSS deze structuur ook toepassen. Alhowel de indenting niet aanwezig is in normaal CSS kan ik doormiddel van een goeie opbouw mijn css wel even gestructureerd krijgen als SCSS. 

Het gebruik van SCSS voor het project was niet ideaal voor het bereiken van mijn leerdoel, maar ik denk dat het me wel heel veel meer inzicht heeft geboden op het structureren van mijn CSS. 

In het volgende voorbeeld zie je terug:
- gebruik van media querries voor een een goed resultaat op meerdere breekpunten
- DRY code
- duidelijke structuur, zonder overspecificatie van classes en elementen
- gebruik van flexbox wat ik bij CSSTTR heb geleerd. 

``` css
.header {
	width: 100%;
	min-height: 3em;
	background: white;
	box-shadow: 0 0 20px 0 lightgray;
	position: absolute;
	top: 0;
	z-index: z('header');

	&--container {
		min-height: 3em;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 5%;
		@include mq("xl") {
			padding: 0 10%;
		}

		img,
		svg {
			height: 2em;
			z-index: z('icon');
			position: relative;
		}

		button {
			border: none;
			height: 2em;
			width: 2em;
			background: transparent;
			font-size: 1.5em;
			cursor: pointer;
			@include mq("small") {
				display: none;
			}
		}
	}
}
```

Hier onder verwijs ik naar een aantal gestylde componenten. Ik heb ze in de volgorde gezet waarin ik ze heb gemaakt. De oudste als eerste, en de nieuwste als laatste:

1. Admin login pagina - [klik hier om mijn pull request te zien](https://github.com/moniac/meesterproef-scheepvaartmuseum/pull/40/files/8c9575a03bfc67bf75c23ba9dd329aa2ef71db9b)
2. header + nav (alle commits) - [klik hier voor het volledige overzicht](https://github.com/NielsFS/meesterproef-scheepvaartmuseum/commits/17cc3194a83f56f49d7de3a7246835732c9aaf09/views/components/header/_header.scss)
3. story banner - [bekijk ejs code](https://github.com/NielsFS/meesterproef-scheepvaartmuseum/blob/1d53de2bb2b379d97e9ae88b898ea5d4236f90fb/views/components/storyHighlight/storyHighlight.ejs) & [bekijk SCSS code](https://github.com/NielsFS/meesterproef-scheepvaartmuseum/blob/45713d906326601d02503d78174b61694994c4e8/views/components/storyHighlight/_storyHighlight.scss) & [bekijk het hele proces](https://github.com/moniac/meesterproef-scheepvaartmuseum/pull/60)
4. Grid card styling - [wat kleine aanpassingen](https://github.com/moniac/meesterproef-scheepvaartmuseum/pull/93/files/ce2d0fbb88e733749f941b386620393755089a87)
5. Form styling - [ example of one of my pull requests](https://github.com/moniac/meesterproef-scheepvaartmuseum/pull/136/files/34f6211939f2997ba900f5440c03c00a6cdb0bf1)  &  [example of some custom input styling](https://github.com/moniac/meesterproef-scheepvaartmuseum/pull/162/files/684d2e444a744502ed0f9b888fe19526e1357a65)


Verder heb ik nog allerlei kleine tweaks hier en daar gedaan maar die ga ik voor de overzichtelijkheid hier niet noemen.

## Webdesign principes (van Joshua Porter) (Gericht op het vak Webdesign)

Aangezien we het project hebben opgedeeld in componenten valt niet een heel pagina design terug te leiden naar mij. Wel ben ik verantwoordelijk geweest voor een aantal componenten die op meerdere plekken in het project te zien zijn. 

De projecten waar ik voornamelijk mijn designs op heb toegepast zijn:

- De header en navigatie
- de admin login pagina
- De banner die op de detailpagina van de verhalen te zien is

Verder heb ik ook allerlei kleinere dingen gestyled, maar aangezien er ook veel iteraties van andere groepsgenoten zijn geweest op die dingen nga ik ze verder niet in detail noemen.

In week 1 hebben voornamelijk Jaimie, ik en Robin gebrainstormd over hoe de pagina er precies uit moest zien. We kwamen tot de conclusie dat er vijf verschillende pagina's moesten komen:

- De homepage
- De overzichtspagina met alle verhalen
- De verhaal upload pagina
- De detailpagina per verhaal
- De admin login pagina

Aan het einde van week 1 heeft Jaimie een aantal schetsen gemaakt die de globale layout van de pagina's weergaf. Begin van week 2 heeft Mo in Sketch een design gemaakt van de globale style van de website.

![afbeeldingen van Mo's design](https://lh3.googleusercontent.com/hST1dkeB6gGHOzY-m7J9THnpofsPmcFkRCPxALPclOaYBshZYw2IFntJ207AzzAJGemNuNc2FyCwKRf5RLpPkWZwRAImKt06nSVLVaQIh_rmrsjJoVRb97KL4KYrKpzr4XrEJglJvfi7XUSKrVOIPltZlObXtLA9IFzBeG_HlK6ov4HwkJw0DJR4WiSuEwNJIzt1ZVr6AoBaAqREOccvYL3b-CyES6iga6RR185a6Ay6p6U-XKqW4Y7P6z9VfYXykXbo5YQqEqrjH3S0PLgCS_D0RrHrUoNDYV7JYQDUhvhQnsr58K_swFRxa4Zh9yxC0DA9zzbhMVrY7HbedMYF9FJ8a7XWbYs4lKc1dTiaOtAMwZdXsHUhtddQAuvVVHtm_ane0E8oZhCgwGbXfsrp1ensGQN0CDiNZxkBJW0VMguhuDEzrQfmIodsaLNyUcx84BdJmwCRG2dXREtUG2XwcMTjGSDwaxtP4-a9-xE71VuReSZUH6n830eOQkoDpWpq49ae26eDfxtjruPXZTJceXSKTRtUPyJVJtsSwgv2_f9we1Hff2SzDyzykvXYZcEPaDTH1NCNnlU8uBc1CRQfT9O8-yjRB6FI_WeN2Ac=w416-h319-no)
![afbeeldingen van Mo's design](https://lh3.googleusercontent.com/mtFKfHb-qciCRWIhWatAMd-hGjlBoa4ORBewd_NnhGYpvdgMBNuz9W4wA6Z9R-UPzY4j-1aHqHjFcM9pKmPWOB83gZerSiXXfpuWVpiYpsW-J5lkA18Q_N6vTkiQbWJdxQqPYB3_73ruuR-3WIgpVtS56Nfo9PUEvuNVPzXqOsXeabD6P5-sebeKEojHsM_i03kNKBiKFG55Mlpmx7REUNTc_0rEHAw74_zvjUixNvjlgcB_ZrJzKpHxzj11WIzPEINAnceGFzWesUiIL-6heD35gW-CBJTxXMuANvHeGjQaPfzRUM_PO8ftGbgT_dN42QCLBomfImkM2jWAxQ9wDG39_nCM3Kw1Ze33GcI0q0LM85r8D20waKWw1Hp1bEdEDeN5XDFYmSJc1ycnVvf6W5ZIQAPq-sB08gNphkfIu6zaR7oFNF6j0E-qVHQPR8bO6E8_juXCqEizZCE8NPLKECWEThrkDatXnrOBOmOZr1W8lVUbURDoB28C5Wn44xeYJaVskxuCvzvvSuA5Q3fBRSqmmOIsfGQwB1cZ_QAWuMHpU-kMIU5DKLEPejyPTjQ6NdmVmnfTiZOFZ-KxTl8J86PPY6aZYxi-QGmi3K4=w1400-h1121-no)
![afbeeldingen van Mo's design](https://lh3.googleusercontent.com/vIYFo7C-HP7HNdaFr_ojf9dwwAJys5PXlDzu5g0peKwJ89YtI3L8PSro-Mw99huOloMXb_1L1_s7VW-vJyLvKc_rAt4DH7qXkutkzHmEFBnlx-dMaio-l5zJ9fA3rTUgbik6sp_WkeiX5W-rKHGJSXJE66zzbX5rcg2k771DlicZDnD6ylie5UsFTjvFq2aPQBntDVm0BNFkfoa67diZrIZr_vky7xXYO7hgFZU7TwyIiVNpBt9ouFRcmVlAaLzaltHfE-p3cW9HOQDAQTeEq9I3jjafNfEZpMw3b4lkbFBka9ga1G6keVeEL4XRDsTQyGQVOhEcmrbtz3WhTslD1lG7h_66qMClRMX9BOzY84MpNy2fMCs03comZywklZ_ALgtriCcAUzo2blFsWs31Xq2XeiJHpk0lDXngjt1Yo7d1aS7c4yHL5IO0VpVuNYbUnQO24ECAdy6fNFkPNCovSpadrQcHvEIWqlgF8vQR8CzUp9DbOpNXGKf72CviJpk6ipIK_1_d6L-uq2L0eC7IU8Ya3vhk-4qS7AbWkhc0Na1iQu-DlfE3nr7pPd-PwH3OVDpGxNdXmH-GrJu8-LjmQVuqInopjVOTXN4LTlo=w1400-h617-no)

Zoals te zien is op de website heb ik de componenten bijna volledig getrouw aan de originele schetsen gemaakt. Voor drie componenten wil ik mijn design keuzes verantwoorden.

### De Admin login pagina:

Deze pagina is behoorlijk simpel, en aangezien het slechts een admin login pagina betreft wilde ik hem ook simpel maar goedwerkend maken.

![admin login](https://lh3.googleusercontent.com/LsFwcLDYiTNL9Du_K8hkcuvNs1315laRZu19zGbtvfgko5RT0bM5pjBCIsYOK9Ecr7-W3Dk5zQOMSgqGMh_qijL_01fEAn676xGxNo0hR_3tlyXxGS6WzvwnfAKFjeMHab2fFHYAksAiLsab7pN9KXb_ArC58XtKmPLphMoGKDcby6mdvX8D8P03E6JxtixZGcpW-e2-oOdmwbvSQgQ2DA-PhDWUrUKeBRYzcLOR_OUZyuECLM03hXOEJshTTIPwpOs-9lOXMVu452wCYtBBUlnosJvgAcnnzHCFLzB1pAyGrNDrFNtdwPlNyDarX7b80NBRXph7UZsfJbA-e2YH8rOfy5_FieeCE4UjTSHCSjymFDHeVrZ6pJ--uXv147ZSZMGmQ9i-6lre9-nkn96jItobxho5phZePPlNvGWJIAr0iDi-snjZguopI8sngwnEusxOVExRwqJr1Eydx8-AyWkjsTqZOb7ouoTq8URRglP36DRFFiD835-cw4SNIvD_DeXS19C46ZIY_E9-_qtyc_zLl8lF3FYN4clJRTz7hKA16nFD8uBqgVdvqr71slgJvhEAmhhNNlZlHINRMtA3Bpdr6gRw5OGNk2oOYTw=w1400-h784-no)
![admin login](https://lh3.googleusercontent.com/xPT2tOSoESpT9OGBVYUt33jINa2s1Yh7hngyFcMck_HN3W7eCTLvdMYuWukBwwaQoXY8_z6XA2H-VZqDpHFYJlPrcDuCIhxkXNG6FRkoAs-2zelY4PxAZfMmK185LmvsFXqKcbSRhDRXe0AtW5ymi78icUrByT7n-e_dB9SzmdHgwnJa4RT1-6At30I9oqyi2oqhI9nG3J2mwSUmBOq-OH59fNJ-Uz3yiTyyfIM7DLF_PzZ6zYuZj9hf84zNrKCZ7ZNNdPiz-jgqpF5H9sfV8j1JjHko6Xeyd8A40hJ12o5m_3d8qUWLiJlXEcPS8yIkFYzK0McATZJ2922Pnza7Fso6UkL68D_qvQ8I7ud_0oijaEcLTUMyLrWzq3aaaBdkMOX_mOeV2LJ4lBIk6qZaY1fIWBUe3pYogLpezAp_I55NFos0hCwv2wwrll-eMyxb-McgQP1ABbGL5qt3QqjDP6ZTX5CmRl9m4Ix8l5skp8dB4Z7U392JrVMwovTLNJg0YxETXVA2WP195D5SdD7ZroiRoakrmrE38InxZQ6wVEBMpnKCT7v3u56DT8jsjdC6D1PT0xmc3b0DDhTJzE_vGznWOZikWqNYkM4McyU=w189-h334-no)

De inputs krijgen een dikkere groen gekleurde bottom border wanneer de inputs aan de vereisten voldoen. Een email moet een email zijn, en het wachtwoord moet minstens 7 tekens hebben. 

``` html
<form method="POST" action="/admin/login">
	<label> Email:
			<input type="email" name="email" autofocus required >
	</label>
	<label> Password:
			<input type="password" name="password" pattern=".{7,}" title="minimum 7 characters" required>
	</label>
	<input type="submit" value="Login">
</form>
```

``` css
input[type="email"],
input[type="password"] {
	&:valid {
		border-bottom: 1.5px solid green;
	}
}
```

### De header + nav:

De header en nav wilde ik simpel maar doeltreffend houden. Een logo linksboven ter herkenning en de navigatieopties met een call to action rechtsboven. Op mobiel krijg je een gebruikelijk uitklap menu. Op de body kan je vervolgens niet meer scrollen en er wordt een gradient geplaatst over de content die ook de mogelijkheid biedt om het menu te sluiten als je er op klikt. Ook in het uitklap menu is de call to action te zien.

![](https://lh3.googleusercontent.com/Zvk5uENeFhTs8tYuoJjFfjZ7lV5PjsVMnB5AgxREfvDnQPwBJlvIOIfqOP94UW5zzj3kRFqwfMHjWN69y5spKd_AQT2CYrrW6M07BuIBJ7sYvMU4SO61BiQWJcqvjn2oBOS2UQF_DFrR0ZQNORua_eK6pH5m7E28d1VuazqfA0JJQI5sL_h4v9xEsQ79zaxl-T3WgXQet6bFMlMDmLCQj-R1Q3LMJqTow9Z_kVG2Mbq3t8RWt-hBMA-nyEGOwULyRAQY0cWcBvPXeSbDUFeGL0_3-b_KA7klCvkNSh_59_kXN2knhLGYLv6Hojgxt7z30lqVhg9xMVUhJ0sCOrARCP6m4FKa877oe6vT7KePakQN2sj_eagVLn8kIACylP8vHtxYqti5AA7PCG175NKo1iplQIZeBCdw1q3BWMJnN9-Axd_XNBYDm-CJ1InR-UwAcFUdBfwARlKVg6sNCW_BhVMiIo3KqtVGHRKBgCoHp3FuczK168sve0K3PJKczNcWb-cx4-RySJ_BO7PGpwYV41C452YNScXOIdnYHsd56M_E7O4cG4ryagvNCqGerbV-ZxFv_6xEJN7AMqsHhTkyscY-c-FhWE_C0DaOXX4=w607-h1000-no)

In het stuk over [Browser tech]() vertel ik meer over het menu

### De banner op de verhaal detailpagina's:

De banner heeft het design van Mo zo goed mogelijk gevolgd. Zelf vond ik het een leuk idee om een titel, ondertitel en uitgelichte afbeelding op een dergelijke manier weer te geven. Het zorgt voor herkenning, de belangrijkste informatie is direct in beeld en het kan een lezer nieuwschierig maken om echt het verhaal te gaan lezen.

Een kritiekpunt van Vasillis die ik enigszins wel met hem deel is dat de banner wellicht té zwart is. Aan de ene kant vind ik het zelf mooi contrasterend, maar aan de andere kant lijkt het inderdaad iets te missen.

Ik ben vervolgens op het idee gekomen om een lichte gradient op de banner te zetten die het zwart een beetje moest doorbreken. De kleur van de gradient moet bepaald worden door de dominante kleur van de foto. Ik ben op het idee gekomen door de app van spotify die dit op een hele goede manier doet.

![spotify example](https://lh3.googleusercontent.com/fHaHNmjBoH9gEW0jU1UbeDOGm1zyxlNA2YN8vtSEUVrltzyHyJg6k_x05vKrm12N0GazV9Rha4c_-LgYcREDfuCzvKv7OOy5DCIwiealTCPfoXUUIO2BUdj67xfTQ_qdT9cvPs_qA4U3OgU_SPT0nOfVtmxlNL5nkeBVY_oQjhPj-tRHgZnMq5RrcdJxyIiAv3MKKe1FTAPL7bo2ePHxLJiaXUVdfz2WE7dp0c_mKadL338d_vr6kpq3qAJN0W6isKy0UOsL8LWjiKKEvp4y7iJFqW0IMvA6IBcrM7ahj36hLraxVNiB1jfKtHxX9GwADPWNtYy6vdMCwzbadmSyzmfzCRJAoAB9cEUh78jfEMQOn5QnAHT7yX11atD87zzLyEzdQVO0f8eOwAUwCmqzXtNLgYU9yETccr7ZdYwUKEnc5dzeTqqV4Ujb69r751MOjBR-xgIxM1lNhHlSawDwr0YOmgGH8sB1_00n1OQgVx1NSc5JXBg5BSjYW07x5BZWwi8lv3aok36vFwHktH9gFksgk6_06b-5l_S1TMx6veljtYYqGy_Z3VEYRAVCl3LqhV31ti1CxJ92bHjYRoy8Ga9zzJi0XV4E_ah2Hqk=w140-h302-no)

Doormiddel van een script genaamd ColorThief heb ik het voor elkaar gekregen om ook een gradient op de banner te kunnen zetten. Beter gezegd: de achtergrond van de banner krijgt die kleur, en er zit standaard een zwarte gradient overheen. Dat resulteerde in het volgende:

![color gradient](https://lh3.googleusercontent.com/YNbZSIHaHxDcOfVRDXCbITmwG3ONtm8aa_nzziqRnScM62KP-cE-FA8M9D4EV-j6gvwkuRt3ST25jWvNJQ502cZrvXjDZqUG8RmOWAUsgQmdC0EwcPQ5_OnTULZSsmXi90yFYSRWGj182f_neGeVBfTQ_laFVMIOhfTOMBKBKrzmjyEONgCLEa3lm7zOkoDrkkGZ_-zbvpST4dCQ0Am4WUeRRg8ekuGyo4hmrcx6BgrKRhlsYo9Z-Q73YQo7XCLUOOu5WqsETFRT6gVCshrwLt8ECGxfhYpzQp6AHhkCyjRW8Mbr_cJIYB9-wDJ6nL7BMrFLD6XOrT4Ifn8qmB_CHlRhUQIuah7wKaDJ9FOZiayIH6sfe1G8g5GElPKF3LWsg2E0d7Iue26FvaoftL5V3xhuq7Bpx3GkaO39iYdlx1k_67GQTT4HU87F-IVA1OD5UWy-JNiGsssqJ_uJNdDIL0BqdH6cYGc27f8dHmGT4nbsnXOjA3XFJTDNlArDXoEmqxQH8uD3aJApRIfaI_MVs-86rGdyfSfnO42qRW_nRud-SWY9HNNf63lh1qJGRn2eysHKaDXG7WQOCFj5q1P5HzNOffsrTUqIz-lPi2g=w1379-h1203-no)
![color gradient](https://lh3.googleusercontent.com/uZ3-SlGwJmbl3114m2Vuo3Rb2MUthMeHf2JazC_BSfHSadRpx_QllFFwgcJXM3IJdjpANaJLpsrBcyykVBEY6T_DlOrXpElOrDZ5HhvHLpdA63lAcrMtbqDDSEqUSIN31s85px29S2Lr3ABh-EYtlY52aGaNqUBwFqSViOx81C3_RtOYcBytFE01LM5whsRGMTbQ7U8PwIEDuwbVULuvn4JCZm7TBLZ8jhb-ivf__brUD2kOuoXJWOTyhWTTw1mBJIyb-_1ZXTt2Igyyq-x-SgJ1w8PVykJtj4tkhxE4sTK7watry6EDHFpFzCsWDGmXCb1qGN3YAX5vvWFsBsxK0yF50V_fHKJqpaBgkXsRTtrni49b-rvJOnzyP7wdmpFJ7lbcLoyMe18qn9VRAJXCbaTDU4EgF7GAJRDA2dEu2V9OZ_d8PGvJVwAbHdClIxv7JWgN3q93UvzffP4O-bbE4MPHpPwXO703vP96T_zG4HlNb2tbhG_YMFHZ-aoiY3EiirMRKie-sheiE6qAyRIjRBlLiAmnZRjxOUJZOtgU3LoocDDQFr6zbudJMHuUnngZfTRwx9PkNBwZka7I999C2VlTdfHlavFhQAyP0a0=w1400-h1117-no)

Zoals je kan zien schaalt de fe titel en subtitel mee met de breedte van de foto. Bij dunnere foto's vullen ze de banner meer, en bij bredere foto's neemt het een max van 50% breedte aan.

Helaas ging deze feature uiteindelijk niet door omdat er vanuit de foto's uit de database geladen een CORS error gaven. Er was geen toegang om de foto's doormiddel van ColorThief op een canvas te plaatsen om de dominante kleur te onttrekken.

De code kan je [hier](https://github.com/NielsFS/meesterproef-scheepvaartmuseum/commit/6aca44fc51a9ef75002e81b794c4ffdaa759604a) nog wel zien

## Navigatiemenu en accessibility (gericht op browser tech)

Een erg belangrijk onderdeel van de website was het navigatiemenu. Wij wilden namelijk dat deze erg accessible was. Bijvoorbeeld voor browsers waarbij javascript uit staat, maar ook voor blinden me screenreaders.

Ik heb de eerste versie van deze header met navigatie gemaakt. In principe werkte deze naar behoren en ik dacht dat deze volledig semantisch en accessible was. Ik heb echter een paar foutjes gemaakt waar ik mij niet van bewust was. Deze zijn later door Mees aan het licht gekomen:

1. De toggle button stond buiten het navigatie element waardoor screenreaders niet door zouden hebben dat het onderdeel van de navigatie was. 
2. De toggle button had geen duidelijke benaming. Hierdoor zouden screenreaders alleen voorlezen dat het een button met een teken was. 
3. Het miste 'current page' pagination. Mees heeft toegevoegd dat screenreaders voorlezen op welke pagina je je momenteel bevindt. 

Ik heb hier veel van geleerd. Qua semantiek zat ik bijna helemaal goed, maar ik had nog geen goed begrip van hoe screenreaders precies door zo'n menu heen gaan.

De toghle button wilde ik aanvankelijk met javascript er in zetten. Servin had mij echter geadviseerd om dit standaard al in de EJS te hebben. Ik ben er nog niet echt over uit welke oplossing nou beter is. 

Mijn originele header is hier te vinden: [EJS](https://github.com/NielsFS/meesterproef-scheepvaartmuseum/blob/6880ff6ac4e52ad299cc1eaf1980b04cf272f82b/views/components/header/header.ejs) & [SCSS](https://github.com/NielsFS/meesterproef-scheepvaartmuseum/blob/6880ff6ac4e52ad299cc1eaf1980b04cf272f82b/views/components/header/_header.scss) & [JS](https://github.com/NielsFS/meesterproef-scheepvaartmuseum/blob/3483b39a98be9df46462dcf1cdd4253812bf6457/views/components/header/header.js)

De fixes van Mees zijn [hier](https://github.com/NielsFS/meesterproef-scheepvaartmuseum/commit/b0a66d4931c57c7af1176cafdac3fc47ccad2561) te vinden

## Het eindproduct

Over het algemeen ben ik erg tevreden over het de uiteindelijke oplevering van het project. Ik vind het ook echt bijzonder knap hoe voornamelijk Mees, Servin en Mo de website volledig werkend hebben gekregen. Zij hebben alle backend op zich genomen. Dit was een logische zet aangezien Robin, jamie en ik geen backend ervaring hebben. Servin was chef database, Mo was chef tooling en Mees was een soort vliegende keep die overal zijn steentje heeft bijgedragen.

Ik ben blij dat ondanks dat we zo component georienteerd te werk zijn gegaan, we als team uiteindelijk alles hebben kunnen samenbrengen om een geheel te maken. Er waren momenten waarop ik twijfelde of onze aanpak wel goed was. Een pagina bestaat namelijk uit allerlei verschillende componenten die vaak door verschillende personen zijn gemaakt. Die moeten uiteindelijk wel met elkaar samengaan. Gelukkig heeft dit niet to problemen geleid. Onder andere door goed overleg. 

Qua uiteindelijke vormgeving ben ik niet 100% tevreden. Dit heeft er niet mee te maken dat ik de pagina's niet goed vindt. Integendeel. Ik zou echter wel bepaalde dingen anders hebben gemaakt of vormgegeven. Toch heb ik mij door dit project echt gerealiseerd dat er verschillende smaken zijn. Daarom ook goed dat we uiteindelijk een werkend eindproduct hebben waar we allemaal op afgestemd waren. Grappig is ook dat mijn vriendin onze website weer super leuk vindt terwijl ze bijvoorbeeld de minor website weer niet leuk vindt (En dat zei ze niet omdat ik er aan meegwerkt had, ze is nogal kritisch meestal). Dat was gek om te horen aangezien ik die minor website qua design sterker vindt dan onze website. Wellicht imposter effect? 

Ook is het erg bemoedigend dat Ernst, de coördinator uit het scheepvaartmuseum, erg enthousiast is over het resultaat. Zo wil hij het liefste dit project in de zomervakantie of na de zomervakantie doorontwikkelen. 

## Samenwerking

Met de samenwerking ben ik ook erg tevreden. Het was best een uitdaging, een team van 6 man. Sommigen hadden aanzienlijk meer ervaring dan anderen. Mo Servin en Mees zijn bijvoorbeeld enorm sterk in Javascript. Die ervaring mis ik nog wel. Ondanks het verschil in ervaring heb ik wel het gevoel gehad dat ik echt mee kon doen in het team. Zo heb ik een aantal componenten gemaakt die werken en in de eindversie terecht zijn gekomen. Ook kon ik altijd terecht bij al mijn teamgenoten voor vragen. De volledige opzet van het project was nieuw voor me, en het feit dat ik toch gemakkelijk mee kon in het hele proces en dat ik daarin kon groeien is heel fijn. Met Jamie en Robin kon ik ook goed samenwerken. Ook bij heb kon ik terecht voor vragen en second opinions.

Achteraf gezien zijn er ook wel punten geweest die ik lastiger heb gevonden. Zo moet je namelijk als je een bepaald idee over iets hebt niet één of twee mensen overtuigen, maar alle 5 teamgenoten. Dat betekent dat sommige ideeën worden overgenomen, maar veel ook niet. Maar aangezien dit een teameffort is geweest is dat logisch, en iets dat je mee om moet kunnen gaan. In ons geval vond ik dat we dat best goed met zijn allen hebben gedaan. Iedereen kon iedeeën inbrengen, en als er concensus was gingen we er mee door. 

Ook had ik soms moeite met aanpassingen aanbrengen in de code van Mo, Mees of Servin. Ze gebruitke naar mijn idee best geavanceerde Javascript. Ik heb best vaak aan hen moeten vragen wat het nou precies was dat ze hadden gedaan. Gelukkig legden ze dat graag uit. Hierdoor heb ik ook her en der mijn Javascript aanpassingen kunnen doen los van mijn componenten. 

Ook Mo was erg behulpzaam met het uitleggen van terminal commands en wanneer er bijvoorbeeld een merge niet goed was gegaan. Doordat hij vaak meteen kon kijken als ik er zelf niet uit kwam ging er weinig tijd verloren. 

## Conclusie

Het was een project vol met nieuwe ervaringen. Voor het gemak ga ik ze allemaal noemen:

- Als team werken in GitHub
- Me houden aan code conventies
- Werken met de terminal
- SCSS
- Werken binnen EJS
- Component based werken
- Frustratie met merge conflicten, pushen pullen etc.
- ES6 Javascript gebruiken

Voor mijn gevoel ben ik tijdens de meesterproef blootgesteld aan allerlei dingen waar ik mij in het begin van deze minor geen raad mee had geweten. Ontzettend tof dus om te zien dat we als team uiteindelijk een werkende site de lucht in hebben gekregen, waaraan ik mijn steentje heb kunnen bijdragen. 
