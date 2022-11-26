import { 
    jobBaseData, 
    skillBaseData, 
    itemBaseData, 
    milestoneBaseData, 
    jobCategories, 
    skillCategories, 
    itemCategories, 
    milestoneCategories
} from "./mod.js"
import {
    Skill,
    Job,
    Item,
    Milestone,
    EvilRequirement,
    EssenceRequirement,
    AgeRequirement,
    CoinRequirement,
    TaskRequirement
} from "./classes.js"
import * as utils from "./utils.js"
import * as ui from "./ui.js"

export var gameData = {
    taskData: {},
    itemData: {},
    milestoneData: {},

    coins: 0,
    days: 365 * 14,
    evil: 0,
    essence: 0,
    paused: false,
    timeWarpingEnabled: true,

    rebirthOneCount: 0,
    rebirthTwoCount: 0,
    rebirthThreeCount: 0,

    currentJob: null,
    currentProperty: null,
    currentMisc: null,

    settings: {
        stickySidebar: true,
        darkTheme: true,
        numberNotation: 0,
        layout: 1,
        fontSize: 3,
        selectedTab: 'jobs'
    },
    stats: {
        startDate: new Date(),
        fastest1: null,
        fastest2: null,
        fastest3: null,
        fastestGame: null,

    },

    realtime: 0.0,
    realtimeRun: 0.0,
    completedTimes: 0,    
}

var tempData = {}

export var autoBuyEnabled = true

const updateSpeed = 20
const baseLifespan = 365 * 70
const baseGameSpeed = 4
const heroIncomeMult = 2500000000000000000

function getPreviousTaskInCategory(task)
{
    var prev = ""
    for (const category in jobCategories) {
        for (const job of jobCategories[category]) {
            if (job == task)
                return prev
            prev = job
        }        
    }

    prev = ""
    for (const category in skillCategories) {
        for (const skill of skillCategories[category]) {
            if (skill == task)
                return prev
            prev = skill
        }
    }
    return prev
}
  
function getBindedTaskEffect(taskName) {
    const task = gameData.taskData[taskName]
    return task.getEffect.bind(task)
}

function getBindedItemEffect(itemName) {
    const item = gameData.itemData[itemName]
    return item.getEffect.bind(item)
}

function addMultipliers() {
    for (const taskName in gameData.taskData) {
        const task = gameData.taskData[taskName]

        task.xpMultipliers = []
        if (task instanceof Job) task.incomeMultipliers = []

        task.xpMultipliers.push(task.getMaxLevelMultiplier.bind(task))
        task.xpMultipliers.push(getHappiness)
        task.xpMultipliers.push(getBindedTaskEffect("Dark Influence"))
        task.xpMultipliers.push(getBindedTaskEffect("Demon Training"))
		task.xpMultipliers.push(getBindedTaskEffect("Void Influence"))
		task.xpMultipliers.push(getBindedTaskEffect("Parallel Universe"))

        if (task instanceof Job) {
            task.incomeMultipliers.push(task.getLevelMultiplier.bind(task))
            task.incomeMultipliers.push(getBindedTaskEffect("Demon's Wealth"))
            task.xpMultipliers.push(getBindedTaskEffect("Productivity"))
			task.xpMultipliers.push(getBindedTaskEffect("Dark Knowledge"))
            task.xpMultipliers.push(getBindedItemEffect("Personal Squire"))
        } else if (task instanceof Skill) {
            task.xpMultipliers.push(getBindedTaskEffect("Concentration"))
            task.xpMultipliers.push(getBindedItemEffect("Book"))
            task.xpMultipliers.push(getBindedItemEffect("Study Desk"))
            task.xpMultipliers.push(getBindedItemEffect("Library"))
			task.xpMultipliers.push(getBindedItemEffect("Void Blade"))
			task.xpMultipliers.push(getBindedTaskEffect("Void Symbiosis"))
			task.xpMultipliers.push(getBindedItemEffect("Universe Fragment"))
			task.xpMultipliers.push(getBindedTaskEffect("Evil Incarnate"))
        }

        if (jobCategories["Military"].includes(task.name)) {
            task.incomeMultipliers.push(getBindedTaskEffect("Strength"))
            task.xpMultipliers.push(getBindedTaskEffect("Battle Tactics"))
            task.xpMultipliers.push(getBindedItemEffect("Steel Longsword"))
        } else if (task.name == "Strength") {
            task.xpMultipliers.push(getBindedTaskEffect("Muscle Memory"))
            task.xpMultipliers.push(getBindedItemEffect("Dumbbells"))
        } else if (skillCategories["Magic"].includes(task.name)) {
            task.xpMultipliers.push(getBindedItemEffect("Sapphire Charm"))
			task.xpMultipliers.push(getBindedItemEffect("Observatory"))
	    } else if (skillCategories["Void Manipulation"].includes(task.name)) {
            task.xpMultipliers.push(getBindedItemEffect("Void Necklace"))
			task.xpMultipliers.push(getBindedItemEffect("Void Orb"))
        } else if (jobCategories["The Arcane Association"].includes(task.name)) {
            task.xpMultipliers.push(getBindedTaskEffect("Mana Control"))
			task.incomeMultipliers.push(getBindedTaskEffect("All Seeing Eye"))	
	    } else if (jobCategories["The Void"].includes(task.name)) {
            task.xpMultipliers.push(getBindedTaskEffect("Void Amplification"))
			task.xpMultipliers.push(getBindedItemEffect("Void Armor"))
			task.xpMultipliers.push(getBindedItemEffect("Void Dust"))
		} else if (jobCategories["Galactic Council"].includes(task.name)) {
			task.xpMultipliers.push(getBindedItemEffect("Celestial Robe"))
			task.xpMultipliers.push(getBindedTaskEffect("Epiphany"))
        } else if (skillCategories["Dark Magic"].includes(task.name)) {
            task.xpMultipliers.push(getEvil)
        } else if (skillCategories["Almightiness"].includes(task.name)) {
			task.xpMultipliers.push(getEssence)
        } else if (skillCategories["Fundamentals"].includes(task.name)) {
			task.xpMultipliers.push(getBindedItemEffect("Mind's Eye"))
		}	
    }

    for (const itemName in gameData.itemData) {
        const item = gameData.itemData[itemName]
        item.expenseMultipliers = []
        item.expenseMultipliers.push(getBindedTaskEffect("Bargaining"))
        item.expenseMultipliers.push(getBindedTaskEffect("Intimidation"))
		item.expenseMultipliers.push(getBindedTaskEffect("Brainwashing"))
		item.expenseMultipliers.push(getBindedTaskEffect("Abyss Manipulation"))
		item.expenseMultipliers.push(getBindedTaskEffect("Galactic Command"))
    }
}

