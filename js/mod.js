export const permanentUnlocks = ["Quick task display"]

export const jobBaseData = {
    "Beggar": { name: "Beggar", maxXp: 50, income: 5, heroxp: 36 },
    "Farmer": {name: "Farmer", maxXp: 100, income: 9, heroxp: 37 },
    "Fisherman": { name: "Fisherman", maxXp: 200, income: 15, heroxp: 38 },
    "Miner": { name: "Miner", maxXp: 400, income: 40, heroxp: 39 },
    "Blacksmith": { name: "Blacksmith", maxXp: 800, income: 80, heroxp: 40 },
    "Merchant": { name: "Merchant", maxXp: 1600, income: 150, heroxp: 41 },

    "Squire": { name: "Squire", maxXp: 42, income: 5, heroxp: 51 },
    "Footman": { name: "Footman", maxXp: 1000, income: 50, heroxp: 52 },
    "Veteran footman": { name: "Veteran footman", maxXp: 10000, income: 120, heroxp: 53 },
    "Centenary": { name: "Centenary", maxXp: 100000, income: 300, heroxp: 54 },
    "Knight": { name: "Knight", maxXp: 1000000, income: 1000, heroxp: 63 },
    "Veteran Knight": { name: "Veteran Knight", maxXp: 7500000, income: 3000, heroxp: 63 },
    "Holy Knight": { name: "Holy Knight", maxXp: 40000000, income: 5000, heroxp: 64 },
    "Lieutenant General": { name: "Lieutenant General", maxXp: 150000000, income: 50000, heroxp: 77 },

    "Student": { name: "Student", maxXp: 100000, income: 100, heroxp: 79 },
    "Apprentice Mage": { name: "Apprentice Mage", maxXp: 1000000, income: 1000, heroxp: 82 },
    "Adept Mage": { name: "Adept Mage", maxXp: 10000000, income: 9500, heroxp: 82 },
    "Master Wizard": { name: "Master Wizard", maxXp: 100000000, income: 70000, heroxp: 95 },
    "Archmage": { name: "Archmage", maxXp: 10000000000, income: 350000, heroxp: 95 },
    "Chronomancer": { name: "Chronomancer", maxXp: 2000000000000, income: 1000000, heroxp: 95 },
    "Chairman": { name: "Chairman", maxXp: 20000000000000, income: 10000000, heroxp: 106 },
    "Imperator": { name: "Imperator", maxXp: 9000000000000000, income: 60000000, heroxp: 129 },
	
    "Corrupted": { name: "Corrupted", maxXp: 100000000000000, income: 25000000, heroxp: 131 },
    "Void Slave": { name: "Void Slave", maxXp: 650000000000000, income: 200000000, heroxp: 134 },
    "Void Fiend": { name: "Void Fiend", maxXp: 18000000000000000, income: 600000000, heroxp: 237 }, 
    "Abyss Anomaly": { name: "Abyss Anomaly", maxXp: 18000000000000000, income: 1200000000, heroxp: 237 },
    "Void Wraith": { name: "Void Wraith", maxXp: 180000000000000000, income: 5000000000, heroxp: 238 }, 
    "Void Reaver": { name: "Void Reaver", maxXp: 2600000000000000000, income: 25000000000, heroxp: 238 },
    "Void Lord": { name: "Void Lord", maxXp: 28000000000000000000, income: 100000000000, heroxp: 238 },
    "Abyss God": { name: "Abyss God", maxXp: 400000000000000000000, income: 1000000000000, heroxp: 250 },
    "Eternal Wanderer": { name: "Eternal Wanderer", maxXp: 55000000000000000000, income: 1000000000000, heroxp: 250 },

    "Nova": { name: "Nova", maxXp: 51000000000000000000, income: 3000000000000, heroxp: 250 },
    "Sigma Proioxis": { name: "Sigma Proioxis", maxXp: 500000000000000000000, income: 25000000000000, heroxp: 260 },
    "Acallaris": { name: "Acallaris", maxXp: 50000000000000000000000, income: 215000000000000, heroxp: 263 },
    "One Above All": { name: "One Above All", maxXp: 5000000000000000000000000000, income: 25000000000000000, heroxp: 265 },
	
}

