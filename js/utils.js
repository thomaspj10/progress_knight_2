import { gameData } from "./main.js";

/**
 * 
 * @param {number} number 
 * @param {number} decimals 
 * @returns {string}
 */
export function format(number, decimals = 1) {
    const units = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "O", "N", "D", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Od", "Nd", "V", "Uv", "Dv", "Tv",
    "Qav", "Qiv", "Sxv", "Spv", "Ov", "Nv", "Tr", "Ut", "Dt", "Tt"]

    // what tier? (determines SI symbol)
    const tier = Math.log10(number) / 3 | 0;
    if (tier == 0) return number.toFixed(decimals);

    if ((gameData.settings.numberNotation == 0 || tier < 3) && (tier < units.length)) {
        // get suffix and determine scale
        const suffix = units[tier];
        const scale = Math.pow(10, tier * 3);
        // scale the number
        const scaled = number / scale;
        // format number and add suffix
        return scaled.toFixed(decimals) + suffix;
    } else {
        if (gameData.settings.numberNotation == 1)
            return number.toExponential(decimals).replace("e+", "e")
        else
            return math.format(number, { notation: 'engineering', precision: 3 }).replace("e+", "e")
    }
}

/**
 * 
 * @param {number} coins 
 * @param {HTMLElement} element 
 */
export function formatCoins(coins, element) {
    const platina = Math.floor(coins / 1e6)
    const gold = Math.floor((coins - platina * 1e6) / 1e4)
    const silver = Math.floor((coins - platina * 1e6 - gold * 1e4) / 100)
    const copper = Math.floor(coins - platina * 1e6 - gold * 1e4 - silver * 100)

    const money = {
        "p": { "color": "#79b9c7", "showbefore": null, "value": platina },
        "g": { "color": "#E5C100", "showbefore": 1e8, "value": gold },
        "s": { "color": "#a8a8a8", "showbefore": 1e6, "value": silver },
        "c": { "color": "#a15c2f", "showbefore": 1e4, "value": copper },
    }

    let i = 0
    for (const key in money) {
        if ((money[key].showbefore == null || coins < money[key].showbefore) && (money[key].value > 0)) {
            element.children[i].textContent = format(money[key].value, money[key].value < 1000000? 0: 1) + key
            element.children[i].style.color = money[key].color
        }
        else {
            element.children[i].textContent = ""            
        }
        i++
    }    
}

/**
 * 
 * @param {number} sec_num 
 * @param {boolean} show_ms 
 * @returns string
 */
export function formatTime(sec_num, show_ms = false) {
    if (sec_num == null) {
        return "unknown"
    }

    let hours = Math.floor(sec_num / 3600)
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
    let seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60))
    let ms = Math.floor((sec_num - Math.floor(sec_num)) * 1000)
    let mss = (show_ms ? "." + ms.toString().padStart(3, "0") : "")

    if (hours < 10) hours = "0" + hours
    if (minutes < 10) minutes = "0" + minutes
    if (seconds < 10) seconds = "0" + seconds
    return hours + ':' + minutes + ':' + seconds + mss   
}

/**
 * 
 * @param {number} days 
 * @returns {string}
 */
export function formatAge(days) {
    const years = daysToYears(days)
    const day = getCurrentDay(days)
    if (years > 10000)    
        return "Age " + format(years)    
    else
        return "Age " + years + " Day " + day
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns {number}
 */
export function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

/**
 * 
 * @param {number} years 
 * @returns {number}
 */
export function yearsToDays(years) {
    return years * 365
}

/**
 * 
 * @param {number} days 
 * @returns {number}
 */
export function daysToYears(days) {
    return Math.floor(days / 365)
}

/**
 * 
 * @param {number} days 
 * @returns {number}
 */
export function getCurrentDay(days) {
    return Math.floor(days - daysToYears(days) * 365)
}

/**
 * 
 * @param {string} className 
 * @returns {HTMLCollectionOf<Element>}
 */
export function getElementsByClass(className) {
    return document.getElementsByClassName(removeSpaces(className))
}

/**
 * 
 * @param {string} string 
 * @returns {string}
 */
export function removeSpaces(string) {
    return string.replace(/ /g, "")
}

/**
 * 
 * @param {number} value 
 * @param {Array<() => number>} multipliers 
 * @returns 
 */
export function applyMultipliers(value, multipliers) {
    var finalMultiplier = 1
    multipliers.forEach((multiplierFunction) => {
        finalMultiplier *= multiplierFunction()
    })
    return value * finalMultiplier
}