function getHeroXpGainMultipliers(job)
{
    var baseMult = 1

    if (job instanceof Job)
        baseMult = 50000

    if (gameData.requirements["Rise of Great Heroes"].isCompleted())
        baseMult *= 10000

    if (gameData.requirements["Lazy Heroes"].isCompleted())
        baseMult *= 1e12

    if (gameData.requirements["Dirty Heroes"].isCompleted())
        baseMult *= 1e15

    if (gameData.requirements["Angry Heroes"].isCompleted())
        baseMult *= 1e15

    if (gameData.requirements["Tired Heroes"].isCompleted())
        baseMult *= 1e15

    if (gameData.requirements["Scared Heroes"].isCompleted())
        baseMult *= 1e15

    if (gameData.requirements["Good Heroes"].isCompleted())
        baseMult *= 1e15

    if (gameData.requirements["Funny Heroes"].isCompleted())
        baseMult *= 1e25

    if (gameData.requirements["Beautiful Heroes"].isCompleted())
        baseMult *= 1e50

    if (gameData.requirements["Awesome Heroes"].isCompleted())
        baseMult *= 1e10

    if (gameData.requirements["Furious Heroes"].isCompleted()) {
        if (job instanceof Job)
            baseMult *= 1000000
        baseMult *= 1e12
    }

    if (gameData.requirements["Superb Heroes"].isCompleted())
        baseMult *= 1e3

    return baseMult
}


function setCustomEffects() {
    const bargaining = gameData.taskData["Bargaining"]
    bargaining.getEffect = function () {
        const multiplier = 1 - utils.getBaseLog(bargaining.isHero? 3 : 7, bargaining.level + 1) / 10
        if (multiplier < 0.1) return 0.1
        return multiplier
    }

    const intimidation = gameData.taskData["Intimidation"]
    intimidation.getEffect = function () {
        const multiplier = 1 - utils.getBaseLog(intimidation.isHero ? 3 : 7, intimidation.level + 1) / 10
        if (multiplier < 0.1) return 0.1
        return multiplier
    }
	
	const brainwashing = gameData.taskData["Brainwashing"]
    brainwashing.getEffect = function () {
        const multiplier = 1 - utils.getBaseLog(brainwashing.isHero ? 3 : 7, brainwashing.level + 1) / 10
        if (multiplier < 0.1) return 0.1
        return multiplier
    }
	
	const abyssManipulation = gameData.taskData["Abyss Manipulation"]
    abyssManipulation.getEffect = function () {
        const multiplier = 1 - utils.getBaseLog(abyssManipulation.isHero ? 3 : 7, abyssManipulation.level + 1) / 10
        if (multiplier < 0.1) return 0.1
        return multiplier
    }

    const galacticCommand = gameData.taskData["Galactic Command"]
    galacticCommand.getEffect = function () {
        const multiplier = 1 - utils.getBaseLog(galacticCommand.isHero ? 3 : 7, galacticCommand.level + 1) / 10
        if (multiplier < 0.1) return 0.1
        return multiplier
    }

    const timeWarping = gameData.taskData["Time Warping"]
    timeWarping.getEffect = function() {
        return 1 + utils.getBaseLog(timeWarping.isHero ? 1.005 : 13, timeWarping.level + 1)
    }

    const immortality = gameData.taskData["Life Essence"]
    immortality.getEffect = function () {
        return 1 + utils.getBaseLog(immortality.isHero? 1.01 : 33, immortality.level + 1) 
    }
	
	const unholyRecall = gameData.taskData["Cosmic Recollection"];
    unholyRecall.getEffect = function() {
        return unholyRecall.level * (unholyRecall.isHero ? 0.065 : 0.00065);
    }

    const transcendentMaster = gameData.milestoneData["Transcendent Master"]
    transcendentMaster.getEffect = function () {
        if (gameData.requirements["Transcendent Master"].isCompleted()) 
            return 1.5

        return 1
    }

    const faintHope = gameData.milestoneData["Faint Hope"]
    faintHope.getEffect = function () {
        var mult = 1
        if (gameData.requirements["Faint Hope"].isCompleted()) 
            mult = 1 + (gameData.realtime * getCompletedGameSpeedBoost()) / 600    

        return mult
    }

    const riseOfGreatHeroes = gameData.milestoneData["Rise of Great Heroes"]
    riseOfGreatHeroes.getEffect = function () {
        var mult = 1
        if (gameData.requirements["Rise of Great Heroes"].isCompleted()) {
            var countHeroes = 0
            for (const taskName in gameData.taskData) {
                if (gameData.taskData[taskName].isHero)
                    countHeroes++
            }
            mult = 1 + 6 * countHeroes / 74
        }

        return mult
    }
}

export function getHappiness() {
    const meditationEffect = getBindedTaskEffect("Meditation")
    const butlerEffect = getBindedItemEffect("Butler")
	const mindseizeEffect = getBindedTaskEffect("Mind Seize")
    const multiverseFragment = getBindedItemEffect("Multiverse Fragment")
    const godsBlessings = gameData.requirements["God's Blessings"].isCompleted() ? 10000000 : 1
    return godsBlessings * meditationEffect() * butlerEffect() / mindseizeEffect() * multiverseFragment() * gameData.currentProperty.getEffect()
}

function getEvil() {
    return gameData.evil
}

function getEssence() {
    return gameData.essence
}

export function applySpeed(value) {
    if (value == 0)
        return 0
    return value * getGameSpeed() / updateSpeed
}

export function getEvilGain() {
    const evilControl = gameData.taskData["Evil Control"]
    const bloodMeditation = gameData.taskData["Blood Meditation"]
	const absoluteWish = gameData.taskData ["Absolute Wish"]
	const oblivionEmbodiment = gameData.taskData ["Void Embodiment"]
    const yingYang = gameData.taskData["Yin Yang"]
    const inferno = gameData.requirements["Inferno"].isCompleted() ? 5 : 1
    return evilControl.getEffect() * bloodMeditation.getEffect() * absoluteWish.getEffect() 
        * oblivionEmbodiment.getEffect() * yingYang.getEffect() * inferno
}

export function getEssenceGain() {
    const essenceControl = gameData.taskData["Yin Yang"]
    const essenceCollector = gameData.taskData["Essence Collector"]
    const transcendentMaster = gameData.milestoneData["Transcendent Master"]
    const faintHope = gameData.milestoneData["Faint Hope"]
    const rise = gameData.milestoneData["Rise of Great Heroes"]

    return essenceControl.getEffect() * essenceCollector.getEffect() * transcendentMaster.getEffect()
        * faintHope.getEffect() * rise.getEffect()
}

export function getCompletedGameSpeedBoost() {
    return Math.pow(2, gameData.completedTimes)
}

