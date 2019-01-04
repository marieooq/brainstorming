(function(){
    'use strict';

    const elementsNum = 54;

    createElements(elementsNum);

    const boxes = document.getElementsByClassName('drag-and-drop');

    let x;
    let y;

    let z = 10;

    for(let i = 0; i < boxes.length; i++){
        boxes[i].addEventListener('mousedown', mdown, false);
        boxes[i].addEventListener('touchstart', mdown, false);
    }

    function createElements(num){
        let boxNum = 0;

        for(let i = 0; i < num; i++){
            const container = document.getElementsByClassName('container')[0];
            const element = document.createElement('div');
            element.classList.add('drag-and-drop');

            if(i % 3 === 0){
                element.classList.add('red-box');
                element.dataset.boxNumber = boxNum;
                boxNum++;
                container.appendChild(element);
            }else if(i % 3 === 1){
                element.classList.add('yellow-box');
                element.dataset.boxNumber = boxNum;
                boxNum++;
                container.appendChild(element);
            }else if(i % 3 === 2){
                element.classList.add('blue-box');
                element.dataset.boxNumber = boxNum;
                boxNum++;
                container.appendChild(element);
            }else{
                console.log('This is error.');
            }
        }

        const elements = document.getElementsByClassName('drag-and-drop');
        let redBoxLeft = 0;
        let yellowBoxLeft = 110;
        let blueBoxLeft = 220;

        let BoxTop = 0;

        for(let j = 0; j < elements.length; j++){
            const elm = elements[j];

            if(elm.dataset.boxNumber % 3 === 0){
                elm.style.left = redBoxLeft + 'px';
                elm.style.top = BoxTop + 'px';
                redBoxLeft += 330;
            }else if(elm.dataset.boxNumber % 3 === 1){
                elm.style.left = yellowBoxLeft + 'px';
                elm.style.top = BoxTop + 'px';
                yellowBoxLeft +=330;
            }else if(elm.dataset.boxNumber % 3 === 2){
                elm.style.left = blueBoxLeft + 'px';
                elm.style.top = BoxTop + 'px';
                blueBoxLeft +=330;
            }

            if(elm.dataset.boxNumber % 9 === 8){
                redBoxLeft = 0;
                yellowBoxLeft = 110;
                blueBoxLeft = 220;
                BoxTop += 110;
            }
        }
        
    }


    function mdown(e){
        this.classList.add('drag');

        if(z > 1000){
            z = 10;
        }else{
            this.style.zIndex = z++;
        }

        if(e.type === 'mousedown'){
            const event = e;
        }else{
            const event = e.changedTouches[0];
        }

        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        document.body.addEventListener('mousemove', mmove, false);
        document.body.addEventListener('touchmove', mmove, false);
    }

    function mmove(e){
        const drag = document.getElementsByClassName('drag')[0];

        if(e.type === 'mousemove'){
            const event = e;
        }else{
            const event = e.changedTouches[0];
        }

        event.preventDefault();

        drag.style.left = event.pageX - x + 'px';
        drag.style.top = event.pageY - y + 'px';

        drag.addEventListener('mouseup', mup, false);
        drag.addEventListener('touchend', mup, false);
        document.body.addEventListener('mouseleave', mup, false);
        document.body.addEventListener('touchleave', mup, false);
    }

    function mup(e){
        const drag = document.getElementsByClassName('drag')[0];

        document.body.removeEventListener('mousemove', mmove, false);
        document.body.removeEventListener('touchmove', mmove, false);
        drag.removeEventListener('mouseup', mup, false);
        drag.removeEventListener('touchend', mup, false);

        drag.classList.remove('drag');

    }

})();