export const skillBaseData = {
    "Concentration": { name: "Concentration", maxXp: 100, heroxp: 36, effect: 0.01, description: "Ability XP"},
    "Productivity": { name: "Productivity", maxXp: 100, heroxp: 37, effect: 0.01, description: "Class XP"},
    "Bargaining": { name: "Bargaining", maxXp: 100, heroxp: 38, effect: -0.01, description: "Reduced Expenses"},
    "Meditation": { name: "Meditation", maxXp: 100, heroxp: 39, effect: 0.01, description: "Happiness"},

    "Strength": { name: "Strength", maxXp: 100, heroxp: 40, effect: 0.01, description: "Military Pay"},
    "Battle Tactics": { name: "Battle Tactics", maxXp: 100, heroxp: 41, effect: 0.01, description: "Military XP"},
    "Muscle Memory": { name: "Muscle Memory", maxXp: 100, heroxp: 42, effect: 0.01, description: "Strength XP"},

    "Mana Control": { name: "Mana Control", maxXp: 100, heroxp: 46, effect: 0.01, description: "T.A.A. XP"},
    "Life Essence": { name: "Life Essence", maxXp: 100, heroxp: 82, effect: 0.01, description: "Longer Lifespan"},
    "Time Warping": { name: "Time Warping", maxXp: 100, heroxp: 82, effect: 0.01, description: "Gamespeed"},
    "Astral Body": { name: "Astral Body", maxXp: 100, heroxp: 100, effect: 0.0035, description: "Longer lifespan"},
    "Temporal Dimension": { name: "Temporal Dimension", maxXp: 100, heroxp: 115, effect: 0.006, description: "Gamespeed"},
    "All Seeing Eye": { name: "All Seeing Eye", maxXp: 100, heroxp: 120, effect: 0.0027, description: "T.A.A Pay"},
    "Brainwashing": { name: "Brainwashing", maxXp: 100, heroxp: 145, effect: -0.01, description: "Reduced Expenses"},
	
    "Dark Influence": { name: "Dark Influence", maxXp: 100, heroxp: 155, effect: 0.01, description: "All XP"},
    "Evil Control": { name: "Evil Control", maxXp: 100, heroxp: 156, effect: 0.01, description: "Evil Gain"},
    "Intimidation": { name: "Intimidation", maxXp: 100, heroxp: 157, effect: -0.01, description: "Reduced Expenses" },
    "Demon Training": { name: "Demon Training", maxXp: 100, heroxp: 174, effect: 0.01, description: "All XP"},
    "Blood Meditation": { name: "Blood Meditation", maxXp: 100, heroxp: 176, effect: 0.01, description: "Evil Gain"},
    "Demon's Wealth": { name: "Demon's Wealth", maxXp: 100, heroxp: 178, effect: 0.002, description: "Class Pay"},
    "Dark Knowledge": { name: "Dark Knowledge", maxXp: 100, heroxp: 180, effect: 0.003, description: "Class XP" },

    "Void Influence": { name: "Void Influence", maxXp: 100, heroxp: 206, effect: 0.0028, description: "All XP"},
    "Time Loop": { name: "Time Loop", maxXp: 100, heroxp: 207, effect: 0.001, description: "Gamespeed"},
    "Evil Incarnate": { name: "Evil Incarnate", maxXp: 100, heroxp: 208, effect: 0.01, description: "Ability XP" },
    "Absolute Wish": { name: "Absolute Wish", maxXp: 100, heroxp: 198, effect: 0.005, description: "Evil Gain" },
    "Void Amplification": { name: "Void Amplification", maxXp: 100, heroxp: 251, effect: 0.01, description: "The Void XP" },
    "Mind Seize": { name: "Mind Seize", maxXp: 100, heroxp: 251, effect: 0.0006, description: "Reduced Happiness" },
    "Ceaseless Abyss": { name: "Ceaseless Abyss", maxXp: 100, heroxp: 251, effect: 0.000585, description: "Longer Lifespan" },
    "Void Symbiosis": { name: "Void Symbiosis", maxXp: 100, heroxp: 253, effect: 0.0015, description: "Ability XP" },
    "Void Embodiment": { name: "Void Embodiment", maxXp: 100, heroxp: 258, effect: 0.0025, description: "Evil Gain" },
    "Abyss Manipulation": { name: "Abyss Manipulation", maxXp: 100, heroxp: 266, effect: -0.01, description: "Reduced Expenses" },

    "Cosmic Longevity": { name: "Cosmic Longevity", maxXp: 100, heroxp: 266, effect: 0.0015, description: "Longer Lifespan" },
    "Cosmic Recollection": { name: "Cosmic Recollection", maxXp: 100, heroxp: 272, effect: 0.00065, description: "Max Lvl Multiplier" },
    "Essence Collector": { name: "Essence Collector", maxXp: 100, heroxp: 288, effect: 0.01, description: "Essence Gain" },
    "Galactic Command": { name: "Galactic Command", maxXp: 100, heroxp: 290, effect: -0.01, description: "Reduced Expenses" },

    "Yin Yang": { name: "Yin Yang", maxXp: 100, heroxp: 290, effect: 0.020, description: "Essence + Evil Gain" },
    "Parallel Universe": { name: "Parallel Universe", maxXp: 290, heroxp: 300, effect: 0.02, description: "All XP"},
    "Higher Dimensions": { name: "Higher Dimensions", maxXp: 290, heroxp: 300, effect: 0.001, description: "Longer Lifespan" },
    "Epiphany": { name: "Epiphany", maxXp: 100, heroxp: 280, effect: 0.012, description: "Galactic Council XP"},

}