function getGameSpeed() {
    const timeWarping = gameData.taskData["Time Warping"]
	const temporalDimension = gameData.taskData["Temporal Dimension"]
    const timeLoop = gameData.taskData["Time Loop"]
    const warpDrive = (gameData.requirements["Eternal Time"].isCompleted()) ? 2 : 1
    const timeWarpingSpeed = timeWarping.getEffect() * temporalDimension.getEffect() * timeLoop.getEffect() * warpDrive
    return baseGameSpeed * +!gameData.paused * +isAlive() * timeWarpingSpeed * getCompletedGameSpeedBoost()
}

function applyExpenses() {
    if (gameData.coins == Infinity)
        return

    gameData.coins -= applySpeed(getExpense())

    if (gameData.coins < 0)
        goBankrupt()
}

function goBankrupt() {
    gameData.coins = 0
    gameData.currentProperty = gameData.itemData["Homeless"]
    gameData.currentMisc = []
    autoBuyEnabled = true
}

async function downloadFile() {
    const response = await fetch("./changelog.txt");

    if (response.status != 200) {
        throw new Error("Server Error");
    }

    // read response stream as text
    return await response.text();
}

document.querySelector("#changelogTabTabButton").addEventListener('click', async function () {
    try {
        let text_data = await downloadFile();
        document.querySelector("#changelog").textContent = text_data;
    }
    catch (e) {
        alert(e.message);
    }
});

function togglePause() {
    gameData.paused = !gameData.paused
}

function forceAutobuy() {
    autoBuyEnabled = true
}

function setCurrentProperty(propertyName) {
    autoBuyEnabled = false
    gameData.currentProperty = gameData.itemData[propertyName]
}

function setMisc(miscName) {
    autoBuyEnabled = false
    const misc = gameData.itemData[miscName]
    if (gameData.currentMisc.includes(misc)) {
        for (i = 0; i < gameData.currentMisc.length; i++) {
            if (gameData.currentMisc[i] == misc) {
                gameData.currentMisc.splice(i, 1)
            }
        }
    } else {
        gameData.currentMisc.push(misc)
    }
}

function createGameObjects(data, baseData) {
    for (const key in baseData)
        createGameObject(data, baseData[key])
}

function createGameObject(data, entity) {
    if ("income" in entity) { data[entity.name] = new Job(entity) }
    else if ("maxXp" in entity) { data[entity.name] = new Skill(entity) }
    else if ("tier" in entity) { data[entity.name] = new Milestone(entity) }    
    else {data[entity.name] = new Item(entity)}
    data[entity.name].id = "row " + entity.name
}

export function setNotation(index) {
    gameData.settings.numberNotation = index
    ui.selectElementInGroup("Notation", index)
}

export function getNet() {
    return Math.abs(getIncome() - getExpense())
}

export function getIncome() {
    return gameData.currentJob.getIncome()
}

export function getExpense() {
    var expense = 0
    expense += gameData.currentProperty.getExpense()
    for (const misc of gameData.currentMisc) {
        expense += misc.getExpense()
    }
    return expense
}

function performTask(task) {
    task.increaseXp()
    if (task instanceof Job && task == gameData.currentJob) {
        increaseCoins()
    }
}

function increaseCoins() {
    gameData.coins += applySpeed(getIncome())
}

function autoPromote() {
    let maxIncome = 0;
    for (const key in gameData.taskData) {
        const task = gameData.taskData[key]
        if (task instanceof Job && gameData.requirements[key].completed) {
            const income = task.getIncome();
            if (income > maxIncome) {
                maxIncome = income
                gameData.currentJob = task
            }
        }
    }
}

function autoBuy() {
    if (!autoBuyEnabled) return

    let usedExpense = 0
    const income = getIncome()

    for (const key in gameData.itemData) {
        if (gameData.requirements[key].completed) {
            const item = gameData.itemData[key]
            const expense = item.getExpense()

            if (itemCategories['Properties'].indexOf(key) != -1) {
                if (expense < income) {
                    gameData.currentProperty = item
                    usedExpense = expense
                }
            }
        }
    }

    for (const key in gameData.currentMisc) {
        usedExpense += gameData.currentMisc[key].getExpense()
    }

    for (const key in gameData.itemData) {
        if (gameData.requirements[key].completed) {
            const item = gameData.itemData[key]
            const expense = item.getExpense()
            if (itemCategories['Misc'].indexOf(key) != -1) {
                if (expense < income - usedExpense) {
                    if (gameData.currentMisc.indexOf(item) == -1) {
                        gameData.currentMisc.push(item)
                        usedExpense += expense
                    }
                }
            }
        }
    }
}

function increaseDays() {
    gameData.days += applySpeed(1)
}

function increaseRealtimeCounter() {
    if (!gameData.paused && isAlive()) 
        gameData.realtime += 1.0 / updateSpeed;
    gameData.realtimeRun += 1.0 / updateSpeed;
}

function setLightDarkMode() {
    const body = document.getElementById("body")
    body.classList.contains("dark") ? body.classList.remove("dark") : body.classList.add("dark")
    gameData.settings.darkTheme = body.classList.contains("dark")
}

function rebirthOne() {
    gameData.rebirthOneCount += 1
    if (gameData.stats.fastest1 == null || gameData.realtime < gameData.stats.fastest1)
        gameData.stats.fastest1 = gameData.realtime

    rebirthReset()
}

function rebirthTwo() {
    gameData.rebirthTwoCount += 1
    gameData.evil += getEvilGain()

    if (gameData.stats.fastest2 == null || gameData.realtime < gameData.stats.fastest2)
        gameData.stats.fastest2 = gameData.realtime
	
    rebirthReset()

    for (const taskName in gameData.taskData) {
        const task = gameData.taskData[taskName]
        task.maxLevel = 0
    }    
}

function rebirthThree() {
    gameData.rebirthThreeCount += 1	
	gameData.essence += getEssenceGain()	
    gameData.evil = 0

    if (gameData.stats.fastest3 == null || gameData.realtime < gameData.stats.fastest3)
        gameData.stats.fastest3 = gameData.realtime
	
	const recallEffect = gameData.taskData["Cosmic Recollection"].getEffect();

	for (const taskName in gameData.taskData) {
        const task = gameData.taskData[taskName]
        task.maxLevel = Math.floor(recallEffect * task.level);
    }

    rebirthReset()
}

function applyMilestones() {
    if (((gameData.requirements["Magic Eye"].isCompleted()) && (gameData.requirements["Rebirth note 2"].isCompleted())) ||
        (gameData.requirements["Almighty Eye"].isCompleted())){
        for (const taskName in gameData.taskData) {
            const task = gameData.taskData[taskName]
            if (task.level > task.maxLevel) task.maxLevel = task.level
        }
    }

    if (!gameData.paused) {
        if (gameData.requirements["Deal with the Devil"].isCompleted() && gameData.requirements["Rebirth note 3"].isCompleted()) {
            if (gameData.evil == 0)
                gameData.evil = 1
            if (gameData.evil < getEvilGain())
                gameData.evil *= Math.pow(1.001, 1 + gameData.completedTimes)
        }

        if (gameData.requirements["Hell Portal"].isCompleted()) {
            if (gameData.evil == 0)
                gameData.evil = 1
            if (gameData.evil < getEvilGain())
                gameData.evil *= Math.pow(1.01, 1 + gameData.completedTimes)
        }
    }
}

