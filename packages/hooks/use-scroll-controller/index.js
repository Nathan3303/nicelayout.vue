import { ref } from "vue";

const useScrollController = () => {
    const e = ref(null);
    const freeMode = ref(false);
    const onStart = ref(false);
    const onEnd = ref(false);

    /**
     * Set target element
     * @param {HTMLElement} element The target element
     */
    const setTarget = (element) => (e.value = element);

    /**
     * Move to
     * @param {number} scrollLeft scroll left
     */
    function moveTo(scrollLeft, offset = -0.3, isFree = false) {
        if (!e.value) return;
        const { clientWidth } = e.value;
        offset = Math.floor(offset * clientWidth);
        e.value.scrollLeft = scrollLeft + offset;
        checkScrollIsEnded(scrollLeft);
        freeMode.value = isFree;
    }

    /**
     * Move to the right
     */
    function moveLeft(moveRatio = 0.5) {
        if (!e.value || onStart.value) return;
        const { scrollLeft, clientWidth } = e.value;
        const newScrollLeft = scrollLeft - parseInt(clientWidth * moveRatio);
        moveTo(newScrollLeft, 0, true);
    }

    /**
     * Move to the right
     */
    function moveRight(moveRatio = 0.5) {
        if (!e.value || onEnd.value) return;
        const { scrollLeft, clientWidth } = e.value;
        const newScrollLeft = scrollLeft + parseInt(clientWidth * moveRatio);
        moveTo(newScrollLeft, 0, true);
    }

    /**
     * Check is end or not
     * @param {number} scrollLeft scroll left
     * @return {boolean}
     */
    function checkScrollIsEnded(scrollLeft) {
        const { clientWidth, scrollWidth } = e.value;
        onEnd.value = clientWidth + scrollLeft >= scrollWidth;
        onStart.value = scrollLeft <= 0;
        // console.log(onStart.value, onEnd.value);
    }

    /**
     * Return
     */
    return { freeMode, onStart, onEnd, setTarget, moveTo, moveLeft, moveRight };
};

export { useScrollController };
