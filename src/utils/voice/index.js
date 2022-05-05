const synth = window.speechSynthesis;

/**
 * This simple class should be used for simple voice synthesizing cases.
 * It is designed to be easy to use and use built in synthesizing functionality,
 * it also can be improved in future use special APIs with improved voices.
 */
export default class Voice {
    speak(text) {
        if (synth.speaking) {
            console.error('speechSynthesis.speaking');
            return;
        }
        if (text !== '') {
            const utterThis = new SpeechSynthesisUtterance(text);
            // utterThis.onend = function (event) {
            //     console.log('SpeechSynthesisUtterance.onend');
            // }
            utterThis.onerror = function (event) {
                console.error('SpeechSynthesisUtterance.onerror: ', event);
            }
            utterThis.pitch = 0.4;
            utterThis.rate = 1.2;
            synth.speak(utterThis);
        }
    }
    
    stopSpeaking() {
        if(synth.speaking) synth.cancel();
    }
}