function rebirthReset() {
    setTab("jobs")

    gameData.coins = 0
    gameData.days = 365 * 14
    gameData.realtime = 0
    gameData.currentJob = gameData.taskData["Beggar"]
    gameData.currentProperty = gameData.itemData["Homeless"]
    gameData.currentMisc = []

    for (const taskName in gameData.taskData) {
        const task = gameData.taskData[taskName]
        if (task.level > task.maxLevel) task.maxLevel = task.level
        task.level = 0
        task.xp = 0
        task.isHero = false
        task.isFinished =false
    }

    for (const itemName in gameData.itemData) {
        var item = gameData.itemData[itemName]        
        item.isHero = false
    }

    for (const key in gameData.requirements) {
        const requirement = gameData.requirements[key]
        if (requirement.completed && permanentUnlocks.includes(key)) continue
        requirement.completed = false
    }
}

export function getLifespan() {
    const immortality = gameData.taskData["Life Essence"]
    const superImmortality = gameData.taskData["Astral Body"]
	const higherDimensions = gameData.taskData["Higher Dimensions"]
	const abyss = gameData.taskData["Ceaseless Abyss"]
    const cosmicLongevity = gameData.taskData["Cosmic Longevity"]
    return baseLifespan * immortality.getEffect() * superImmortality.getEffect() * abyss.getEffect()
        * cosmicLongevity.getEffect() * higherDimensions.getEffect() * getCompletedGameSpeedBoost()
}

function isAlive() {
    const condition = gameData.days < getLifespan() || getLifespan() == Infinity
    const deathText = document.getElementById("deathText")
    if (!condition) {
        gameData.days = getLifespan()
        deathText.classList.remove("hidden")
    }
    else {
        deathText.classList.add("hidden")
    }
    return condition
}

export function isHeroesUnlocked() {
    return gameData.requirements["New Beginning"].isCompleted() && (gameData.taskData["One Above All"].level >= 2000 || gameData.taskData["One Above All"].isHero)
}

function makeHero(task) {
    if ((task instanceof Job || task instanceof Skill) && !task.isHero) {           
        task.level = 0
        task.maxLevel = 0
        task.xp = 0
        task.isHero = true
    }
}

function makeHeroes() {
    if (!isHeroesUnlocked()) return

    for (const taskname in gameData.taskData) {
        const task = gameData.taskData[taskname]

        if (task.isHero)
            continue        

        const prev = getPreviousTaskInCategory(taskname)

        if (prev != "" && (!gameData.taskData[prev].isHero || gameData.taskData[prev].level < 20)) 
                continue

        const req = gameData.requirements[taskname]
        let isNewHero = true

        if (req instanceof TaskRequirement) {
            if (!req.isCompletedActual(true))
                continue
            for (const requirement of req.requirements)
                if (!(gameData.taskData[requirement.task] && gameData.taskData[requirement.task].isHero)) {
                    isNewHero = false
                    break
                }
        }

        if (isNewHero)
            makeHero(task)
    }

    for (const key in gameData.itemData) {
        const item = gameData.itemData[key]
        if (item.isHero)
            continue
        item.isHero = true
        gameData.currentProperty = gameData.itemData["Homeless"]
        gameData.currentMisc = []
    }    
}


function convertSaveDataToGameObjects() {
    for (const key in gameData.taskData) {
        let task = gameData.taskData[key]
        if (task.baseData.income) {
            task.baseData = jobBaseData[task.name]
            task = Object.assign(new Job(jobBaseData[task.name]), task)
            
        } else {
            task.baseData = skillBaseData[task.name]
            task = Object.assign(new Skill(skillBaseData[task.name]), task)
        } 
        gameData.taskData[key] = task
    }

    for (const key in gameData.itemData) {
        let item = gameData.itemData[key]
        item.baseData = itemBaseData[item.name]
        item = Object.assign(new Item(itemBaseData[item.name]), item)
        gameData.itemData[key] = item
    }

    for (const key in gameData.requirements) {
        let requirement = gameData.requirements[key]
        if (requirement.type == "task") {
            requirement = Object.assign(new TaskRequirement(requirement.elements, requirement.requirements), requirement)
        } else if (requirement.type == "coins") {
            requirement = Object.assign(new CoinRequirement(requirement.elements, requirement.requirements), requirement)
        } else if (requirement.type == "age") {
            requirement = Object.assign(new AgeRequirement(requirement.elements, requirement.requirements), requirement)
        } else if (requirement.type == "evil") {
            requirement = Object.assign(new EvilRequirement(requirement.elements, requirement.requirements), requirement)
        } else if (requirement.type == "essence") {
            requirement = Object.assign(new EssenceRequirement(requirement.elements, requirement.requirements), requirement)
        }

        const tempRequirement = tempData["requirements"][key]
        requirement.elements = tempRequirement.elements
        requirement.requirements = tempRequirement.requirements
        gameData.requirements[key] = requirement
    }

    gameData.currentJob = gameData.taskData[gameData.currentJob.name]
    gameData.currentProperty = gameData.itemData[gameData.currentProperty.name]
    const newArray = []
    for (const misc of gameData.currentMisc) {
        newArray.push(gameData.itemData[misc.name])
    }
    gameData.currentMisc = newArray
}

function replaceSaveDict(dict, saveDict) {
    for (const key in dict) {
        if (!(key in saveDict)) {
            saveDict[key] = dict[key]
        } else if (dict == gameData.requirements) {
            if (saveDict[key].type != tempData["requirements"][key].type) {
                saveDict[key] = tempData["requirements"][key]
            }
        }
    }

    for (const key in saveDict) {
        if (!(key in dict)) {
            delete saveDict[key]
        }
    }
}

function saveGameData() {
    localStorage.setItem("gameDataSave", JSON.stringify(gameData))
}

function loadGameData() {
    try {
        const gameDataSave = JSON.parse(localStorage.getItem("gameDataSave"))

        if (gameDataSave !== null) {
            replaceSaveDict(gameData, gameDataSave)
            replaceSaveDict(gameData.requirements, gameDataSave.requirements)
            replaceSaveDict(gameData.taskData, gameDataSave.taskData)
            replaceSaveDict(gameData.itemData, gameDataSave.itemData)
            replaceSaveDict(gameData.settings, gameDataSave.settings)
            replaceSaveDict(gameData.stats, gameDataSave.stats)
            gameData = gameDataSave

            if (gameData.coins == null)
                gameData.coins = 0

            if (gameData.essence == null)
                gameData.essence = 0

            if (gameData.days == null)
                gameData.days = 365 * 14

            if (gameData.evil == null)
                gameData.evil = 0
        }
    } catch (error) {
        console.error(error)
    }

    convertSaveDataToGameObjects()
}

