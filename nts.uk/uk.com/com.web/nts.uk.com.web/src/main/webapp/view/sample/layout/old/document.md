# Old layout structure

| Note: Use right id: functions-area, contents-area, functions-area-bottom

``` xml
<div id="functions-area">
	<!-- Buttons design-->
</div>
<div id="contents-area">
	<!-- Content layout -->
</div>
<div id="functions-area-bottom">
	<!-- Buttons design-->
</div>
```

# Custom title

| Use binding: pg-name for child element of #functions-area

```xml
<div id="functions-area">
	<div data-bind="pg-name: 'RESOURCE_ID'"></div>
	<!-- Buttons design-->
</div>
<div id="contents-area">
	<!-- Content layout -->
</div>
```

# Floating buttons

| Use binding: floating for child element of #functions-area

```xml
<div id="functions-area">
	<div data-bind="floating: true, left: 100, bottom: -15"></div>
	<!-- or -->
	<div data-bind="floating: true, right: 100, bottom: -15"></div>
	<!-- or -->
	<div data-bind="floating: true, top: -15, left: 100"></div>
	<!-- or -->
	<div data-bind="floating: true, top: -15, right: 100"></div>
	<!-- Buttons design-->
</div>
<div id="contents-area">
	<!-- Content layout -->
</div>
```

# Transparent background

| Add class `bg-transparent` to element

``` xml
<div id="functions-area" class="bg-transparent">
	<!-- Buttons design-->
</div>
<div id="contents-area" class="bg-transparent">
	<!-- Content layout -->
</div>
```
