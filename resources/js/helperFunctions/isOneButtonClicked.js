function isOneButtonClicked(values) {
    return values.filter(value => value.isClicked).length == 0;
}

export default isOneButtonClicked;