export const itemBaseData = {
    "Homeless": {name: "Homeless", expense: 0, effect: 1, heromult: 2, heroeffect: 2e6},
    "Tent": { name: "Tent", expense: 15, effect: 1.4, heromult: 2, heroeffect: 2e7 },
    "Wooden Hut": { name: "Wooden Hut", expense: 100, effect: 2, heromult: 3, heroeffect: 2e8 },
    "Cottage": { name: "Cottage", expense: 750, effect: 3.5, heromult: 3, heroeffect: 2e9 },
    "House": { name: "House", expense: 3000, effect: 6, heromult: 4, heroeffect: 2e10 },
    "Large House": { name: "Large House", expense: 25000, effect: 12, heromult: 4, heroeffect: 2e11 },
    "Small Palace": { name: "Small Palace", expense: 300000, effect: 25, heromult: 5, heroeffect: 2e12 },
    "Grand Palace": { name: "Grand Palace", expense: 5000000, effect: 60, heromult: 5, heroeffect: 2e13 },
    "Town Ruler": { name: "Town Ruler", expense: 35000000, effect: 120, heromult: 6, heroeffect: 2e15 },
    "City Ruler": { name: "City Ruler", expense: 1100000000, effect: 500, heromult: 7, heroeffect: 2e17 },
    "Nation Ruler": { name: "Nation Ruler", expense: 13000000000, effect: 1200, heromult: 8, heroeffect: 2e19 },
    "Pocket Dimension": { name: "Pocket Dimension", expense: 49000000000, effect: 5000, heromult: 9, heroeffect: 2e22 },
    "Void Realm": { name: "Void Realm", expense: 121000000000, effect: 15000, heromult: 10, heroeffect: 2e25 },
    "Void Universe": { name: "Void Universe", expense: 2000000000000, effect: 30000, heromult: 11, heroeffect: 2e28 },
    "Astral Realm": { name: "Astral Realm", expense: 160000000000000, effect: 150000, heromult: 12, heroeffect: 2e31 },
    "Galactic Throne": { name: "Galactic Throne", expense: 5000000000000000, effect: 300000, heromult: 13, heroeffect: 2e35 },
    "Spaceship": { name: "Spaceship", expense: 1000000000000000000, effect: 1500000, heromult: 15, heroeffect: 5e42 },
                                                            

    "Book": { name: "Book", expense: 10, effect: 1.5, description: "Ability XP", heromult: 2 },
    "Dumbbells": { name: "Dumbbells", expense: 50, effect: 1.5, description: "Strength XP", heromult: 2 },
    "Personal Squire": { name: "Personal Squire", expense: 200, effect: 2, description: "Class XP", heromult: 3 },
    "Steel Longsword": { name: "Steel Longsword", expense: 1000, effect: 2, description: "Military XP", heromult: 3 },
    "Butler": { name: "Butler", expense: 7500, effect: 1.5, description: "Happiness", heromult: 4 },
    "Sapphire Charm": { name: "Sapphire Charm", expense: 50000, effect: 3, description: "Magic XP", heromult:4 },
    "Study Desk": { name: "Study Desk", expense: 1000000, effect: 2, description: "Ability XP", heromult: 5 },
    "Library": { name: "Library", expense: 10000000, effect: 2, description: "Ability XP", heromult: 5 },
    "Observatory": { name: "Observatory", expense: 140000000, effect: 5, description: "Magic XP", heromult: 6 },
    "Mind's Eye": { name: "Mind's Eye", expense: 3250000000, effect: 10, description: "Fundamentals XP", heromult: 8 },
    "Void Necklace": { name: "Void Necklace", expense: 28050000000, effect: 3, description: "Void Manipulation XP", heromult: 10 },
    "Void Armor": { name: "Void Armor", expense: 197050000000, effect: 3, description: "The Void XP", heromult: 10 },
    "Void Blade": { name: "Void Blade", expense: 502050000000, effect: 3, description: "Ability XP", heromult: 11 },
    "Void Orb": { name: "Void Orb", expense: 1202050000000, effect: 3, description: "Void Manipulation XP", heromult: 11 },
    "Void Dust": { name: "Void Dust", expense: 25002050000000, effect: 3, description: "The Void XP", heromult: 12 },
    "Celestial Robe": { name: "Celestial Robe", expense: 300002050000000, effect: 5, description: "Galactic Council XP", heromult: 12 },
    "Universe Fragment": { name: "Universe Fragment", expense: 18500002050000000, effect: 3, description: "Ability XP", heromult: 13 },
    "Multiverse Fragment": { name: "Multiverse Fragment", expense: 200500002050000000, effect: 5, description: "Happiness", heromult: 15 },
}