// TODO Not used currently. I assume we want to use this to update the game when the tab is focussed
function addMinutes(count = 1) {
    for (let i = 0; i < count * 60 * updateSpeed; i++) {
        update(false)
        if (i % 60 * updateSpeed == 0)
            ui.updateUI()
    }
}

function update(needUpdateUI = true) {
    makeHeroes()
    increaseRealtimeCounter()
    increaseDays()
    autoPromote()
    autoBuy()  
    applyExpenses()
    for (const key in gameData.taskData) {
        const task = gameData.taskData[key]
        if ((task instanceof Skill || task instanceof Job) && gameData.requirements[key].completed) {
            performTask(task)
        }
    }
    
    applyMilestones()    
    if (needUpdateUI)
        ui.updateUI()
}

function restartGame() {
    gameData.paused = true
    clearInterval(saveloop)
    clearInterval(gameloop)

    if (gameData.stats.fastestGame == null || gameData.realtimeRun < gameData.stats.fastestGame)
        gameData.stats.fastestGame = gameData.realtimeRun

    gameData.currentJob = gameData.taskData["Beggar"]
    gameData.currentProperty = gameData.itemData["Homeless"]
    gameData.currentMisc = []

    gameData.itemData = {}
    gameData.taskData = {}
    gameData.milestoneData = {}
    gameData.requirements = {}
    gameData.coins = 0
    gameData.days = 365 * 14
    gameData.evil = 0
    gameData.essence = 0
    gameData.paused = false
    gameData.timeWarpingEnabled = true
    gameData.realtime = 0
    gameData.realtimeRun = 0
    gameData.settings.selectedTab = 'jobs'

    gameData.completedTimes += 1
    saveGameData()
    location.reload()
}

function resetGameData() {
    clearInterval(saveloop)
    clearInterval(gameloop)
    if (!confirm('Are you sure you want to reset the game?')) {
        gameloop = setInterval(update, 1000 / updateSpeed)
        saveloop = setInterval(saveGameData, 3000)
        return
    }
    localStorage.clear()
    location.reload()
}

function importGameData() {
    const importExportBox = document.getElementById("importExportBox")
    const data = JSON.parse(window.atob(importExportBox.value))
    clearInterval(gameloop)
    gameData = data
    saveGameData()
    location.reload()
}

function exportGameData() {
    const importExportBox = document.getElementById("importExportBox")
    importExportBox.value = window.btoa(JSON.stringify(gameData))
    copyTextToClipboard(importExportBox.value)
}

function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const tooltip = document.getElementById("exportTooltip");
        tooltip.innerHTML = "&nbsp;&nbsp;Save copied to clipboard!" ;
    }, err => {
        //console.error('Async: Could not copy text: ', err);
    })
}

function outExportButton() {
    const tooltip = document.getElementById("exportTooltip");
    tooltip.innerHTML = "";
}

function onFontButtonHover() {
    const tooltip = document.getElementById("fontSizeTooltip");
    tooltip.classList.remove("hidden")
}

function onFontButtonStopHover() {
    const tooltip = document.getElementById("fontSizeTooltip");
    tooltip.classList.add("hidden")
}

export function isNextMilestoneInReach() {
    const totalEssence = gameData.essence + getEssenceGain()

    for (const key in gameData.milestoneData) {
        const requirementObject = gameData.requirements[key]

        if (requirementObject instanceof EssenceRequirement) {
            if (!requirementObject.isCompleted()) {
                if (totalEssence > requirementObject.requirements[0].requirement)
                    return true
            }
        }
    }
    return false
}


//Init
createGameObjects(gameData.taskData, jobBaseData)
createGameObjects(gameData.taskData, skillBaseData)
createGameObjects(gameData.itemData, itemBaseData)
createGameObjects(gameData.milestoneData, milestoneBaseData)

gameData.currentJob = gameData.taskData["Beggar"]
gameData.currentProperty = gameData.itemData["Homeless"]
gameData.currentMisc = []

ui.createAllRows(jobCategories, "jobTable")
ui.createAllRows(skillCategories, "skillTable")
ui.createAllRows(itemCategories, "itemTable")
ui.createAllRows(milestoneCategories, "milestoneTable")

