function getButtonEmoji(valueName) {
    let emoji = null;
    if (valueName == 'Psychedelic') {
        emoji = '😵‍💫';
    } else if (valueName == 'Poisonous') {
        emoji = '☠️';
    } else if (valueName == 'Inedible') {
        emoji = '🤢';
    } else if (valueName == 'Edible') {
        emoji = '🤤';
    } else if (valueName == 'Easy') {
        emoji = '😎';
    } else if (valueName == 'Medium') {
        emoji = '😐';
    } else if (valueName == 'Hard') {
        emoji = '😣';
    } else if (valueName == 'Europe') {
        emoji = '🇪🇺';
    } else if (valueName == 'North America') {
        emoji = '⬆️';
    } else if (valueName == 'South America') {
        emoji = '⬇️';
    } else if (valueName == 'Africa') {
        emoji = '🌍';
    } else if (valueName == 'Oceania') {
        emoji = '🐨';
    } else if (valueName == 'Asia') {
        emoji = '🌏';
    }
    return emoji;
}

export default getButtonEmoji;