export const milestoneBaseData = {
    "Magic Eye": { name: "Magic Eye", expense: 5000, tier: 1, description: "Auto max level at age 65" },
    "Almighty Eye": { name: "Almighty Eye", expense: 15000, tier: 2, description: "Auto max level from born" },
    "Deal with the Devil": { name: "Deal with the Devil", expense: 30000, tier: 3, description: "Slow Auto Evil" },
    "Transcendent Master": { name: "Transcendent Master", expense: 50000, tier: 4, description: "Essence gain" },
    "Eternal Time": { name: "Eternal Time", expense: 75000, tier: 5, description: "x2 Time Warping" },
    "Hell Portal": { name: "Hell Portal", expense: 120000, tier: 6, description: "Fast Auto Evil" },
    "Inferno": { name: "Inferno", expense: 170000, tier: 7, description: "x5 Evil gain" },
    "God's Blessings": { name: "God's Blessings", expense: 250000, tier: 8, description: "x10M Happiness" },
    "Faint Hope": { name: "Faint Hope", expense: 400000, tier: 9, description: "Essence gain (increases over time)" },
    "New Beginning": { name: "New Beginning", expense: 5000000, tier: 10, description: "Heroic jobs, skills and items are unlocked" },

    "Rise of Great Heroes": { name: "Rise of Great Heroes", expense: 10000000, tier: 11, description: "Essence gain + x10000 Hero XP" },
    "Lazy Heroes": { name: "Lazy Heroes", expense: 20000000, tier: 12, description: "Hero XP", effect : 1e12},
    "Dirty Heroes": { name: "Dirty Heroes", expense: 30000000, tier: 13, description: "Hero XP", effect : 1e15 },
    "Angry Heroes": { name: "Angry Heroes", expense: 50000000, tier: 14, description: "Hero XP", effect : 1e15 },
    "Tired Heroes": { name: "Tired Heroes", expense: 100000000, tier: 15, description: "Hero XP", effect : 1e15 },
    "Scared Heroes": { name: "Scared Heroes", expense: 150000000, tier: 16, description: "Hero XP", effect : 1e15 },
    "Good Heroes": { name: "Good Heroes", expense: 200000000, tier: 17, description: "Hero XP", effect : 1e15 },
    "Funny Heroes": { name: "Funny Heroes", expense: 300000000, tier: 18, description: "Hero XP", effect : 1e25 },
    "Beautiful Heroes": { name: "Beautiful Heroes", expense: 400000000, tier: 19, description: "Hero XP", effect : 1e50 },
    "Awesome Heroes": { name: "Awesome Heroes", expense: 500000000, tier: 20, description: "Hero XP", effect : 1e10 },
    "Furious Heroes": { name: "Furious Heroes", expense: 750000000, tier: 21, description: "Hero XP", effect : 1e18 },
    "Superb Heroes": { name: "Superb Heroes", expense: 10000000000, tier: 22, description: "Hero XP", effect : 1e3 },
}

export const jobCategories = {
    "Common work"            : ["Beggar", "Farmer", "Fisherman", "Miner", "Blacksmith", "Merchant"],
    "Military"               : ["Squire", "Footman", "Veteran footman", "Centenary", "Knight", "Veteran Knight", "Holy Knight", "Lieutenant General"],
    "The Arcane Association" : ["Student", "Apprentice Mage", "Adept Mage", "Master Wizard", "Archmage", "Chronomancer", "Chairman", "Imperator"],
	"The Void"               : ["Corrupted", "Void Slave", "Void Fiend", "Abyss Anomaly", "Void Wraith", "Void Reaver", "Void Lord", "Abyss God"],
    "Galactic Council"       : ["Eternal Wanderer", "Nova", "Sigma Proioxis", "Acallaris", "One Above All"]
}

