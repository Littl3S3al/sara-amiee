const timestamp = document.querySelector('.timestamp p');
const state = document.querySelector('.state p');
const content = document.querySelector('.content');
const hiddenContent = document.querySelector('.hidden-content');
const loader = document.querySelector('.loader');

let sequence = 1;
let isPaused = true;
let time = 0;

// array of images
let media = [
    'bw-dump.jpg',
    'carnival.jpg',
    'casbah.jpg',
    'choc-99.jpg',
    'daggafontein.jpg',
    'dump.jpg',
    'dump-v.jpg',
    'dump-vi.jpg',
    'headgear.jpg',
    'IMG_3055.jpg',
    'postcard.jpg',
    'screenshot-1.jpg',
    'screenshot-2.jpg',
    'screenshot-3.jpg',
    'windmill.jpg'
]; 


// identify image or video
const identifyScr = (selection) => {
    let type = selection.substring(selection.length - 4);
    if(type === 'jpeg' || type === '.png' || type === '.jpg'){
        return 'image';
    } else if (type === '.mp4'){
        return 'video';
    }
}





// get image randomly from array
const getImage = (array) => {
    let choice;
    choice  = Math.floor(Math.random() * array.length)
    let selection = array[choice];
    media.splice(choice, 1);

    return selection;
};





// timer
const playing = setInterval(() => {
    if(!isPaused){
        time ++;
        timestamp.innerText = time + ' seconds';
        state.innerText = 'STATE: playing';

        // at a random time get the random image
        if(time === sequence){
            let value = 1;
            sequence += value;
            sequence ++;
            let result = getImage(media);
            let type = identifyScr(result);
            
            if(type === 'video'){
                content.innerHTML = `
                    <video autoplay>
                        <source src="assets/${result}" type="video/mp4">
                    </video>
                `;
            } else {
                content.innerHTML = `
                    <img src="assets/${result}" alt="slide show image">
                `;
            }
        }
    };
 
    // stop loop after 1 minute or if array ends
    if(time === 60 || !media.length) {
        clearInterval(playing);
        state.innerText = 'state: finished';
    }
}, 1000)


// on load function to bring in all media and then remove loader once finished
const load = () => {

    media.forEach((item) => {
        hiddenContent.innerHTML += `
            <img src="assets/${item}" alt="slide show image">
        `;
    })

    window.addEventListener('load', () => {
        console.log('test');
        loader.style.opacity = 0;
        isPaused = false;
    })
}

load()

// mouse down and up functionality
window.addEventListener('mousedown' , () => {
    isPaused = true;
    state.innerText = 'state: paused';
    setTimeout(() => {
        isPaused = false;
    }, 3000)
});

window.addEventListener('mouseup' , () => {
    isPaused = false;
})