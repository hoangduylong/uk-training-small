# Old layout with two panel structure

| Note: Use right id: functions-area, contents-area, functions-area-bottom

``` xml
<div id="functions-area" class="bg-transparent">
	<div data-bind="pg-name: 'PG_NAME_ID', back: ''"></div>
	<div data-bind="floating: true, left: 100, bottom: -15">
		<button class="green solid">Solid</button>
		<button class="green outline">Outline</button>
	</div>
	<button class="green solid">Solid</button>
	<button class="green outline">Outline</button>
	<button class="green">Proceed</button>
	<button class="white">Normal</button>
	<button class="red">Danger</button>
</div>
<div id="contents-area" class="overflow-none bg-transparent">
	<div class="two-panel">
		<div class="left-panel">
			<div id="contents-area">
				<div data-bind="markdown: 'document.md'"></div>
			</div>
		</div>
		<div class="right-panel">
			<div id="contents-area">
				<div data-bind="markdown: 'document.md'"></div>
			</div>
		</div>
	</div>
</div>
```