export const skillCategories = {
    "Fundamentals"           : ["Concentration", "Productivity", "Bargaining", "Meditation"],
    "Combat"                 : ["Strength", "Battle Tactics", "Muscle Memory"],
    "Magic"                  : ["Mana Control", "Life Essence", "Time Warping", "Astral Body", "Temporal Dimension", "All Seeing Eye", "Brainwashing"],
    "Dark Magic"             : ["Dark Influence", "Evil Control", "Intimidation", "Demon Training", "Blood Meditation", "Demon's Wealth", "Dark Knowledge", "Void Influence", "Time Loop", "Evil Incarnate"],
	"Void Manipulation"      : ["Absolute Wish", "Void Amplification", "Mind Seize", "Ceaseless Abyss", "Void Symbiosis", "Void Embodiment", "Abyss Manipulation"],
	"Celestial Powers"       : ["Cosmic Longevity", "Cosmic Recollection", "Essence Collector", "Galactic Command"],
	"Almightiness"           : ["Yin Yang", "Parallel Universe", "Higher Dimensions", "Epiphany"]
}

export const itemCategories = {
    "Properties": ["Homeless", "Tent", "Wooden Hut", "Cottage", "House", "Large House", "Small Palace", "Grand Palace", "Town Ruler", "City Ruler", "Nation Ruler", "Pocket Dimension", "Void Realm", "Void Universe", "Astral Realm", "Galactic Throne", "Spaceship"],
    "Misc": ["Book", "Dumbbells", "Personal Squire", "Steel Longsword", "Butler", "Sapphire Charm", "Study Desk", "Library", "Observatory", "Mind's Eye", "Void Necklace", "Void Armor", "Void Blade", "Void Orb", "Void Dust", "Celestial Robe", "Universe Fragment", "Multiverse Fragment"]
}

export const milestoneCategories = {
    "Essence Milestones": ["Magic Eye", "Almighty Eye", "Deal with the Devil", "Transcendent Master", "Eternal Time", "Hell Portal", "Inferno", "God's Blessings", "Faint Hope"],
    "Heroic Milestones": ["New Beginning", "Rise of Great Heroes", "Lazy Heroes", "Dirty Heroes", "Angry Heroes", "Tired Heroes", "Scared Heroes", "Good Heroes", "Funny Heroes", "Beautiful Heroes", "Awesome Heroes", "Furious Heroes", "Superb Heroes"]
}

export const headerRowColors = {
    "Common work": "#55a630",
    "Military": "#e63946",
    "The Arcane Association": "#C71585",
	"The Void": "#762B91",
    "Galactic Council": "#D5C010",
    "Fundamentals": "#55a630",
    "Combat": "#e63946",
    "Magic": "#C71585",
    "Dark Magic": "#73000f",
	"Almightiness": "#18d2d9",
	"Void Manipulation": "#762B91",
	"Celestial Powers": "#D5C010",
    "Properties_Auto": "#21cc5e",
    "Misc_Auto": "#f54546",
    "Properties": "#219ebc",
    "Misc": "#b56576",
    "Essence Milestones": "#0066ff",
    "Heroic Milestones": "#ff6600",
}

