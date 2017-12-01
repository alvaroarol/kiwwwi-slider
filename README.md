# kiwwwwi-slider

###### Easy to use javascript slider with no library dependencies.


### How to use

###### Create your slider and slides

```html
<div id="slider">
    <!-- LEFT AND RIGHT BUTTONS -->
    <div class="slide-left"><</div>
    <div class="slide-right">></div>
    <!-- EACH SLIDE INSIDE THE SLIDER MUST BE AN <ARTICLE> ELEMENT -->
    <article>
        <div>
            <h1>Slide 1</h1>
            <p>Something</p>
        </div>
    </article>
    <article>
        <div>
            <h1>Slide 2</h1>
            <p>Something else</p>
        </div>
    </article>
    <article>
        <div>
            <h1>Slide 3</h1>
            <p>Whatever floats your boat</p>
        </div>
    </article>
</div>
```


###### Instanciate the class for each slider in your page

```js
var slider = document.getElementById('slider');
var newSlider = new KiwwwiSlider(slider, 3000, 1);
```
**Parameters**
1. The slider element
2. The time between each slide switch (in milliseconds), false if no auto-switch
3. The slide animation duration (in seconds)

###### That's pretty much it


### Some additional information

- The slider automatically takes the height of the tallest slide.
- Buttons are not mandatory. Styling is not included, you decide what to put in them (icons, text, ...) and where you put them (they are in absolute position relative to the slider).
- Each slider must use a different instance of the KiwwwiSlider object.
