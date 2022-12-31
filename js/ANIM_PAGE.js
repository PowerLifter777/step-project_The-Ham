export const ANIM_PAGE = () => {

    let animItems = document.querySelectorAll('._anim-items');

    if (!!animItems.length) {
        window.addEventListener('scroll', animOnScroll);

        function animOnScroll() {
            animItems.forEach(item => {
                const animItem = item;
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 3;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) animItemPoint = window.innerHeight - window.innerHeight / animStart;

                if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight / 1.3)) {
                    animItem.classList.add('_active');
                } else if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            })
        }

        function offset(el) {
            const rect = el.getBoundingClientRect();
            const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            }
        }

        setTimeout(() => animOnScroll(), 300);
    }
}