// TODO These have to be moved to mod.js
gameData.requirements = {
    //Other
    "The Arcane Association": new TaskRequirement(utils.getElementsByClass("The Arcane Association"), [{task: "Concentration", requirement: 200}, {task: "Meditation", requirement: 200}]),
	"Galactic Council": new AgeRequirement(utils.getElementsByClass("Galactic Council"), [{requirement: 10000}]),
	"The Void": new AgeRequirement(utils.getElementsByClass("The Void"), [{requirement: 1000}]),
	"Void Manipulation": new AgeRequirement(utils.getElementsByClass("Void Manipulation"), [{requirement: 1000}]),
	"Celestial Powers": new AgeRequirement(utils.getElementsByClass("Celestial Powers"), [{requirement: 10000}]),
    "Dark Magic": new EvilRequirement(utils.getElementsByClass("Dark Magic"), [{requirement: 1}]),
	"Almightiness": new EssenceRequirement(utils.getElementsByClass("Almightiness"), [{requirement: 1}]),
    "Rebirth tab": new AgeRequirement([document.getElementById("rebirthTabButton")], [{requirement: 25}]),
    "Rebirth note 1": new AgeRequirement([document.getElementById("rebirthNote1")], [{requirement: 45}]),
    "Rebirth note 2": new AgeRequirement([document.getElementById("rebirthNote2")], [{requirement: 65}]),
    "Rebirth note 3": new AgeRequirement([document.getElementById("rebirthNote3")], [{requirement: 200}]),
	"Rebirth note 4": new AgeRequirement([document.getElementById("rebirthNote4")], [{requirement: 1000}]),
	"Rebirth note 5": new AgeRequirement([document.getElementById("rebirthNote5")], [{requirement: 10000}]),
    "Rebirth note 6": new TaskRequirement([document.getElementById("rebirthNote6")], [{ task: "Cosmic Recollection", requirement: 1 }]),

    "Rebirth note End": new TaskRequirement([document.getElementById("rebirthNoteEnd")], [{ task: "One Above All", requirement: 1000000000000, isHero: true }]),
    "Rebirth button End": new TaskRequirement([document.getElementById("rebirthButtonEnd")], [{ task: "One Above All", requirement: 1000000000000, isHero: true }]),

    "Rebirth button 1": new AgeRequirement([document.getElementById("rebirthButton1")], [{ requirement: 65 }]),
    "Rebirth button 2": new AgeRequirement([document.getElementById("rebirthButton2")], [{ requirement: 200 }]),
    "Rebirth button 3": new TaskRequirement([document.getElementById("rebirthButton3")], [{ task: "Cosmic Recollection", requirement: 1 }]),

    "Evil info": new EvilRequirement([document.getElementById("evilInfo")], [{requirement: 1}]),
	"Essence info": new EssenceRequirement([document.getElementById("essenceInfo")], [{requirement: 1}]),
    "Time warping info": new TaskRequirement([document.getElementById("timeWarping")], [{task: "Adept Mage", requirement: 10}]),

    "Quick task display": new AgeRequirement([document.getElementById("quickTaskDisplay")], [{requirement: 20}]),

    //Common work
    "Beggar": new TaskRequirement([ui.getTaskElement("Beggar")], []),
    "Farmer": new TaskRequirement([ui.getTaskElement("Farmer")], [{task: "Beggar", requirement: 10}]),
    "Fisherman": new TaskRequirement([ui.getTaskElement("Fisherman")], [{task: "Farmer", requirement: 10}]),
    "Miner": new TaskRequirement([ui.getTaskElement("Miner")], [{task: "Strength", requirement: 10}, {task: "Fisherman", requirement: 10}]),
    "Blacksmith": new TaskRequirement([ui.getTaskElement("Blacksmith")], [{task: "Strength", requirement: 30}, {task: "Miner", requirement: 10}]),
    "Merchant": new TaskRequirement([ui.getTaskElement("Merchant")], [{task: "Bargaining", requirement: 50}, {task: "Blacksmith", requirement: 10}]),

    //Military 
    "Squire": new TaskRequirement([ui.getTaskElement("Squire")], [{task: "Strength", requirement: 5}]),
    "Footman": new TaskRequirement([ui.getTaskElement("Footman")], [{task: "Strength", requirement: 20}, {task: "Squire", requirement: 10}]),
    "Veteran footman": new TaskRequirement([ui.getTaskElement("Veteran footman")], [{task: "Battle Tactics", requirement: 40}, {task: "Footman", requirement: 10}]),
    "Centenary": new TaskRequirement([ui.getTaskElement("Centenary")], [{task: "Strength", requirement: 100}, {task: "Veteran footman", requirement: 10}]),
    "Knight": new TaskRequirement([ui.getTaskElement("Knight")], [{task: "Battle Tactics", requirement: 150}, {task: "Centenary", requirement: 10}]),
    "Veteran Knight": new TaskRequirement([ui.getTaskElement("Veteran Knight")], [{task: "Strength", requirement: 300}, {task: "Knight", requirement: 10}]),
    "Holy Knight": new TaskRequirement([ui.getTaskElement("Holy Knight")], [{task: "Mana Control", requirement: 500}, {task: "Veteran Knight", requirement: 10}]),
    "Lieutenant General": new TaskRequirement([ui.getTaskElement("Lieutenant General")], [{task: "Mana Control", requirement: 1000}, {task: "Battle Tactics", requirement: 1000}, {task: "Holy Knight", requirement: 10}]),
	
	
    //The Arcane Association
    "Student": new TaskRequirement([ui.getTaskElement("Student")], [{task: "Concentration", requirement: 200}, {task: "Meditation", requirement: 200}]),
    "Apprentice Mage": new TaskRequirement([ui.getTaskElement("Apprentice Mage")], [{task: "Mana Control", requirement: 400}, {task: "Student", requirement: 10}]),
    "Adept Mage": new TaskRequirement([ui.getTaskElement("Adept Mage")], [{task: "Mana Control", requirement: 700}, {task: "Apprentice Mage", requirement: 10}]),
    "Master Wizard": new TaskRequirement([ui.getTaskElement("Master Wizard")], [{task: "Mana Control", requirement: 1000}, {task: "Adept Mage", requirement: 10}]),
    "Archmage": new TaskRequirement([ui.getTaskElement("Archmage")], [{task: "Mana Control", requirement: 1200}, {task: "Master Wizard", requirement: 10}]),
	"Chronomancer": new TaskRequirement([ui.getTaskElement("Chronomancer")], [{task: "Mana Control", requirement: 1500}, {task: "Meditation", requirement: 1500}, {task: "Archmage", requirement: 25}]),
    "Chairman": new TaskRequirement([ui.getTaskElement("Chairman")], [{task: "Mana Control", requirement: 2000}, {task: "Productivity", requirement: 2000}, {task: "Chronomancer", requirement: 50}]),
    "Imperator": new TaskRequirement([ui.getTaskElement("Imperator")], [{ task: "All Seeing Eye", requirement: 3000, herequirement:650}, {task: "Concentration", requirement: 3000},  {task: "Chairman", requirement: 666}]),
	
	//The Void
    "Corrupted": new AgeRequirement([ui.getTaskElement("Corrupted")], [{requirement: 1000}]),
    "Void Slave": new TaskRequirement([ui.getTaskElement("Void Slave")], [{task: "Corrupted", requirement: 30}]),
    "Void Fiend": new TaskRequirement([ui.getTaskElement("Void Fiend")], [{ task: "Brainwashing", requirement: 3000 }, { task: "Void Slave", requirement: 200 }]),
    "Abyss Anomaly": new TaskRequirement([ui.getTaskElement("Abyss Anomaly")], [{ task: "Mind Seize", requirement: 3000, herequirement: 100 }, { task: "Void Fiend", requirement: 200, herequirement: 100 }]),
    "Void Wraith": new TaskRequirement([ui.getTaskElement("Void Wraith")], [{ task: "Temporal Dimension", requirement: 3400 }, { task: "Abyss Anomaly", requirement: 300, herequirement: 180 }]),
    "Void Reaver": new TaskRequirement([ui.getTaskElement("Void Reaver")], [{ task: "Void Amplification", requirement: 3400, herequirement: 180 }, { task: "Void Wraith", requirement: 250, herequirement: 125 }]),
    "Void Lord": new TaskRequirement([ui.getTaskElement("Void Lord")], [{ task: "Void Symbiosis", requirement: 3800, herequirement: 200 }, { task: "Void Reaver", requirement: 150 }]),
    "Abyss God": new TaskRequirement([ui.getTaskElement("Abyss God")], [{ task: "Void Embodiment", requirement: 4700, herequirement: 300 }, { task: "Void Lord", requirement: 750, herequirement : 125 }]),

	
	 //Galactic Council
    "Eternal Wanderer": new AgeRequirement([ui.getTaskElement("Eternal Wanderer")], [{ requirement: 10000 }]),
    "Nova": new TaskRequirement([ui.getTaskElement("Nova")], [{ task: "Eternal Wanderer", requirement: 15 }, { task: "Cosmic Longevity", requirement: 4000, herequirement: 180 }]),
    "Sigma Proioxis": new TaskRequirement([ui.getTaskElement("Sigma Proioxis")], [{ task: "Nova", requirement: 200 }, { task: "Cosmic Recollection", requirement: 4500, herequirement: 350 }]),
    "Acallaris": new TaskRequirement([ui.getTaskElement("Acallaris")], [{ task: "Galactic Command", requirement: 5000, herequirement: 250 }, { task: "Sigma Proioxis", requirement: 1000, herequirement: 480 }]),
    "One Above All": new TaskRequirement([ui.getTaskElement("One Above All")], [{ task: "Meditation", requirement: 6300 }, { task: "Acallaris", requirement: 1400, herequirement: 500 }]),	

    //Fundamentals
    "Concentration": new TaskRequirement([ui.getTaskElement("Concentration")], []),
    "Productivity": new TaskRequirement([ui.getTaskElement("Productivity")], [{task: "Concentration", requirement: 5}]),
    "Bargaining": new TaskRequirement([ui.getTaskElement("Bargaining")], [{task: "Concentration", requirement: 20}]),
    "Meditation": new TaskRequirement([ui.getTaskElement("Meditation")], [{task: "Concentration", requirement: 30}, {task: "Productivity", requirement: 20}]),

    //Combat
    "Strength": new TaskRequirement([ui.getTaskElement("Strength")], []),
    "Battle Tactics": new TaskRequirement([ui.getTaskElement("Battle Tactics")], [{task: "Concentration", requirement: 20}]),
    "Muscle Memory": new TaskRequirement([ui.getTaskElement("Muscle Memory")], [{task: "Concentration", requirement: 30}, {task: "Strength", requirement: 30}]),

    //Magic
    "Mana Control": new TaskRequirement([ui.getTaskElement("Mana Control")], [{task: "Concentration", requirement: 200}, {task: "Meditation", requirement: 200}]),
    "Life Essence": new TaskRequirement([ui.getTaskElement("Life Essence")], [{task: "Apprentice Mage", requirement: 10}]),
    "Time Warping": new TaskRequirement([ui.getTaskElement("Time Warping")], [{task: "Adept Mage", requirement: 10}]),
    "Astral Body": new TaskRequirement([ui.getTaskElement("Astral Body")], [{task: "Archmage", requirement: 10}]),
    "Temporal Dimension": new TaskRequirement([ui.getTaskElement("Temporal Dimension")], [{task: "Chronomancer", requirement: 25}]),
	"All Seeing Eye": new TaskRequirement([ui.getTaskElement("All Seeing Eye")], [{task: "Mana Control", requirement: 2350}, {task: "Chairman", requirement: 100}]),
	"Brainwashing": new TaskRequirement([ui.getTaskElement("Brainwashing")], [{task: "Imperator", requirement: 100}]),

    //Dark magic
    "Dark Influence": new EvilRequirement([ui.getTaskElement("Dark Influence")], [{requirement: 1}]),
    "Evil Control": new EvilRequirement([ui.getTaskElement("Evil Control")], [{requirement: 1}]),
    "Intimidation": new EvilRequirement([ui.getTaskElement("Intimidation")], [{requirement: 1}]),
    "Demon Training": new EvilRequirement([ui.getTaskElement("Demon Training")], [{requirement: 20}]),
    "Blood Meditation": new EvilRequirement([ui.getTaskElement("Blood Meditation")], [{requirement: 50}]),
    "Demon's Wealth": new EvilRequirement([ui.getTaskElement("Demon's Wealth")], [{requirement: 500}]),
	"Dark Knowledge": new EvilRequirement([ui.getTaskElement("Dark Knowledge")], [{requirement: 5000}]),
	"Void Influence": new EvilRequirement([ui.getTaskElement("Void Influence")], [{requirement: 50000}]),
	"Time Loop": new EvilRequirement([ui.getTaskElement("Time Loop")], [{requirement: 2500000}]),
	"Evil Incarnate": new EvilRequirement([ui.getTaskElement("Evil Incarnate")], [{requirement: 1000000000}]),
	
	//Void Manipulation
	"Absolute Wish": new TaskRequirement([ui.getTaskElement("Absolute Wish")], [{task: "Void Slave", requirement: 25}, {task: "Chairman", requirement: 300}]),
    "Void Amplification": new TaskRequirement([ui.getTaskElement("Void Amplification")], [{ task: "Void Slave", requirement: 100 }, { task: "Absolute Wish", requirement: 3000, herequirement: 1700 }]),
    "Mind Seize": new TaskRequirement([ui.getTaskElement("Mind Seize")], [{ task: "Void Amplification", requirement: 3000, herequirement: 100 }]),
    "Ceaseless Abyss": new TaskRequirement([ui.getTaskElement("Ceaseless Abyss")], [{ task: "Void Influence", requirement: 4000, herequirement: 1950 }, { task: "Abyss Anomaly", requirement: 50 }]),
    "Void Symbiosis": new TaskRequirement([ui.getTaskElement("Void Symbiosis")], [{ task: "Ceaseless Abyss", requirement: 3500, herequirement: 220 }, { task: "Void Reaver", requirement: 50 }]),
    "Void Embodiment": new TaskRequirement([ui.getTaskElement("Void Embodiment")], [{ task: "Dark Influence", requirement: 4600, herequirement: 3700 }, { task: "Void Lord", requirement: 50 }]),
    "Abyss Manipulation": new TaskRequirement([ui.getTaskElement("Abyss Manipulation")], [{ task: "Abyss God", requirement: 350, herequirement: 200 }, { task: "Dark Influence", requirement: 6000, herequirement: 4100 }, { task: "Void Influence", requirement: 6000, herequirement: 2600 }]),
	
	//Celestial Powers
	"Cosmic Longevity": new TaskRequirement([ui.getTaskElement("Cosmic Longevity")], [{task: "Eternal Wanderer", requirement: 1}]),
    "Cosmic Recollection": new TaskRequirement([ui.getTaskElement("Cosmic Recollection")], [{ task: "Nova", requirement: 50 }, { task: "Meditation", requirement: 4200 }, { task: "Mind Seize", requirement: 900 }]),
    "Essence Collector": new TaskRequirement([ui.getTaskElement("Essence Collector")], [{ task: "Sigma Proioxis", requirement: 500, herequirement: 360 }, { task: "Absolute Wish", requirement: 4900, herequirement: 2900 }, { task: "Dark Knowledge", requirement: 6300, herequirement: 3400 }]),
    "Galactic Command": new TaskRequirement([ui.getTaskElement("Galactic Command")], [{ task: "Essence Collector", requirement: 5000, herequirement: 210 }, { task: "Bargaining", requirement: 5000 }]),

    //Essence
	"Yin Yang": new EssenceRequirement([ui.getTaskElement("Yin Yang")], [{requirement: 1}]),
	"Parallel Universe": new EssenceRequirement([ui.getTaskElement("Parallel Universe")], [{requirement: 1}]),
	"Higher Dimensions": new EssenceRequirement([ui.getTaskElement("Higher Dimensions")], [{requirement: 10000}]),
	"Epiphany": new EssenceRequirement([ui.getTaskElement("Epiphany")], [{requirement: 30000}]),

    //Properties
    "Homeless": new CoinRequirement([ui.getItemElement("Homeless")], [{requirement: 0}]),
    "Tent": new CoinRequirement([ui.getItemElement("Tent")], [{requirement: 0}]),
    "Wooden Hut": new CoinRequirement([ui.getItemElement("Wooden Hut")], [{requirement: gameData.itemData["Wooden Hut"].getExpense() * 100}]),
    "Cottage": new CoinRequirement([ui.getItemElement("Cottage")], [{requirement: gameData.itemData["Cottage"].getExpense() * 100}]),
    "House": new CoinRequirement([ui.getItemElement("House")], [{requirement: gameData.itemData["House"].getExpense() * 100}]),
    "Large House": new CoinRequirement([ui.getItemElement("Large House")], [{requirement: gameData.itemData["Large House"].getExpense() * 100}]),
    "Small Palace": new CoinRequirement([ui.getItemElement("Small Palace")], [{requirement: gameData.itemData["Small Palace"].getExpense() * 100}]),
    "Grand Palace": new CoinRequirement([ui.getItemElement("Grand Palace")], [{requirement: gameData.itemData["Grand Palace"].getExpense() * 100}]),
	"Town Ruler": new CoinRequirement([ui.getItemElement("Town Ruler")], [{requirement: gameData.itemData["Town Ruler"].getExpense() * 100}]),
	"City Ruler": new CoinRequirement([ui.getItemElement("City Ruler")], [{requirement: gameData.itemData["City Ruler"].getExpense() * 100}]),
	"Nation Ruler": new CoinRequirement([ui.getItemElement("Nation Ruler")], [{requirement: gameData.itemData["Nation Ruler"].getExpense() * 100}]),
    "Pocket Dimension": new CoinRequirement([ui.getItemElement("Pocket Dimension")], [{requirement: gameData.itemData["Pocket Dimension"].getExpense() * 100}]),
	"Void Realm": new CoinRequirement([ui.getItemElement("Void Realm")], [{requirement: gameData.itemData["Void Realm"].getExpense() * 100}]),
	"Void Universe": new CoinRequirement([ui.getItemElement("Void Universe")], [{requirement: gameData.itemData["Void Universe"].getExpense() * 100}]),
	"Astral Realm": new CoinRequirement([ui.getItemElement("Astral Realm")], [{requirement: gameData.itemData["Astral Realm"].getExpense() * 100}]),
    "Galactic Throne": new CoinRequirement([ui.getItemElement("Galactic Throne")], [{ requirement: gameData.itemData["Galactic Throne"].getExpense() * 100 }]),
    "Spaceship": new CoinRequirement([ui.getItemElement("Spaceship")], [{ requirement: gameData.itemData["Spaceship"].getExpense() * 100 }]),

    //Misc
    "Book": new CoinRequirement([ui.getItemElement("Book")], [{requirement: 0}]),
    "Dumbbells": new CoinRequirement([ui.getItemElement("Dumbbells")], [{requirement: gameData.itemData["Dumbbells"].getExpense() * 100}]),
    "Personal Squire": new CoinRequirement([ui.getItemElement("Personal Squire")], [{requirement: gameData.itemData["Personal Squire"].getExpense() * 100}]),
    "Steel Longsword": new CoinRequirement([ui.getItemElement("Steel Longsword")], [{requirement: gameData.itemData["Steel Longsword"].getExpense() * 100}]),
    "Butler": new CoinRequirement([ui.getItemElement("Butler")], [{requirement: gameData.itemData["Butler"].getExpense() * 100}]),
    "Sapphire Charm": new CoinRequirement([ui.getItemElement("Sapphire Charm")], [{requirement: gameData.itemData["Sapphire Charm"].getExpense() * 100}]),
    "Study Desk": new CoinRequirement([ui.getItemElement("Study Desk")], [{requirement: gameData.itemData["Study Desk"].getExpense() * 100}]),
    "Library": new CoinRequirement([ui.getItemElement("Library")], [{requirement: gameData.itemData["Library"].getExpense() * 100}]), 
	"Observatory": new CoinRequirement([ui.getItemElement("Observatory")], [{requirement: gameData.itemData["Observatory"].getExpense() * 100}]),
	"Mind's Eye": new CoinRequirement([ui.getItemElement("Mind's Eye")], [{requirement: gameData.itemData["Mind's Eye"].getExpense() * 100}]),
	"Void Necklace": new CoinRequirement([ui.getItemElement("Void Necklace")], [{requirement: gameData.itemData["Void Necklace"].getExpense() * 100}]),
	"Void Armor": new CoinRequirement([ui.getItemElement("Void Armor")], [{requirement: gameData.itemData["Void Armor"].getExpense() * 100}]),
	"Void Blade": new CoinRequirement([ui.getItemElement("Void Blade")], [{requirement: gameData.itemData["Void Blade"].getExpense() * 100}]),
	"Void Orb": new CoinRequirement([ui.getItemElement("Void Orb")], [{requirement: gameData.itemData["Void Orb"].getExpense() * 100}]),
	"Void Dust": new CoinRequirement([ui.getItemElement("Void Dust")], [{requirement: gameData.itemData["Void Dust"].getExpense() * 100}]),
	"Celestial Robe": new CoinRequirement([ui.getItemElement("Celestial Robe")], [{requirement: gameData.itemData["Celestial Robe"].getExpense() * 100}]),
	"Universe Fragment": new CoinRequirement([ui.getItemElement("Universe Fragment")], [{requirement: gameData.itemData["Universe Fragment"].getExpense() * 100}]),
    "Multiverse Fragment": new CoinRequirement([ui.getItemElement("Multiverse Fragment")], [{ requirement: gameData.itemData["Multiverse Fragment"].getExpense() * 100 }]),

    // Milestones
    "Milestones": new EssenceRequirement([document.getElementById("milestonesTabButton")], [{ requirement: 1 }]),
}

for (const key in milestoneBaseData) {
    const milestone = gameData.milestoneData[key]
    gameData.requirements[milestone.name] = new EssenceRequirement([ui.getMilestoneElement(milestone.name)],
        [{ requirement: milestone.expense }])
}

tempData["requirements"] = {}
for (const key in gameData.requirements) {
    const requirement = gameData.requirements[key]
    tempData["requirements"][key] = requirement
}

loadGameData()

gameData.milestoneData = {}
createGameObjects(gameData.milestoneData, milestoneBaseData)


ui.initUI()

setCustomEffects()
addMultipliers()

ui.setTab(gameData.settings.selectedTab)
ui.setSettingsTab("settingsTab")

update()
var gameloop = setInterval(update, 1000 / updateSpeed)
var saveloop = setInterval(saveGameData, 3000)