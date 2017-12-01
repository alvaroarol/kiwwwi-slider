/*******************************************************************************
KIWWWI SLIDER
*******************************************************************************/
//Slider element must have an id
//
//Slides must be <article> elements and direct childs to the slider element
//
//Buttons for sliding to next and previous slides must be given the classes .slide-right and .slide-left
//They should be placed as direct children of the slider container.

class KiwwwiSlider{

    /**
     * CONSTRUCTOR
     * @param {object} sliderEl Element containing the slides
     * @param {mixed} duration Time in milliseconds between automatic slide switching, false if no auto-slide
     * @param {number} transition Time in seconds of the transition between slides
     */
    constructor(sliderEl, duration, transition){

        this.sliderEl = sliderEl;
        this.duration = duration;
        this.currentSlide = 1;
        this.numberOfSlides = document.querySelectorAll('#' + this.sliderEl.id + '>article').length;
        this.slideRightButton = document.querySelectorAll('#' + this.sliderEl.id + '>.slide-right');
        this.slideLeftButton = document.querySelectorAll('#' + sliderEl.id + '>.slide-left');
        this.setCSS(transition);
        this.rightButton();
        this.leftButton();
        this.swipe();
        this.hideShowButtons();
        this.resetTimer(this, null);

    }

    /***************************************************************************
    METHODS
    ***************************************************************************/
    /**
     * SET THE CSS OF THE SLIDES
     */
    setCSS(transition){

        //Slides CSS
        var maxHeight = 0;
        for(var i = 0; i < this.numberOfSlides; i ++){
            Object.assign(document.querySelectorAll('#' + this.sliderEl.id + '>article')[i].style, {
                'position': 'absolute',
                'top': '0',
                'left': (i * 100) + '%',
                'width': '100%',
                'transition': 'left ' + transition + 's'
            });
            //Check which slide is the tallest and save the height value to set the slider height
            if(document.querySelectorAll('#' + this.sliderEl.id + '>article')[i].offsetHeight > maxHeight){
                maxHeight = document.querySelectorAll('#' + this.sliderEl.id + '>article')[i].offsetHeight;
            }
        }
        //Buttons CSS
        if(this.slideRightButton[0] != null){
            Object.assign(this.slideRightButton[0].style, {
                'position': 'absolute',
                'z-index': 2
            });
        }
        if(this.slideLeftButton[0] != null){
            Object.assign(this.slideLeftButton[0].style, {
                'position': 'absolute',
                'z-index': 2
            });
        }
        //Slider CSS
        Object.assign(this.sliderEl.style, {
            'position': 'relative',
            'overflow-x': 'hidden',
            'height': maxHeight + 'px'
        });

    }

    /**
     * SLIDE LEFT
     */
    slideLeft(){

        if(this.currentSlide == 1){
            for(var i = 0; i < this.numberOfSlides; i ++){
                document.querySelectorAll('#' + this.sliderEl.id + '>article')[i].style.left = ((i * 100) - ((this.numberOfSlides - 1) * 100)) + '%';
            }
            this.currentSlide = this.numberOfSlides;
        }
        else{
            for(var i = 0; i < this.numberOfSlides; i ++){
                document.querySelectorAll('#' + this.sliderEl.id + '>article')[i].style.left = ((i * 100) - ((this.currentSlide - 2) * 100)) + '%';
            }
            this.currentSlide --;
        }
        this.hideShowButtons();

    }

    /**
     * SLIDE RIGHT
     */
    slideRight(){

        if(this.currentSlide == this.numberOfSlides){
            for(var i = 0; i < this.numberOfSlides; i ++){
                document.querySelectorAll('#' + this.sliderEl.id + '>article')[i].style.left = ((i * 100)) + '%';
            }
            this.currentSlide = 1;
        }
        else{
            for(var i = 0; i < this.numberOfSlides; i ++){
                document.querySelectorAll('#' + this.sliderEl.id + '>article')[i].style.left = ((i * 100) - (this.currentSlide * 100)) + '%';
            }
            this.currentSlide ++;
        }
        this.hideShowButtons();

    }

    /**
     * HIDE/SHOW BUTTONS
     */
    hideShowButtons(){

        if(this.slideRightButton[0] != null && this.currentSlide == this.numberOfSlides){
            this.slideRightButton[0].style.visibility = 'hidden';
        }
        else if(this.slideRightButton[0] != null && this.currentSlide != this.numberOfSlides){
            this.slideRightButton[0].style.visibility = 'visible';
        }
        if(this.slideLeftButton[0] != null && this.currentSlide == 1){
            this.slideLeftButton[0].style.visibility = 'hidden';
        }
        else if(this.slideLeftButton[0] != null && this.currentSlide != 1){
            this.slideLeftButton[0].style.visibility = 'visible';
        }

    }

    /**
     * SWIPE DETECTION
     */
    swipe(){

        //Variables
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.touchStartY = 0;
        this.touchEndY = 0;

        var self = this;

        this.sliderEl.addEventListener('touchstart', function(e){
            self.touchStartX = e.changedTouches[0].clientX;
            self.touchStartY = e.changedTouches[0].clientY;
        });

        this.sliderEl.addEventListener('touchend', function(e){
            self.touchEndX = e.changedTouches[0].clientX;
            self.touchEndY = e.changedTouches[0].clientY;
            if(self.touchStartX + 50 < self.touchEndX
            // Be sure the swipe wasn't for scrolling up ur down
            && self.touchStartY + 150 > self.touchEndY && self.touchStartY - 150 < self.touchEndY){
                self.resetTimer(self, self.slideLeft());
            }
            else if(self.touchStartX - 50 > self.touchEndX
            // Be sure the swipe wasn't for scrolling up ur down
            && self.touchStartY + 150 > self.touchEndY && self.touchStartY - 150 < self.touchEndY){
                self.resetTimer(self, self.slideRight());
            }
        });

    }

    /**
     * RIGHT BUTTON EVENT LISTENER
     */
    rightButton(){

        if(this.slideRightButton[0] != null){
            var self = this;
            this.slideRightButton[0].addEventListener('click', function(){
                self.resetTimer(self, self.slideRight());
            });
        }

    }

    /**
     * LEFT BUTTON EVENT LISTENER
     */
    leftButton(){

        if(this.slideLeftButton[0] != null){
            var self = this;
            this.slideLeftButton[0].addEventListener('click', function(){
                self.resetTimer(self, self.slideLeft());
            });
        }

    }

    /**
     * RESET TIMER WHEN MANUALLY SLIDING
     * @param {object} element Slider element
     * @param {function} callback The function to execute once the timer is reset (slideRight or slideLeft method)
     */
    resetTimer(element, callback){

        if(element.duration != false){
            clearInterval(element.timer);
            element.timer = setInterval(function(){
                element.slideRight();
            }, element.duration);
        }
        callback;

    }

}
