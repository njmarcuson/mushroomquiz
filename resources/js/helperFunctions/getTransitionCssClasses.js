function getTransitionCssClasses(translateX = false) {
    return {
        appear: 'opacity-0 transition-opacity duration-300',
        appearActive: 'transition-opacity duration-300 opacity-100',
        enter: `opacity-0 ${translateX && '-translate-x-full'}`,
        enterActive: 'transition-opacity duration-300 opacity-100',
        exitActive: `transition-opacity duration-100 opacity-0`,
    };
}

export default getTransitionCssClasses;