export const tooltips = {
	//Common work
    "Beggar": "Struggle day and night for a couple of copper coins. It feels like you are at the brink of death each day.",
    "Farmer": "Plow the fields and grow the crops. It's not much but it's honest work.",
    "Fisherman": "Reel in various fish and sell them for a handful of coins. A relaxing but still a poor paying job.",
    "Miner": "Delve into dangerous caverns and mine valuable ores. The pay is quite meager compared to the risk involved.",
    "Blacksmith": "Smelt ores and carefully forge weapons for the military. A respectable and OK paying commoner job.",
    "Merchant": "Travel from town to town, bartering fine goods. The job pays decently well and is a lot less manually-intensive.",
	
    //Military
    "Squire": "Carry around your knight's shield and sword along the battlefield. Very meager pay but the work experience is quite valuable.",
    "Footman": "Put down your life to battle with enemy soldiers. A courageous, respectable job but you are still worthless in the grand scheme of things.",
    "Veteran footman": "More experienced and useful than the average footman, take out the enemy forces in battle with your might. The pay is not that bad.",
    "Centenary": "By proving your skills with a bow, you were appointed to lead a small group of archers to ambush your enemies from a distance.",
    "Knight": "Slash and pierce through enemy soldiers with ease, while covered in steel from head to toe. A decently paying and very respectable job.",
    "Veteran Knight": "Utilising your unmatched combat ability, slaugher enemies effortlessly. Most footmen in the military would never be able to acquire such a well paying job like this.",
    "Holy Knight": "Obliterate squadrons of enemy soldiers in one go with extraordinary proficiency, while equipped magically imbued blade. Such a feared unit on the battlefield is paid extremely well.",
    "Lieutenant General": "Feared by nations, obliterate entire armies in a blink of an eye. Roughly every century, only one holy knight is worthy of receiving such an esteemed title.",

    //The Arcane Association
    "Student": "Study the theory of mana and practice basic spells. There is minor pay to cover living costs, however, this is a necessary stage in becoming a mage.",
    "Apprentice Mage": "Under the supervision of a skilled mage, perform basic spells against enemies in battle. Generous pay will be provided to cover living costs.",
    "Adept Mage": "Turn the tides of battle through casting intermediate spells and mentor other apprentices. The pay for this particular job is extremely high.",
    "Master Wizard": "Utilise advanced spells to ravage and destroy entire legions of enemy soldiers. Only a small percentage of mages deserve to attain this role and are rewarded with an insanely high pay.",
    "Archmage": "Blessed with unparalleled talent, perform unbelievable feats with magic at will. It is said that an archamge has enough destructive power to wipe an empire off the map.",
	"Chronomancer": "Specialize in harnessing temporal energies that alter the flow of time with supernatural divinations and otherwordly expertise.",
    "Chairman": "Spend your days administrating The Arcane Association and investigate the concepts of true immortality. The chairman receives ludicrous amounts of pay daily.",
	"Imperator": "You wield an unlimited power, making you unstoppable. By ruling with an iron fist, everyone in the Arcane Association has to obey your commands.",

    //The Void
    "Corrupted": "Corrupted by Void, you are slowly turning into a slave with no free will, just to serve the Void for the rest of eternity... Can you resist it, or will it consume you forever?",
    "Void Slave": "Each day you are succumbing to the Void more and more, can you hold to your humanity for a bit longer, or will you let it devour you?",
    "Void Fiend": "You become an inquisitive yet putrid creature that siphons life from everything around you.",
	"Abyss Anomaly": "Screaming into existence, you become a manifestation of the unknowable nothingness that lies beyond.",
	"Void Wraith": "Damned soul... a shadow of your former self, lingering between realms and consumed by void... can you ever find peace?",
	"Void Reaver": "There are few who may tread the paths between worlds, these powers grant you an ability to generate fields of void energy that devour all living things.",
	"Void Lord": "You gazed into the dark heart of the Void long enough to become one of the most powerful and feared beings, all lesser void creatures are at your command.",
	"Abyss God": "Creator of the Void, a vast canvas of blackness and nothingness, in which the concept of its existence defies all logic, nothing will escape you.",
 
    //Galactic Council
    "Eternal Wanderer": "With the powers bestowed upon you by an unknown entity you wander around, visiting places revered and feared in search of answers.",
    "Nova": "Extremely powerful being with tremedous telekinetic powers and the ability to rearrange the molecular structure of matter and energy, even up to cosmic scale.",
	"Sigma Proioxis": "A nigh-omnipotent cosmological entity, with vast matter and energy manipulation abilities that help you push the boundaries of the Universe itself.",
    "Acallaris": "Primordial being that predate the universe, involved with the creation of life and powerful beyond mortal comprehension, existing as myths to the oldest species in the universe.",
	"One Above All": "Creator of everything.",	

    //Fundamentals
    "Concentration": "Improve your learning speed through practising intense concentration activities.",
    "Productivity": "Learn to procrastinate less at work and receive more job experience per day.",
    "Bargaining": "Study the tricks of the trade and persuasive skills to lower any type of expense.",
    "Meditation": "Fill your mind with peace and tranquility to tap into greater happiness from within.",

    //Combat
    "Strength": "Condition your body and strength through harsh training. Stronger individuals are paid more in the military.",
    "Battle Tactics": "Create and revise battle strategies, improving experience gained in the military.",
    "Muscle Memory": "Strengthen your neurons through habit and repetition, improving strength gains throughout the body.",

    //Magic
    "Mana Control": "Strengthen your mana channels throughout your body, aiding you in becoming a more powerful magical user.",
    "Life Essence": "Lengthen your lifespan through the means of magic. However, is this truly the immortality you have tried seeking for...?",
    "Time Warping": "Bend space and time through forbidden techniques, speeding up your learning processes.",
    "Astral Body": "Lengthen your lifespan drastically beyond comprehension by harnessing ethereal energy.",
	"Temporal Dimension": "Creating your own pocket dimension where centuries go by in mere seconds.",
	"All Seeing Eye": "As the highest rank of T.A.A, all funds go directly to you.",
	"Brainwashing": "A technique designed to manipulate human thought and action against their desire.",

     //Dark magic - Evil Required
    "Dark Influence": "Encompass yourself with formidable power bestowed upon you by evil, allowing you to pick up and absorb any job or skill with ease.",
    "Evil Control": "Tame the raging and growing evil within you, improving evil gain in-between rebirths.",
    "Intimidation": "Learn to emit a devilish aura which strikes extreme fear into other merchants, forcing them to give you heavy discounts.",
    "Demon Training": "A mere human body is too feeble and weak to withstand evil. Train with forbidden methods to slowly manifest into a demon, capable of absorbing knowledge rapidly.",
    "Blood Meditation": "Grow and culture the evil within you through the sacrifise of other living beings, drastically increasing evil gain.",
    "Demon's Wealth": "Through the means of dark magic, multiply the raw matter of the coins you receive from your job.",
	"Dark Knowledge": "Sealed for a very long time, you utilized these forbidden texts for your own personal gain.",
	"Void Influence": "Tapping into the powers of the Void while combining them with evil grants you an ulimited potential.",
	"Time Loop": "Mastery is achieved when 'telling time' becomes 'telling time what to do'.",
	"Evil Incarnate": "You have became the very thing you swore to destroy.",
	
	//Void Manipulation
	"Absolute Wish": "The power to fulfill absolutely any and all wishes without any limitations.",
    "Void Amplification": "You surrender yourself to the Void, making it easier to take control of you.",
    "Mind Seize": "In a trance like state, you feel the Void controlling your thoughts, perception, memories, emotions and personality.",
	"Ceaseless Abyss": "Never ending torture, you swore to serve the Void for the rest of your existence.",
	"Void Symbiosis": "A symbiotic relationship that helps you become one with the Void.",
	"Void Embodiment": "If thou gaze long into an abyss, the abyss will also gaze into thee.",
	"Abyss Manipulation": "Allows you to shape your own reality within the Void itself.",
	
	//Celestial Powers - Endgame
	"Cosmic Longevity": "You have seen it all, from the very beginning to the very end.",
	"Cosmic Recollection": "Being able to exist in multiple parallel timelines and manipulating you parallel selves, influencing their lives as you see fit.",
	"Essence Collector": "Exploit the unlimited potential of multiverse energies and collect its resources.",
	"Galactic Command": "Absolute power corrupts absolutely.",
	
	//Almightiness
	"Yin Yang": "Born from chaos when the universe was first created, believed to exist in harmony, balancing evil and good.",
	"Parallel Universe": "Self-contained plane of existence, co-existing with one's own, helping you restore fragments of your forgotten power.",
	"Higher Dimensions": "By possesing the power to partially alter the laws of physics and transceding lower dimensional spaces, your existence becomes never-ending.",
	"Epiphany": "You become one with everything.",
	
    //Properties
    "Homeless": "Sleep on the uncomfortable, filthy streets while almost freezing to death every night. It cannot get any worse than this.",
    "Tent": "A thin sheet of tattered cloth held up by a couple of feeble, wooden sticks. Horrible living conditions but at least you have a roof over your head.",
    "Wooden Hut": "Shabby logs and dirty hay glued together with horse manure. Much more sturdy than a tent, however, the stench isn't very pleasant.",
    "Cottage": "Structured with a timber frame and a thatched roof. Provides decent living conditions for a fair price.",
    "House": "A building formed from stone bricks and sturdy timber, which contains a few rooms. Although quite expensive, it is a comfortable abode.",
    "Large House": "Much larger than a regular house, which boasts even more rooms and multiple floors. The building is quite spacious but comes with a hefty price tag.",
    "Small Palace": "A very rich and meticulously built structure rimmed with fine metals such as silver. Extremely high expenses to maintain for a lavish lifestyle.",
    "Grand Palace": "A grand residence completely composed of gold and silver. Provides the utmost luxurious and comfortable living conditions possible for a ludicrous price.",
	"Town Ruler": "You rule your very own community in your small town, owning multiple establishments.",
    "City Ruler": "As the highest ranking official, you manage and oversee everything that happens, while your pay is astronomical, so are your expenses.",
	"Nation Ruler": "You reign the whole nation, while your riches may be corrupted, everything you see belongs to you.",
	"Pocket Dimension": "A Dimension just for you, that can be summoned at will. What happens there stays there.",
	"Void Realm": "Unknown how or when the Void realm came into existence, containing elements which don’t exist outside of its dimensional plane are now all to your disposal",
	"Void Universe": "Predating our own universe, the Void has an ulimited amount of space for your belongings, if you are willing to submit to it.",
	"Astral Realm": "Beneath personality and ego lays the source of our deep character, our personhood. Here are the psychic senses, our deep mind and emotions, symbols and inner reality.",
    "Galactic Throne": "You sit on your throne, overseeing the existence itself.", 
    "Spaceship": "Your own personal cosmic house.",

    //Misc
    "Book": "A place to write down all your thoughts and discoveries, allowing you to learn a lot more quickly.",
    "Dumbbells": "Heavy tools used in strenuous exercise to toughen up and accumulate strength even faster than before. ",
    "Personal Squire": "Assists you in completing day to day activities, giving you more time to be productive at work.",
    "Steel Longsword": "A fine blade used to slay enemies even quicker in combat and therefore gain more experience.",
    "Butler": "Keeps your household clean at all times and also prepares three delicious meals per day, leaving you in a happier, stress-free mood.",
    "Sapphire Charm": "Embedded with a rare sapphire, this charm activates more mana channels within your body, providing a much easier time learning magic.",
    "Study Desk": "A dedicated area which provides many fine stationary and equipment designed for furthering your progress in research.",
    "Library": "Stores a collection of books, each containing vast amounts of information from basic life skills to complex magic spells.",
	"Observatory": "Used for observing terrestrial, marine and celestial events.",
	"Mind's Eye": "Lets you see memories, remember images, and even see new pictures and ideas.",
	"Void Necklace": "Helps you shape and manipulate void matter, even transmute it and rebuild into anything of your choosing.",
	"Void Armor": "Generates an innate armor as a part of you body, which is resistant to attacks, harm or pain.",
	"Void Blade": "Forged from void dust and dark matter, can slash through dimensional barriers. It's a weapon of choice for every Void Reaver.",
	"Void Orb": "When the orb touches non void entities, it instantly disintegrate them. Harnessing its power from Void realm.",
	"Void Dust": "Purest version of void created material, a teaspoon of it is as heavy as a small planet. ",
	"Celestial Robe": "The most powerful and essential equipment of any Celestial. Acts as a source of infinite power.",
	"Universe Fragment": "From the time the universe was born. Can create another small universes.",
    "Multiverse Fragment": "Came into existance long before our universe was created, this strange looking object with no shape radiates unlimited energy.",

    //Essence Milestones
    "Magic Eye": "The Eye in your Amulet starts to glow.",
    "Almighty Eye": "The Eye in your Amulet shines like a star.",
    "Deal with the Devil": "You made a deal with the Devil.",
    "Transcendent Master": "You've mastered Transcendence.",
    "Eternal Time": "Is time matters now?",
    "Hell Portal": "You've opened a portal to Hell.",
    "Inferno": "You are at the last level of Hell. What is next?",
    "God's Blessings": "God bless you!",
    "Faint Hope": "Maybe there is a hope?",
    "New Beginning": "Try to upgrade One Above All to level 2000",

    //Heroic Milestones
    "Rise of Great Heroes": "Every active Great job or skill will increase Essence gain a bit.",
    "Lazy Heroes": "Total Hero XP multiplier is 5e20",
    "Dirty Heroes": "Total Hero XP multiplier is 5e35",
    "Angry Heroes": "Total Hero XP multiplier is 5e50",
    "Tired Heroes": "Total Hero XP multiplier is 5e65",
    "Scared Heroes": "Total Hero XP multiplier is 5e80",
    "Good Heroes": "Total Hero XP multiplier is 5e95",
    "Funny Heroes": "Total Hero XP multiplier is 5e120",
    "Beautiful Heroes": "Total Hero XP multiplier is 5e170",
    "Awesome Heroes": "Total Hero XP multiplier is 5e180",
    "Furious Heroes": "Total Hero XP multiplier is 5e198",
    "Superb Heroes": "Total Hero XP multiplier is 5e201",
}