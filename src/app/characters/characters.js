/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module('ngBoilerplate.characters', [
    'ui.router',
    'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
    .config(function config($stateProvider) {
        $stateProvider.state('characters', {
            url: '/characters',
            views: {
                "main": {
                    controller: 'CharactersCtrl',
                    templateUrl: 'characters/characters.tpl.html'
                }
            },
            data: {pageTitle: 'Characters'}
        });

    })


/**
 * And of course we define a controller for our route.
 */
    .controller('CharactersCtrl', function CharactersCtrl($scope, $http) {

        //var that handles the disable boolean for the class chooser
        $scope.occupationCheck = false;
        $scope.character = {};
        $scope.character.occupation = {};
        $scope.character.hitPoints = 0;
        $scope.characterTest = {};

        //Checks which occupation has been chosen. If it's a non-human occupation, it
        //auto-chooses the class for the appropriate race and disables the chooser.
        $scope.updateClass = function () {

            var result = $scope.character.occupation.occupation;

            if (result.indexOf('Elven') != -1) {
                $scope.occupationCheck = true;
                $scope.character.class = $scope.classSelection[4];
                $scope.generateCharTitle();

            }
            else if (result.indexOf('Dwarven') != -1) {
                $scope.occupationCheck = true;
                $scope.character.class = $scope.classSelection[5];
                $scope.generateCharTitle();


            }
            else if (result.indexOf('Halfling') != -1) {
                $scope.occupationCheck = true;
                $scope.character.class = $scope.classSelection[6];
                $scope.generateCharTitle();

            }
            else {
                $scope.occupationCheck = false;
                $scope.character.class = $scope.character.class[0];
                $scope.charOccupationHuman = true;
            }

            $scope.generateHitPoints();
            $scope.generateCritTable();
        };

        //Generates random things
        $scope.randomizer = function (minimum, maximum) {

            return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

        };

        $scope.classChosen = function () {

            $scope.generateInitiativeRoll();
            $scope.generateClassSpecifics();
            $scope.generateCharTitle();

        };


        //Generates random occupation
        $scope.randomOccupation = function () {
            var randomOccResult = $scope.randomizer(0, 78);
            $scope.character.occupation = $scope.charSelection[randomOccResult];
            $scope.updateClass();
        };

        //Generates random stats and by product the stat modifiers
        //Also Generates the Lucky Roll
        $scope.randomStats = function () {
            $scope.character.strength = $scope.abilityModifiers[$scope.randomizer(0, 15)];
            $scope.character.agility = $scope.abilityModifiers[$scope.randomizer(0, 15)];
            $scope.character.stamina = $scope.abilityModifiers[$scope.randomizer(0, 15)];
            $scope.character.personality = $scope.abilityModifiers[$scope.randomizer(0, 15)];
            $scope.character.luck = $scope.abilityModifiers[$scope.randomizer(0, 15)];
            $scope.character.intelligence = $scope.abilityModifiers[$scope.randomizer(0, 15)];
            $scope.character.luckyRoll = $scope.luckyRoll[$scope.randomizer(0, 29)];

            $scope.generateInitiativeRoll();
            $scope.generateSavingThrowModifiers();
            $scope.generateAttackModifiers();
            $scope.generateHitPoints();
            $scope.generateClassSpecifics();

        };


        //Modifier table
        $scope.abilityModifiers = [
            {score: 3, modifier: -3},
            {score: 4, modifier: -2},
            {score: 5, modifier: -2},
            {score: 6, modifier: -1},
            {score: 7, modifier: -1},
            {score: 8, modifier: -1},
            {score: 9, modifier: 0},
            {score: 10, modifier: 0},
            {score: 11, modifier: 0},
            {score: 12, modifier: 0},
            {score: 13, modifier: 1},
            {score: 14, modifier: 1},
            {score: 15, modifier: 1},
            {score: 16, modifier: 2},
            {score: 17, modifier: 2},
            {score: 18, modifier: 3}
        ];


        //Alignments table
        $scope.alignmentSelection = [
            {name: 'Lawful'},
            {name: 'Neutral'},
            {name: 'Chaotic'}
        ];

        //Occupations Table
        $scope.charSelection = [
            {occupation: 'Alchemist', equipment: 'Oil, 1 flask', startingWeapon: 'Staff'},
            {occupation: 'Animal Trainer', equipment: 'Pony', startingWeapon: 'Club'},
            {occupation: 'Armorer', equipment: 'Iron helmet', startingWeapon: 'Hammer (as club)'},
            {occupation: 'Astrologer', equipment: 'Spyglass', startingWeapon: 'Dagger'},
            {occupation: 'Barber', equipment: 'Scissors', startingWeapon: 'Razor (as dagger)'},
            {occupation: 'Beadle', equipment: 'Holy symbol', startingWeapon: 'Staff'},
            {occupation: 'Beekeeper', equipment: 'Jar of honey', startingWeapon: 'Staff'},
            {occupation: 'Blacksmith', equipment: 'Steel tongs', startingWeapon: 'Hammer (as club)'},
            {occupation: 'Butcher', equipment: 'Side of beef', startingWeapon: 'Cleaver (as axe)'},
            {occupation: 'Caravan Guard', equipment: 'Linen, 1 yard', startingWeapon: 'Short sword'},
            {occupation: 'Cheesemaker', equipment: 'Stinky cheese', startingWeapon: 'Cudgel (as staff)'},
            {occupation: 'Cobbler', equipment: 'Shoehorn', startingWeapon: 'Awl (as dagger)'},
            {occupation: 'Confidence artist', equipment: 'Quality cloak', startingWeapon: 'Dagger'},
            {occupation: 'Cooper', equipment: 'Barrel', startingWeapon: 'Crowbar (as club)'},
            {occupation: 'Costermonger', equipment: 'Fruit', startingWeapon: 'Knife (as dagger)'},
            {occupation: 'Cutpurse', equipment: 'Small chest', startingWeapon: 'Dagger'},
            {occupation: 'Ditch Digger', equipment: 'Fine dirt, 1 lb.', startingWeapon: 'Shovel (as staff)'},
            {occupation: 'Dwarven apothecarist', equipment: 'Steel vial', startingWeapon: 'Cudgel (as staff)'},
            {occupation: 'Dwarven blacksmith', equipment: 'Mithril, 1 oz.', startingWeapon: 'Hammer (as club)'},
            {occupation: 'Dwarven chest-maker', equipment: 'Wood, 10 lbs.', startingWeapon: 'Chisel (as dagger)'},
            {occupation: 'Dwarven herder', equipment: 'Sow', startingWeapon: 'Staff'},
            {occupation: 'Dwarven miner', equipment: 'Lantern', startingWeapon: 'Pick (as club)'},
            {occupation: 'Dwarven mushroom-farmer', equipment: 'Sack', startingWeapon: 'Shovel'},
            {occupation: 'Dwarven Rat-catcher', equipment: 'Net', startingWeapon: 'Club'},
            {occupation: 'Dwarven Stonemason', equipment: 'Fine Stone 10 lbs.', startingWeapon: 'Hammer'},
            {occupation: 'Elven artisan', equipment: 'Clay, 1 lb.', startingWeapon: 'Staff'},
            {occupation: 'Elven barrister', equipment: 'Book', startingWeapon: 'Quill (as dart)'},
            {occupation: 'Elven chandler', equipment: 'Candles, 20', startingWeapon: 'Scissors (as dagger)'},
            {occupation: 'Elven falconer', equipment: 'Falcon', startingWeapon: 'Dagger'},
            {occupation: 'Elven forester', equipment: 'Herbs, 1 lb.', startingWeapon: 'Staff'},
            {occupation: 'Elven glassblower', equipment: 'Glass beads', startingWeapon: 'Hammer'},
            {occupation: 'Elven navigator', equipment: 'Spyglass', startingWeapon: 'Bow'},
            {occupation: 'Elven sage', equipment: 'Parchment and quill pen', startingWeapon: 'Dagger'},
            {occupation: 'Farmer', equipment: 'Hen', startingWeapon: 'Pitchfork (as spear)'},
            {occupation: 'Fortune-teller', equipment: 'Tarot deck', startingWeapon: 'Dagger'},
            {occupation: 'Gambler', equipment: 'Dice', startingWeapon: 'Club'},
            {occupation: 'Gongfarmer', equipment: 'Sack of night soil', startingWeapon: 'Trowel (as dagger)'},
            {occupation: 'Grave digger', equipment: 'Trowel', startingWeapon: 'Shovel (as staff)'},
            {occupation: 'Guild beggar', equipment: 'Crutches', startingWeapon: 'Sling'},
            {occupation: 'Halfling chicken butcher', equipment: 'Chicken meat, 5 lbs.', startingWeapon: 'Hand axe'},
            {occupation: 'Halfling dyer', equipment: 'Fabric, 3 yards', startingWeapon: 'Staff'},
            {occupation: 'Halfling glovemaker', equipment: 'Gloves, 4 pairs', startingWeapon: 'Awl (as dagger)'},
            {occupation: 'Halfling gypsy', equipment: 'Hex doll', startingWeapon: 'Sling'},
            {occupation: 'Halfling haberdasher', equipment: 'Fine suits, 3 sets', startingWeapon: 'Scissors (as dagger)'},
            {occupation: 'Halfling mariner', equipment: 'Sailcloth, 2 yards', startingWeapon: 'Knife (as dagger)'},
            {occupation: 'Halfling moneylender', equipment: '5 gp, 10 sp , 200 cp', startingWeapon: 'Short sword'},
            {occupation: 'Halfling trader', equipment: '20 sp', startingWeapon: 'Short sword'},
            {occupation: 'Halfling vagrant', equipment: 'Begging bowl', startingWeapon: 'Club'},
            {occupation: 'Healer', equipment: 'Holy water, 1 vial', startingWeapon: 'Club'},
            {occupation: 'Herbalist', equipment: 'Herbs, 1 lb.', startingWeapon: 'Club'},
            {occupation: 'Herder', equipment: 'Herding dog', startingWeapon: 'Staff'},
            {occupation: 'Hunter', equipment: 'Deer pelt', startingWeapon: 'Shortbow'},
            {occupation: 'Indentured servant', equipment: 'Locket', startingWeapon: 'Staff'},
            {occupation: 'Jester', equipment: 'Silk clothes', startingWeapon: 'Dart'},
            {occupation: 'Jewler', equipment: 'Gem worth 20 gp', startingWeapon: 'Dagger'},
            {occupation: 'Locksmith', equipment: 'Fine tools', startingWeapon: 'Dagger'},
            {occupation: 'Mendicant', equipment: 'Cheese dip', startingWeapon: 'Club'},
            {occupation: 'Mercenary', equipment: 'Hide armor', startingWeapon: 'Longsword'},
            {occupation: 'Merchant', equipment: '4 gp, 15 sp, 27 cp', startingWeapon: 'Dagger'},
            {occupation: 'Miller/baker', equipment: 'Flour, 1 lb.', startingWeapon: 'Club'},
            {occupation: 'Minstrel', equipment: 'Ukulele', startingWeapon: 'Dagger'},
            {occupation: 'Noble', equipment: 'Gold ring worth 10 gp', startingWeapon: 'Longsword'},
            {occupation: 'Orphan', equipment: 'Rag doll', startingWeapon: 'Club'},
            {occupation: 'Ostler', equipment: 'Bridle', startingWeapon: 'Staff'},
            {occupation: 'Outlaw', equipment: 'Leather armor', startingWeapon: 'Short sword'},
            {occupation: 'Rope maker', equipment: 'Rope, 100\'', startingWeapon: 'Knife (as dagger)'},
            {occupation: 'Scribe', equipment: 'Parchment, 10 sheets', startingWeapon: 'Dart'},
            {occupation: 'Shaman', equipment: 'Herbs, 1 lb.', startingWeapon: 'Mace'},
            {occupation: 'Slave', equipment: 'Strange-looking rock', startingWeapon: 'Club'},
            {occupation: 'Smuggler', equipment: 'Waterproof sack', startingWeapon: 'Sling'},
            {occupation: 'Soldier', equipment: 'Shield', startingWeapon: 'Spear'},
            {occupation: 'Squire', equipment: 'Steel helmet', startingWeapon: 'Longsword'},
            {occupation: 'Tax collector', equipment: '100 cp', startingWeapon: 'Longsword'},
            {occupation: 'Trapper', equipment: 'Badger pelt', startingWeapon: 'Sling'},
            {occupation: 'Urchin', equipment: 'begging bowl', startingWeapon: 'Stick (as club)'},
            {occupation: 'Wainwright', equipment: 'Pushcart', startingWeapon: 'Club'},
            {occupation: 'Weaver', equipment: 'Fine suit of clothes', startingWeapon: 'Dagger'},
            {occupation: 'Wizard\'s apprentice', equipment: 'Black grimoire', startingWeapon: 'Dagger'},
            {occupation: 'Woodcutter', equipment: 'Bundle of wood', startingWeapon: 'Handaxe'}

        ];

        //Class table
        $scope.classSelection = [
            {name: 'Cleric', speed: "30"},
            {name: 'Thief', speed: "30"},
            {name: 'Warrior', speed: "30"},
            {name: 'Wizard', speed: "30"},
            {name: "Elven", speed: "30"},
            {name: "Dwarven", speed: "20"},
            {name: "Halfling", speed: "20"}
        ];

        //Lucky Roll table
        $scope.luckyRoll = [
            {name: "Harsh Winter: All attack rolls"},
            {name: "The bull: Melee attack rolls"},
            {name: "Fortunate date: Missile fire attack rolls"},
            {name: "Raised by wolves: Unarmed attack rolls"},
            {name: "Conceived on horseback: Mounted attack rolls"},
            {name: "Born on the battlefield: Damage rolls"},
            {name: "Path of the bear: Melee damage rolls"},
            {name: "Hawkeye: Missle fire damage rolls"},
            {name: "Pack hunter: Attack and damage rolls for 0-level starting weapon"},
            {name: "Born under the loom: Skill checks (including thief skills)"},
            {name: "Fox's cunning: Find/disarm traps"},
            {name: "Four-leafed clover: Find secret doors"},
            {name: "Seventh son: Spell checks"},
            {name: "The raging storm: Spell damage"},
            {name: "Righteous heart: Turn unholy checks"},
            {name: "Survived the plague: Magical healing"},
            {name: "Lucky sign: Saving throws"},
            {name: "Guardian angel: Saving throws to escape traps"},
            {name: "Survived a spider bite: Savings throws against poison"},
            {name: "Struck by lightning: Reflex saving throws"},
            {name: "Lived through famine: Fortitude saving throws"},
            {name: "Resisted temptation: Willpower saving throws"},
            {name: "Charmed house: Armor Class"},
            {name: "Speed of the cobra: Initiative"},
            {name: "Bountiful harvest: Hit points (applies at each level)"},
            {name: "Warrior's arm: Critical hit tables"},
            {name: "Unholy house: Corruption rolls"},
            {name: "The Broken Star: Fumbles"},
            {name: "Birdsong: Number of languages"},
            {name: "Wild child: Speed (each +1/-1 = +5'/-5' speed)"}

        ];

        //Call methods affected by level changes
        $scope.generateLevelChanges = function () {
            $scope.generateInitiativeRoll();
            $scope.generateCharTitle();
            $scope.generateCritTable();
            $scope.generateAttackBonus();
            $scope.generateActionDie();
            $scope.generateSavingThrowModifiers();
            $scope.generateClassSpecifics();
            $scope.generateHitPoints();
        };

        //Generate the initiative roll
        $scope.generateInitiativeRoll = function () {
            var initiative = 0;

            if ($scope.character.class && $scope.character.level) {
                if ($scope.character.class.name.indexOf('Warrior') != -1) {

                    initiative += parseInt($scope.character.level, 10);
                }
            }

            if ($scope.character.agility) {
                initiative += $scope.character.agility.modifier;
            }

            //build text string
            var initiativeText;

            if (initiative >= 0) {
                initiativeText = "1d20 + ";
            }
            else {
                initiativeText = "1d20 ";
            }


            return $scope.character.initiative = initiativeText + initiative;

        };

        //Generate title
        $scope.generateCharTitle = function () {
            if ($scope.character.class) {

                if ($scope.character.class.name.indexOf('Warrior') != -1) {

                    if ($scope.character.level && $scope.character.alignment) {

                        $scope.character.title = Warrior.getWarriorTitle($scope.character.alignment.name, $scope.character.level);
                    }
                }
                if ($scope.character.class.name.indexOf('Thief') != -1) {

                    if ($scope.character.level && $scope.character.alignment) {

                        $scope.character.title = Thief.getThiefTitle($scope.character.alignment.name, $scope.character.level);
                        $scope.generateClassSpecifics();

                    }
                }
                if ($scope.character.class.name.indexOf('Cleric') != -1) {

                    if ($scope.character.level && $scope.character.alignment) {

                        $scope.character.title = Cleric.getClericTitle($scope.character.alignment.name, $scope.character.level);
                    }
                }
                if ($scope.character.class.name.indexOf('Wizard') != -1) {

                    if ($scope.character.level && $scope.character.alignment) {

                        $scope.character.title = Wizard.getWizardTitle($scope.character.alignment.name, $scope.character.level);
                    }
                }
                if ($scope.character.class.name.indexOf('Dwarven') != -1) {

                    if ($scope.character.level && $scope.character.alignment) {

                        $scope.character.title = Dwarf.getDwarfTitle($scope.character.alignment.name, $scope.character.level);
                    }
                }
                if ($scope.character.class.name.indexOf('Elven') != -1) {

                    if ($scope.character.level) {

                        $scope.character.title = Elf.getElfTitle($scope.character.level);
                    }
                }
                if ($scope.character.class.name.indexOf('Halfling') != -1) {

                    if ($scope.character.level) {

                        $scope.character.title = Halfling.getHalflingTitle($scope.character.level);
                    }
                }
            }
        };

        //Generate crit Table
        $scope.generateCritTable = function () {
            if ($scope.character.class) {
                if ($scope.character.class.name.indexOf('Warrior') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critTable = Warrior.generateCritTable($scope.character.level);
                    }
                }
                if ($scope.character.class.name.indexOf('Thief') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critTable = Thief.generateCritTable();
                    }
                }
                if ($scope.character.class.name.indexOf('Cleric') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critTable = Cleric.generateCritTable();
                    }
                }
                if ($scope.character.class.name.indexOf('Wizard') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critTable = Wizard.generateCritTable();
                    }
                }
                if ($scope.character.class.name.indexOf('Dwarven') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critTable = Dwarf.generateCritTable();
                    }
                }
            }
            if ($scope.character.class.name.indexOf('Elven') != -1) {

                if ($scope.character.level) {

                    $scope.character.critTable = Elf.generateCritTable();
                }
            }
            if ($scope.character.class.name.indexOf('Halfling') != -1) {

                if ($scope.character.level) {

                    $scope.character.critTable = Halfling.generateCritTable();
                }
            }

            $scope.generateCritDie();

        };

        //Generate crit Die
        $scope.generateCritDie = function () {
            if ($scope.character.class) {
                if ($scope.character.class.name.indexOf('Warrior') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Warrior.critDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Thief') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Thief.critDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Cleric') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Cleric.critDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Wizard') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Wizard.critDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Dwarven') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Dwarf.critDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Elven') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Elf.critDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Halfling') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Halfling.critDie[$scope.character.level - 1];


                    }
                }
            }
        };

        //Generate attack bonus
        $scope.generateAttackBonus = function () {
            if ($scope.character.class) {
                if ($scope.character.class.name.indexOf('Warrior') != -1) {

                    if ($scope.character.level) {

                        $scope.character.attackBonus = Warrior.attackBonus[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Thief') != -1) {

                    if ($scope.character.level) {

                        $scope.character.attackBonus = Thief.attackBonus[$scope.character.level - 1];


                    }
                }

                if ($scope.character.class.name.indexOf('Cleric') != -1) {

                    if ($scope.character.level) {

                        $scope.character.attackBonus = Cleric.attackBonus[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Wizard') != -1) {

                    if ($scope.character.level) {

                        $scope.character.attackBonus = Wizard.attackBonus[$scope.character.level - 1];


                    }
                }
            }
            if ($scope.character.class.name.indexOf('Dwarven') != -1) {

                if ($scope.character.level) {

                    $scope.character.attackBonus = Dwarf.attackBonus[$scope.character.level - 1];


                }
            }
            if ($scope.character.class.name.indexOf('Elven') != -1) {

                if ($scope.character.level) {

                    $scope.character.attackBonus = Elf.attackBonus[$scope.character.level - 1];


                }
            }
            if ($scope.character.class.name.indexOf('Halfling') != -1) {

                if ($scope.character.level) {

                    $scope.character.attackBonus = Halfling.attackBonus[$scope.character.level - 1];


                }
            }
        };

        //Generate action die
        $scope.generateActionDie = function () {
            if ($scope.character.class) {
                if ($scope.character.class.name.indexOf('Warrior') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Warrior.actionDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Thief') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Thief.actionDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Cleric') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Cleric.actionDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Wizard') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Wizard.actionDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Dwarven') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Dwarf.actionDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Elven') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Elf.actionDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.class.name.indexOf('Halfling') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Halfling.actionDie[$scope.character.level - 1];


                    }
                }
            }
        };

        //generate saving throw modifiers
        $scope.generateSavingThrowModifiers = function () {
            if ($scope.character.class) {
                if ($scope.character.class.name.indexOf('Warrior') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Warrior.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Warrior.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Warrior.reflexBonus[$scope.character.level - 1];

                    }
                }
                if ($scope.character.class.name.indexOf('Thief') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Thief.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Thief.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Thief.reflexBonus[$scope.character.level - 1];

                    }
                }
                if ($scope.character.class.name.indexOf('Cleric') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Cleric.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Cleric.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Cleric.reflexBonus[$scope.character.level - 1];

                    }
                }
                if ($scope.character.class.name.indexOf('Wizard') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Wizard.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Wizard.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Wizard.reflexBonus[$scope.character.level - 1];

                    }
                }
                if ($scope.character.class.name.indexOf('Dwarven') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Dwarf.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Dwarf.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Dwarf.reflexBonus[$scope.character.level - 1];

                    }
                }
                if ($scope.character.class.name.indexOf('Elven') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Elf.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Elf.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Elf.reflexBonus[$scope.character.level - 1];

                    }
                }
                if ($scope.character.class.name.indexOf('Halfling') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Halfling.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Halfling.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Halfling.reflexBonus[$scope.character.level - 1];

                    }
                }
            }
        };

        //generate attack modifiers
        $scope.generateAttackModifiers = function () {

            if ($scope.character.agility && $scope.character.strength) {

                $scope.character.missileAttackBonus = $scope.character.agility.modifier;
                $scope.character.meleeAttackBonus = $scope.character.strength.modifier;

            }

        };

        //generate class specific things
        $scope.generateClassSpecifics = function () {
            if ($scope.character.class) {
                if ($scope.character.class.name.indexOf('Warrior') != -1) {

                    if ($scope.character.level) {

                        $scope.character.threatRange = Warrior.threatRange[$scope.character.level - 1];

                    }
                }
                if ($scope.character.class.name.indexOf('Thief') != -1) {

                    if ($scope.character.level) {

                        $scope.character.luckyDie = Thief.luckyDie[$scope.character.level - 1];
                        if ($scope.character.agility) {

                            Thief.generateThiefSkills($scope.character.alignment.name, $scope.character.level, $scope.character.agility.modifier,
                                $scope.character.intelligence.modifier,
                                $scope.character.personality.modifier);
                            $scope.character.backstab = Thief.backstab;
                            $scope.character.sneakSilently = Thief.sneakSilently;
                            $scope.character.hideInShadows = Thief.hideInShadows;
                            $scope.character.pickPocket = Thief.pickPocket;
                            $scope.character.climbSheerSurfaces = Thief.climbSheerSurfaces;
                            $scope.character.pickLock = Thief.pickLock;
                            $scope.character.findTrap = Thief.findTrap;
                            $scope.character.disableTrap = Thief.disableTrap;
                            $scope.character.forgeDocument = Thief.forgeDocument;
                            $scope.character.disguiseSelf = Thief.disguiseSelf;
                            $scope.character.readLanguages = Thief.readLanguages;
                            $scope.character.handlePoison = Thief.handlePoison;
                            $scope.character.castSpellFromScroll = Thief.castSpellFromScroll;

                        }
                    }
                }
                if ($scope.character.class.name.indexOf('Cleric') != -1) {

                    if ($scope.character.level) {

                        if ($scope.character.personality) {
                            $scope.character.spellCheck = Cleric.getSpellCheck($scope.character.level, $scope.character.personality.modifier);
                            $scope.character.maximumSpellCastingLevel = Cleric.getMaximumSpellCastingLevel($scope.character.personality.score);
                            $scope.character.spellsKnown = Cleric.getSpellsKnown($scope.character.level);
                        }
                    }
                }
                if ($scope.character.class.name.indexOf('Wizard') != -1) {

                    if ($scope.character.level) {

                        if ($scope.character.intelligence) {
                            $scope.character.spellCheck = Wizard.getSpellCheck($scope.character.level, $scope.character.intelligence.modifier);
                            $scope.character.maximumSpellCastingLevel = Wizard.getMaximumSpellCastingLevel($scope.character.intelligence.score);
                            $scope.character.spellsKnown = Wizard.getNumberOfSpellsKnown($scope.character.level, $scope.character.intelligence.score);
                            $scope.character.currentSpellCastingLevel = Wizard.getCurrentCastingLevel($scope.character.level);

                            if ($scope.character.maximumSpellCastingLevel < $scope.character.currentSpellCastingLevel)
                            {
                                $scope.character.currentSpellCastingLevel = $scope.character.maximumSpellCastingLevel;
                            }
                        }
                    }
                }
                if ($scope.character.class.name.indexOf('Elven') != -1) {

                    if ($scope.character.level) {

                        if ($scope.character.intelligence) {
                            $scope.character.spellCheck = Elf.getSpellCheck($scope.character.level, $scope.character.intelligence.modifier);
                            $scope.character.maximumSpellCastingLevel = Elf.getMaximumSpellCastingLevel($scope.character.intelligence.score);
                            $scope.character.spellsKnown = Elf.getNumberOfSpellsKnown($scope.character.level);
                            $scope.character.currentSpellCastingLevel = Elf.getCurrentCastingLevel($scope.character.level);

                            if ($scope.character.maximumSpellCastingLevel < $scope.character.currentSpellCastingLevel)
                            {
                                $scope.character.currentSpellCastingLevel = $scope.character.maximumSpellCastingLevel;
                            }
                        }
                    }
                }
                if ($scope.character.class.name.indexOf('Halfling') != -1) {

                    if ($scope.character.level) {

                        $scope.character.stealth = Halfling.getStealth($scope.character.level);
                    }
                }
            }
        };

        //generate the hit points for the character
        $scope.generateHitPoints = function () {
            $scope.character.hitPoints = 0;
            var initialHitPoints = 0;
            var result;
            var test = [];
            var i = 0;

            if ($scope.character.class) {
                if ($scope.character.class.name.indexOf('Warrior') != -1) {

                    if ($scope.character.level && $scope.character.stamina) {
                        initialHitPoints = $scope.randomizer(1, 4) + $scope.character.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }


                        while (i < $scope.character.level) {

                            result = $scope.randomizer(1, Warrior.hitPointDie) + $scope.character.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.character.hitPoints += result;
                            i++;
                        }
                        $scope.character.hitPoints += initialHitPoints;
                    }

                }
                if ($scope.character.class.name.indexOf('Thief') != -1) {

                    if ($scope.character.level && $scope.character.stamina) {
                        initialHitPoints = $scope.randomizer(1, 4) + $scope.character.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }
                        while (i < $scope.character.level) {

                            result = $scope.randomizer(1, Thief.hitPointDie) + $scope.character.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.character.hitPoints += result;
                            i++;
                        }
                        $scope.character.hitPoints += initialHitPoints;

                    }

                }

                if ($scope.character.class.name.indexOf('Cleric') != -1) {

                    if ($scope.character.level && $scope.character.stamina) {
                        initialHitPoints = $scope.randomizer(1, 4) + $scope.character.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }

                        while (i < $scope.character.level) {

                            result = $scope.randomizer(1, Cleric.hitPointDie) + $scope.character.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.character.hitPoints += result;
                            i++;
                        }
                        $scope.character.hitPoints += initialHitPoints;

                    }

                }
                if ($scope.character.class.name.indexOf('Wizard') != -1) {

                    if ($scope.character.level && $scope.character.stamina) {
                        initialHitPoints = $scope.randomizer(1, 4) + $scope.character.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }

                        while (i < $scope.character.level) {

                            result = $scope.randomizer(1, Wizard.hitPointDie) + $scope.character.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.character.hitPoints += result;
                            i++;
                        }
                        $scope.character.hitPoints += initialHitPoints;

                    }

                }
                if ($scope.character.class.name.indexOf('Dwarven') != -1) {

                    if ($scope.character.level && $scope.character.stamina) {
                        initialHitPoints = $scope.randomizer(1, 4) + $scope.character.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }

                        while (i < $scope.character.level) {

                            result = $scope.randomizer(1, Dwarf.hitPointDie) + $scope.character.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.character.hitPoints += result;
                            i++;
                        }
                        $scope.character.hitPoints += initialHitPoints;

                    }
                }
                if ($scope.character.class.name.indexOf('Elven') != -1) {

                    if ($scope.character.level && $scope.character.stamina) {
                        initialHitPoints = $scope.randomizer(1, 4) + $scope.character.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }

                        while (i < $scope.character.level) {

                            result = $scope.randomizer(1, Elf.hitPointDie) + $scope.character.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.character.hitPoints += result;
                            i++;
                        }
                        $scope.character.hitPoints += initialHitPoints;

                    }
                }
                if ($scope.character.class.name.indexOf('Halfling') != -1) {

                    if ($scope.character.level && $scope.character.stamina) {
                        initialHitPoints = $scope.randomizer(1, 4) + $scope.character.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }

                        while (i < $scope.character.level) {

                            result = $scope.randomizer(1, Halfling.hitPointDie) + $scope.character.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.character.hitPoints += result;
                            i++;
                        }
                        $scope.character.hitPoints += initialHitPoints;

                    }
                }
                console.log("Hit points rolled was: " + test + "initialHitPoints: " + initialHitPoints);

            }
        };

        $scope.signupForm = function(){

                //$http({
                //    method: 'POST',
                //    url: 'pdfConverter.php',
                //    data: {
                //        charName: $scope.testCharName,
                //        charTitle: $scope.testCharTitle
                //    },
                //    headers: { 'Content-Type': 'application/json' }

            $http({
                method: 'POST',
                url: 'pdfConverter.php',
                data: $scope.character,
                headers: { 'Content-Type': 'application/json' }

            }).success(function(data, status, headers, config) { // This is called when the response is
// ready
                    console.log("Data is; " + data);//
                    console.log("Status is: " + status);//
                    console.log("Headers is: " + headers);

                    var w = window.open();
                    w.document.open();
                    w.document.write(data);
                    w.document.close();


                }).error(function(data, status, headers, config) {
                    alert("didn't work");
                });
        };
    });

